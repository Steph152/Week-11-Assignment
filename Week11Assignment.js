const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const strike = document.getElementById("strike");
const winConditions =[
    { combo: [0, 1, 2], strikeClass: "strike-row-1"}, 
    { combo: [3, 4, 5], strikeClass: "strike-row-2"},
    { combo: [6, 7, 8], strikeClass: "strike-row-3"},
    { combo: [0, 3, 6], strikeClass: "strike-column-1"},
    { combo: [1, 4, 7], strikeClass: "strike-column-2"},
    { combo: [2, 5, 8], strikeClass: "strike-column-3"},
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2"},
];

let options = ["", "", "", "", "", "", "", "", ""];   //placeholders for cells
let currentPlayer = "X";
let running = false;         //keeps track if game is running

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));    //if cell is clicked, calls function cellClicked
    restartBtn.addEventListener("click", restartGame);                     //if restart button is clicked, calls function restart Game
    statusText.innerText = `${currentPlayer}'s Turn`;                      //uses 'currentPlayer' to update bottom text
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");    //  set cellIndex to a constant, 

    if(options[cellIndex] !="" || !running){             // if cells are NOT empty OR the game is NOT running, the code stops
        return;         
    }

    updateCell(this, cellIndex);                        // if cells are empty and the game is running, a cell clicked will be 
    checkWinner();                                      // updated by calling the updateCell function. the checkWinner function                                                   
}                                                       // is also called.

function updateCell(cell, index){                       // takes the arguments of cell and index
    options[index] = currentPlayer;                     // updates the index with the currentPlayer, X or O
    cell.textContent = currentPlayer;                   // updates the cell with the currentPlayer

}

function changePlayer(){
    if (running == true){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.innerText = `${currentPlayer}'s Turn`;
    }
}

function checkWinner(){
    let roundWon = false;
    for( let winCondition of winConditions){
        //object destructuring
        const { combo, strikeClass } = winCondition;
        const cellA = combo[0];
        const cellB = combo[1];
        const cellC = combo[2];

        console.log(cellA, cellB, cellC);

        if (
            options[cellA] != '' &&
            options[cellA] === options[cellB] &&
            options[cellA] === options[cellC]
        ){
            statusText.innerText = `${currentPlayer} Won!`;
            roundWon = true;
            strike.classList.add(strikeClass);
            running = false;
        
        }else if(!options.includes("")){
            statusText.innerText = `Draw`;
            running = false;
        
        }
    }
    changePlayer();
}


function restartGame(){                                        // resets all of the conditions and restarts the game when 
    currentPlayer = "X";                                       // reset button is clicked
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    strike.className = "strike";
}







/* Sources:

https://www.youtube.com/watch?v=AnmwHjpEhtA&ab_channel=BroCode

https://www.youtube.com/watch?v=fPew9OI2PnA&t=576s&ab_channel=CodingWithAdam

*/

/*function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC ==""){
            continue;
        }
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.innerText = `${currentPlayer} wins!`;
        running = false;
        strike.classList.add(strikeClass);
    }
    else if(!options.includes("")){
        statusText.innerText= `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }

}*/
