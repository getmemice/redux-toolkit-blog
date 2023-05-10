import { useSelector } from "react-redux"
import PostsExcerpt from "./PostsExcerpt"
import {
  getPostsError,
  getPostStatus,
  selectAllPosts,
  selectPostIds,
} from "./postSlice"

const PostList = () => {
  // const posts = useSelector(selectAllPosts)
  const orderedPosts = useSelector(selectPostIds)
  const postStatus = useSelector(getPostStatus)
  const error = useSelector(getPostsError)

  let content
  if (postStatus === "loading") {
    console.log("loading")
    content = <p>Loading...</p>
  } else if (postStatus === "succeeded") {
    console.log("succeeded")
    console.log("orderedPosts", orderedPosts)
    content = orderedPosts.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === "failed") {
    content = <p>{error}</p>
  }

  return <section>{content}</section>
}

export default PostList
