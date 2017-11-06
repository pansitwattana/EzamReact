import React from 'react'
import { Dropdown } from 'semantic-ui-react'
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const Options = ({ tags, onChange }) => (
  <Dropdown placeholder='Tags' onChange={(e, { value }) => onChange(value)} fluid multiple search selection options={tags} />
)

export default Options
