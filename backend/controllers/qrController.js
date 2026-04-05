const { createQR } = require('../services/qrService');
const { generateUniqueCode } = require('../utils/generateCode');

exports.generateQR = async (req, res) => {
    const { email, eventId } = req.body;

    if (!email || !eventId) {
        return res.status(400).json({
            message: "Thiếu email hoặc eventId"
        });
    }

    try {
        const code = generateUniqueCode(email, eventId);
        const qr = await createQR(code);

        res.json({
            message: "Tạo QR thành công",
            code,
            qr
        });

    } catch (err) {
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};
