import React, { useState } from "react"
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client"
import { Loading } from "../components/Spinner"
import { Button, Spinner } from "react-bootstrap"
import { AddBookModal } from "../components/addBookModal"

const GET_BOOKS = gql`
  query getBooks{
    books {
      id
      title
      author
    }
  }
`
const DELETE_BOOK = gql`
  mutation deleteBook($id: String){
    deleteBook(id: $id){
      title
      author
    }
  }
`

export const Books = () => {
  const [ show, setShow ] = useState(false)
  const [deleteBook, { error: errMutate, loading: still_load }] = useMutation(DELETE_BOOK)
  const { loading, error, data } = useQuery(GET_BOOKS)
  const [getBooks, { loading: load, error: err }] = useLazyQuery(GET_BOOKS, {
    fetchPolicy: "network-only"
  });

  if(loading | load ) return <Loading />
  if(error | err | errMutate) return <h2>Error occured while fetching books</h2>

  const handleClose = () => {
    setShow(!show)
  }
  const handleDelete = (id) => {
    deleteBook({
      variables: { id }
    })
    getBooks()
  }
  return(
    <div className="books">
      <AddBookModal show={show} handleClose={handleClose} getBooks={getBooks}/>
      <div className="add-button">
        <Button 
          onClick={handleClose}
        >Add Book</Button>
      </div>
      {
        data.books.length === 0 && <h4>There is no record, Add your books</h4>
      }
      <ul>
        {
          data.books.map(book => {
            return(
              <li key={book.id} className="post">
                <div>
                  <h1>{book.title}</h1>
                  <span>Author: <b>{book.author}</b></span>
                </div>
                <Button 
                  className="delete-button"
                  variant="danger"
                  onClick={() => handleDelete(book.id)}
                >
                  {
                    still_load ? 
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Loading...</span>
                    </>: "Delete"
                  }
                </Button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}