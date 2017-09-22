import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const View = styled.div`
  display: flex;
  background-color: #F8F8F8;
  justify-content: space-between;
  height: 50px;
  shadow-color: #000;
  shadow-offset: width 0, height 2;
  shadow-opacity: 0.2;
  elevation: 2,
`

const Text = styled.div`
  font-size: 20px;
  flex: 10;
  text-align: center;
  align-self: center;
`

const Header = (props) => {
  return (
    <View>
      <Button icon style={{ flex: 1 }}>
        <Icon name="left arrow" />
      </Button>
      <Text>{props.text}</Text>
    </View>
  )
}

Header.defaultProps = {
  text: 'Course',
}

Header.propTypes = {
  text: PropTypes.string,
}

export default Header
