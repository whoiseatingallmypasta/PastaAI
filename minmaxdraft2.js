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


var opponentBestmovesPlayerTurn1scores = [];


	// Beginning of depth1 search:
for (i = 0; i < movesPlayerTurn1.length; i++) { //loop through players moves
		// make ith move (player) & generate board state:	
		// SKIP all moves that don't resolve check!	
	var boardOpponentTurn2 = new Chess(boardPlayerTurn1.export());
	var ithMove = movesPlayerTurn1[i];
	
		//checking for illegal moves (because we're ALREADY in check)
		//we will do .inCheck -> .move -> .inCheck
		// if we are .inCheck a second time, then its illegal!
	if (boardOpponentTurn2.inCheck) {
		boardOpponentTurn2.move(ithMove);
		if (boardOpponentTurn2.inCheck){
			console.log('skipping a move! step:' + JSON.stringify(i));
			continue //skip the iteration considering the illegal move		
		}
	}else{
		boardOpponentTurn2.move(ithMove);
	}
		console.log('continuing with step:' + JSON.stringify(i));
	
	boardOpponentTurn2.submit(); 


	
	var movesOpponentTurn2 = boardOpponentTurn2.moves('object', true, true, true);



	var scoresofOpponentMovesPlayerTurn2 = [];
			// Opponents moves loop:
		for (j = 0; j < movesOpponentTurn2.length; j++) { 
			
				// make jth move (opponent) & generate players depth2 moves:
			var boardPlayerTurn3 = new Chess(boardOpponentTurn2.export());
			var jthMove = movesOpponentTurn2[j];
			
				//same checkmate checker:  we will do .inCheck -> .move -> .inCheck
/* 			if (boardPlayerTurn3.inCheck) {
				boardPlayerTurn3.move(jthMove);
				console.log('this thing ran once!');
				if (boardPlayerTurn3.inCheck){
					console.log('skipping a j move! step:' + JSON.stringify(j));
					continue //skip the iteration considering the illegal move
				}
			}else{
				boardPlayerTurn3.move(jthMove);
			} */
			boardPlayerTurn3.move(jthMove);
			if (boardPlayerTurn3.inCheck){
			console.log('skipping a move! step:' + JSON.stringify(i));
			continue
			}
					
			console.log('continuing with step j:' + JSON.stringify(j));
			console.log('move of step j:' + JSON.stringify(jthMove));
			boardPlayerTurn3.submit(); 



			var movesPlayerTurn3PlayerD2 = boardPlayerTurn3.moves('object', true, true, true);

				//append score to "scoresofOpponentMovesPlayerTurn2"
			scoresofOpponentMovesPlayerTurn2.push(movesOpponentTurn2.length - movesPlayerTurn3PlayerD2.length);
			  	//the difference between move possibilities
				//player at depth2 minus opponent
			}  
		
		//find the BEST move for the opponent (for the ith player move):
	var maxOpponentmoveindex = scoresofOpponentMovesPlayerTurn2.indexOf(Math.max.apply(Math, scoresofOpponentMovesPlayerTurn2));
	var maxOpponentmove = movesOpponentTurn2[maxOpponentmoveindex];
	var maxOpponentvalue = scoresofOpponentMovesPlayerTurn2[maxOpponentmoveindex];
			//console.log('scores of opponents moves: ' + JSON.stringify(scoresofOpponentMovesPlayerTurn2));

	
			//console.log('move of opponents moves: ' + JSON.stringify(movesOpponentTurn2));
		//Generate a list of opponentBestmovesPlayerTurn1 for each i (player move)
	opponentBestmovesPlayerTurn1scores.push(maxOpponentvalue);
	}			  
	var miniMaxValueIndex = opponentBestmovesPlayerTurn1scores.indexOf(Math.min.apply(Math, opponentBestmovesPlayerTurn1scores));
	var miniMaxValueMove = movesPlayerTurn1[miniMaxValueIndex];
	var maxOpponentvalue = opponentBestmovesPlayerTurn1scores[miniMaxValueIndex];
	
	var finalMove = miniMaxValueMove ;
	console.log('time to use move i:' + JSON.stringify(miniMaxValueIndex));
	actionmovesPlayerTurn1.push(finalMove);
	boardPlayerTurn1.move(finalMove);
	
	action.moves = actionmovesPlayerTurn1;
  return action;
};