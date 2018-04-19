import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import propTypes from 'prop-types'
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const Options = ({ tags, onChange, loading, placeholder }) => (
  <Dropdown
    loading={loading}
    placeholder={placeholder}
    onChange={(e, { value }) => onChange(value)}
    fluid multiple search selection
    options={tags} />
)

Options.defaultProps = {
  tags: ['No Tags'],
  placeholder: 'Tags'
}

Options.propTypes = {
  onChange: propTypes.func.isRequired,
  tags: propTypes.array,
  placeholder: propTypes.string,
}

export default Options
