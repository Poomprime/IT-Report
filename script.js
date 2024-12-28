document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // ดึงวันที่และเวลาปัจจุบันในรูปแบบที่ต้องการ
    var now = new Date();
    var dateTime = now.toISOString().slice(0, 16);  // จัดรูปแบบเป็น 'YYYY-MM-DDTHH:mm'

    // รับข้อมูลจากฟอร์ม
    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;  // เปลี่ยนจาก "issue" เป็น "topic"
    var details = document.getElementById("details").value;

    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: dateTime,  // วันที่และเวลาปัจจุบัน
        details: details
    };

    // ส่งข้อมูลไปยัง Google Apps Script
    fetch('https://script.google.com/a/macros/homa.co/s/AKfycbyGkCDCRiXRrVAJ4B38e9-wuX2Vc6MEmRt3EqRc0QJFx1gggOZgqueYD7fOTeKwZaID/exec', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode:'cors'
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert("Report submitted successfully!");

            // แสดงวันที่และเวลาที่บันทึก
            var formattedDateTime = now.toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            // แสดงวันที่และเวลาที่บันทึก
            document.getElementById("displayDateTime").textContent = "Reported on: " + formattedDateTime;

            // ล้างข้อมูลในฟอร์ม
            document.getElementById("reportForm").reset();
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// ฟังก์ชันการทำงานของปุ่ม Clear (ไม่จำเป็นหากใช้ type="reset" สำหรับปุ่ม Clear)
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("reportForm").reset(); // รีเซ็ตฟอร์ม
    document.getElementById("displayDateTime").textContent = ""; // ลบข้อความวันที่และเวลา
});
