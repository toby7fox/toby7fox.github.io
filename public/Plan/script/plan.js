//add-Funktion ------------------------------------------------------------------
function addDay() {
    let number = 1;
    for (let h = 0; h < days.length; h++) { //nachzählen wie viele gleichnamige es gibt
        if (days[h].name == "Name") {
            number++;
        }
    }

    days.push( //hinzufügen eines Tages zum JSON
        {
            "name": "Name",
            "id": `Name${number}`,
            "categorys": []
        }
    );
    postData();
    loaddays(); //neu laden
    addRightClick();
}
//--------------------------------------------------------------------------------


//rename-progress ------------------------------------------------------------
let dayName;
function rename() {

    dayName = clickedElement.querySelector('p').getAttribute("id"); //das p-Element abspeichern
    document.getElementById('optionBox').style.opacity = 0; //Optionbox unsichtbar machen
    clickedElement.querySelector('p').innerHTML = `<input onchange="rename2(this.value)" onblur="rename2(this.value)" class="inputCN" list="daysList">`; //input feld generieren



    const newInput = clickedElement.querySelector('p').querySelector('input'); //Fokus im Input Feld setzen
    setTimeout(() => {
        newInput.focus();
    }, 0);
}

function rename2(e) {  //DOPELLTE ÜBERPRÜFEN
    if (e == "") { //wenn der input lehr ist: alles reseten
        loaddays();

        return;
    }

    let number = 1;
    for (let h = 0; h < days.length; h++) { //nachzählen wie viele gleichnamige es gibt
        if (e == days[h].name) {
            number++;
        }
    }

    for (let i = 0; i < days.length; i++) {
        if (days[i].id == dayName) {  //wenn die Stelle im JSON mit dem alten p value übereinstimmt
            days[i].name = e;
            days[i].id = e + number;
            postData();
            loaddays();
            addRightClick();
            return;
        }
    }


}
//------------------------------------------------------------------------------

//delete-function----------------------------------
let deletionDayName;
function deleteItem() {
    deletionDayName = dayName = clickedElement.querySelector('p').getAttribute("id");
    document.getElementById('optionBox').style.opacity = 0;


    for (let i = 0; i < days.length; i++) {
        if (days[i].id == dayName) {

            for (let k = 0; k < days.length; k++) {
                if (days[k].name == days[i].name && parseInt(days[k].id.substring(days[k].id.length - 1)) > parseInt(days[i].id.substring(days[i].id.length - 1))) {
                    days[k].id = `${days[i].name}${parseInt(days[k].id.substring(days[k].id.length - 1)) - 1}`;
                }

            }
            days.splice(i, 1);


            postData();
            loaddays();
            addRightClick();
            return;
        }
    }
}

//lade-funktion -------------------------------------------
function loaddays() {
    document.getElementById('contentBox').innerHTML = ""; //alles reseten
    for (let i = 0; i < days.length; i++) {  //neu laden
        document.getElementById('contentBox').innerHTML += `
        <div class="day" onclick="openDay(this)">
            <p class="dayName" id="${days[i].id}">${days[i].name}</p>
        </div>
    `;
    }
    addRightClick();
}
//----------------------------------------------------------


//option window-----------------------------------------------------
var clickedElement;
function addRightClick() {
    const dayElements = document.getElementsByClassName("day");
    for (let i = 0; i < dayElements.length; i++) {
        dayElements[i].addEventListener("contextmenu", function (event) {
            event.preventDefault(); //Das Fenster verhindern was normalerweise bei Rechtsklick generiert wird

            clickedElement = event.currentTarget;
            console.log(clickedElement);


            document.getElementById('optionBox').style.opacity = 1; //Optionbox Sichtbar machen
            optionBox.style.left = event.clientX + 'px'; //Optionbox an Mausposition anpassen
            optionBox.style.top = event.clientY + 'px';
        });
    }
}
addRightClick();


//-------------------------------------------------------------------

function getData() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            days = data;
            loaddays(); // Optional: direkt nach dem Laden anzeigen
        })
        .catch(error => console.error("Fehler:", error));
}

async function postData() {
    console.log("planPostData");
    
    await fetch('/addData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(days)
    });
    getData();
}

getData();