import React from 'react'
import styled from 'styled-components'
import { Icon, Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LaTeX from './LaTexContainer'
// import LaTeX from './LaTeX'

const Screen = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #68cef2;
  color: #190d08;
  font-size: 30px;
  padding: 5px 10px;
  text-align: left;
  font-weight: lighter;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.18),
    0 3px 1px -2px rgba(0, 0, 0, 0.24), 0 1px 10px 0 rgba(0, 0, 0, 0.1);
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0px 10px;
`

// const Submit = styled.div`
//   font-size: 30px;
//   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//   color: #ffffff;
//   ${props =>
//     props.done &&
//     `
//     color: #cbf442;
//   `};
// `

const Text = styled.span`
  font-size: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  ${props =>
    props.done &&
    `
    color: #cbf442;
  `};
`

const ScreenComponent = ({
  displayText,
  id,
  done,
  loading,
  onSubmit,
  onShowAnswers
}) => (
  <Screen>
    <LaTeX text={displayText} id={id} />
    <LeftContainer onClick={done ? onShowAnswers : onSubmit}>
      {loading ? (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <Icon inverted color="teal" name="check" />
      )}
      <Text done={done}>{done ? 'Show Answers' : 'Submit'}</Text>
    </LeftContainer>
  </Screen>
)

ScreenComponent.propTypes = {
  displayText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ScreenComponent
