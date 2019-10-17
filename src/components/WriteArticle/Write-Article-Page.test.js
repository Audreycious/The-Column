import React from 'react'
import ReactDOM from 'react-dom'
import WriteArticlePage from './Write-Article-Page'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<WriteArticlePage />, div)

  ReactDOM.unmountComponentAtNode(div)
})