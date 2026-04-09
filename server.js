const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(__dirname));

// API GET: [SCRUM-21] Lấy danh sách sự kiện cho giao diện sinh viên
app.get('/api/events', (req, res) => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        res.json(JSON.parse(data || '[]'));
    } catch (err) { res.json([]); }
});

// API POST (Tạo mới)
app.post('/api/events', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const newEvent = { id: Date.now().toString(), ...req.body };
    events.push(newEvent);
    fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2));
    res.status(201).json({ success: true });
});

// API PUT (Cập nhật)
app.put('/api/events/:id', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const index = events.findIndex(e => e.id === req.params.id);
    if (index !== -1) {
        events[index] = { ...events[index], ...req.body };
        fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2));
        res.json({ success: true });
    } else {
        res.status(404).json({ message: 'Không tìm thấy' });
    }
});

app.listen(PORT, () => console.log(`Server chạy tại: http://localhost:${PORT}`));
