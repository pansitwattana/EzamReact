import React from 'react'
import styled from 'styled-components'
import { Icon, Dimmer, Loader, Label, Item, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import LaTeX from './LaTexContainer'
// import LaTeX from './LaTeX'

const Screen = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #68cef2; */
  color: #190d08;
  font-size: 18px;
  padding: 5px 10px;
  text-align: left;
  font-weight: lighter;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.18),
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
  font-size: 12px;
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
  imageUrl,
  done,
  loading,
  checked,
  onSubmit,
  onEditSubmit,
  onCheck
}) => {
  const imageDisplay = imageUrl ? <Item.Image size='medium' src={imageUrl} /> : undefined
  const display = <LaTeX text={displayText} id={id} />
  let submitText = 'Check'
  let onButtonClick = onCheck
  let highlight = false
  if (done && checked) { 
    submitText = 'Edit' 
    onButtonClick = onEditSubmit
    highlight = true
  }
  else if (!done && checked) { 
    submitText = 'Submit' 
    onButtonClick = onSubmit
    highlight = true
  }
  
  return (
    <Screen>
      {loading ? (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <Icon inverted color="teal" name="check" />
      )}
      <Item.Group style={{ width: '100%', height: '100%' }}>
        <Item style={{ margin: '0px' }}>
          {imageDisplay}
          <Item.Content>
            <Item.Description>{display}</Item.Description>
            <Item.Extra>
              <Label size="tiny">Calculus</Label>
              <Button onClick={onButtonClick} primary={highlight} floated='right' size='tiny' basic={!highlight} color='blue' content='Blue'>        
                {submitText}  
                <Icon name='right check' />
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Screen>
  )
}
// const ScreenComponent = ({
//   displayText,
//   id,
//   imageUrl,
//   done,
//   loading,
//   onSubmit,
//   onEditSubmit
// }) => {
//   const imageDisplay = imageUrl ? <Image style={{ padding: '5px' }} src={imageUrl} size="medium" /> : <div />
//   const display = <LaTeX text={displayText} id={id} />
//   return (
//     <Screen>
//       <div>
//         {imageDisplay}
//         {display}
//       </div>
//       <LeftContainer onClick={done ? onEditSubmit : onSubmit}>
//         {loading ? (
//           <Dimmer active>
//             <Loader content="Loading" />
//           </Dimmer>
//         ) : (
//           <Icon inverted color="teal" name="check" />
//         )}
//         <Text done={done}>{done ? 'Edit' : 'Submit'}</Text>
//       </LeftContainer>
//     </Screen>
//   )
// }

ScreenComponent.propTypes = {
  displayText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ScreenComponent
