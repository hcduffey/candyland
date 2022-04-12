// GAME STATE/MODEL

class Player {
    constructor(rowLength, token, playerNumber) {
        this.directions = {
            up: -1 * (rowLength), // the length of a row in the board determines how many elements to move to go up a row
            left: -1,
            right: 1
        }

        this.token = token;

        this.currentDirection = this.directions.up;
        this.currentLocation = 121;
        this.playerNumber = playerNumber;
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

const player1 = new Player(rowLength, "./images/player1_token.png", "one");
const player2 = new Player(rowLength, "./images/player2_token.png", "two");
let currentPlayer = player1;

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
            tokenHTML = `<img class="token ${player.playerNumber}" src="${player.token}">`;
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
    createCandyCaneForest();
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

    $("#27").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#28").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#43").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#44").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#55").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#56").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#58").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
    $("#71").html("<img class='gumdrop' src='images/gumdrop.png' alt='gumdrop'>");
}

function createCandyCaneForest() {
    
    $("#16").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");
    $("#17").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");
    $("#18").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");
    $("#19").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");

    $("#31").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");
    $("#46").html("<img class='token' src='../images/candy-cane.png' alt='candycane'>");
}

function addCastle() {
    $("#14").addClass("castle-square");
    $("#14").html("<img class='castle-token' src='../images/castle.png' alt='castle'>");
}

/**
 * Will update the player locations on the board without drawing the entire board again. It checks if player 2 should be displayed, because we don't display player2 if the tokens are on the same square
 */
function updateBoard(showPlayer2 = true) {
    $(`.${player1.playerNumber}`).remove();
    let tokenHTML1 = `<img class="token ${player1.playerNumber}" src="${player1.token}">`; 
    $(`#${player1.currentLocation}`).append(tokenHTML1);

    $(`.${player2.playerNumber}`).remove();
    let tokenHTML2 = `<img class="token ${player2.playerNumber}" src="${player2.token}">`; 
    if(showPlayer2 && player2.currentLocation !== player1.currentLocation) {
        $(`#${player2.currentLocation}`).append(tokenHTML2);
    }
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

// Event Handlers

// When the draw button is clicked, reveal a new card. There is also a check to make sure the user is in the draw phase of their turn -- if the user isn't selecting a square to move
$('.draw-btn').on("click", function() {
    if(drawUnlocked) {
        drawnColor = drawCard();

        drawUnlocked = false;
        squareClickUnlocked = true;

        $('.current-phase').text("Click Square");
    }    
});


/** resets the board to its initial state and restarts the game */
$('.reset-btn').on("click", function() {
    drawUnlocked = true;
    squareClickUnlocked = false;
    player1.resetLocation();
    player2.resetLocation();
    currentPlayer = player1;
    resetCard();
    addCastle();
    $('.status-container-player1').removeClass("active-player"); // remove active from both players
    $('.status-container-player2').removeClass("active-player");
    $('.status-container-player1').addClass("active-player"); // add it back to player 1
    $('.current-phase').text("Draw Card");
    updateBoard(false);
});

/** Returns true of the user clicked the correct square that matches their drawn card, false otherwise */
function isCorrectSquare(clickedSquare, boardState, drawnColor, player) {

    /** CLOSEST SQUARE CHECK */
    /**
     * Create a copy of the curren player object, and progress that copies location forward until it finds a black square or the drawn color. 
     * It then checks that found closest square of that color equals the clicked square
     */
    const fauxPlayer = new Player(15, null);
    fauxPlayer.currentLocation = player.currentLocation;
    fauxPlayer.currentDirection = player.currentDirection;

    let foundSquare = false;
    do {
        foundSquare = fauxPlayer.movePlayer(boardState, drawnColor); 

        // If the black square (square at the end of the board) is reached before finding a square that matches the drawn card, the player wins
        if(boardState[fauxPlayer.currentLocation] === color.black) {
            foundSquare = true;
        }
    } while(!foundSquare);

    if(clickedSquare !== fauxPlayer.currentLocation) {
        return false;
    }

    return true;
}

// Kick off game
let drawUnlocked = true;
let squareClickUnlocked = false;
let playerSwitchOk = true;

let cheat = false;

let drawnColor;

const boardState = initializeBoardState();
drawBoard(boardState, currentPlayer);

// Have to add this event handler after drawBoard because those elements don't exist until then
$('.white-border-square').on("click", function () {
    // check if user is in the square-click phase of their turn, and that they clicked the correct square
    if(squareClickUnlocked && isCorrectSquare(parseInt($(this).attr("id")), boardState, drawnColor, currentPlayer)) {
        while(currentPlayer.movePlayer(boardState, drawnColor) === false) {
            if(boardState[currentPlayer.currentLocation] === color.black) {
                $("#14").html("");
                $('.current-phase').text("Game Over!");
                updateBoard(currentPlayer);
                $('#winner-modal').css("display", "block");
                drawUnlocked = false;
                squareClickUnlocked = false;
                return;
            }
        }

        if(cheat) {
            currentPlayer.currentLocation = 87
        }

        // Check if player lands on the secret path square
        if(currentPlayer.currentLocation === 87) {
            drawUnlocked = false;
            playerSwitchOk = false;
            $('#secret-path-modal').css("display", "block");
            setTimeout(function() {
                console.log("You found the secret path!");
                currentPlayer.currentLocation = 41;
                updateBoard(currentPlayer);
                currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
                $('.status-container-player').toggleClass("active-player");
                $('.current-phase').text("Draw Card");
                drawUnlocked = true;
                playerSwitchOk = true;
            }, 2500);
        }

        drawUnlocked = true;
        squareClickUnlocked = false;

        updateBoard(currentPlayer);

        // switch to the next player
        if(playerSwitchOk) {
            currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
            $('.status-container-player').toggleClass("active-player");
            $('.current-phase').text("Draw Card");
        }
        
    }
    else {
        console.log("Wrong Square!");
        
        $(`#${$(this).attr("id")}`).removeClass("white-border-square");
        $(`#${$(this).attr("id")}`).addClass("wrong-square");

        let removeClassFunction = function (squareId) {
            $(`#${squareId}`).removeClass("wrong-square");
            $(`#${$(this).attr("id")}`).addClass("white-border-square");
        };

        setTimeout(removeClassFunction, 500, $(this).attr("id"));
    }
});