// Students ka data store karne ke liye array
let classList = [];

function addStudent() {
    // 1. HTML se inputs pakarna
    const nameInput = document.getElementById("studentName");
    const scoreInput = document.getElementById("studentScore");
    
    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value);

    // 2. Validation: Agar inputs khali hon
    if (name === "" || isNaN(score)) {
        alert("Meharbani karke sahi Naam aur Score likhein!");
        return;
    }

    // 3. Grade Logic (Wahi jo aapne C++ mein banayi thi)
    let letterGrade = "";
    if(score >= 90) letterGrade = 'A';
    else if(score >= 80) letterGrade = 'B';
    else if(score >= 70) letterGrade = 'C';
    else if(score >= 60) letterGrade = 'D';
    else letterGrade = 'F';

    // 4. Data ko Object mein save karna
    const student = {
        name: name,
        score: score,
        grade: letterGrade
    };

    // 5. List mein add karna
    classList.push(student);
    
    // 6. Table aur Average ko screen par update karna
    updateUI();

    // 7. Inputs ko khali karna agle student ke liye
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

function updateUI() {
    const tbody = document.querySelector("#studentTable tbody");
    const avgDisplay = document.getElementById("averageDisplay");
    
    // Purana table saaf karna
    tbody.innerHTML = "";
    let totalScore = 0;

    // Har student ke liye nai row banana
    classList.forEach(s => {
        const row = `<tr>
            <td>${s.name}</td>
            <td>${s.score}</td>
            <td>${s.grade}</td>
        </tr>`;
        tbody.innerHTML += row;
        totalScore += s.score;
    });

    // Average calculate karna
    const average = classList.length > 0 ? (totalScore / classList.length).toFixed(2) : 0;
    avgDisplay.innerText = "Class Average: " + average;
}

function exportToCSV() {
    if (classList.length === 0) {
        alert("Pehle kuch students add karein!");
        return;
    }

    let csv = "Student Name,Score,Letter Grade\n";
    classList.forEach(s => {
        csv += `${s.name},${s.score},${s.grade}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Student_Grades.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}