import React from "react"
import { useQuery, gql, useLazyQuery } from "@apollo/client"
import { Loading } from "../components/Spinner"
import { Button } from "react-bootstrap"

const GET_USERS = gql`
  query getUsers{
    users{
      name{
        title
        first
        last
      }
      gender
      email
      phone
      picture{
        large
      }
    }
  }
`
export const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [getUser, { loading: load, error: err, data: userData }] = useLazyQuery(GET_USERS, {
    fetchPolicy: "network-only"
  });
  if(loading | load) return <Loading />
  if(error | err) return <h2>Error occured while fetching posts</h2>

  const user = data.users[0]
  console.log(userData)
  return(
    <div className="user">
      <div className="img">
        <img src={user.picture.large} alt="user"/>
      </div>
      <h2>{user.name.title}. {user.name.first} {user.name.last}</h2>
      <p>{user.gender}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <Button 
        onClick={getUser}
      >Get Another User</Button>
    </div>
  )
}