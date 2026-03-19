function checkEmail() {
    const email = document.getElementById('emailInput').value;
    
    // 1. Regex kiểm tra đúng đuôi @gmail.com
    const gmailRegex = /^[A-zA-Z0-9](\.?[A-zA-Z0-9]){2,}@gmail\.com$/;

    if (gmailRegex.test(email)) {
        // Thông báo thành công
        Swal.fire({
            icon: 'success',
            title: 'Hợp lệ!',
            text: 'Hệ thống đang khởi tạo vé QR cho Gmail này.',
        });
    } else {
        // 2. Thông báo lỗi cụ thể bằng SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Lỗi định dạng!',
            text: 'Bạn phải sử dụng Gmail (ví dụ: abc@gmail.com) để nhận được vé.',
            confirmButtonText: 'Thử lại'
        });
    }
}