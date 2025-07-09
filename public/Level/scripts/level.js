function extractRmData(exercise, rm, zoom) {
    for (let i = 0; i < exerciseStats.length; i++) {
        if (exerciseStats[i].exercise === exercise) {
            const years = exerciseStats[i].years;

            for (let y = 0; y < years.length; y++) {
                const year = years[y];
                if (zoom === "year") {
                    let maxRm = 0;

                    for (const month of year.months) {
                        for (const week of month.weeks) {
                            for (const day of week.days) {
                                for (const dp of day.datapoints) {
                                    if (dp[rm] > maxRm) maxRm = dp[rm];
                                }
                            }
                        }
                    }

                    labels.push(`${year.year}`);
                    data.push(maxRm);
                }

                if (zoom === "month") {
                    for (const month of year.months) {
                        let maxRm = 0;
                        for (const week of month.weeks) {
                            for (const day of week.days) {
                                for (const dp of day.datapoints) {
                                    if (dp[rm] > maxRm) maxRm = dp[rm];
                                }
                            }
                        }

                        labels.push(`${year.year}-${month.month}`);
                        data.push(maxRm);
                    }
                }

                if (zoom === "week") {
                    for (const month of year.months) {
                        for (const week of month.weeks) {
                            let maxRm = 0;
                            for (const day of week.days) {
                                for (const dp of day.datapoints) {
                                    if (dp[rm] > maxRm) maxRm = dp[rm];
                                }
                            }

                            labels.push(`${year.year}-${month.month}-W${week.week}`);
                            data.push(maxRm);
                        }
                    }
                }

                if (zoom === "day") {
                    for (const month of year.months) {
                        for (const week of month.weeks) {
                            for (const day of week.days) {
                                let maxRm = 0;
                                for (const dp of day.datapoints) {
                                    if (dp[rm] > maxRm) maxRm = dp[rm];
                                }

                                labels.push(`${year.year}-${month.month}-D${day.day}`);
                                data.push(maxRm);
                            }
                        }
                    }
                }
            }
        }
    }

    return { labels, data };
}

// Beispielnutzung:
var exercise = localStorage.getItem("levelExercise") ?? "lol";
var rm = localStorage.getItem("levelRM") ?? "1RM";
var zoom = localStorage.getItem("levelZoom") ?? "week";
var labels = [];
var data = [];

console.log(exerciseStats);

function getData() {
    fetch('/getStats')
        .then(response => response.json())
        .then(data => {





            
            console.log(data);
            exerciseStats = data;
            loadExercises();
            extractRmData(exercise, rm, zoom);
        })
        .catch(error => console.error("Fehler:", error));
}
getData();



function loadExercises() {
    for (let i = 0; i < exerciseStats.length; i++) {
        document.getElementById("execiseInput").innerHTML += `
            <option value="${exerciseStats[i].exercise}">${exerciseStats[i].exercise}</option>
        `;
    }
    document.getElementById("execiseInput").value = localStorage.getItem("levelExercise");
    document.getElementById("zoomInput").value = localStorage.getItem("levelZoom") ?? "week";
    document.getElementById("rmInput").value = localStorage.getItem("levelRM") ?? "1RM";
}

function changeExercise(e) {
    exercise = e;
    localStorage.setItem("levelExercise", e);
    labels = [];
    data = [];
    extractRmData(exercise, rm, zoom);
    loadChart();
}

function changeZoom(e) {
    zoom = e;
    localStorage.setItem("levelZoom", e);
    labels = [];
    data = [];
    extractRmData(exercise, rm, zoom);
    loadChart();
}

function changeRM(e) {
    rm = e;
    localStorage.setItem("levelRM", e);
    labels = [];
    data = [];
    extractRmData(exercise, rm, zoom);
    loadChart();
}


async function postData() {
    await fetch('/addStats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exerciseStats)
    });
}




var myChartInstance = null;

function loadChart() {
    if (myChartInstance !== null) {
        myChartInstance.destroy();
    }

    //Chart Erstellung---------------------------------------------------------
    var canvas = document.getElementById('myChart');
    canvas.width = data.length * 140; //Damit nicht alles zusammenklebt ist die Chart pro Datensatz um 140px länger (Scroll Funktion)

    // Ab hier ist alles Chartjs
    var ctx = document.getElementById('myChart').getContext('2d');
    myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, //Labels werden weitergegeben
            datasets: [{
                label: "Gewicht", //Was überhaupt angezeigt wird (steht da beim hovern)
                data: data, //Daten werden weitergegeben
                pointRadius: 20,

                borderColor: '#FF8A65', //Farbe der Wertelinie
                borderWidth: 3, //Bordergröße der Punkte
                borderDash: [6, 4],        // gestrichelt; weglassen, falls durchgezogen gewünscht
            }]
        },
        options: {
            responsive: false,

            scales: {
                x: {
                    grid: { display: false }, // Vertikale Striche werden nicht angezeigt
                    ticks: {
                        color: '#FF8A65', //Schriftfarbe
                    },
                    offset: true //Ein bischen Abstand zum Rand
                },
                y: {
                    ticks: {
                        stepSize: 1, //Alle ... Werte kommte eine Linie
                        color: '#FF8A65', //Schriftfarbe
                    },
                    grace: '50%', // % der Werte sollen oben und unten noch dran gehängt werden
                    grid: {
                        color: '#4C4C4C', //Farbe der horizontalen linien
                        lineWidth: 2, //Dicke der horizontalen linien
                        borderDash: [6, 4],     // Das funktioniert nicht, es ist nicht gestrichelt
                    },
                },

            },
            plugins: {
                legend: { display: false } //Legende wird nicht angezeigt
            }
        }
    });
    //-----------------------------------------------------------------------
}

loadChart();

myChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: "Gewicht",
            data: data,
            pointRadius: 20,
            borderColor: '#FF8A65',
            borderWidth: 3,
            borderDash: [6, 4]
        }]
    },
    options: {
        responsive: false,
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#FF8A65'
                },
                offset: true
            },
            y: {
                ticks: {
                    stepSize: 1,
                    color: '#FF8A65'
                },
                grace: '50%',
                grid: {
                    color: '#4C4C4C',
                    lineWidth: 2,
                    borderDash: [6, 4]
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});


