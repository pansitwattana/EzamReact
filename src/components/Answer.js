import React, { Component } from 'react'
import styled from 'styled-components'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import LaTex from './commons/LaTeX'
import Header from './commons/Header'

const Container = styled.div`

`

class Answer extends Component {
  state = {
    methods: [
      {
        text: 'x^2+3x-10=0',
        meta: 'Two factor',
        id: uuid(),
      },
      {
        text: '(x+5)(x-2)=0',
        id: uuid(),
      },
      {
        text: 'x=-5, x=2',
        id: uuid(),
      }
    ],
  }

  getAnswer(id) {
    return this.state.methods.map((method) => {
      const latex = method.text
      const description = method.meta
      let header = '' 
      if (latex) {
        header = <LaTex text={latex} id={uuid()} />
      }

      let meta = ''
      if (description) {
        meta = <Card.Meta>{description}</Card.Meta>
      }
        

      return (<Card key={method.id} style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>
            {header}
          </Card.Header>
        {meta}
        </Card.Content>
      </Card>
      ) 
    })
  }

  render() {
    return (<div>
      <Header text="Answer Sheet" />
      <Container>
        {this.getAnswer(1)}
      </Container>
    </div>)
  }
}

export default Answer
