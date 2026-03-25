const participants = [
    { name: "Nguyễn Văn An", email: "an@gmail.com" },
    { name: "Lê Thị Bình", email: "binh@yahoo.com" },
    { name: "Trần Hữu Cảnh", email: "canh@outlook.com" },
    { name: "Phạm Minh Đức", email: "ducpm@fpt.com" }
];

const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
const notFound = document.getElementById('notFound');

// Hàm hiển thị: Sử dụng .map().join() để tối ưu tốc độ render (AC5)
function displayData(data) {
    if (data.length === 0) {
        tableBody.innerHTML = "";
        notFound.style.display = "block";
        return;
    }

    notFound.style.display = "none";
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
        </tr>
    `).join('');
}

// Hàm lọc dùng chung (Dùng cho cả input và button - AC2)
function performSearch() {
    const query = searchInput.value.toLowerCase().trim(); // .trim() để loại bỏ khoảng trắng dư thừa

    const filtered = participants.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.email.toLowerCase().includes(query)
    );

    displayData(filtered);
}

// Lắng nghe sự kiện gõ phím (Search-as-you-type)
searchInput.addEventListener('input', performSearch);

// Hàm cho nút bấm (Gán trực tiếp vào onclick của HTML)
function handleSearch() {
    performSearch();
}

// Khởi tạo dữ liệu ban đầu
displayData(participants);