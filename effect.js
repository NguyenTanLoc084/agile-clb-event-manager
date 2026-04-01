document.getElementById('registerBtn').addEventListener('click', function() {
    const btn = this;
    btn.innerText = "Đang xử lý...";
    btn.disabled = true;

    // Giả lập nhận phản hồi đăng ký thành công từ Server sau 1 giây
    setTimeout(() => {
        const responseFromServer = { status: "success" };

        if (responseFromServer.status === "success") {
            // Hiện thông báo thành công
            Swal.fire({
                title: "Thành công!",
                text: "Bạn đã đăng ký thành công.",
                icon: "success",
                confirmButtonText: "Đóng"
            });

            // AC 2: Gọi hiệu ứng ngay khi nhận phản hồi thành công
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999 // Đảm bảo nổ trên cả lớp thông báo
            });

            // Reset nút về trạng thái ban đầu
            btn.innerText = "Đăng ký";
            btn.disabled = false;
        }
    }, 1000);
});document.getElementById('registerBtn').addEventListener('click', function() {
    const btn = this;
    btn.innerText = "Đang xử lý...";
    btn.disabled = true;

    // Giả lập nhận phản hồi đăng ký thành công từ Server sau 1 giây
    setTimeout(() => {
        const responseFromServer = { status: "success" };

        if (responseFromServer.status === "success") {
            // Hiện thông báo thành công
            Swal.fire({
                title: "Thành công!",
                text: "Bạn đã đăng ký thành công.",
                icon: "success",
                confirmButtonText: "Đóng"
            });

            // AC 2: Gọi hiệu ứng ngay khi nhận phản hồi thành công
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999 // Đảm bảo nổ trên cả lớp thông báo
            });

            // Reset nút về trạng thái ban đầu
            btn.innerText = "Đăng ký";
            btn.disabled = false;
        }
    }, 1000);
});