let currentMonth;
let currentDay;

let months = [];
let i;


function nextMonth(){
    console.log("nextMonth called");
    if (i == (months.length - 1)){
        i = 0;
        loadMonth();
        return;
    }
    i++;
    loadMonth();
}

function lastMonth(){
    console.log("lastMonth called");
    if (i == 0){
        i = (months.length - 1);
        loadMonth();
        return;
    }
    i--;
    loadMonth();
}

function loadMonth() {
    console.log(months.length - 1);
    console.log("i in loadMonth: " + i);
    console.log(months[0].month);
    
    document.getElementById('contentBox').innerHTML = null;
    document.getElementById('contentBox').innerHTML += `<div class="month"><img src="Entry/img/arrow.png" id="prevArr" onclick="lastMonth()"><p class="monthName">${months[i].month}</p><img src="Entry/img/arrow.png" id="nextArr" onclick="nextMonth()"></div>`;
    currentMonth = document.querySelectorAll('.month');
    currentMonth = currentMonth[currentMonth.length - 1];
    for (let h = 0; h < months[i].days.length; h++) {
        currentMonth.innerHTML += `<div class="day"><p class="dayName">${months[i].days[h].monthDay} ${months[i].days[h].weekDay}</p></div>`;
        currentDay = document.querySelectorAll('.day');
        currentDay = currentDay[currentDay.length - 1];

        for (let r = 0; r < months[i].days[h].sessions.length; r++) {

            currentDay.innerHTML += `<div class="session">
                <img src="Entry/img/${months[i].days[h].sessions[r].sport}.png" class="sportIcon">
                <p class="sessionName">${months[i].days[h].sessions[r].dataPoints[0].value} ${months[i].days[h].sessions[r].sport}</p>
                <div class="sessionData">
                    <p class="sessionInfo2">${months[i].days[h].sessions[r].dataPoints[1].img}  ${months[i].days[h].sessions[r].dataPoints[1].value}${months[i].days[h].sessions[r].dataPoints[1].name}</p>
                    <p class="sessionInfo3">${months[i].days[h].sessions[r].dataPoints[2].img}  ${months[i].days[h].sessions[r].dataPoints[2].value}${months[i].days[h].sessions[r].dataPoints[2].name}</p>
                    <p class="sessionInfo4">${months[i].days[h].sessions[r].dataPoints[3].img}  ${months[i].days[h].sessions[r].dataPoints[3].value}${months[i].days[h].sessions[r].dataPoints[3].name}</p>
                </div>
            </div>`;
        }
    }
}

function getEntrys() {
    fetch('/getEntrys')
        .then(response => response.json())
        .then(data => {
            months = data;
            console.log(months);
            i = (months.length - 1);
            loadMonth();
        })
        .catch(error => console.error("Fehler:", error));
}

getEntrys();