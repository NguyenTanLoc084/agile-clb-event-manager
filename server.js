const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(__dirname));

// API GET: Lấy danh sách
app.get('/api/events', (req, res) => {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// API DELETE: [SCRUM-17] Xóa sự kiện theo ID
app.delete('/api/events/:id', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    // Lọc bỏ sự kiện trùng ID
    const newEvents = events.filter(e => e.id !== req.params.id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(newEvents, null, 2), 'utf8');
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server chạy tại: http://localhost:${PORT}`));
