

function deleteCategory() {
    if (!globalLock){
        return;
    }
    document.getElementById('optionBox').style.display = "none"; //Optionbox unsichtbar machen

    for (let i = 0; i < days[dayNumber].categorys.length; i++) {  //Alle Kategorien durchgehen und schauen ob eine mit dem p Elemnte übereinander stimmt
        if (days[dayNumber].categorys[i].id == clickedCategory.getAttribute("id")) {

            for (let k = 0; k < days[dayNumber].categorys.length; k++) {
                if (days[dayNumber].categorys[k].name == days[dayNumber].categorys[i].name && parseInt(days[dayNumber].categorys[k].id.substring(days[dayNumber].categorys[k].id.length - 1)) > parseInt(days[dayNumber].categorys[i].id.substring(days[dayNumber].categorys[i].id.length - 1))) {
                    days[dayNumber].categorys[k].id = `${days[dayNumber].categorys[i].name}${parseInt(days[dayNumber].categorys[k].id.substring(days[dayNumber].categorys[k].id.length - 1)) - 1}`;
                }

            }


            days[dayNumber].categorys.splice(i, 1);
            postDataInDays();
            loadCategorys();
            addRightClick();
            return;
        }
    }
}

function addCategory() {
    if (!globalLock){
        return;
    }


    let dNumber = 1;
    for (let i = 0; i < days[dayNumber].categorys.length; i++) {
        if (days[dayNumber].categorys[i].name == "Name"){
            dNumber++;
        }
    }

    days[dayNumber].categorys.push(
        {
            "name": "Name",
            "id": `Name${dNumber}`,
            "exercises": []
        }
    );
    console.log("addCategory");
    console.log(days);
    
    postDataInDays();
    loadCategorys();
    addRightClick();
}

let categoryName;
function renameCategory() {
    if (!globalLock){
        return;
    }
    document.getElementById('optionBox').style.display = "none"; //Optionbox unsichtbar machen

    categoryName = clickedCategory.getAttribute("id");
    clickedCategory.innerHTML = `<input class="inputCN" onchange="renameCategory2(this.value)" list="categorysList">`;



    const newInput = clickedCategory.querySelector('input'); //Fokus im Input Feld setzen
    setTimeout(() => {
        newInput.focus();
    }, 0);
}

function renameCategory2(e) {
    if (e == "") { //wenn der input lehr ist: alles reseten
        loadCategorys();
        addRightClick();
        return;
    }

    let dNumber = 1;
    for (let i = 0; i < days[dayNumber].categorys.length; i++) {
        if (days[dayNumber].categorys[i].name == e && days[dayNumber].categorys[i].id != `${e}${dNumber}`) { //wenn der Name schon existiert
            dNumber++;
        }
    }

    for (let i = 0; i < days[dayNumber].categorys.length; i++) {
        if (days[dayNumber].categorys[i].id == categoryName) {  //wenn die Stelle im JSON mit dem alten p value übereinstimmt
            days[dayNumber].categorys[i].name = e;
            days[dayNumber].categorys[i].id = `${e}${dNumber}`;
            postDataInDays();
            loadCategorys();
            addRightClick();
            return;
        }
    }
}


var clickedCategory;
function openOptionBox(e){
    if (!globalLock){
        return;
    }
    
    clickedCategory = e;

    document.getElementById('optionBox').style.display = "flex";
    optionBox.style.left = event.clientX + 'px';
    optionBox.style.top = event.clientY + 'px';
}


//hide Funktion ----------------------------------------------------------------------------------------
function hide(e) {
    if (!e.style.transform || e.style.transform == "none") {
        e.style.transform = "rotate(90deg)";
        const boxes = e.parentElement.parentElement.querySelectorAll('.extendetExerciseBox');
        boxes.forEach(box => {
            box.style.display = "none";
        });
    } else if (e.style.transform == "rotate(90deg)") {
        e.style.transform = "none";
        const boxes = e.parentElement.parentElement.querySelectorAll('.extendetExerciseBox');
        boxes.forEach(box => {
            box.style.display = "block";
        });
    }
}

function getData() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            days = data;
            loadCategorys(); // Optional: direkt nach dem Laden anzeigen
        })
        .catch(error => console.error("Fehler:", error));
}

getData();