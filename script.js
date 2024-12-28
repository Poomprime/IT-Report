document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var now = new Date();
    var dateTime = now.toISOString().slice(0, 16);

    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;
    var details = document.getElementById("details").value;

    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: dateTime,
        details: details
    };

    fetch('YOUR_WEB_APP_URL', { // แทนที่ด้วย Web App URL ของคุณ
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result); // ตรวจสอบ Response
        if (result.status === "success") {
            // ... โค้ดแสดงผลสำเร็จ ...
        } else {
            alert("Error submitting report: " + (result.message || "Unknown error"));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});
// ... โค้ดส่วนอื่น ...
