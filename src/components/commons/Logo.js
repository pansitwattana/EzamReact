import React from 'react'
import styled from 'styled-components'
import logo from '../../icon.png'

const Header = styled.div`
  background-color: #222;
  height: 70px;
  padding-top: 5px;
  color: white;
  text-align: center;
`

const Image = styled.img`height: 60px;`

const Logo = () => (
  <Header>
    <Image src={logo} alt="logo" />
  </Header>
)

export default Logo
