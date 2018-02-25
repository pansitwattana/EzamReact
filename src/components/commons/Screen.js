import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon, Dimmer, Loader, Label, Item, Button, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import DownButton from 'react-icons/lib/md/keyboard-arrow-down'
import UpButton from 'react-icons/lib/md/keyboard-arrow-up'
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

// const LeftContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   cursor: pointer;
//   padding: 0px 10px;
// `

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

// const Text = styled.span`
//   font-size: 12px;
//   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//   color: #ffffff;
//   ${props =>
//     props.done &&
//     `
//     color: #cbf442;
//   `};
// `
const ToggleButton = styled.img`
  width: 20px;
  height: 10px;
`

const ProblemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

class ScreenComponent extends Component {

  state = {
    imageOpen: true,
    show: true,
  }

  render() {
    const {
      displayText,
      description,
      id,
      imageUrl,
      done,
      loading,
      checked,
      hasAnswer,
      userCredit,
      onSubmit,
      onEditSubmit,
      onCheck,
      onUnlock,
      tags,
      hideButton
    } = this.props
    const { imageOpen, show } = this.state
    const toggleIcon = imageOpen ? 'angle up' : 'angle down'
    const imageToggle = imageUrl ? <Button onClick={() => this.setState({ imageOpen: !imageOpen })} style={{ width: '30%', height: '15px', alignSelf: 'center' }} size="tiny" basic icon={toggleIcon} /> : undefined
    const imageDisplay = imageUrl && imageOpen ? (
      <Item size="tiny" style={{ margin: '0 30px' }}>
        <Image src={imageUrl} style={{ 'max-height': '120px', margin: 'auto' }} />
      </Item>) : undefined
    const displayLatex = <LaTeX text={description + " " + displayText} id={id} />
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
    const labels = tags.map(tag => <Label size="tiny">{tag}</Label>)
    return (
      <Screen>
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : (
          <Item.Group style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {show && <Item style={{ margin: '0px' }}>
              {imageDisplay}
              {imageToggle}
              <Item.Content style={{ paddingTop: '5px' }}>
                <Item.Description style={{ marginTop: '0' }}>
                  <ProblemContainer>
                    {displayLatex}
                    {hasAnswer && <Modal
                      floated="right"
                      trigger={<Button style={{ maxHeight: '30px' }} icon="lock" negative secondary size="mini" floated="right">Unlock</Button>}
                      header='Unlock Solution!'
                      content={userCredit >= 50 ? `Confirm to use 50 credit to unlock! (${userCredit})` : `You need more credit to unlock (${userCredit})`}
                      actions={[
                        'Cancel',
                        { 
                          key: 'Unlock', 
                          content: 'Unlock', 
                          positive: true,
                          disabled: userCredit < 50,
                          onClick: onUnlock,
                        },
                      ]}
                    />}
                  </ProblemContainer>
                </Item.Description>
                <Item.Extra>
                  {labels}
                  {/* <Button onClick={onButtonClick} primary={highlight} floated='right' size='tiny' basic={!highlight} color='blue' content='Blue'>        
                    {submitText}  
                    <Icon name='right check' />
                  </Button> */}
                  {!hideButton ? (<Button style={{ maxHeight: '30px' }} onClick={onButtonClick} primary={highlight} floated='right' size='tiny' basic={!highlight} color='blue' content='Blue'>        
                    {submitText}  
                    <Icon name='right check' />
                  </Button>) : undefined}
                </Item.Extra>
              </Item.Content>
            </Item>}
            <div style={{ width: 25, alignSelf: 'center' }} onClick={() => this.setState({ show: !show })}>
              {show ? <UpButton /> : <DownButton />}
            </div>
          </Item.Group>
        )}
      </Screen>
    )
  }
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

ScreenComponent.defaultProps = {
  tags: [],
  description: '',
  displayText: '',
  userCredit: 0,
}

ScreenComponent.propTypes = {
  displayText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  tags: PropTypes.array,
  description: PropTypes.string,
  userCredit: PropTypes.number,
}

export default ScreenComponent
