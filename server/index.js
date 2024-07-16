console.log('Server starting...');

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001;
// const host = '0.0.0.0';

console.log('Connecting to MongoDB...');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};
connectDB();

app.use(express.json());
// app.use(cors('https://my-portfolio-using-react-js.netlify.app'));
app.use(cors());

console.log('Setting up static files...');
app.use(express.static(path.join(__dirname, '../dist')));

const Contact = require('./models/Contact');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/contacts', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form submission:', { name, email, message });

    try {
        const newContact = new Contact({ name, email, message });
        const contact = await newContact.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Suggestion😁',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.json(contact);
    } catch (err) {
        console.error('Error saving contact to the database:', err.message);
        res.status(500).send('Server Error');
    }
});

console.log('Setting up API routes...');
app.use('/api/blog', require('./routes/api/blog'));
app.use('/api/user', require('./routes/api/user'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://${host}:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
