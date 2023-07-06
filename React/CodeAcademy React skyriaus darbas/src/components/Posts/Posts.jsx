import PostContext from "../../contexts/PostContext";
import { useContext } from "react";

import Post from "./Post";

import "./Posts.css"


const Posts = () => {

  const { posts } = useContext(PostContext);

  return (
    <div className="posts">
      <ul>
        {
          posts.map(post => 
            <Post 
              key={post.id}
              post={post}
            />  
          )
        }
      </ul>
    </div>
  )
}

export default Posts;