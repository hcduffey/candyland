// 1. Initialize the game and board

// array Colors = [red, blue, yellow, purple, green];
// array boardSquares = [color] ; index of array corresponds to id of square, color is one of the defined colors
// player 1 & 2 = number of square piece is on (id of the square)
// currentCard = one of the colors
// Set location of each piece to the start of the board.
// Ensure no card is drawn (e.g. hide the card)
// Set turn to Player 1 and register event handler for draw button -- draw will reveal the card with a random color

// Variables (Game State/Model)

// allowed colors for the board squares and cards
const color = {
    red: "w3-red", 
    purple: "w3-purple", 
    blue: "w3-blue", 
    yellow: "w3-yellow", 
    empty: ""
};

const boardState = Array(135).fill(color.yellow);
const rowLength = 15;

const board = $(".board");

// Initialization Functions
function initializeBoard() {
    let boardTableString = "<tr>";

    boardState.forEach( (boardSquare, index) => {

        boardTableString += `<td><div id="${index}" class="w3-panel ${boardSquare}">${index}</div></td>`;
        if(((index+1) % 15 === 0) && (index !== 0)) {
            boardTableString += "</tr><tr>";
        }
    
    });

    board.html(boardTableString);
}  

initializeBoard();

// Controller Functions




// 2. Play a turn
// User clicks the Draw button to invoke the event handler.
// The handler will draw a card, and move to the players game piece to the corresponding square

// 3. Check of Win
// If the location of that players piece is at the end of the board state array, we have a winner and pop up a modal


// 4. Switch turns
// If there isn't a winner, switch to player two and listen for the Draw event for that player


