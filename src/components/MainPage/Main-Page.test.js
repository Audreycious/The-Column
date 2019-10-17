import React from 'react'
import ReactDOM from 'react-dom'
import MainPage from './Main-Page'
import { BrowserRouter } from 'react-router-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<BrowserRouter><MainPage /></BrowserRouter>, div)

  ReactDOM.unmountComponentAtNode(div)
})