import React from 'react'
import Button from 'react-bootstrap/Button';

export const FormButton = ({children, type}) => {
  return <Button type={type} variant="primary">{children}</Button>
}
