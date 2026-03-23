const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'agile_secret_key_super_safe'; // Khóa bí mật để mã hóa Token
const adminDB = { username: 'admin', password: 'password123' }; // Giả lập Database

// API 1: Xử lý đăng nhập (AC2)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminDB.username && password === adminDB.password) {
        // Tạo token có hạn 1 giờ
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ success: true, token: token });
    }
    
    return res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu!' });
});

// API 2: Kiểm tra Token (Giải quyết lỗi AC3 và AC4 - Có token nhưng không Verify)
app.get('/api/verify-token', (req, res) => {
    // Lấy token từ header "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ success: false, message: 'Không tìm thấy Token.' });

    // Verify token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' });
        res.status(200).json({ success: true, user: decoded });
    });
});

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});