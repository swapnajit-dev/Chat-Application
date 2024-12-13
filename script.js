// Import required modules
const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require("socket.io")

// Initialize the app
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server);

app.use(express.static("/public"))
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// Socket.IO
io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        // Broadcast the message and sender ID to all connected clients
        io.emit('chat', data);
        console.log('Message received:', data.msg);
    });
    console.log('User connected', socket.id);
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
