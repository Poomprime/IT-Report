document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // ดึงวันที่และเวลาในรูปแบบ ISO string
    var now = new Date();
    var dateTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM

    // แสดงวันที่และเวลาในหน้า HTML
    document.getElementById("displayDateTime").textContent = "Reported on: " + now.toLocaleString();

    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;
    var details = document.getElementById("details").value;

    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: dateTime,
        details: details
    };

    // ส่งข้อมูลไปยัง Google Apps Script (ใช้ URL ของคุณ)
    fetch('https://script.google.com/a/macros/homa.co/s/AKfycbxlTsWuN-HxRS9Zgg7hliOAdljg0ndwrGxF6hCa09u03CAPe_AmFaYdamswqGZiWUht/exec', {  // ใช้ URL ของคุณที่นี่
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
            alert("Report submitted successfully!");
        } else {
            alert("Error submitting report: " + (result.message || "Unknown error"));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});
