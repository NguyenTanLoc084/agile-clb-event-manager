const correctPassword = "Admin123";

function login() {
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    error.className = "";

    // ❌ Validate mật khẩu
    if (password.length < 6) {
        error.innerText = "❌ Mật khẩu phải ít nhất 6 ký tự";
        error.classList.add("error");
        return;
    }

    if (!/[A-Z]/.test(password)) {
        error.innerText = "❌ Phải có ít nhất 1 chữ hoa";
        error.classList.add("error");
        return;
    }

    if (!/[0-9]/.test(password)) {
        error.innerText = "❌ Phải có ít nhất 1 số";
        error.classList.add("error");
        return;
    }

    // ❌ Sai mật khẩu
    if (password !== correctPassword) {
        error.innerText = "❌ Sai mật khẩu!";
        error.classList.add("error");
        return;
    }

    // ✅ Thành công
    document.querySelector(".login-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    loadDashboard();
}

function loadDashboard() {
    fetch('events.json')
        .then(res => res.json())
        .then(data => {
            document.getElementById("totalEvents").innerText = data.length;
        });

    fetch('students.json')
        .then(res => res.json())
        .then(data => {
            document.getElementById("totalStudents").innerText = data.length;
        });
}
