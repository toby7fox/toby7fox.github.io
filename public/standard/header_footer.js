document.body.innerHTML += `
    <div id="header">
        <a href="index.html">
            <img src="../standard/img/home.png" alt="home" class="headerImg">
        </a>
        <div id="headerText">
            <p id="headerTitel" onclick="renameExerciseName(this)">Trainingsplan</p>
        </div>
    </div>
    <div id="footer">
        <a href="plan.html">
            <div class="footerBox">
                <img src="../standard/img/plan.png" alt="plan" class="footerImg">
                <p class="footerText">Plan</p>
            </div>
        </a>
        <a href="entry.html">
            <div class="footerBox">
                <img src="../standard/img/entry.png" alt="plan" class="footerImg">
                <p class="footerText">Entry</p>
            </div>
        </a>
        <a href="level.html">
            <div class="footerBox">
                <img src="../standard/img/level.png" alt="plan" class="footerImg">
                <p class="footerText">Level</p>
            </div>
        </a>
    </div>
`; 