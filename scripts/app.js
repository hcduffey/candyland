// 1. Initialize the game and board

// array Colors = [red, blue, yellow, purple, green];
// array boardSquares = [color] ; index of array corresponds to id of square, color is one of the defined colors
// player 1 & 2 = number of square piece is on (id of the square)
// currentCard = one of the colors
// Set location of each piece to the start of the board.
// Ensure no card is drawn (e.g. hide the card)
// Set turn to Player 1 and register event handler for draw button -- draw will reveal the card with a random color

// VARIABLES (Game State/Model)

// stores the allowed colors for the board squares and cards
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
 * creates the html table that will represent the game board based on the board state
 */
function drawBoard(boardStateInput) {
    let boardTableString = "<tr>";

    boardStateInput.forEach( (boardSquare, index) => {
        let printChar = "";
        if(boardSquare !== "") {
            printChar = index;
        }
        boardTableString += `<td><div id="${index}" class="w3-panel ${boardSquare}">${printChar}</div></td>`;
        
        if(((index+1) % 15 === 0) && (index !== 0)) {
            boardTableString += "</tr><tr>";
        }
    
    });
    boardTableString += "</tr>";

    board.html(boardTableString);
}  

const boardState = initializeBoardState();
drawBoard(boardState);

// Controller Functions

// 2. Play a turn
// User clicks the Draw button to invoke the event handler.
// The handler will draw a card, and move to the players game piece to the corresponding square

// 3. Check of Win
// If the location of that players piece is at the end of the board state array, we have a winner and pop up a modal


// 4. Switch turns
// If there isn't a winner, switch to player two and listen for the Draw event for that player


