// GAME STATE/MODEL

class Player {
    constructor(rowLength, token) {
        this.directions = {
            up: -1 * (rowLength), // the length of a row in the board determines how many elements to move to go up a row
            left: -1,
            right: 1
        }

        this.token = token;

        this.currentDirection = this.directions.up;
        this.currentLocation = 121;
    }

    // called when restarting a game to place token back at the beginning
    resetLocation() {
        this.currentLocation = 121;
    }

    // based on the given board state, it updates the current direction the player should move
    // this should be invoked before every move
    checkMoveDirection(boardState) {
        if(((this.currentLocation + this.currentDirection) > 0) && (boardState[this.currentLocation + this.currentDirection] !== color.empty)) {
            return;
        }
        else if(((this.currentLocation + this.directions.up) > 0) && (boardState[this.currentLocation + this.directions.up] !== color.empty)) {
            this.currentDirection = this.directions.up;
        }
        else if(((this.currentLocation + this.directions.left) > 0) && (boardState[this.currentLocation + this.directions.left] !== color.empty)) {
            this.currentDirection = this.directions.left;
        } 
        else if(((this.currentLocation + this.directions.right) > 0) && (boardState[this.currentLocation + this.directions.right] !== color.empty)) {
            this.currentDirection = this.directions.right;
        }

    }

    // based on the given board state, the players locaton is updated based on the direction its going
    movePlayer(boardState, color) {
        this.checkMoveDirection(boardState);
        this.currentLocation += this.currentDirection;

        return boardState[this.currentLocation] === color;
    }
}

// stores the allowed colors for the board squares and cards, color definitions are classes in the W3 CSS styles
const color = {
    green: "w3-green", 
    purple: "w3-purple", 
    blue: "w3-blue", 
    yellow: "w3-yellow", 
    black: "w3-black",
    empty: ""
};

const rowLength = 15;
const board = $(".board");

const player1 = new Player(rowLength, "./images/player1_token.png");

// INITIALIZATION FUNCTIONS

/**
 * intializes the board state by updating the boardState array to change the color of the squares that are part of the active game board
 */
function initializeBoardState() {
    const localBoardState = Array(135).fill(color.empty);
    
    localBoardState[11] = color.green;
    localBoardState[12] = color.purple;
    localBoardState[13] = color.yellow;
    localBoardState[14] = color.black;
    localBoardState[26] = color.yellow;
    localBoardState[32] = color.purple;
    localBoardState[33] = color.blue;
    localBoardState[34] = color.yellow;
    localBoardState[35] = color.green;
    localBoardState[36] = color.purple;
    localBoardState[37] = color.blue;
    localBoardState[38] = color.yellow;
    localBoardState[39] = color.green;
    localBoardState[40] = color.purple;
    localBoardState[41] = color.blue;
    localBoardState[47] = color.yellow;
    localBoardState[62] = color.blue;
    localBoardState[77] = color.green;
    localBoardState[78] = color.yellow;
    localBoardState[79] = color.purple;
    localBoardState[80] = color.blue;
    localBoardState[81] = color.green;
    localBoardState[82] = color.yellow;
    localBoardState[83] = color.purple;
    localBoardState[84] = color.green;
    localBoardState[85] = color.blue;
    localBoardState[86] = color.yellow;
    localBoardState[87] = color.purple;
    localBoardState[102] = color.blue;
    localBoardState[106] = color.purple;
    localBoardState[107] = color.blue;
    localBoardState[108] = color.yellow;
    localBoardState[109] = color.green;
    localBoardState[110] = color.purple;
    localBoardState[111] = color.blue;
    localBoardState[112] = color.yellow;
    localBoardState[113] = color.green;
    localBoardState[114] = color.purple;
    localBoardState[115] = color.blue;
    localBoardState[116] = color.yellow;
    localBoardState[117] = color.green;
    localBoardState[121] = color.black;

    return localBoardState;
}

/**
 * creates the html table that will represent the game board based on the board state and player locations
 */
function drawBoard(boardStateInput, player) {
    let boardTableString = "<tr>";
    
    boardStateInput.forEach( (boardSquareColor, index) => {
        let usableBoardSquare = "";
        let tokenHTML = "";
        
        if(boardSquareColor !== "") {
            usableBoardSquare = "white-border-square";
        }
        
        if(player.currentLocation === index) {
            console.log(player.currentLocation + " : " + index);
            tokenHTML = `<img class="token" src="${player.token}">`;
            console.log(tokenHTML);
        }

        boardTableString += `<td><div id="${index}" class="w3-panel ${boardSquareColor} ${usableBoardSquare}">${tokenHTML}</div></td>`;
        
        if(((index+1) % 15 === 0) && (index !== 0)) {
            boardTableString += "</tr><tr>";
        }
    
    });
    boardTableString += "</tr>";

    $(".board").html(boardTableString);
    addBoardCuves();
    createSecretPath();
    addCastle();
}

/**
 * Makes the turns in the board curvy so that the game board looks nice
 */
function addBoardCuves() {
    $("#106").addClass("top-left");
    $("#117").addClass("bottom-right");
    $("#77").addClass("bottom-left");
    $("#32").addClass("top-left");
    $("#42").addClass("top-right");
    $("#11").addClass("top-left");
}

// Create a secret path through gumdrop pass
function createSecretPath() {
    $("#72").addClass("secret-path");
    $("#57").addClass("secret-path");
    $("#42").addClass("secret-path");

    $("#58").html("<img class='gumdrop' src='../images/gumdrop.png' alt='gumdrop'>");
    $("#71").html("<img class='gumdrop' src='../images/gumdrop.png' alt='gumdrop'>");
}

function addCastle() {
    $("#14").addClass("castle-square");
    $("#14").html("<img class='castle-token' src='../images/castle.png' alt='castle'>");
}

/**
 * Will update the given player location on the board without drawing the entire board again
 */
function updateBoard(player) {
    $('.token').remove();
    let tokenHTML = `<img class="token" src="${player.token}">`; 
    $(`#${player.currentLocation}`).append(tokenHTML);
}

/**
 * Makes the top card face down
 */
function resetCard() {
    $('.card').addClass("card-hidden");
    $('.card-square').removeClass(color.blue);
    $('.card-square').removeClass(color.green);
    $('.card-square').removeClass(color.purple);
    $('.card-square').removeClass(color.yellow);
}

/**
 * Updates the active card to a random color
 */
function drawCard() {
    let drawnColor;

    $('.card').removeClass("card-hidden");

    switch(Math.ceil(Math.random()*5)) {
        case 1:
            drawnColor = color.green;
            break;
        case 2:
            drawnColor = color.purple;
            break;
        case 3:
            drawnColor = color.blue;
            break;
        default:
            drawnColor = color.yellow;  
    }
    $('.card-square').removeClass(color.green);
    $('.card-square').removeClass(color.purple);
    $('.card-square').removeClass(color.blue);
    $('.card-square').removeClass(color.yellow);

    $('.card-square').addClass(drawnColor);
    return drawnColor;
}

// Controller Functions

$('.draw-btn').on("click", function() {
    if(activeGame) {
        let drawnColor = drawCard();
    
        while(player1.movePlayer(boardState, drawnColor) === false) {
            if(boardState[player1.currentLocation] === color.black) {
                $("#14").html("");
                $('#winner-modal').css("display", "block");
                activeGame = false;
                break;
            }
        }

        // Check if player lands on the secret path square
        if(player1.currentLocation === 87) {
            activeGame = false;
            setTimeout(function() {
                console.log("You found the secret path!");
                $('#secret-path-modal').css("display", "block");
                activeGame = true;
            }, 1000);
            player1.currentLocation = 41;
        }
    
        updateBoard(player1);
    }    
});

$('.reset-btn').on("click", function() {
    activeGame = true;
    player1.resetLocation();
    console.log(player1.currentLocation)
    resetCard();
    addCastle();
    updateBoard(player1);
});

let activeGame = true;
const boardState = initializeBoardState();
drawBoard(boardState, player1);


// 2. Play a turn
// User clicks the Draw button to invoke the event handler.
// The handler will draw a card, and move to the players game piece to the corresponding square

// 3. Check of Win
// If the location of that players piece is at the end of the board state array, we have a winner and pop up a modal


// 4. Switch turns
// If there isn't a winner, switch to player two and listen for the Draw event for that player


