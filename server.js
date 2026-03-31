const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(__dirname));

// [SCRUM-34] API GET: Trả về danh sách sự kiện mới nhất
app.get('/api/events', (req, res) => {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// Các API phụ trợ để giữ UI không bị lỗi (Kế thừa từ SCRUM-17)
app.delete('/api/events/:id', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const newEvents = events.filter(e => e.id !== req.params.id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(newEvents, null, 2));
    res.json({ success: true });
});

app.put('/api/events/:id/toggle-hide', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const index = events.findIndex(e => e.id === req.params.id);
    if (index !== -1) {
        events[index].isHidden = !events[index].isHidden; 
        fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2));
        res.json({ success: true });
    }
});

app.listen(PORT, () => console.log(`Server chạy tại: http://localhost:${PORT}`));
