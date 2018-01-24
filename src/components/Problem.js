import React, { Component } from 'react'
import uuid from 'uuid'
import { gql, graphql } from 'react-apollo'
import { Button, Icon, Input, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
// import { Math } from './data/Keyboards'
import math from './paper/MathQuill'
import { KeyAction, Actions } from './data/MathJaxKeys'
import TeX from './commons/TeX'
import Keyboard from './commons/Keyboard'
// import MathInput from './commons/Input'
import Options from './commons/Options'
import Header from './commons/Header'
import TitleSelect from './problem/TitleSelect'

const TextArea = styled.div`
  margin: 10px;
  height: 70px;
  background: #FFF;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.07),
    0 3px 1px -2px rgba(0,0,0,.1),
    0 1px 5px 0 rgba(0,0,0,.06);
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`

const Footer = styled.div`
  background-color: #4c66a4;
  color: #fff;
  position: absolute;
  right: 20px;
  bottom: 50%;
  padding: 15px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 2px 2px 10px #ccc;
`
// const InputContainer = styled.div`
//   display: flex;
//   align-items: center;
// `

class Problem extends Component {
  latexs = ['']

  state = {
    problemId: uuid(),
    title: '',
    selectedTags: [],
    showKeyboard: false,
    imgSrc: null,
    files: null,
    latex: '',
    prevLatex: '',
  }

  componentDidMount() {
    this.titleInput.focus()
  }

  onTagAdded = (selectedTags) => {
    this.setState({ selectedTags })
  }

  getFilePath(file) {
    if (!file) {
      return null
    }

    const { files } = file
    if (!files || files.length === 0) {
      return null
    }

    const imageFile = files[0];
    const reader = new FileReader();

    const url = reader.readAsDataURL(imageFile);
    if (!url) return null

    return url
  }

  onFileChange = () => {
    const { file } = this.refs
    if (!file) {
      this.setState({ imgSrc: null, showKeyboard: false, files: null })
      return
    }

    const { files } = file
    if (!files || files.length === 0) {
      this.setState({ imgSrc: null, showKeyboard: false, files: null })
      return
    }

    const imageFile = files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(imageFile);

    reader.onloadend = () => {
      this.setState({
        imgSrc: [reader.result],
        showKeyboard: false,
        files
      })
      
      // console.log(url) // Would see a path?
    }
    // TODO: concat files
  }

  uploadFile = (files) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('data', files[0])
      // use the file endpoint
      fetch('https://api.graph.cool/file/v1/cj8xys6y80cqz0169yu1nn3ql', {
        method: 'POST',
        body: data
      }).then(response => {
        return response.json()
      }).then(file => {
        const fileId = file.id
        resolve(fileId)
      }).catch(error => {
        reject(error)
      })
    })
  }

  postProblem = (variables) => {
    return new Promise((resolve, reject) => {
      this.props.createPost({ variables })
        .then((res) => {
          const post = res.data.createPost
          resolve(post.id)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  submit = () => {
    // const latex = math.getLaTeX(this.state.problemId)
    const { latex } = this.state
    
    if (!latex || latex === '') {
      alert('Please Input Problem')
      return;
    }
    const { user } = this.props.data
    if (!user) {
      alert('user not login')
      return;
    }
    const tags = this.state.selectedTags
    const tagIds = []
    this.props.tagQuery.allTags.forEach((tag) => {
      if (tags.includes(tag.name)) {
        tagIds.push(tag.id)
      }
    })

    const { title, files } = this.state

    let variables = {
      title,
      authorId: user.id,
      latex,
      description: '',
      difficulty: 'Easy',
      tagIds,
      imageId: null
    }

    let image = null
    
    if (files) {
      this.uploadFile(files)
        .then(imageId => {
          variables.imageId = imageId
          this.postProblem(variables)
            .then(id => {
              this.props.history.push(`/paper/${id}`)
            })
        }).catch(error => console.error(error))
    }
    else {
      console.log(tagIds)

      this.postProblem(variables)
        .then(id => {
          this.props.history.push(`/paper/${id}`)
        })
        .catch(error => console.error(error))
    }

  }

  handleKeyboard(key) {
    // math.typed(key, this.state.problemId)
    const action = KeyAction(key)
    switch (action) {
      case Actions.DELETE:
        const prevLatex = this.latexs.pop() || ''
        this.setState({ latex: prevLatex })
        break
      default:
        const latex = this.state.latex
        this.latexs.push(latex)
        this.setState({ latex: latex + key })
        break
    }
  }

  handleKeyPress = (event) => {
    console.log(event)
    
    if (!this.state.showKeyboard) {
      return
    }

    this.setState({ latex: this.state.latex + event.key })
  }

  render() {
    // const { symbol, value, action } = Math
    const { selectedTags, showKeyboard, imgSrc } = this.state
    const { loading, allTags } = this.props.tagQuery
    const isLoading = loading || !allTags;
    const tags = isLoading ? [{ key: '0', text: 'Loading', value: '' }] :
      allTags.map(tag => ({ key: tag.id, text: tag.name, value: tag.name }))
    return (
      <div>
      <div onKeyPress={this.handleKeyPress} tabIndex="0" style={{ display: 'flex', flexDirection: 'column' }}>
        <Header text="Post" />
        <TitleSelect />
        <Input
          style={{ margin: '10px', width: '100%' }}
          placeholder="Question Title"
          onChange={e => this.setState({ title: e.target.value })}
          onFocus={() => this.setState({ showKeyboard: false })}
          onBlur={() => this.setState({ showKeyboard: true })}
          ref={(input) => { this.titleInput = input; }}
        />
        <TextArea>
          <TeX value={this.state.latex} />
        </TextArea>
        {/* <Header text="Add Solution" />
        <Question>
          <Input id={this.state.solutionId} />
        </Question> */}
        <Form onFocus={() => this.setState({ showKeyboard: false })} onBlur={() => this.setState({ showKeyboard: true })}>

          <Options tags={tags} value={selectedTags} onChange={this.onTagAdded} />

          <br />
          <label for="file-upload" style={{
            border: '1px solid #ccc',
            display: 'inline-block',
            padding: '6px 12px',
            cursor: 'pointer'
          }}>
              <Icon name="camera" /> Custom Upload
          </label>
          <input
            id="file-upload"
            ref="file"
            type="file"
            name="user[image]"
            multiple="true"
            onChange={this.onFileChange}
            style={{ display: 'none' }}
          />
          <Image src={[imgSrc]} size='medium' hidden={imgSrc === null} />
          {/* <Button style={{ margin: '10px' }}>
            <Icon name="camera" />
            Add a picture
          </Button> */}
          <br />
          <Button style={{ padding: 10 }} icon onClick={this.submit}>
            <Icon name="send" />
            Submit
          </Button>
        </Form>
        <Keyboard isMathJax show={showKeyboard} onPress={key => this.handleKeyboard(key)} />
      </div>
        <Footer>X</Footer>
        </div>
    )
  }
}
// SolutionanswersAnswer
const createPost = gql`
mutation ($title: String!, $authorId: ID!, $latex: String!  $description: String, $tagIds: [ID!], $difficulty: Difficulty, , $imageId: ID){
  createPost (
    title: $title
    authorId: $authorId
    latex: $latex
    description: $description
    difficulty: $difficulty
    tagsIds: $tagIds
    imageId: $imageId
  ) {
    id
    title
    latex
    difficulty
    description
  }
}
`

const userQuery = gql`
query {
  user {
    id
  }
}
`

const tagQuery = gql`
query {
  allTags {
    id
    name
  }
}
`

export default graphql(createPost, { name: 'createPost' })(graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(graphql(tagQuery, { name: 'tagQuery' })(withRouter(Problem))))
