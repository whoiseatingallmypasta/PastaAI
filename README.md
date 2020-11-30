# PastaAI
An AI for open-source 5D chess game.


# Current Build Summary

The current version of the code is just a work-in-progress draft.

The code looks at the board state at depth2 and finds the minMax for the a heuristic 
that finds is based on the "difference in total number of moves of white vs black"

# To-do list

* Need to fix bug associated with checks that occur in depth

* Need to do depth2 search for multiple boards

* Need to extend this past depth2

* Need to generalize the "score" for each board state

* Need to reduce the number of moves that are considered, particularly for combinatoric board states


# Algorithmic Ideas 
## 1. "Hand tuning of what board states are considered"

The main issue of developing an AI for 5D chess is that the total number of moves available in a single turn can be very large. For example, if there are two "lateral boards" available on a single turn. If pieces can travel back in time on each board, the total amount of distinct moves includes the "combinatorics" of each individual move. If you send a knight back in time on the first board, it creates new boards which the second board can interact with. So generating the entire set of possible moves quickly becomes exponentially complicated as the number of parallel boards increases. 

Even though there is a very large, increasing set of move combinations - players of 5D chess will notice that they, themselves, do not spend a ton of time thinking about hundreds of different move permutations. This suggests that there is a way  

Many move combinations are not interesting. And while technically generating an exaustive list of all the move possiblities is hard,
we can come up with a rule-of-thumb for what moves are worth considering. Some examples:

* Ignoring combinatoric time travel moves 

	while sometimes doing 2 time travel moves in a row is good - most of the time it isnt interesting	
	
	so all combinatoric moves can be ignored for now
	
* Ignore time travel moves when behind on timelines

	when a player is behind on timelines, their timetravel moves can be largely ignored 
	
* Ignore pawn moves away from king

* Ignore sacrifical squares

	* moving a pieces to an empty square that is being attacked by an enemy piece is usually bad
	
* Reject time travel moves below a certain threshold

	* time traveling is only good if the move is VERY good, so time travel moves should be largely ignored unless they look exceptionally good (or if they are the only choice left)
	
* Add some "parameters" to these "hand-tuned" systems that can be adjusted

Not only can the scoring systems have tunable parameters, but the actual AI's consideration of board states can also be tunable.
	
Some more examples of adjustable parameters:
	
*  "how far away pawns are from king for the move be ignored"

*  how good of a score a board must look for time travel to be ignored

*  at certain depths should certain attributes be ignored


## 2. "Implement many different tunable scoring systems"

We will add a number of different functions that assign a score to the board state
Each function will have variables that are "tunable" and we will potentially tweak
the values of each of these variables to "tune" the AI

(Potentially we can run a number of these in parallel and have them "fight" eachother,
 to decide the better tuning parameters)

Example list of interesting scoring methods:

* "total move difference"  - finished!

* score for knights 2 away from king

* knights 1 away from king

* bishops on an open diagonal

* enemy has an exposed triagonal to king 

	* multiplier for how many turns this is true

	* boolean on if a queen is available

* exposed 2D time diagonal to king

	* multiplier on number of turns

	* multiplier on number of bishops and queens
		
