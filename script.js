let buttonF = document.getElementById("facile");
let buttonM = document.getElementById("moyen");
let buttonD = document.getElementById("difficile");
let container = document.getElementById("container");
let emplacements = document.getElementsByClassName("cases");
let table = [];

buttonF.addEventListener("click", function () {
    container.style.width = "30%";
    let del = table.length;
    reset(25, 6, del);
})

buttonM.addEventListener("click", function () {
    container.style.width = "60%";
    let del = table.length;
    reset(100, 24, del);
})

buttonD.addEventListener("click", function () {
    container.style.width = "80%";
    let del = table.length;
    reset(225, 54,del);
})

function mines(nCases) {
    let mine = Math.trunc((Math.random() * nCases) - 1);
    if(emplacements[mine].getElementsByTagName("img").length !== 0) {
        mines(nCases);
    }
    else {
        let bomb = document.createElement("img");
        bomb.src = "bomb.jpg";
        bomb.style.width = "100%";
        bomb.style.height = "100%";
        bomb.style.opacity = "0";
        emplacements[mine].appendChild(bomb);
        emplacements[mine].classList.add("bomb");
    }
}

function game(nCases, nBomb){
    let del = table.length;
    for(let choice of container.children) {
        choice.addEventListener("mouseup", function (e) {
            switch (e.button) {
                case 0:
                    if(choice.getElementsByTagName("img").length !== 0) {
                        let perdu = document.getElementsByTagName("img");
                        for(let i = 0; i < perdu.length; i++) {
                            perdu[i].style.opacity = "1";
                        }
                        alert("Perdu");
                        reset(nCases, nBomb, del);
                    }
                    else {
                        noBomb(choice, nCases);
                    }
                    break;
                case 2:
                    if(choice.classList.contains("red" && "blue")) {
                        choice.style.backgroundColor = "grey";
                        choice.classList.remove("red", "blue");
                    }
                    else if(choice.classList.contains("red")){
                        choice.style.backgroundColor = "blue";
                        choice.classList.add("blue");
                    }
                    else if((choice.classList.contains("white") === false)) {
                        choice.style.backgroundColor = "red";
                        choice.classList.add("red");
                    }

                    break;
            }
            if(win(nCases, nBomb) === true) {
                alert("Bravo");
                reset(nCases, nBomb, del);
            }
        });
    }
}

function reset(nCases, nBomb, del){
    if(container.getElementsByTagName("div").length !== 0) {
        while (container.firstElementChild) {
            container.removeChild(container.firstElementChild)
        }
        for(let y = 0; y < del; y++) {
            table.pop();
        }
    }

    for(let i = 0; i < nCases; i++) {
        let cases = document.createElement("div");
        cases.className = "cases";
        cases.style.width = (95 / Math.sqrt(nCases)) + "%" ;
        cases.style.height = "35px";
        container.appendChild(cases);
        table.push(cases);

    }
    for(let x = 0; x < nBomb; x++) {
        mines(nCases);
    }
    game(nCases, nBomb);
}

function noBomb(choice, nCases) {
    if(choice.classList.contains("white") !== true) {
        choice.style.backgroundColor = "white";
        choice.classList.add("white");
        choice.classList.remove("red", "blue");
        if(nombreInToCase(choice, nCases) === 0) {
            choice.innerHTML = "";
            caseVide(choice, nCases);
        }
        else {
            choice.innerHTML = nombreInToCase(choice, nCases).toString();
        }
    }
}

function nombreInToCase(cases, nCases) {
    let nombreCase = 0;
    let pos = table.indexOf(cases);
    let moins = nCases - pos;
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0)) {
        if(table[table.length - (moins + 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0)) {
        if(table[table.length - (moins - 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos - Math.sqrt(nCases) >= 0)) {
        if(table[table.length - (moins + Math.sqrt(nCases))].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos + Math.sqrt(nCases) < nCases)) {
        if(table[table.length - (moins - Math.sqrt(nCases))].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0) && (pos - Math.sqrt(nCases) >= 0)) {
        if(table[table.length - (moins + Math.sqrt(nCases) + 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0) && (pos - Math.sqrt(nCases) >= 0)) {
        if(table[table.length - (moins + Math.sqrt(nCases) - 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0) && (pos + Math.sqrt(nCases) < nCases)){
        if(table[table.length - (moins - Math.sqrt(nCases) + 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0) && (pos + Math.sqrt(nCases) < nCases)){
        if(table[table.length - (moins - Math.sqrt(nCases) - 1)].classList.contains("bomb")) {
            nombreCase++;
        }
    }
    return nombreCase;
}

function caseVide(cases, nCases){
    let pos = table.indexOf(cases);
    let moins = nCases - pos;
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0)) {
        let left = table[table.length - (moins + 1)];
        noBomb(left, nCases);
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0)) {
        let right = table[table.length - (moins - 1)];
        noBomb(right, nCases);
    }
    if((pos - Math.sqrt(nCases) >= 0)) {
        let up = table[table.length - (moins + Math.sqrt(nCases))];
        noBomb(up, nCases);
    }
    if((pos + Math.sqrt(nCases) < nCases)) {
        let down = table[table.length - (moins - Math.sqrt(nCases))];
        noBomb(down, nCases);
    }
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0) && (pos - Math.sqrt(nCases) >= 0)) {
        let upLeft = table[table.length - (moins + Math.sqrt(nCases) + 1)];
        noBomb(upLeft, nCases);
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0) && (pos - Math.sqrt(nCases) >= 0)) {
        let upRight = table[table.length - (moins + Math.sqrt(nCases) - 1)];
        noBomb(upRight, nCases);
    }
    if((pos !== 0) && (pos % Math.sqrt(nCases) !== 0) && (pos + Math.sqrt(nCases) < nCases)) {
        let downLeft = table[table.length - (moins - Math.sqrt(nCases) + 1)];
        noBomb(downLeft, nCases);
    }
    if((pos !== (Math.sqrt(nCases) - 1)) && ((pos + 1) % Math.sqrt(nCases) !== 0) && (pos + Math.sqrt(nCases) < nCases)) {
        let downRight = table[table.length - (moins - Math.sqrt(nCases) - 1)];
        noBomb(downRight, nCases);
    }
}

function win(nCases, nBomb) {
    let win = 0;
    for(let i = 0; i < nCases; i++) {
        if(table[i].classList.contains("white")){
            win++
        }
    }
    if (win === (nCases - nBomb)) {
        return true
    }
}

document.addEventListener('contextmenu', function (event){
    event.preventDefault();
});