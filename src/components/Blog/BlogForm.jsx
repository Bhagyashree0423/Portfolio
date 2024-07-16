import React, { useState } from 'react';
import axios from 'axios';
// import {API_URL} from '../utils';
import styles from './BlogForm.module.css'; // Ensure you have a CSS module for styling

export const BlogForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
  });

  const [error, setError] = useState(null);

  const { title, content, author, date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/blog', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      // const res = await axios.post('${API_URL}', formData, {
      //   method : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-auth-token': token,
      //   },
      // });

      console.log('Blog created:', res.data);
      // Optionally reset the form
      setFormData({
        title: '',
        content: '',
        author: '',
        date: '',
      });
    } catch (err) {
      setError('Error creating blog post');
      console.error('Error creating blog post:', err);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
    <h2 className={styles.title}>Create New Blog</h2>
      <div>
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input type="text" name="title" value={title} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="content" className={styles.label}>Content:</label>
        <textarea name="content" value={content} onChange={onChange} required className={styles.data}/>
      </div>
      <div>
        <label htmlFor="author" className={styles.label}>Author:</label>
        <input type="text" name="author" value={author} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="date" className={styles.label}>Date:</label>
        <input type="date" name="date" value={date} onChange={onChange} required />
      </div>
      {error && <div>Error: {error}</div>}
      <button type="submit" className={styles.blogbutton}>Create</button>
    </form>
  );
};
