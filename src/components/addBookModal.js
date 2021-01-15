import React, { useState } from "react"
import { Modal, Button, Form, Spinner } from "react-bootstrap"
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!){
    addBook(input: { title: $title, author: $author}){
      title
      author
    }
  }
`

export const AddBookModal = ({ show, handleClose, getBooks }) => {
  const [addBook, { error, loading }] = useMutation(ADD_BOOK)
  const [ book, setBook ] = useState("")
  const [ author, setAuthor ] = useState("")

  if(error) return <h2>Something went wrong</h2>

  const handleSubmit = (e) => {
    e.preventDefault()
    if(book !== "" || author !== ""){
      addBook({ variables: {
        title: book,
        author
      }})
      setBook("")
      setAuthor("")
      handleClose()
      getBooks()
    }
  }
  return(
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Book Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Book Name"
              name="book"
              value={book}
              onChange={(e) => setBook(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Author" 
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {
              loading ? 
              <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
              </>: "Submit"
            }
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}