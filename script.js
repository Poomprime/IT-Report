document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // ดึงวันที่และเวลาปัจจุบันในรูปแบบที่ต้องการ
    var now = new Date();
    var dateTime = now.toISOString().slice(0, 16);  // 'YYYY-MM-DDTHH:mm'

    // รับข้อมูลจากฟอร์ม
    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;
    var details = document.getElementById("details").value;

    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: dateTime,
        details: details
    };

    // ส่งข้อมูลไปยัง Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwGkCDCRiXRrVAJ4B38e9-wuX2Vc6MEmRt3EqRc0QJFx1gggOZgqueYD7fOTeKwZaID/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // อ่าน response เป็น JSON
    })
    .then(result => {
        if (result.status === "success") {
            alert("Report submitted successfully!");

            var formattedDateTime = now.toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            document.getElementById("displayDateTime").textContent = "Reported on: " + formattedDateTime;
            document.getElementById("reportForm").reset();
        } else {
            alert("Failed to submit report. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please check the console for details.");
    });
});

// ฟังก์ชันการทำงานของปุ่ม Clear
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("reportForm").reset();
    document.getElementById("displayDateTime").textContent = "";
});
