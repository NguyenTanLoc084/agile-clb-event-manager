const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dashboardData = {
    totalEvents: 25,
    totalStudents: 120
};


function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return "Mật khẩu phải có ít nhất 8 ký tự";
    if (!hasUpperCase) return "Mật khẩu phải có ít nhất 1 chữ hoa";
    if (!hasLowerCase) return "Mật khẩu phải có ít nhất 1 chữ thường";
    if (!hasNumber) return "Mật khẩu phải có ít nhất 1 số";
    if (!hasSpecialChar) return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
    return "ok";
}


app.post('/login', (req, res) => {
    const { password } = req.body;
    const validation = validatePassword(password);
    if (validation !== "ok") {
        return res.status(400).json({ error: validation });
    }
    
    res.json(dashboardData);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
