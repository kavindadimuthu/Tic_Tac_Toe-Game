let isGameOver = false;
let whoIsTurn = "X";
let buttonCheckValue = "pass";

let jboard = document.querySelector(".board");
let buttons = jboard.querySelectorAll("button");
let clickedButtons = document.querySelectorAll(".clicked");

let result = document.querySelector(".resultbox");
let playagainbutton = document.querySelector("#playagainbutton");

const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function toggleTurn() {
    whoIsTurn = (whoIsTurn === "X") ? "O" : "X";
}
function buttonCheck(button){
    for(let i=0; i<clickedButtons.length; i++){
        if (button == clickedButtons[i]) {
            buttonCheckValue = "fail";
            break;
        }
        else {buttonCheckValue = "pass";}
    }
}

function checkWinning(){
    for(let i=0; i<winningCombinations.length; i++){
        let v0 = buttons[winningCombinations[i][0]].innerHTML;
        let v1 = buttons[winningCombinations[i][1]].innerHTML;
        let v2 = buttons[winningCombinations[i][2]].innerHTML;

        if(v0!="" && v0==v1 && v0==v2){
            result.style.display = "inline";
            result.innerHTML = whoIsTurn + "is Winner";
            isGameOver = true;
            playagainbutton.style.display = "inline";
        }
        else if(clickedButtons.length==9){
            result.style.display = "inline";
            result.innerHTML =  "Match is drawn!";
            isGameOver = true;
            playagainbutton.style.display = "inline";
        }
    }
}

function resetGame(){
    isGameOver = false;
    whoIsTurn = "X";
    buttonCheckValue = "pass";

    clickedButtons.forEach(clickedbutton => {
        clickedbutton.classList.remove('clicked');
    });
    clickedButtons = [];

    for (let index = 0; index < buttons.length; index++) {
        buttons[index].innerHTML = "";
    }

    result.style.display = "none";
    playagainbutton.style.display = "none";
}

playagainbutton.addEventListener('click', resetGame);

buttons.forEach(function(butt) {
    butt.addEventListener("click", function(){
        buttonCheck(this);

        if( isGameOver == false && buttonCheckValue == "pass" ){
            if ( whoIsTurn == "X"){
                this.innerHTML = "X";
                this.style.color = "#08d631";
                this.style.fontWeight = "600";
                checkWinning();
                toggleTurn();
            }
            else if ( whoIsTurn == "O"){
                this.innerHTML = "O";
                this.style.color = "red";
                this.style.fontWeight = "600";
                checkWinning();
                toggleTurn();
            }  
            this.classList.add("clicked");
            clickedButtons = document.querySelectorAll(".clicked");
            console.log(clickedButtons);
        }
    })
})