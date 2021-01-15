import React from "react";
import { useQuery, gql } from "@apollo/client"
import { Loading } from "../components/Spinner"

const GET_POST = gql`
  query getPosts{
    posts {
      id
      title
      body
    }
  }
`

export const Posts = () => {
  const { loading, error, data } = useQuery(GET_POST);
  if(loading) return <Loading />
  if(error) return <h2>Error occured while fetching posts</h2>

  return (
    <ul className="App">
      {
        data.posts.map(post => {
          return(
            <li key={post.id} className="post">
              <h1>{post.title}</h1>
              <span>{post.body}</span>
            </li>
          )
        })
      }
    </ul>
  );
}


