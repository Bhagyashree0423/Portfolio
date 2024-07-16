import mongoose from 'mongoose';
import Blog from './server/models/Blog.js';

// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb+srv://bhagyashreeghadi228:git%40babl1@contactform.9o86co7.mongodb.net/?retryWrites=true&w=majority&appName=contactform';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a new blog post
const newBlog = new Blog({
  title: 'Sample Blog Post 2',
  content: 'This is the content of the sample blog post2.',
  author: 'me',
  comments: [
    { text: 'First comment', author: 'Commenter 1' },
    { text: 'Second comment', author: 'Commenter 2' }
  ]
});

// Save the blog post and log the result
newBlog.save()
  .then(blog => {
    console.log('Saved Blog:', blog);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error saving blog:', err);
    mongoose.connection.close();
  });

// Output
//   node testBlog.js
//   (node:11480) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
//   (Use `node --trace-warnings ...` to show where the warning was created)
//   (node:11480) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
//   MongoDB connected...
//   Saved Blog: {
//     title: 'Sample Blog Post',
//     content: 'This is the content of the sample blog post.',
//     author: 'Author Name',
//     comments: [
//       {
//         text: 'First comment',
//         author: 'Commenter 1',
//         _id: new ObjectId('6693660184ead12e82d70e02'),
//         date: 2024-07-14T05:45:37.346Z
//       },
//       {
//         text: 'Second comment',
//         author: 'Commenter 2',
//         _id: new ObjectId('6693660184ead12e82d70e03'),
//         date: 2024-07-14T05:45:37.351Z
//       }
//     ],
//     _id: new ObjectId('6693660184ead12e82d70e01'),
//     date: 2024-07-14T05:45:37.359Z,
//     __v: 0
//   }