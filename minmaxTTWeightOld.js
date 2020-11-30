function run(Chess, chessInstance) {
	var action = {
		action: chessInstance.actionNumber,
		player: chessInstance.player,
		moves: []
	};
	var actionmovesPlayerTurn1 = [];

	var boardPlayerTurn1 = new Chess(chessInstance.export());

		
	var movesPlayerTurn1 = boardPlayerTurn1.moves('object', true, true, true);
	var movesPlayerTurn1LegalList = movesPlayerTurn1;

	var opponentBestmovesPlayerTurn1scores = [];

		// Beginning of depth1 search:
	for (i = 0; i < movesPlayerTurn1.length; i++) { //loop through players moves
			// make ith move (player) & generate board state:	
			// SKIP all moves that don't resolve check!	

		var ithMove = movesPlayerTurn1[i];

	/* 		console.log('test1');
			console.log('ith move start turn  : ' + ithMove.start.turn);
			console.log('ith move end turn: ' + ithMove.end.turn); */
		if (ithMove.start.turn != ithMove.end.turn){
					//SKIP time travel moves for now
			movesPlayerTurn1LegalList.splice(i, 1);  //remove the illegal element
			continue
		}
		
		var boardOpponentTurn2 = new Chess(boardPlayerTurn1.export());
		boardOpponentTurn2.move(ithMove);
		
			// SKIP ILLEGAL MOVES 
			//(if after you move, the moving player is still in check, it's illegal)
		if (boardOpponentTurn2.inCheck){
			//console.log('check11?' + JSON.stringify(i));
	/* 				console.log('skipping a move! step:' + JSON.stringify(i)); */
			movesPlayerTurn1LegalList.splice(i, 1);  //remove the illegal element
			//console.log('check11 OK' + JSON.stringify(i));
			continue
		}

		
		boardOpponentTurn2.submit(true); 
	/* 	console.log('test3'); */

		
		var movesOpponentTurn2 = boardOpponentTurn2.moves('object', true, true, true);
		var movesOpponentTurn2LegalList = movesOpponentTurn2;
		var movesOpponentTurn2TTList = [];
		
		var scoresofOpponentMovesPlayerTurn2 = [];
				// Opponents moves loop:
				
			
			for (j = 0; j < movesOpponentTurn2.length; j++) { 
				
					// make jth move (opponent) & generate players depth2 moves:
				var jthMove = movesOpponentTurn2[j];
				//console.log('test4');
				
				if (jthMove.start.turn != jthMove.end.turn){
					//console.log('check0?' + JSON.stringify(j));
						//SKIP time travel moves for now
						//Note, that for scoring TT moves this isn't ideal because I'm counting
						//moves that might not be legal
						//NULL MOVES CAN FIX THIS!! (null moves in check make all TT moves illegal)
					movesOpponentTurn2LegalList.splice(j, 1);  
					movesOpponentTurn2TTList.push(jthMove)
					//console.log('check0OK' + JSON.stringify(j));
					continue
				}

				//var boardPlayerTurn3 = new Chess(boardOpponentTurn2.export());
				var boardPlayerTurn3 = boardOpponentTurn2.copy();
				
				boardPlayerTurn3.move(jthMove);
				
				if (boardPlayerTurn3.inCheck){
					//console.log('check1?' + JSON.stringify(j));
					movesOpponentTurn2LegalList.splice(j, 1);
					//console.log('check1 OK' + JSON.stringify(j));
					continue
				}
						
				//console.log('continuing with step j:' + JSON.stringify(j));
				//console.log('move of step j:' + JSON.stringify(jthMove));
				boardPlayerTurn3.submit(true); 
				


				var movesPlayerTurn3PlayerD2 = boardPlayerTurn3.moves('object', true, true, true);
				
				//Generate a list of time travel moves (and non-timetravel moves):
				var movesPlayerTurn3PlayerD2LegalList = movesPlayerTurn3PlayerD2;
				var movesPlayerTurn3PlayerD2TTList = [];
				
				for (k = 0; k < movesPlayerTurn3PlayerD2.length; k++) {
					var kthMove = movesPlayerTurn3PlayerD2[k];
					console.log('test3')
					if (kthMove.start.turn != kthMove.end.turn){
							//SKIP time travel moves for now
						//console.log('check k?' + JSON.stringify(k));
						movesPlayerTurn3PlayerD2LegalList.splice(k, 1);  
						movesPlayerTurn3PlayerD2TTList.push(kthMove)
						//console.log('check OK  ' + JSON.stringify(k));
						continue
					}
	/* 				var boardOpponentTurn4 = new Chess(boardPlayerTurn3.export());
					boardOpponentTurn4.move(kthMove);
				
					if (boardOpponentTurn4.inCheck){
				//console.log('skipping a move! step:' + JSON.stringify(j));
						movesPlayerTurn3PlayerD2LegalList.splice(k, 1);
						continue
					} */
					
				}
				
				
				
					//append score to "scoresofOpponentMovesPlayerTurn2"
				var presentMovesScore = movesOpponentTurn2LegalList.length - movesPlayerTurn3PlayerD2LegalList.length
				var travelMovesScore = movesOpponentTurn2TTList.length - movesPlayerTurn3PlayerD2TTList.length
				var ttWeight = 0;
				scoresofOpponentMovesPlayerTurn2.push(presentMovesScore + ttWeight*travelMovesScore);
					//the difference between move possibilities
					//player at depth2 minus opponent
				}  
		console.log('test4')
			//find the BEST move for the opponent (for the ith player move):
		var maxOpponentmoveindex = scoresofOpponentMovesPlayerTurn2.indexOf(Math.max.apply(Math, scoresofOpponentMovesPlayerTurn2));
		var maxOpponentmove = movesOpponentTurn2LegalList[maxOpponentmoveindex];
		var maxOpponentvalue = scoresofOpponentMovesPlayerTurn2[maxOpponentmoveindex];
				//console.log('scores of opponents moves: ' + JSON.stringify(scoresofOpponentMovesPlayerTurn2));
		
		
				//console.log('move of opponents moves: ' + JSON.stringify(movesOpponentTurn2));
			//Generate a list of opponentBestmovesPlayerTurn1 for each i (player move)
		opponentBestmovesPlayerTurn1scores.push(maxOpponentvalue);
		}			  
		console.log('test5')
		console.log('size of opponentBestmovesPlayerTurn1scores: ' + JSON.stringify(opponentBestmovesPlayerTurn1scores.length));
		var miniMaxValueIndex = opponentBestmovesPlayerTurn1scores.indexOf(Math.min.apply(Math, opponentBestmovesPlayerTurn1scores));
		var miniMaxValueMove = movesPlayerTurn1LegalList[miniMaxValueIndex];
		var maxOpponentvalue = opponentBestmovesPlayerTurn1scores[miniMaxValueIndex];
		
		var finalMove = miniMaxValueMove;
		//console.log('time to use move i:' + JSON.stringify(miniMaxValueIndex));
		actionmovesPlayerTurn1.push(finalMove);
		console.log('test6')
		boardPlayerTurn1.move(finalMove);

		action.moves = actionmovesPlayerTurn1;
		console.log('test7')
	return action;
};

module.exports = run;