import React from "react"
import { Spinner } from "react-bootstrap"

export const Loading = () => {
  return(
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}