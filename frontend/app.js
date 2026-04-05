async function generateQR() {
    const email = document.getElementById("email").value;
    const eventId = document.getElementById("eventId").value;

    const res = await fetch("http://localhost:3000/api/generate-qr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, eventId })
    });

    const data = await res.json();

    document.getElementById("qrImage").src = data.qr;
}
