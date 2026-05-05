let myPieChart;
let classList = [];

window.onload = function() {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['A+', 'B', 'C', 'D', 'E', 'F'],
            datasets: [{
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e67e22', '#9b59b6', '#e74c3c']
            }]
        }
    });
};

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const nameBox = document.getElementById("studentName");
        const scoreBox = document.getElementById("studentScore");

        if (document.activeElement === nameBox) {
            if (nameBox.value.trim() !== "") scoreBox.focus();
        } else if (document.activeElement === scoreBox) {
            addStudent();
        }
    }
});

function addStudent() {
    const nameInput = document.getElementById("studentName");
    const scoreInput = document.getElementById("studentScore");
    
    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value);

    // Name Validation: Only alphabets and spaces
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Invalid Name! Please use alphabets only.");
        nameInput.focus();
        return;
    }

    // Score Validation: Between 0 and 100
    if (isNaN(score) || score < 0 || score > 100) {
        alert("Invalid Score! Please enter a number between 0 and 100.");
        scoreInput.focus();
        return;
    }

    let grade = "";
    if (score >= 90) grade = 'A+';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else if (score >= 50) grade = 'E';
    else grade = 'F';

    classList.push({ name, score, grade });

    updateDisplay();
    
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

function updateDisplay() {
    const tbody = document.querySelector("#studentTable tbody");
    const avgDiv = document.getElementById("averageDisplay");
    
    tbody.innerHTML = "";
    let total = 0;
    let counts = { "A+": 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

    classList.forEach(s => {
        tbody.innerHTML += `<tr><td>${s.name}</td><td>${s.score}</td><td>${s.grade}</td></tr>`;
        total += s.score;
        counts[s.grade]++;
    });

    let avg = classList.length > 0 ? (total / classList.length).toFixed(2) : 0;
    avgDiv.innerText = "Class Average: " + avg;

    myPieChart.data.datasets[0].data = [counts["A+"], counts.B, counts.C, counts.D, counts.E, counts.F];
    myPieChart.update();
}

function exportToCSV() {
    if (classList.length === 0) return alert("No data to export!");
    let csv = "Name,Score,Grade\n";
    classList.forEach(s => csv += `${s.name},${s.score},${s.grade}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Grade_Report.csv';
    a.click();
}