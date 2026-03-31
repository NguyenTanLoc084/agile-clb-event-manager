const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'students.json');

app.use(express.json());
app.use(express.static(__dirname));

// Lấy danh sách sinh viên
app.get('/api/students', (req, res) => {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    res.json(JSON.parse(data || '[]'));
});

// AC 2: API PUT để cập nhật trạng thái "Đã tham gia"
app.put('/api/students/:id/checkin', (req, res) => {
    let students = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8') || '[]');
    const index = students.findIndex(s => s.id === req.params.id);
    
    if (index !== -1) {
        // Đảo ngược trạng thái chưa tham gia <-> đã tham gia
        students[index].isAttended = !students[index].isAttended; 
        fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2));
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

app.listen(PORT, () => console.log(`Server chạy tại: http://localhost:${PORT}`));
