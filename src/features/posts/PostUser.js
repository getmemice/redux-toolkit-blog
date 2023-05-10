import React from "react"
import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"

const PostUser = ({ userId }) => {
  const users = useSelector(selectAllUsers)

  const userFound = users.find((user) => user.id === userId)
  return <span>by {userFound ? userFound.name : "Unknown author"}</span>
}

export default PostUser
