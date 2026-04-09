const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'events.json');

app.use(express.json());
app.use(express.static(__dirname));

// API GET: Lấy danh sách sự kiện
app.get('/api/events', (req, res) => {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// API PUT: [SCRUM-16] Cập nhật sự kiện theo ID (Đáp ứng AC 2)
app.put('/api/events/:id', (req, res) => {
    let events = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const index = events.findIndex(e => e.id === req.params.id);

    if (index !== -1) {
        // Cập nhật dữ liệu mới đè lên dữ liệu cũ
        events[index] = { ...events[index], ...req.body };
        fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2), 'utf8');
        res.json({ success: true, message: 'Cập nhật thành công!' });
    } else {
        res.status(404).json({ success: false, message: 'Không tìm thấy ID' });
    }
});

app.listen(PORT, () => console.log(`Server chạy tại: http://localhost:${PORT}`));
