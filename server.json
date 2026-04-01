const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware để server hiểu được dữ liệu JSON gửi lên từ Frontend
app.use(express.json());
// Middleware phân phát giao diện tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Đường dẫn tới database giả lập
const participantsFilePath = path.join(__dirname, 'public', 'participants.json');

// --- API Endpoint đáp ứng AC1: Logic so khớp mã vé ---
app.post('/api/check-ticket', (req, res) => {
    try {
        const { ticketCode } = req.body;

        if (!ticketCode) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã vé.' });
        }

        // 1. Đọc dữ liệu từ file participants.json
        const rawData = fs.readFileSync(participantsFilePath, 'utf-8');
        let participants = JSON.parse(rawData);

        // 2. Tìm kiếm sinh viên theo mã vé
        const studentIndex = participants.findIndex(p => p.ticketCode === ticketCode.toUpperCase());

        // 3. Xử lý logic và trả về kết quả
        if (studentIndex === -1) {
            return res.status(404).json({ success: false, message: 'Mã vé không tồn tại trong hệ thống.' });
        }

        const student = participants[studentIndex];

        if (student.status === 'checked-in') {
            return res.status(409).json({ 
                success: false, 
                message: `Vé của ${student.name} đã được sử dụng trước đó.`,
                data: student
            });
        }

        if (student.status === 'valid') {
            // Cập nhật trạng thái thành đã check-in
            participants[studentIndex].status = 'checked-in';
            
            // Ghi lại vào file JSON để lưu thay đổi
            fs.writeFileSync(participantsFilePath, JSON.stringify(participants, null, 4));

            return res.status(200).json({ 
                success: true, 
                message: `Hợp lệ! Chào mừng ${student.name}.`,
                data: participants[studentIndex]
            });
        }

    } catch (error) {
        console.error('Lỗi server:', error);
        res.status(500).json({ success: false, message: 'Lỗi hệ thống nội bộ.' });
    }
});

// Route phục vụ file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 API Server đang chạy tại http://localhost:${PORT}`);
    console.log(`- Endpoint kiểm tra vé: POST http://localhost:${PORT}/api/check-ticket`);
});