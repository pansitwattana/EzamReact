import React, { Component } from 'react'
import uuid from 'uuid'
import { gql, graphql } from 'react-apollo'
import { Button, Icon, Input, Image, Dimmer, Loader } from 'semantic-ui-react'
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

const TextArea = styled.textarea`
  margin: 10px;
  width: 100%;
  height: 70px;
  background: #FFF;
  border-radius: 2px;
`

const LaTeXShow = styled.div`
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
  /* background-color: #4c66a4;
  color: #fff; */
  position: absolute;
  right: 0px;
  bottom: ${prop => prop.showKeyboard ? 45 : 0}%;
  padding: 15px;
  /* border-radius: 30px;
  text-align: center;
  box-shadow: 2px 2px 10px #ccc; */
`
// const InputContainer = styled.div`
//   display: flex;
//   align-items: center;
// `

class Problem extends Component {
  latexs = ['']

  state = {
    problemId: uuid(),
    submiting: false,
    title: '',
    description: '',
    selectedTags: [],
    showKeyboard: false,
    imgSrc: null,
    files: null,
    latex: '',
    prevLatex: '',
    textCursor: 0,
    cursorDiff: 0,
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
    this.setState({ submiting: true })
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

    const { title, description, files } = this.state

    let variables = {
      title,
      authorId: user.id,
      latex,
      description,
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
              this.setState({ submiting: false })
              this.props.history.push(`/paper/${id}`)
            })
        }).catch(error => this.setState({ submiting: false }))
    }
    else {
      console.log(tagIds)

      this.postProblem(variables)
        .then(id => {
          this.setState({ submiting: false })
          this.props.history.push(`/paper/${id}`)
        })
        .catch(error => this.setState({ submiting: false }))
    }

  }

  handleKeyboard(key) {
    // math.typed(key, this.state.problemId)
    let cursorPosition = this.textInput.selectionStart
    const action = KeyAction(key)
    if (action === Actions.DELETE) {
      const prevLatex = this.latexs.pop() || ''
      const { textCursor } = this.state
      if (cursorPosition === 0) {
        cursorPosition = textCursor
        this.textInput.setSelectionRange(cursorPosition, cursorPosition)
      }
      let oldLatex = this.state.latex

      let diff = 1

      // if (oldLatex.charAt(cursorPosition) === '$') {
      //   diff = 2
      // } 

      let newLatex = oldLatex.substr(0, cursorPosition - diff)
      const afterLatex = oldLatex.substr(cursorPosition, oldLatex.length)
      
      newLatex += afterLatex
      const newCursorPosition = cursorPosition - diff >= 0 ? cursorPosition - 1 : 0
      if (newLatex === '$') {
        newLatex = ''
      }
      this.setState({ latex: newLatex, textCursor: newCursorPosition })
    }
    else {
      const { latex, showKeyboard, cursorDiff, textCursor } = this.state
      if (cursorPosition === 0) {
        cursorPosition = textCursor
        this.textInput.setSelectionRange(cursorPosition, cursorPosition)
      }
      const prev = latex.substr(0, cursorPosition)
      const after = latex.substr(cursorPosition, latex.length)
      let newWord = key
      // if (showKeyboard && !latex.includes('$')) {
      //   newWord = `$${newWord}$`
      // }
      let diff = 0
      if (showKeyboard) {
        const hasLeftDollar = prev.includes('$')
        const hasRightDollar = after.includes('$')
        if (!hasLeftDollar || !hasRightDollar) {
          newWord = `$${newWord}$`
          diff = 1
        }
        else {
          diff = 0
        }
      }
      cursorPosition += newWord.length - diff
      // console.table({prev, after, cursorPosition})
      let result = prev + newWord + after
      this.setState({ latex: result, cursorDiff: diff, textCursor: cursorPosition }, () => {
        this.textInput.setSelectionRange(cursorPosition, cursorPosition)
        console.log(this.textInput.selectionStart, cursorPosition)
      })
      
      this.latexs.push(result)
    }
  }

  handleKeyPress = (event) => {
    // console.log(event)
    
    if (!this.state.showKeyboard) {
      return
    }

    const { latex, textCursor } = this.state
    const prev = latex.substr(0, textCursor)
    
    let result = prev + event.key
    result += latex.substr(textCursor, latex.length)

    this.setState({ latex: result })
  }

  onTextChange = (e) => {
    const textArea = e.target
    console.table({ cursor: this.textInput.selectionStart })
    this.setState({ latex: textArea.value, textCursor: textArea.selectionStart, cursorDiff: 0 })
  }

  onTextFocus = (e) => {
    // const textArea = e.target
    this.setState({ showKeyboard: false, cursorDiff: 0 })
  }

  render() {
    // const { symbol, value, action } = Math
    const { selectedTags, showKeyboard, imgSrc, submiting } = this.state
    const { loading, allTags } = this.props.tagQuery
    const isLoading = loading || !allTags;
    const tags = isLoading ? [{ key: '0', text: 'Loading', value: '' }] :
      allTags.map(tag => ({ key: tag.id, text: tag.name, value: tag.name }))
    return (
      <div>
        {submiting ? (
            <Dimmer active>
              <Loader content="Loading" />
            </Dimmer>
          ) : (
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

              <TextArea
                readOnly={showKeyboard}
                onFocus={this.onTextFocus}
                onChange={this.onTextChange}
                value={this.state.latex}
                innerRef={(input) => { this.textInput = input; }}
              />

              <LaTeXShow>
                <TeX value={this.state.latex} />
              </LaTeXShow>
              {/* <Header text="Add Solution" />
              <Question>
                <Input id={this.state.solutionId} />
              </Question> */}
              <Form onFocus={() => this.setState({ showKeyboard: false })}>

                <Input
                  style={{ margin: '10px', width: '100%' }}
                  placeholder="Description"
                  onChange={e => this.setState({ description: e.target.value })}
                  onFocus={() => this.setState({ showKeyboard: false })}
                  ref={(input) => { this.descriptionInput = input; }}
                />

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
            <Footer showKeyboard={showKeyboard}>
              <Button style={{ boxShadow: '2px 2px 2px black' }} size='big' circular color='facebook' onClick={() => this.setState({ showKeyboard: !this.state.showKeyboard })} icon='keyboard' />
            </Footer>
          </div>)}
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
