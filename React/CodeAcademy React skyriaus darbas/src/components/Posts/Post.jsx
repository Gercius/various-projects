import "./Post.css"


const Post = ({ post }) => {
  return (
    <li className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </li>
  )
}

export default Post;