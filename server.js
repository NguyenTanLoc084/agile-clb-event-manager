const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const participantsFilePath = path.join(__dirname, 'public', 'participants.json');
// Khai báo thêm đường dẫn tới file dữ liệu sự kiện
const eventsFilePath = path.join(__dirname, 'public', 'events-data.json');

// ... (Giữ nguyên API /api/check-ticket của phần trước) ...

// --- API Endpoint cho Admin Dashboard ---
app.get('/api/dashboard-stats', (req, res) => {
    try {
        // 1. Đọc dữ liệu từ file events-data.json
        const rawData = fs.readFileSync(eventsFilePath, 'utf-8');
        const events = JSON.parse(rawData);

        // AC1: Hàm đếm tổng số sinh viên đăng ký (Thực hiện ngay trên Server)
        const totalStudents = events.reduce((sum, event) => sum + event.registeredStudents, 0);
        const totalEvents = events.length;

        // 2. Trả dữ liệu đã được tổng hợp về cho Frontend
        res.status(200).json({
            success: true,
            data: {
                summary: {
                    totalEvents: totalEvents,
                    totalStudents: totalStudents
                },
                eventsList: events // Trả kèm danh sách để hiển thị chi tiết
            }
        });

    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu Dashboard:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ.' });
    }
});

// Các route phục vụ file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Hệ thống Event Manager đang chạy tại http://localhost:${PORT}`);
    console.log(`- Check-in Mobile : http://localhost:${PORT}`);
    console.log(`- Admin Dashboard : http://localhost:${PORT}/admin`);
    console.log(`- API Check-in    : POST /api/check-ticket`);
    console.log(`- API Dashboard   : GET /api/dashboard-stats`);
});