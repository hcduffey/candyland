// 1. Initialize the game and board

// array Colors = [red, blue, yellow, purple, green];
// array boardSquares = [color] ; index of array corresponds to id of square, color is one of the defined colors
// player 1 & 2 = number of square piece is on (id of the square)
// currentCard = one of the colors
// Set location of each piece to the start of the board.
// Ensure no card is drawn (e.g. hide the card)
// Set turn to Player 1 and register event handler for draw button -- draw will reveal the card with a random color

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

    // based on the given board state, it updates the current direction the player should move
    // this should be invoked before every move
    checkMoveDirection(boardState) {

    }

    // based on the given board state, the players locaton is updated based on the direction its going
    movePlayer(boardState) {

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
        let printChar = "";
        let tokenHTML = "";
        
        if(boardSquareColor !== "") {
            printChar = index;
        }
        
        if(player.currentLocation === index) {
            console.log(player.currentLocation + " : " + index);
            tokenHTML = `<img class="token" src="${player.token}">`;
            console.log(tokenHTML);
        }

        boardTableString += `<td><div id="${index}" class="w3-panel ${boardSquareColor}">${tokenHTML}</div></td>`;
        
        if(((index+1) % 15 === 0) && (index !== 0)) {
            boardTableString += "</tr><tr>";
        }
    
    });
    boardTableString += "</tr>";

    board.html(boardTableString);
}  

const boardState = initializeBoardState();
drawBoard(boardState, player1);

// Controller Functions

// 2. Play a turn
// User clicks the Draw button to invoke the event handler.
// The handler will draw a card, and move to the players game piece to the corresponding square

// 3. Check of Win
// If the location of that players piece is at the end of the board state array, we have a winner and pop up a modal


// 4. Switch turns
// If there isn't a winner, switch to player two and listen for the Draw event for that player


