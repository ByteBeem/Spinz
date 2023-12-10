import './styles.css';
import React, { useEffect } from 'react';

const GameComponent = () => {
  useEffect(() => {
   // object to represent a possible game state.  Will be used for traversal by the minimax AI.
// -optionally pass old state in to create the new state's data
// -optionally pass old move in to modify the new state
let State = function(old, move){
  
    // whose turn is it?
    this.turn = ""
    
    // number of AI moves so far - used by the minmax algorithm
    this.depth = 0;
  
    // current representation of board
    // 0 = blank space
    this.board = [0, 0, 0,
                  0, 0, 0,
                  0, 0, 0];
    
    // current status of the game
    this.result = "active"
    
    // if old state has been passed in to generate this state, copy the state over.
    if(old){
      for(let i = 0; i <= 8; i++){
        this.board[i] = old.board[i];
      }
      this.depth = old.depth;
      this.result = old.result;
      this.turn = old.turn;
    }
    
    //if there's a move object, advance the turn to that move's turn and place it at the specified position
    if(move){
      this.turn = move.turn;
      this.board[move.position] = move.turn;
      
      if(move.turn === "O"){
        this.depth++;
      }
      
      this.turn = move.turn == "X" ? "O" : "X";
    }
    
    // find all empty cells in the state and return them
    this.emptyCells = function() {
      let indexes = [];
      for(let i = 0; i < 9; i++){
        if(this.board[i] === 0){
          indexes.push(i);
        }
      }
      return indexes;
    }
    
    // check if the game is over.
    // return true if the game is over.
    this.gameOver = function(){
      // check horizontally
      for(let i = 0; i <= 6; i+=3){
        if(this.board[i] !== 0 && this.board[i] === this.board[i+1] && this.board[i+1] === this.board[i+2]){
          this.result = this.board[i];
          return true;
        }
      }
      
      // check vertically
      for(let i = 0; i <= 2; i++){
        if(this.board[i] !== 0 && this.board[i] === this.board[i+3] && this.board[i+3] === this.board[i+6]){
          this.result = this.board[i];
          return true;
        }
      }
      
      // check diagonally
      if(this.board[4] !== 0 && (((this.board[0] === this.board[4]) && (this.board[4] === this.board[8])) || 
                                ((this.board[2] === this.board[4]) && (this.board[4] === this.board[6])))){
        this.result = this.board[4];
        return true;
      }
      
      //if none of the win checks are met, check for a draw.
      let available = this.emptyCells();
      if(available[0] == undefined){
        this.result = "draw";
        return true;
      } else {
        return false;
      }
    };  
  }
  
  
  // unbeatable AI, original minimax algorithm adapted from Mostafa Samir:
  // https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
  let AI = function(){
    
    //current game being played by the AI.
    let game = {};
    
    // "global" variable used to store the next move, determined by the recursive minmax function
    let nextMove;
    
    // initialize the AI's symbol.  This will be defined via the UI.
    this.AISymbol = ""
    
    // for scoping
    let _this = this;
    
    // minimax function to determine the best move.
    function minimax(state) {
      
      // if this particular state is a finished game, return the score of the current board.
      if(state.gameOver()) {
        return Game.score(state);
      }
      else {
        //store all scores (index will correspond to the second array of moves)
        var scores = [];
        var moves = state.emptyCells();
  
        //calculate the minmax value for every possible move.
        for(let i = 0; i < moves.length; i++){
          
          //the next turn for the possible state will be whoever is not currently in this state.
          //let nextTurn = state.turn == "X" ? "O" : "X";
          
          //create a possible state for every possible move
          let possibleState = new State(state, {turn: state.turn, position: moves[i]});
  
          //push that state's score
          let currScore = minimax(possibleState)
          
          scores.push(currScore);
          
        }
       
  
        //TODO - replace with player/computer value
        if(state.turn == "X"){
          // if it's the player's turn, find the maximum value.
          let max = findMaxIndex(scores);
          // store the move to be executed
          nextMove = moves[max];
          
          // return the maximum score
          return scores[max];
        } else {
          // if it's the player's turn, find the maximum value.
          let min = findMinIndex(scores);
          
          // store the move to be executed
          nextMove = moves[min];
          
          // return the minimum score
          return scores[min];
        }
      }
    }
      
    this.plays = function(_game){
      game = _game;
    };  
    
    this.takeMove = function(_state){
      // call the minimax function to determine best move.
      _state.turn = _this.AISymbol;
      minimax(_state);
  
      let newState = new State(_state, {turn: _this.AISymbol, position: nextMove});
      myGame.advanceTo(newState);
    }
  }
  
  //game object
  let Game = function(AI){
    // initialize the AI
    this.ai = AI;
    
    // initialize the game state
    this.currentState = new State();
    this.currentState.turn = "X";
    
    // start game
    this.status = "start";
    
    // function to advance game to a new state
    this.advanceTo = function(_state){
      this.currentState = _state;   
      
    }
    
    // function to start the game
    this.start = function(){
      if(this.status = "start"){
        this.advanceTo(this.currentState);
        this.status = "running";
      }
    }
    
    // update UI after each move.
    this.updateUI = function(){
      
      // first, update the UI's board to reflect the current game board
      let board = this.currentState.board;
      for(let i = 0; i <= 8; i++){
        let selector = "#space-" + i;
        if(board[i]){
          $(selector).html(board[i]);
          $(selector).removeClass("empty");
        } else {
          $(selector).html("");
          $(selector).addClass("empty");
        }
      }
      
      // next, if the game is over, display the result.
      if(this.currentState.gameOver()){
        
        let message = "";
        
        if(this.currentState.result == "draw"){
          
          message = "It's a draw.";
          
        } else if(this.currentState.result != playerSymbol){
          
          message = "You lose!"
          
        }  else {
          
          message = "You win!"
          
        }
        
        $(".message").html(message);
        $(".message-area").fadeIn(600);
      }
    }
    
    // check to see if the move is valid before proceeding
    this.isValid = function(space){
      if(this.currentState.board[space] == 0){
        return true;
      } else {
        return false;
      }
    }
  }
  
  // score function for AI
  Game.score = function(_state){
    if(_state.result !== "active"){
      if(_state.result === "X"){
        return 10 - _state.depth;
      }
      else if(_state.result === "O"){
        return -10 + _state.depth;
      }
      else {
        return 0;
      }
    }
  }
  
  /*
   * Helper functions
   */
  
  //find index of the maximum value in an array
  let findMaxIndex = function(arr){
    let indexOfMax = 0;
    let max = 0;
  
    // find the index of the max score;
    if(arr.length > 1){
      for(let i = 0; i < arr.length; i++){
        if(arr[i] >= max){
          indexOfMax = i;
          max = arr[i]
        }
      }
    }
  
    return indexOfMax;
  }
  
  //find index of the minimum value in an array
  let findMinIndex = function(arr){
    let indexOfMin = 0;
    let min = 0;
  
    // find the index of the max score;
    if(arr.length > 1){
      for(let i = 0; i < arr.length; i++){
        if(arr[i] <= min){
          indexOfMin = i;
          min = arr[i]
        }
      }
    }
  
    return indexOfMin;
  }
  
  // initialize game
  let myAI;
  let myGame;
  
  
  // initialize variables for player and AI symbols
  let playerSymbol = "";
  let compSymbol = "";
  
  // only allow moves if the computer is done.
  let playerTurn;
  
    
  let playGame = function(){
  
    myAI = new AI();
    myGame = new Game(myAI);
    myAI.plays(myGame);
    
    myGame.updateUI();
    
    //set symbols in game state
    myAI.AISymbol = compSymbol;
    Game.prototype.playerSymbol = playerSymbol;
  
  
    // fade in the game board
    // use promise so that the callback only executes once as multiple items are being hidden.
    $(".hide-me").fadeOut(600).promise().done(function(){
      $(".board-area").fadeIn(600, function(){
        // if comp is X, proceed with first move after fadeIn is complete.
        if(myAI.AISymbol == "X"){
          myGame.ai.takeMove(myGame.currentState);
          myGame.updateUI();
          playerTurn = true;
        }
      });
    }); 
  }
   
  
  // define who will play X and who will play O based on user input, then display the board.
  $(".selection-area .btn").on("click", function(){
    playerSymbol = $(this).attr("id");
  
    if(playerSymbol == "X"){
      compSymbol = "O";
      playerTurn = true;
    } else {
      compSymbol = "X";
      playerTurn = false;
    }
     
    playGame();
  });
  
  
  // place moves when clicking on board spaces
  $(".space").on("click", function(){
    //grab the space's number.
    let num = $(this).attr("id");
    num = num.substr(6,6);
    if(playerTurn && myGame.isValid(num)){
      // create a new game state based on the player's choice.
      let newState = new State(myGame.currentState, {turn: playerSymbol, position: num});
  
      // if it's the player's turn, update the game state.
      myGame.advanceTo(newState);
      myGame.updateUI();
      playerTurn = false;
  
      // wait a second to simulate thought, then make the AI's move.
      setTimeout(function(){
        myGame.ai.takeMove(myGame.currentState);
        myGame.updateUI();
        // allow the player to move again once UI has been updated.
        playerTurn = true;
      }, 1000);
    }
  });
  
  $("#replay").on("click", playGame);
  }, []);

  return (
    <div id="game-container">
      <div class="container main">
  <div class="board-area">
    <table class="board">
      <tr>
        <td class="space text-center empty" id="space-0"></td>
        <td class="space text-center empty" id="space-1"></td>
        <td class="space text-center empty" id="space-2"></td>
      </tr>
      <tr>
        <td class="space text-center empty" id="space-3"></td>
        <td class="space text-center empty" id="space-4"></td>
        <td class="space text-center empty" id="space-5"></td>
      </tr>
      <tr>
        <td class="space text-center empty" id="space-6"></td>
        <td class="space text-center empty" id="space-7"></td>
        <td class="space text-center empty" id="space-8"></td>
      </tr>
    </table>
  </div>
  <div class="selection-area hide-me">
    <h3>Play As:</h3>
    <button class="btn" id="X">X</button>
    <button class="btn" id="O">O</button>
  </div>
  <div class="message-area hide-me">
    <h3 class="message">You Lose.</h3>
    <button class="btn" id="replay">Play Again</button>
  </div>
</div>
    </div>
  );
};

export default GameComponent;
