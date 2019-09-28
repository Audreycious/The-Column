import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { hasAuthToken } from '../auth/token-service'

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        hasAuthToken()
          ? <Redirect to={'/'} />
          : <Component {...componentProps} />
      )}
    />
  )
}