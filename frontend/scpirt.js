document.getElementById('qrForm').addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const eventId = document.getElementById('eventId').value;

    const res = await fetch('http://localhost:3000/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, eventId })
    });
    const data = await res.json();

    if (data.qrImage) {
        document.getElementById('qrContainer').innerHTML = `<img src="${data.qrImage}" alt="QR Code">`;
    } else {
        document.getElementById('qrContainer').innerText = data.error;
    }
});
