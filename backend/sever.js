const express = require('express');
const QRCode = require('qrcode');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function generateUniqueString(email, eventId) {
    const raw = `${email}:${eventId}:${Date.now()}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
}

app.post('/generate-qr', async (req, res) => {
    const { email, eventId } = req.body;

    if (!email || !eventId) {
        return res.status(400).json({ error: "Email và EventID bắt buộc" });
    }

    const qrData = generateUniqueString(email, eventId);

    try {
        const qrImage = await QRCode.toDataURL(qrData); // trả về Base64
        res.json({ qrImage, qrData });
    } catch (err) {
        res.status(500).json({ error: "Lỗi tạo QR code" });
    }
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
