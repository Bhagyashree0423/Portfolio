import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '../Blog/BlogForm';

const AdminDashboard = ({ token }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/user/me', {
          headers: { 'x-auth-token': token }
        });
        setIsAdmin(res.data.role === 'admin');
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };

    if (token) {
      checkAdminStatus();
    }
  }, [token]);

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <BlogForm token={token} />
    </div>
  );
};

export default AdminDashboard;
