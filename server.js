const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(__dirname));

// API POST: Lưu sự kiện mới vào events.json
app.post('/api/events', (req, res) => {
    let events = [];
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        events = JSON.parse(data || '[]');
    } catch (err) {}

    const newEvent = {
        id: Date.now().toString(),
        ...req.body
    };

    events.push(newEvent);
    fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2), 'utf8');

    res.status(201).json({ success: true, message: 'Tạo thành công!' });
});

app.listen(PORT, () => {
    console.log(`Server chạy tại: http://localhost:${PORT}`);
});
