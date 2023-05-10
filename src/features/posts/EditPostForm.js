import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { selectAllUsers } from "../users/usersSlice"
import { deletePost, selectPostById, updatePost } from "./postSlice"

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [requestStatus, setRequestStatus] = useState("idle")

  const dispatch = useDispatch()

  if (!post) {
    return (
      <section>
        <h1>Post not found!</h1>
      </section>
    )
  }

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  // const onContentChanged = (e) => console.log(e.target.name)
  const onUserIdChanged = (e) => setUserId(Number(e.target.value))

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle"

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending")
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap()

        setTitle("")
        setContent("")
        setUserId("")
        navigate(`/post/${postId}`)
      } catch (err) {
        console.log("Failed to save the post", err)
      } finally {
        setRequestStatus("idle")
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending")
      dispatch(deletePost({ id: post.id })).unwrap()

      setTitle("")
      setContent("")
      setUserId("")
      navigate("/")
    } catch (err) {
      console.log("Failed to delete the post", err)
    } finally {
      setRequestStatus("idle")
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postUser">User:</label>
        <select
          name="postUser"
          defaultValue={userId}
          onChange={onUserIdChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        ></textarea>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
