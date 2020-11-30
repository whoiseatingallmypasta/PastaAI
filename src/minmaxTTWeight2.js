function run(Chess, chessInstance) {
	var action = {
		action: chessInstance.actionNumber,
		player: chessInstance.player,
		moves: []
	};
	var actionmovesPlayerTurn1 = [];

	var boardPlayerTurn1 = chessInstance.copy();
	var movesPlayerTurn1 = boardPlayerTurn1.moves('object', true, true, true);
	var movesPlayerTurn1LegalList = boardPlayerTurn1.moves('object', true, true, true);
	var alpha = 100;

	var opponentBestmovesPlayerTurn1scores = [];

// Player, FIRST-Move Search LOOP:
	for (var i = movesPlayerTurn1.length -1; i >= 0; i--){
			// make ith move (player) & generate board state:	
			// loop through arrays backwards so splice doesn't reorder list indexes

		var ithMove = movesPlayerTurn1[i];

			//SKIP time travel moves:   (temporary)
		if (ithMove.start.turn != ithMove.end.turn){
				//remove the element from list we are interested in
			movesPlayerTurn1LegalList.splice(i, 1);  
				
			//Check for psuedo-mate: 
				//Since we are skipping time-travel moves, we need to check that we don't end up with an empty list of legal moves
				//(there are possibly still legal moves that are time-travel moves)
				//(we will do this check first because of the "continues" in the other loops)

				//check the FINAL loop iteration to see if the legal list now empty:
			if (i == 0 && movesPlayerTurn1LegalList.length == 0){ 
					
				var escapeplan = true

					//create a list of LEGAL time-travel moves:
				var movesPlayerTurn1LegalListEmergency = boardPlayerTurn1.moves('object', true, true, true);
				for (var q = movesPlayerTurn1.length -1; q >= 0; q--){
					var boardOpponentTurnQ = boardPlayerTurn1.copy();
					var qthMove = movesPlayerTurn1[q];
					boardOpponentTurnQ.move(qthMove);
					if (boardOpponentTurnQ.inCheck){
						movesPlayerTurn1LegalListEmergency.splice(q, 1);  
						continue
					}

				}

					//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
					//For now I'm going to just pick the first element:
				movesPlayerTurn1LegalList.push(movesPlayerTurn1LegalListEmergency[0])
					//hopefully the continue following this will skip the minmax entirely
			}

			continue
		}
		
		var boardOpponentTurn2 = boardPlayerTurn1.copy();
		boardOpponentTurn2.move(ithMove);

			// SKIP ILLEGAL MOVES: 
		if (boardOpponentTurn2.inCheck){
			movesPlayerTurn1LegalList.splice(i, 1);  

				//check the FINAL loop iteration to see if the legal list now empty:
				//(this is repeated because the last iteration can either be illegal or a TT move)
			if (i == 0 && movesPlayerTurn1LegalList.length == 0){ 
				
				var escapeplan = true

					//create a list of LEGAL time-travel moves:
				var movesPlayerTurn1LegalListEmergency = boardPlayerTurn1.moves('object', true, true, true);
				for (var q = movesPlayerTurn1.length -1; q >= 0; q--){
					var boardOpponentTurnQ = boardPlayerTurn1.copy();
					var qthMove = movesPlayerTurn1[q];
					boardOpponentTurnQ.move(qthMove);
					if (boardOpponentTurnQ.inCheck){
						movesPlayerTurn1LegalListEmergency.splice(q, 1);  
						continue
					}
				}
					//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
					//For now I'm going to just pick the first element:
				movesPlayerTurn1LegalList.push(movesPlayerTurn1LegalListEmergency[0])
				opponentBestmovesPlayerTurn1scores.push(0) //append an associated fake score with this state (so max function works)
					//hopefully the continue following this will skip the minmax entirely
			}
	
			continue
		}


		boardOpponentTurn2.submit(true); 

		
		
		var movesOpponentTurn2 = boardOpponentTurn2.moves('object', true, true, true);
		var movesOpponentTurn2LegalList = boardOpponentTurn2.moves('object', true, true, true);
		var movesOpponentTurn2TTList = [];
		var scoresofOpponentMovesPlayerTurn2 = [];
		
	// OPPONENT, SECOND-Move Search LOOP:
		for (var j = movesOpponentTurn2.length -1; j >= 0; j--){	
				// make jth move (opponent) & generate opponents moves (turn2):
			var jthMove = movesOpponentTurn2[j];

			if (jthMove.start.turn != jthMove.end.turn){
					//SKIP time travel moves for now
					//Note, that for scoring TT moves this isn't ideal because I'm counting
					//moves that might not be legal
					//NULL MOVES CAN FIX THIS!! (null moves in check make all TT moves illegal)
				movesOpponentTurn2LegalList.splice(j, 1);  
				movesOpponentTurn2TTList.push(jthMove)

				//psuedo-checkmate contingency
				if (j == 0 && movesOpponentTurn2LegalList.length == 0){ 
				
					var escapeplan2 = true

						//create a list of LEGAL time-travel moves:
					var movesOpponentTurn2LegalTTListEmergency = movesOpponentTurn2TTList;
					for (var q = movesOpponentTurn2TTList.length -1; q >= 0; q--){
						var boardOpponentTurnQ = boardOpponentTurn2.copy();
						var qthMove = movesOpponentTurn2TTList[q];
						boardOpponentTurnQ.move(qthMove);
						if (boardOpponentTurnQ.inCheck){
							movesOpponentTurn2LegalTTListEmergency.splice(q, 1);  
							continue
						}
					}
						//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
						//For now I'm going to just pick the first element:
					movesOpponentTurn2LegalList.push(movesOpponentTurn2LegalTTListEmergency[0])
					scoresofOpponentMovesPlayerTurn2.push(200) 
						//giving this a high score to punish checkmates!
						//append an associated fake score with this state (so max function works)
						//hopefully the continue following this will skip the minmax entirely
				}
				continue //skip the j-th loop (and consequently the k-th loop!)
			}

			var boardPlayerTurn3 = boardOpponentTurn2.copy();
			
			boardPlayerTurn3.move(jthMove);
			
			if (boardPlayerTurn3.inCheck){
				movesOpponentTurn2LegalList.splice(j, 1);

				//psuedo-checkmate contingency (copy)
				if (j == 0 && movesOpponentTurn2LegalList.length == 0){ 
				
					var escapeplan2 = true

						//create a list of LEGAL time-travel moves:
					var movesOpponentTurn2LegalTTListEmergency = movesOpponentTurn2TTList;
					for (var q = movesOpponentTurn2TTList.length -1; q >= 0; q--){
						var boardOpponentTurnQ = boardOpponentTurn2.copy();
						var qthMove = movesOpponentTurn2TTList[q];
						boardOpponentTurnQ.move(qthMove);
						if (boardOpponentTurnQ.inCheck){
							movesOpponentTurn2LegalTTListEmergency.splice(q, 1);  
							continue
						}
					}
						//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
						//For now I'm going to just pick the first element:
					movesOpponentTurn2LegalList.push(movesOpponentTurn2LegalTTListEmergency[0])
					scoresofOpponentMovesPlayerTurn2.push(200) 
						//giving this a high score to punish checkmates!
						//append an associated fake score with this state (so max function works)
						//hopefully the continue following this will skip the minmax entirely
				}
				continue //skip the j-th loop (and consequently the k-th loop!)
			}


			


			boardPlayerTurn3.submit(true); 
			var movesPlayerTurn3PlayerD2 = boardPlayerTurn3.moves('object', true, true, true);
			var movesPlayerTurn3PlayerD2LegalList = boardPlayerTurn3.moves('object', true, true, true);
			var movesPlayerTurn3PlayerD2TTList = [];
			
// PLAYER, THIRD-Move Search LOOP:	(for scoring)	
			for (var k = movesPlayerTurn3PlayerD2.length -1; k >= 0; k--) {
				var kthMove = movesPlayerTurn3PlayerD2[k];
				if (kthMove.start.turn != kthMove.end.turn){
						//SKIP time travel moves for now
					movesPlayerTurn3PlayerD2LegalList.splice(k, 1);  
					movesPlayerTurn3PlayerD2TTList.push(kthMove)


						//psuedo-checkmate contingency (copy)
					if (k == 0 && movesPlayerTurn3PlayerD2LegalList.length == 0){ 
					
						var escapeplan3 = true

							//create a list of LEGAL time-travel moves:
						var movesPlayerTurn3PlayerD2TTListEmergency = movesPlayerTurn3PlayerD2TTList;
						for (var q = movesPlayerTurn3PlayerD2TTList.length -1; q >= 0; q--){
							var boardOpponentTurnQ = boardPlayerTurn3.copy();
							var qthMove = movesPlayerTurn3PlayerD2TTList[q];
							boardOpponentTurnQ.move(qthMove);
							if (boardOpponentTurnQ.inCheck){
								movesPlayerTurn3PlayerD2TTListEmergency.splice(q, 1);  
								continue
							}
						}
							//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
							//For now I'm going to just pick the first element:
						movesOpponentTurn2LegalList.push(movesPlayerTurn3PlayerD2TTListEmergency[0])
						scoresofOpponentMovesPlayerTurn2.push(-200) 
							//giving this a high score to punish checkmates! 
							//append an associated fake score with this state (so max function works)
							//hopefully the continue following this will skip the minmax entirely
					}
					continue //skip the k-th loop

				}
					//var boardOpponentTurn4 = new Chess(boardPlayerTurn3.export());
				var boardOpponentTurn4 = boardPlayerTurn3.copy();
				boardOpponentTurn4.move(kthMove);
			
				if (boardOpponentTurn4.inCheck){
					//console.log('skipping a move! step:' + JSON.stringify(j));
					movesPlayerTurn3PlayerD2LegalList.splice(k, 1);
					
					
					//psuedo-checkmate contingency (copy)
					if (k == 0 && movesPlayerTurn3PlayerD2LegalList.length == 0){ 
				
						var escapeplan3 = true

							//create a list of LEGAL time-travel moves:
						var movesPlayerTurn3PlayerD2TTListEmergency = movesPlayerTurn3PlayerD2TTList;
						for (var q = movesPlayerTurn3PlayerD2TTList.length -1; q >= 0; q--){
							var boardOpponentTurnQ = boardPlayerTurn3.copy();
							var qthMove = movesPlayerTurn3PlayerD2TTList[q];
							boardOpponentTurnQ.move(qthMove);
							if (boardOpponentTurnQ.inCheck){
								movesPlayerTurn3PlayerD2TTListEmergency.splice(q, 1);  
								continue
							}
						}
							//Now here I should really go through a new minimax loop with the ith elements now being the emergency list
							//For now I'm going to just pick the first element:
						movesOpponentTurn2LegalList.push(movesPlayerTurn3PlayerD2TTListEmergency[0])
						scoresofOpponentMovesPlayerTurn2.push(-200) 
							//giving this a high score to punish checkmates! 
							//append an associated fake score with this state (so max function works)
							//hopefully the continue following this will skip the minmax entirely
					}
					continue //skip the k-th loop

				} 
				
			}
			//Turn 2 scoring:				
			var presentMovesScore = movesOpponentTurn2LegalList.length - movesPlayerTurn3PlayerD2LegalList.length
			var travelMovesScore = movesOpponentTurn2TTList.length - movesPlayerTurn3PlayerD2TTList.length
			var ttWeight = 0;
			var score = presentMovesScore + ttWeight*travelMovesScore;
			scoresofOpponentMovesPlayerTurn2.push(score);
			if (score > alpha){
				break
				//alpha pruning
				//if the score is greater than alpha, it means that this move is already better for the opponent 
				//it'll never get picked so we skip it
			}
		} //end of j-loop

		//Finding maximum of opponent's scores:
		var scoresofOpponentMovesPlayerTurn2 = scoresofOpponentMovesPlayerTurn2.reverse()
		var maxOpponentmoveindex = scoresofOpponentMovesPlayerTurn2.indexOf(Math.max.apply(Math, scoresofOpponentMovesPlayerTurn2));
		var maxOpponentmove = movesOpponentTurn2LegalList[maxOpponentmoveindex];
		var maxOpponentvalue = scoresofOpponentMovesPlayerTurn2[maxOpponentmoveindex];
		if (maxOpponentvalue < alpha){   //we will pick the lowest score, so this is our reference
			var alpha = maxOpponentvalue;
		} 
		opponentBestmovesPlayerTurn1scores.push(maxOpponentvalue);
	}   //end of i-th loop		  

	//Finding minimum of player's scores: 
	var opponentBestmovesPlayerTurn1scores = opponentBestmovesPlayerTurn1scores.reverse()
	var miniMaxValueIndex = opponentBestmovesPlayerTurn1scores.indexOf(Math.min.apply(Math, opponentBestmovesPlayerTurn1scores));
	var miniMaxValueMove = movesPlayerTurn1LegalList[miniMaxValueIndex];
	var maxOpponentvalue = opponentBestmovesPlayerTurn1scores[miniMaxValueIndex];
	
	var finalMove = miniMaxValueMove;
	//console.log(boardPlayerTurn1.export())
	//console.log('time to use move i:' + JSON.stringify(miniMaxValueIndex));
	actionmovesPlayerTurn1.push(finalMove);
	boardPlayerTurn1.move(finalMove);

	action.moves = actionmovesPlayerTurn1;
	return action;
};

module.exports = run;