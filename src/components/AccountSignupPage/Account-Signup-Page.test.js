import React from 'react'
import ReactDOM from 'react-dom'
import AccountSignupPage from './Account-Signup-Page'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<AccountSignupPage />, div)

  ReactDOM.unmountComponentAtNode(div)
})