function addProgression(name, reps, weight, bwE) {
    alert("Progression hinzugefügt");
    getData();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const pad = (n) => n.toString().padStart(2, '0');
    const time = `${pad(today.getHours())}:${pad(today.getMinutes())}`;
    const week = Math.min(4, Math.ceil(day / 7));

    for (let i = 0; i < exerciseStats.length; i++) {
        if (exerciseStats[i].exercise === name) {
            for (let k = 0; k < exerciseStats[i].years.length; k++) {
                if (exerciseStats[i].years[k].year === year) {
                    for (let h = 0; h < exerciseStats[i].years[k].months.length; h++) {
                        if (exerciseStats[i].years[k].months[h].month === month) {
                            for (let m = 0; m < exerciseStats[i].years[k].months[h].weeks.length; m++) {
                                if (exerciseStats[i].years[k].months[h].weeks[m].week === week) {
                                    for (let v = 0; v < exerciseStats[i].years[k].months[h].weeks[m].days.length; v++) {
                                        if (exerciseStats[i].years[k].months[h].weeks[m].days[v].day === day) {
                                            exerciseStats[i].years[k].months[h].weeks[m].days[v].datapoints.push({
                                                weight,
                                                reps,
                                                "1RM": calculate1RM(weight, reps, bwE),
                                                "3RM": calculate3RM(weight, reps, bwE),
                                                "6RM": calculate6RM(weight, reps, bwE),
                                                time
                                            });
                                            console.log(exerciseStats);
                                            postDataInAddProgression();
                                            return;
                                        }
                                    }
                                    exerciseStats[i].years[k].months[h].weeks[m].days.push({
                                        day,
                                        datapoints: [{
                                            weight,
                                            reps,
                                            "1RM": calculate1RM(weight, reps, bwE),
                                            "3RM": calculate3RM(weight, reps, bwE),
                                            "6RM": calculate6RM(weight, reps, bwE),
                                            time
                                        }]
                                    });
                                    console.log(exerciseStats);
                                    postDataInAddProgression();
                                    return;
                                }
                            }
                            // neue Woche
                            exerciseStats[i].years[k].months[h].weeks.push({
                                week,
                                days: [{
                                    day,
                                    datapoints: [{
                                        weight,
                                        reps,
                                        "1RM": calculate1RM(weight, reps, bwE),
                                        "3RM": calculate3RM(weight, reps, bwE),
                                        "6RM": calculate6RM(weight, reps, bwE),
                                        time
                                    }]
                                }]
                            });
                            console.log(exerciseStats);
                            postDataInAddProgression();
                            return;
                        }
                    }
                    // neuer Monat
                    exerciseStats[i].years[k].months.push({
                        month,
                        weeks: [{
                            week,
                            days: [{
                                day,
                                datapoints: [{
                                    weight,
                                    reps,
                                    "1RM": calculate1RM(weight, reps, bwE),
                                    "3RM": calculate3RM(weight, reps, bwE),
                                    "6RM": calculate6RM(weight, reps, bwE),
                                    time
                                }]
                            }]
                        }]
                    });
                    console.log(exerciseStats);
                    postDataInAddProgression();
                    return;
                }
            }
            // neues Jahr
            exerciseStats[i].years.push({
                year,
                months: [{
                    month,
                    weeks: [{
                        week,
                        days: [{
                            day,
                            datapoints: [{
                                weight,
                                reps,
                                "1RM": calculate1RM(weight, reps, bwE),
                                "3RM": calculate3RM(weight, reps, bwE),
                                "6RM": calculate6RM(weight, reps, bwE),
                                time
                            }]
                        }]
                    }]
                }]
            });
            console.log(exerciseStats);
            postDataInAddProgression();
            return;
        }
    }
    // neue Übung
    exerciseStats.push({
        exercise: name,
        years: [{
            year,
            months: [{
                month,
                weeks: [{
                    week,
                    days: [{
                        day,
                        datapoints: [{
                            weight,
                            reps,
                            "1RM": calculate1RM(weight, reps, bwE),
                            "3RM": calculate3RM(weight, reps, bwE),
                            "6RM": calculate6RM(weight, reps, bwE),
                            time
                        }]
                    }]
                }]
            }]
        }]
    });

    postDataInAddProgression();
}

async function postDataInAddProgression() {
    await fetch('/addStats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exerciseStats)
    });
    getData();
}

function getData() {
    fetch('/getStats')
        .then(response => response.json())
        .then(data => {
            exerciseStats = data;
        })
        .catch(error => console.error("Fehler:", error));
}
getData();