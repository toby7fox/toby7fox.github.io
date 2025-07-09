function addExercise() {
    getData();
    if (!globalLock) {
        return;
    }
    document.getElementById('optionBox').style.display = "none"; //Optionbox unsichtbar machen


    let dNumber = 1;
    for (let i = 0; i < days[dayNumber].categorys.length; i++) {
        for (let k = 0; k < days[dayNumber].categorys[i].exercises.length; k++) {
            if (days[dayNumber].categorys[i].exercises[k].name == "Name") {
                dNumber++;
            }
        }
    }

    for (let i = 0; i < days[dayNumber].categorys.length; i++) {  //Alle Kategorien durchgehen und schauen ob eine mit dem p Elemnte übereinander stimmt
        if (days[dayNumber].categorys[i].id == clickedCategory.getAttribute("id")) {

            days[dayNumber].categorys[i].exercises.push(
                {
                    "name": "Name",
                    "id": `Name${dNumber}`,
                    "sets": 0,
                    "weight": 0,
                    "reps": 0,
                    "rangeLow": 0,
                    "rangeHigh": 0,
                    "bwE": false
                }
            );
            postDataInDays();
            loadCategorys();
            addRightClick();
            return;
        }
    }
}

var clickedExercise;
function addRightClick() {
    if (!globalLock) {
        return;
    }
    const exercises = document.getElementsByClassName("exercise");
    for (let i = 0; i < exercises.length; i++) {
        exercises[i].addEventListener("contextmenu", function (event) {
            event.preventDefault();

            clickedExercise = event.currentTarget;


            document.getElementById('exerciseDeleteBox').style.display = "flex";
            document.getElementById('exerciseDeleteBox').style.left = event.clientX + 'px';
            document.getElementById('exerciseDeleteBox').style.top = event.clientY + 'px';
        });
    }
}
addRightClick();

function deleteExercise() {
    document.getElementById("exerciseDeleteBox").style.display = "none";

    for (let i = 0; i < days[dayNumber].categorys.length; i++) {
        for (let k = 0; k < days[dayNumber].categorys[i].exercises.length; k++) {



            if (days[dayNumber].categorys[i].exercises[k].id == clickedExercise.getAttribute("id")) {


                for (let ä = 0; ä < days[dayNumber].categorys.length; ä++) {
                    for (let ö = 0; ö < days[dayNumber].categorys[ä].exercises.length; ö++) {
                        if (days[dayNumber].categorys[ä].exercises[ö].name == days[dayNumber].categorys[i].exercises[k].name && parseInt(days[dayNumber].categorys[ä].exercises[ö].id.substring(days[dayNumber].categorys[ä].exercises[ö].id.length - 1)) > parseInt(days[dayNumber].categorys[i].exercises[k].id.substring(days[dayNumber].categorys[i].exercises[k].id.length - 1))) {
                            days[dayNumber].categorys[ä].exercises[ö].id = `${days[dayNumber].categorys[i].exercises[k].name}${parseInt(days[dayNumber].categorys[ä].exercises[ö].id.substring(days[dayNumber].categorys[ä].exercises[ö].id.length - 1)) - 1}`;
                        }
                    }
                }

                days[dayNumber].categorys[i].exercises.splice(k, 1);


                postDataInDays();
                loadCategorys();
                addRightClick();
                return;



            }
        }
    }
}