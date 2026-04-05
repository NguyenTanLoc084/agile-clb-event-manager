let participants = [];
let checkedInList = JSON.parse(localStorage.getItem('checkedIn')) || {};

// Load dữ liệu
fetch('participants.json')
    .then(res => res.json())
    .then(data => participants = data);

// Enter để submit
document.getElementById('ticketInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkIn();
});

function checkIn() {
    const input = document.getElementById('ticketInput');
    const code = input.value.trim().toUpperCase();
    const message = document.getElementById('message');

    message.className = "";

    if (!code) {
        message.innerText = "❌ Vui lòng nhập mã vé!";
        message.classList.add("error");
        return;
    }

    const user = participants.find(p => p.ticketCode === code);

    if (!user) {
        message.innerText = "❌ Mã vé không tồn tại!";
        message.classList.add("error");
        return;
    }

    if (checkedInList[code]) {
        message.innerHTML = `
            ⚠️ ${user.name} đã check-in<br>
            🕒 Lúc: ${checkedInList[code]}
        `;
        message.classList.add("warning");
        return;
    }

    const time = new Date().toLocaleString();

    checkedInList[code] = time;
    localStorage.setItem('checkedIn', JSON.stringify(checkedInList));

    message.innerHTML = `
        ✅ Check-in thành công!<br>
        👤 Tên: ${user.name}<br>
        📧 Email: ${user.email}<br>
        📱 SĐT: ${user.phone}<br>
        🎟 Vé: ${user.ticketCode}<br>
        📍 Sự kiện: ${user.event}<br>
        💺 Ghế: ${user.seat}<br>
        🕒 Thời gian: ${time}
    `;
    message.classList.add("success");

    input.value = "";
}
