import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FloatButton from './commons/FloatButton'
import Button from './commons/Button'
import logo from '../icon.png'

const Background = styled.div`text-align: center;`

const Header = styled.div`
  background-color: #222;
  height: 50px;
  padding: 20px 10px;
  color: white;
`

const Image = styled.img`height: 60px;`

const Home = () => (
  <div>
    <Background>
      <Header>
        <Image src={logo} alt="logo" />
      </Header>
      <Link style={{ textDecoration: 'none' }} to="/paper">
        <Button>Paper</Button>
      </Link>
    </Background>
    <FloatButton>+</FloatButton>
  </div>
)

export default Home
