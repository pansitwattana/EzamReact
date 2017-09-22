import React from 'react'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'

const Search = styled.div`
  padding: 10px 10px 10px 10px;
`

const SearchBar = () => (
  <Search>
    <Input style={{ width: '100%' }} icon="search" placeholder="Search..." />
  </Search>
)

export default SearchBar
