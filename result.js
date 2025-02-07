document.addEventListener("DOMContentLoaded", function() {
    const studentData = {
        "217023026026": { name: "ABHINAV CHARY", dob: "04/10/2004", marks: { Maths: 'A', DC: 'O', POM: 'B' }, status: "Pass", Sem: "1st", hallTicket: "217023026026", fathername: "I.Ravinder chary", photo: "photo1.jpeg"},
        "217023026115": { name: "SAKETH", dob: "08/03/2004", marks: { Maths: 'O', DC: 'A', POM: 'B' }, status: "Pass", Sem: "1st", hallTicket: "2170230260115", fathername: "k.vijay goud", photo: "photo2.jpeg"},
        "217023026033": { name: "SAIRAJ GOUD", dob: "21/07/2005", marks: { Maths: 'O', DC: 'O', POM: 'O' }, status: "Pass", Sem: "1st", hallTicket: "217023026033", fathername: "K.Vijay " , photo: "photo3.jpeg"},
    };

    const hallTicketInput = document.getElementById("hallTicket");
    const dobInput = document.getElementById("dob");
    const submitButton = document.querySelector(".submit-btn");

    hallTicketInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            submitButton.click();
        }
    });

    dobInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            submitButton.click();
        }
    });

    submitButton.addEventListener("click", function() {
        const hallTicket = hallTicketInput.value;
        const dob = dobInput.value;

        console.log(`Hall Ticket: ${hallTicket}, DOB: ${dob}`);  // Logging inputs for debugging

        clearPreviousResults();

        if (studentData[hallTicket] && studentData[hallTicket].dob === dob) {
            displayResult(studentData[hallTicket]);
        } else {
            alert("Invalid Hall Ticket Number or Date of Birth");
        }
    });

    function clearPreviousResults() {
        const existingResultContainer = document.querySelector(".result-container");
        if (existingResultContainer) {
            existingResultContainer.remove();
        }
    }

    function displayResult(student) {
        const resultContainer = document.createElement("div");
        resultContainer.classList.add("result-container");
        resultContainer.innerHTML = `
            <h2>Student Result</h2>
            <div class="result-content">
                <table class="result-table">
                    <tr><th>Subject</th><th>Grade</th></tr>
                    <tr><td>Maths</td><td>${student.marks.Maths}</td></tr>
                    <tr><td>DC</td><td>${student.marks.DC}</td></tr>
                    <tr><td>POM</td><td>${student.marks.POM}</td></tr>
                </table>
                <img src="${student.photo}" alt="Student Photo" class="student-photo">
            </div>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Father Name:</strong> ${student.fathername}</p>
            <p><strong>Date of Birth:</strong> ${student.dob}</p>
            <p><strong>Hall Ticket Number:</strong> ${student.hallTicket}</p>
            <p><strong>Sem:</strong> ${student.Sem}</p>
            <p><strong>Status:</strong> ${student.status}</p>
            <button class="download-btn" onclick="downloadResults('${student.name}', '${student.dob}', '${student.fathername}', '${student.hallTicket}', '${student.Sem}', '${student.marks.Maths}', '${student.marks.DC}', '${student.marks.POM}', '${student.status}')">Download Result</button>
        `;
        document.body.appendChild(resultContainer);
    }
});

function downloadResults(name, dob, fathername, hallTicket, sem, maths, dc, pom, status, photo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Student Result`, 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Father Name: ${fathername}`, 20, 40);
    doc.text(`Date of Birth: ${dob}`, 20, 50);
    doc.text(`Hall Ticket Number: ${hallTicket}`, 20, 60);
    doc.text(`Sem: ${sem}`, 20, 70);

    const marks = [
        ["Maths", maths],
        ["DC", dc],
        ["POM", pom]
    ];

    doc.autoTable({
        head: [['Subject', 'Grade']],
        body: marks,
        startY: 80
    });

    doc.text(`Status: ${status}`, 20, doc.lastAutoTable.finalY + 10);

    // Add the photo to the PDF if available
    if (photo) {
        doc.addImage(photo.jpeg, 'JPEG', 150, 20, 50, 50); // Adjust position and size as needed
    }

    doc.save(`${name}_Result.pdf`);
}
