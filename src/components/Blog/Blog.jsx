import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Blog.module.css';

// export const Blog = ({isAdmin, token}) => {
  export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/blog');
        // const res = await axios.get('${API_URL}/blog');
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setError('Unexpected response format');
          console.error('Unexpected response format:', res.data);
        }
      } catch (err) {
        setError('Error fetching blog posts');
        console.error('Error fetching blog posts:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.container} id="blog">
      <h2 className={styles.title}>Blog</h2>
      <div className={styles.content}>
        {error && <div>Error: {error}</div>}
        {/* {isAdmin && <BlogForm token={token} />} */}
        {posts.map(blog => (
          <div key={blog._id} className={styles.post}>
            <h3 className={styles.subtitle}>{blog.title}</h3>
            <p className={styles.bloginfo}>{blog.content}</p>
            <p className={styles.blogdetails}>By: {blog.author}</p>
            <p className={styles.blogdetails}>On: {new Date(blog.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
