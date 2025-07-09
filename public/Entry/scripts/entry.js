months = [];

function addSession(e) {
    getEntrys();
    const now = new Date();
    const currentMonth = `${now.toLocaleString('en-US', { month: 'short' })}${now.getFullYear()}`;
    const currentWeekDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentMonthDay = String(now.getDate()).padStart(2);

    let data1Name;
    let data1Value;
    let data2Name;
    let data2Value;
    let data2Img;
    let data3Name;
    let data3Value;
    let data3Img;
    let data4Name;
    let data4Value;
    let data4Img;

    if (!e.querySelector("#dataInputField1") || e.querySelector("#dataInputField1").value == "") {
        data1Name = "";
        data1Value = "";
    } else {
        data1Name = e.querySelector("#dataInputField1").getAttribute("unit");
        data1Value = e.querySelector("#dataInputField1").value;
    }

    if (!e.querySelector("#dataInputField2") || e.querySelector("#dataInputField2").value == "") {
        data2Name = "";
        data2Value = "";
        data2Img = "";
    } else {
        data2Name = e.querySelector("#dataInputField2").getAttribute("unit");
        data2Value = e.querySelector("#dataInputField2").value;
        data2Img = e.querySelector("#dataInputField2").getAttribute("unitImg");
    }

    if (!e.querySelector("#dataInputField3") || e.querySelector("#dataInputField3").value == "") {
        data3Name = "";
        data3Value = "";
        data3Img = "";
    } else {
        data3Name = e.querySelector("#dataInputField3").getAttribute("unit");
        data3Value = e.querySelector("#dataInputField3").value;
        data3Img = e.querySelector("#dataInputField3").getAttribute("unitImg");
    }
    if (!e.querySelector("#dataInputField4") || e.querySelector("#dataInputField4").value == "") {
        data4Name = "";
        data4Value = "";
        data4Img = "";
    } else {
        data4Name = e.querySelector("#dataInputField4").getAttribute("unit");
        data4Value = e.querySelector("#dataInputField4").value;
        data4Img = e.querySelector("#dataInputField4").getAttribute("unitImg");
    }

    for (let i = 0; i < months.length; i++) {
        if (currentMonth == months[i].month) {
            for (let h = 0; h < months[i].days.length; h++) {
                if (currentWeekDay == months[i].days[h].weekDay && currentMonthDay == months[i].days[h].monthDay) {
                    months[i].days[h].sessions.push(
                        {
                            "sport": e.querySelector('#nameBox').getAttribute("name"),
                            "dataPoints": [
                                {
                                    "name": data1Name,
                                    "value": data1Value
                                },
                                {
                                    "name": data2Name,
                                    "value": data2Value,
                                    "img": data2Img
                                },
                                {
                                    "name": data3Name,
                                    "value": data3Value,
                                    "img": data3Img
                                },
                                {
                                    "name": data4Name,
                                    "value": data4Value,
                                    "img": data4Img
                                },
                            ]

                        }
                    );
                    postEntrys();
                    console.log(localStorage.getItem("months"));
                    loadSport();
                    return;
                }
            }

            months[i].days.push(
                {
                    "monthDay": currentMonthDay,
                    "weekDay": currentWeekDay,
                    "sessions": [
                        {
                            "sport": e.querySelector('#nameBox').getAttribute("name"),
                            "dataPoints": [
                                {
                                    "name": data1Name,
                                    "value": data1Value
                                },
                                {
                                    "name": data2Name,
                                    "value": data2Value,
                                    "img": data2Img
                                },
                                {
                                    "name": data3Name,
                                    "value": data3Value,
                                    "img": data3Img
                                },
                                {
                                    "name": data4Name,
                                    "value": data4Value,
                                    "img": data4Img
                                },
                            ]
                        },
                    ]
                }
            );
            postEntrys();
            console.log(localStorage.getItem("months"));
            loadSport();
            return;
        }
    }

    months.push(
        {
            "month": currentMonth,
            "days": [
                {
                    "monthDay": currentMonthDay,
                    "weekDay": currentWeekDay,
                    "sessions": [
                        {
                            "sport": e.querySelector('#nameBox').getAttribute("name"),
                            "dataPoints": [
                                {
                                    "name": data1Name,
                                    "value": data1Value
                                },
                                {
                                    "name": data2Name,
                                    "value": data2Value,
                                    "img": data2Img
                                },
                                {
                                    "name": data3Name,
                                    "value": data3Value,
                                    "img": data3Img
                                },
                                {
                                    "name": data4Name,
                                    "value": data4Value,
                                    "img": data4Img
                                },
                            ]
                        },
                    ]
                }
            ]
        }
    );
    postEntrys();
    console.log(localStorage.getItem("months"));
    loadSport();
    return;
}



async function postEntrys() {
    await fetch('/addEntrys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(months)
    });
}

function getEntrys() {
    fetch('/getEntrys')
        .then(response => response.json())
        .then(data => {
            console.log(months);
            months = data;
        })
        .catch(error => console.error("Fehler:", error));
}

getEntrys();



const swipeArea = document.getElementById("entryBox");
let sportsIndex = (localStorage.getItem("sportsIndex") ?? 0);
let startX = 0;
loadSport();

swipeArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

swipeArea.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 60) {
        if (diffX > 0) {
            if (sportsIndex != 0) {
                sportsIndex--;
                localStorage.setItem("sportsIndex", sportsIndex);
            } else {
                sportsIndex = 5;
                localStorage.setItem("sportsIndex", sportsIndex);
            }
            loadSport();
        } else {
            if (sportsIndex != 5) {
                sportsIndex++;
                localStorage.setItem("sportsIndex", sportsIndex);
            } else {
                sportsIndex = 0;
                localStorage.setItem("sportsIndex", sportsIndex);
            }
            loadSport();
        }
    }
});

function changesportsIndex(i){
    sportsIndex = i;
    localStorage.setItem("sportsIndex", i);
    loadSport();
}

function loadSport() {
    if (sportsIndex == 0) {
        document.getElementById("entryBox").innerHTML = `
        <div id="bar">
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(0)" class="barOrange">Workout</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(1)">Run</p>
            <p>-</p>
            <p onclick="changesportsIndex(2)">Biketour</p>
            <p>-</p>
            <p onclick="changesportsIndex(3)">Swimm</p>
            <p>-</p>
            <p onclick="changesportsIndex(4)">Sprint</p>
            <p>-</p>
            <p onclick="changesportsIndex(5)">Costum</p>
            <p>-</p>
        </div>
        <div id="nameBox" name="Workout">
            <img src="" alt="">
            <p id="sportName">New Workout</p>
        </div>
        <input type="text" id="dataInputField1" placeholder="type (z.B. Push)" unit="">
        <input type="text" id="dataInputField2" placeholder="sets" unit="sets" unitImg='<img src="Entry/img/set.png" class="unitImg">'>
        <input type="text" id="dataInputField3" placeholder="Time (h:m:s:ms)" unit="h" unitImg='<img src="Entry/img/clock.png" class="unitImg">'>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    } else if (sportsIndex == 1) {
        document.getElementById("entryBox").innerHTML = `
        <div id="bar">
            <p>-</p>
            <p onclick="changesportsIndex(0)">Workout</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(1)" class="barOrange">Run</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(2)">Biketour</p>
            <p>-</p>
            <p onclick="changesportsIndex(3)">Swimm</p>
            <p>-</p>
            <p onclick="changesportsIndex(4)">Sprint</p>
            <p>-</p>
            <p onclick="changesportsIndex(5)">Costum</p>
            <p>-</p>
        </div>
        <div id="nameBox" name="Run">
            <img src="" alt="">
            <p id="sportName">New Run</p>
        </div>
        <input type="text" id="dataInputField2" placeholder="Distance (km)" unit="km" unitImg='<img src="Entry/img/distance.png" class="unitImg">'>
        <input type="text" id="dataInputField3" placeholder="Heightmeter (hm)" unit="hm" unitImg='<img src="Entry/img/hm.png" class="unitImg">'>
        <input type="text" id="dataInputField4" placeholder="Time (h:m:s:ms)" unit="hour/s" unitImg='<img src="Entry/img/clock.png" class="unitImg">'>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    } else if (sportsIndex == 2) {
        document.getElementById("entryBox").innerHTML = `
        <div id="bar">
            <p>-</p>
            <p onclick="changesportsIndex(0)">Workout</p>
            <p>-</p>
            <p onclick="changesportsIndex(1)">Run</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(2)" class="barOrange">Biketour</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(3)">Swimm</p>
            <p>-</p>
            <p onclick="changesportsIndex(4)">Sprint</p>
            <p>-</p>
            <p onclick="changesportsIndex(5)">Costum</p>
            <p>-</p>
        </div>
        <div id="nameBox" name="Bikingtour">
            <img src="" alt="">
            <p id="sportName">New Bikingtour</p>
        </div>
        <input type="text" id="dataInputField1" placeholder="Type" unit="">
        <input type="text" id="dataInputField2" placeholder="Distance (km)" unit="km" unitImg='<img src="Entry/img/distance.png" class="unitImg">'>
        <input type="text" id="dataInputField3" placeholder="Heightmeter (hm)" unit="hm" unitImg='<img src="Entry/img/hm.png" class="unitImg">'>
        <input type="text" id="dataInputField4" placeholder="Time (h:m:s:ms)" unit="hour/s" unitImg='<img src="Entry/img/clock.png" class="unitImg">'>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    } else if (sportsIndex == 3) {
        document.getElementById("entryBox").innerHTML = `
            <div id="bar">
            <p>-</p>
            <p onclick="changesportsIndex(0)">Workout</p>
            <p>-</p>
            <p onclick="changesportsIndex(1)">Run</p>
            <p>-</p>
            <p onclick="changesportsIndex(2)">Biketour</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(3)" class="barOrange">Swimm</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(4)">Sprint</p>
            <p>-</p>
            <p onclick="changesportsIndex(5)">Costum</p>
            <p>-</p>
        </div>
        <div id="nameBox" name="Swim">
            <img src="" alt="">
            <p id="sportName">New Swim</p>
        </div>
        <input type="text" id="dataInputField1" placeholder="type" unit="">
        <input type="text" id="dataInputField2" placeholder="Distance (x*m)" unit="m" unitImg='<img src="Entry/img/distance.png" class="unitImg">'>
        <input type="text" id="dataInputField3" placeholder="Time (h:m:s:ms)" unit="hour/s" unitImg='<img src="Entry/img/clock.png" class="unitImg">'>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    } else if (sportsIndex == 4) {
        document.getElementById("entryBox").innerHTML = `
            <div id="bar">
            <p>-</p>
            <p onclick="changesportsIndex(0)">Workout</p>
            <p>-</p>
            <p onclick="changesportsIndex(1)">Run</p>
            <p>-</p>
            <p onclick="changesportsIndex(2)">Biketour</p>
            <p>-</p>
            <p onclick="changesportsIndex(3)">Swimm</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(4)" class="barOrange">Sprint</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(5)">Costum</p>
            <p>-</p>
        </div>
        <div id="nameBox" name="Sprint">
            <img src="" alt="">
            <p id="sportName">New Sprint</p>
        </div>
        <input type="text" id="dataInputField2" placeholder="Distance (x*m)" unit="m" unitImg='<img src="Entry/img/distance.png" class="unitImg">'>
        <input type="text" id="dataInputField3" placeholder="Time" unit="" unitImg='<img src="Entry/img/clock.png" class="unitImg">'>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    } else if (sportsIndex == 5) {
        document.getElementById("entryBox").innerHTML = `
            <div id="bar">
            <p>-</p>
            <p onclick="changesportsIndex(0)">Workout</p>
            <p>-</p>
            <p onclick="changesportsIndex(1)">Run</p>
            <p>-</p>
            <p onclick="changesportsIndex(2)">Biketour</p>
            <p>-</p>
            <p onclick="changesportsIndex(3)">Swimm</p>
            <p>-</p>
            <p onclick="changesportsIndex(4)">Sprint</p>
            <p class="barOrange">-</p>
            <p onclick="changesportsIndex(5)" class="barOrange">Costum</p>
            <p class="barOrange">-</p>
        </div>
        <div id="nameBox" name="">
            <img src="" alt="">
            <p id="sportName">Costum</p>
        </div>
        <input type="text" id="dataInputField1" placeholder="Costum" unit="">
        <input type="text" id="dataInputField2" placeholder="Costum" unit="" unitImg=''>
        <input type="text" id="dataInputField3" placeholder="Costum" unit="" unitImg=''>
        <input type="text" id="dataInputField4" placeholder="Costum" unit="" unitImg=''>
        <div id="calenderButtons">
            <div id="enterBox" onclick="addSession(this.parentElement.parentElement)">save</div>
            <a href="calender.html">
                <div class="calendarButton">Calendar</div>
            </a>
        </div>
        `;
    }
}

