const submitButton = document.querySelector("button[type='submit']");
const clearButton = document.getElementById("clearBtn");
const inputs = document.querySelectorAll("input, textarea");
const overlay = document.getElementById("overlay");
const form = document.getElementById("reportForm");

function checkInputs() {
    const isFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    submitButton.disabled = !isFilled;
}

inputs.forEach(input => {
    input.addEventListener("input", checkInputs);
});

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    var roomNumber = document.getElementById("roomNumber").value;
    var issue = document.getElementById("topic").value;
    var details = document.getElementById("description").value;

    // Check if all fields are filled
    if (!roomNumber || !issue || !details) {
        alert("Please fill in all fields");
        return;
    }

    // Validate room number: must contain A, B, or C and 3 digits
    const roomNumberRegex = /[ABC]/i; // Check for A, B, or C (case insensitive)
    const numberRegex = /\d{3}/; // Check for 3 digits

    if (!roomNumberRegex.test(roomNumber)) {
        alert("Please input A, B, or C Building in Room Number.");
        return;
    }
    
    if (!numberRegex.test(roomNumber)) {
        alert("Room number must contain 3 digits.");
        return;
    }

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

    document.getElementById("overlay").style.display = "flex"; // Show processing overlay

    var data = {
        roomNumber: roomNumber,
        issue: issue,
        dateTime: isoDateTime,
        details: details
    };

    // Send data using fetch to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxlTsWuN-HxRS9Zgg7hliOAdljg0ndwrGxF6hCa09u03CAPe_AmFaYdamswqGZiWUht/exec', {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()) // Receive the response from Google Apps Script
    .then(data => {
        alert("Report submitted successfully!");
        
        // Reset form and reload page to clear the form
        form.reset();
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to submit report.");
    });
});
