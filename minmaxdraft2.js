(Chess, chessInstance) => {

var action = {
    action: chessInstance.actionNumber,
    player: chessInstance.player,
    moves: []
  };
var actionmovesPlayerTurn1 = [];

var boardPlayerTurn1 = new Chess(chessInstance.export());
var movesPlayerTurn1 = [];

	
var movesPlayerTurn1 = boardPlayerTurn1.moves('object', true, true, true);
var movesPlayerTurn1LegalList = movesPlayerTurn1;

var opponentBestmovesPlayerTurn1scores = [];

	// Beginning of depth1 search:
for (i = 0; i < movesPlayerTurn1.length; i++) { //loop through players moves
		// make ith move (player) & generate board state:	
		// SKIP all moves that don't resolve check!	
	var boardOpponentTurn2 = new Chess(boardPlayerTurn1.export());
	var ithMove = movesPlayerTurn1[i];
	
/* 		console.log('test1');
		console.log('ith move start turn  : ' + ithMove.start.turn);
		console.log('ith move end turn: ' + ithMove.end.turn); */
		if (ithMove.start.turn != ithMove.end.turn){
					//SKIP time travel moves for now
			movesPlayerTurn1LegalList.splice(i, 1);  //remove the illegal element
			continue
		}
		boardOpponentTurn2.move(ithMove);
		//console.log('test2');
		
		
			// SKIP ILLEGAL MOVES 
			//(if after you move, the moving player is still in check, it's illegal)
		if (boardOpponentTurn2.inCheck){
/* 				console.log('skipping a move! step:' + JSON.stringify(i)); */
			movesPlayerTurn1LegalList.splice(i, 1);  //remove the illegal element
			continue
		}

	
	boardOpponentTurn2.submit(); 
/* 	console.log('test3'); */

	
	var movesOpponentTurn2 = boardOpponentTurn2.moves('object', true, true, true);
	var movesOpponentTurn2LegalList = movesOpponentTurn2;


	var scoresofOpponentMovesPlayerTurn2 = [];
			// Opponents moves loop:
		for (j = 0; j < movesOpponentTurn2.length; j++) { 
			
				// make jth move (opponent) & generate players depth2 moves:
			var boardPlayerTurn3 = new Chess(boardOpponentTurn2.export());
			var jthMove = movesOpponentTurn2[j];
			//console.log('test4');
			
			if (jthMove.start.turn != jthMove.end.turn){
					//SKIP time travel moves for now
				movesOpponentTurn2LegalList.splice(j, 1);  //remove the illegal element
				continue
			}
			
			
			boardPlayerTurn3.move(jthMove);
			if (boardPlayerTurn3.inCheck){
			//console.log('skipping a move! step:' + JSON.stringify(j));
				movesOpponentTurn2LegalList.splice(j, 1);
				continue
			}
					
			//console.log('continuing with step j:' + JSON.stringify(j));
			//console.log('move of step j:' + JSON.stringify(jthMove));
			boardPlayerTurn3.submit(); 
			


			var movesPlayerTurn3PlayerD2 = boardPlayerTurn3.moves('object', true, true, true);

				//append score to "scoresofOpponentMovesPlayerTurn2"
			scoresofOpponentMovesPlayerTurn2.push(movesOpponentTurn2LegalList.length - movesPlayerTurn3PlayerD2.length);
			  	//the difference between move possibilities
				//player at depth2 minus opponent
			}  
		
		//find the BEST move for the opponent (for the ith player move):
	var maxOpponentmoveindex = scoresofOpponentMovesPlayerTurn2.indexOf(Math.max.apply(Math, scoresofOpponentMovesPlayerTurn2));
	var maxOpponentmove = movesOpponentTurn2LegalList[maxOpponentmoveindex];
	var maxOpponentvalue = scoresofOpponentMovesPlayerTurn2[maxOpponentmoveindex];
			//console.log('scores of opponents moves: ' + JSON.stringify(scoresofOpponentMovesPlayerTurn2));

	
			//console.log('move of opponents moves: ' + JSON.stringify(movesOpponentTurn2));
		//Generate a list of opponentBestmovesPlayerTurn1 for each i (player move)
	opponentBestmovesPlayerTurn1scores.push(maxOpponentvalue);
	}			  
	var miniMaxValueIndex = opponentBestmovesPlayerTurn1scores.indexOf(Math.min.apply(Math, opponentBestmovesPlayerTurn1scores));
	var miniMaxValueMove = movesPlayerTurn1LegalList[miniMaxValueIndex];
	var maxOpponentvalue = opponentBestmovesPlayerTurn1scores[miniMaxValueIndex];
	
	var finalMove = miniMaxValueMove ;
	//console.log('time to use move i:' + JSON.stringify(miniMaxValueIndex));
	actionmovesPlayerTurn1.push(finalMove);
	boardPlayerTurn1.move(finalMove);
	
	action.moves = actionmovesPlayerTurn1;
  return action;
};