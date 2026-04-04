async function checkIn() {
    const input = document.getElementById("ticketCode");
    const button = document.getElementById("btn");
    const result = document.getElementById("result");

    const code = input.value.trim();

    if (!code) {
        result.innerText = "Vui lòng nhập mã vé!";
        result.className = "error";
        return;
    }

    if (localStorage.getItem(code)) {
        result.innerText = "⚠️ Mã vé này đã được check-in!";
        result.className = "error";
        return;
    }

    button.disabled = true;
    result.innerText = "⏳ Đang kiểm tra...";

    try {
        const res = await fetch("participants.json");
        const data = await res.json();

        const user = data.find(p => p.ticketCode === code);

        setTimeout(() => {
            if (user) {
                result.innerText = "✅ Xin chào " + user.name;
                result.className = "success";

              
                localStorage.setItem(code, true);

                input.disabled = true;
                button.innerText = "Đã Check-in";
            } else {
                result.innerText = "❌ Mã vé không hợp lệ!";
                result.className = "error";
                button.disabled = false;
            }
        }, 1000);

    } catch {
        result.innerText = "⚠️ Lỗi hệ thống!";
        result.className = "error";
        button.disabled = false;
    }
}
