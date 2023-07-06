import { createContext, useEffect, useState } from "react";


const PostContext = createContext();

const PostProvider = ({ children }) => {
  
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const fetchedPosts = await fetch('http://localhost:4000/posts')
      .then(res => res.json());

    setPosts(fetchedPosts);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const addNewPost = async (newPost) => {
    await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json());
      
    setPosts([...posts, newPost]);
  }


  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addNewPost
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostProvider };
export default PostContext;