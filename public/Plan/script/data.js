var days = [
    {
        "name": "Example",
        "id": "Example1",
        "categorys": [
            {
                "name": "Example",
                "id": "Example1",
                "exercises": [
                    {
                        "name": "Example",
                        "id": "Example1",
                        "sets": 0,
                        "weight": 0,
                        "reps": 0,
                        "rangeLow": 0,
                        "rangeHigh": 0,
                        "bwE": false
                    }
                ]
            },
        ]
    }
]


//openDay-----------------------------------------------------------
function openDay(day){
    for (let i = 0; i < days.length; i++) {
        if (days[i].id == day.querySelector('p').getAttribute("id")){
            localStorage.setItem("dayNumber", i);
        }
    }
    window.location.href = "day.html";
}

localStorage.setItem("bw", "72");