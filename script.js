document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var now = new Date();
    var localDateTime = now.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
    var isoDateTime = now.toLocaleString('th-TH', { 
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    document.getElementById("displayDateTime").textContent = "Reported on: " + localDateTime;
    
    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;
    var details = document.getElementById("details").value;
    
    if (!roomNumber || !issue || !details) {
        alert("Please fill in all fields");
        return;
    }

    document.getElementById("loadingStatus").style.display = "block";
    
    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: isoDateTime,
        details: details
    };
    
    fetch('https://script.google.com/macros/s/AKfycbxlTsWuN-HxRS9Zgg7hliOAdljg0ndwrGxF6hCa09u03CAPe_AmFaYdamswqGZiWUht/exec', {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        headers: {
           'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        document.getElementById("loadingStatus").style.display = "none";
        alert("Report submitted successfully!");
        document.getElementById("reportForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("loadingStatus").style.display = "none";
        alert("An error occurred. Please try again later.");
    });
});
