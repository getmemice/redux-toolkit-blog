import PostUser from "./PostUser"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./reactionButtons"
import { Link } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"
import React from "react"

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostUser userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default PostExcerpt
