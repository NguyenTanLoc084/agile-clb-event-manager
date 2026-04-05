const QRCode = require('qrcode');

exports.createQR = async (data) => {
    return await QRCode.toDataURL(data);
};
