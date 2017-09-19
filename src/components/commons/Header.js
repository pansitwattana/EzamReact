import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const View = styled.div`
  display: flex;
  background-color: #F8F8F8;
  justify-content: center;
  align-items: center;
  height: 50px;
  shadow-color: #000;
  shadow-offset: width 0, height 2;
  shadow-opacity: 0.2;
  elevation: 2,
`

const Text = styled.div`
  font-size: 20px;
`

const Header = (props) => {
  return (
    <View>
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
