const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors());
dotenv.config();


require('./database/conn');
const User = require('./models/userSchema');

app.use(express.json());
app.use(cookieParser());

app.use(require('./router/auth'));
app.use("/uploads", express.static('uploads'));

const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send(`Home`);
});

app.get('/about', (req, res) => {
    res.send(`About page`);
});

app.get('/contact', (req, res) => {
    res.send(`Contact page`);
});

app.get('/signin', (req, res) => {
    res.send(`Signin page`);
});

app.get('/signup', (req, res) => {
    res.send(`Signup Page`);
});

app.get('/signout', (req, res) => {
    res.send(`Signout Page`);
});

app.get('/dashboard', (req, res) => {
    res.send(`Dashboard Page`);
});

app.get('/buycar', (req, res) => {
    res.send(`Buycar page`);
});

app.get('/mycart', (req, res) => {
    res.send(`Mycart page`);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Compare hashed passwords using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Login successful (generate token or handle session, etc.)
        const token = await user.generateAuthToken(); // Assuming generateAuthToken is defined in userSchema.js

        res.send({ message: 'Login successful!', token });
    } catch (err) {
        console.error(`Error during login: ${err}`);
        res.status(500).send({ message: 'Error: Login failed.' });
    }
});


app.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check for existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        // Create a new user with the provided data
        const user = new User({ name, email, phone, password });

        // Hash the password before saving
        user.password = await bcrypt.hash(password, 12);

        await user.save(); // Save the user document to MongoDB

        // Generate token (optional)

        res.status(201).send({ message: 'User created successfully!' });
    } catch (err) {
        console.error(`Error creating user: ${err}`);
        res.status(500).send({ message: 'Error: User creation failed.' });
    }
});


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})