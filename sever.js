const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Store messages (resets when server restarts)
let messages = [
    { id: 1, text: 'Hello, welcome to my site!', timestamp: new Date().toLocaleString() }
];

app.use(express.json());
app.use(express.static('public'));

// Get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Add new message
app.post('/api/messages', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }
    
    const newMessage = {
        id: messages.length + 1,
        text: text.trim(),
        timestamp: new Date().toLocaleString()
    };
    
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});