import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostProvider } from './contexts/PostContext';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>  
  </React.StrictMode>
);
