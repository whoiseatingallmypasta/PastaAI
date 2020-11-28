# PastaAI
An AI for open-source 5D chess game..


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


#1 Algorithmic Ideas 
#2 "Implement many different scoring systems"

We will add a number of different functions that assign a score to the board state
Each function will have variables that are "tunable" and we will potentially tweak
the values of each of these variables to "tune" the AI

(Potentially we can run a number of these in parallel and have them "fight" eachother,
 to decide the better tuning parameters)

	#List of heuristic Scores to code:
	
		#1 "total move difference"
		
		#2 score for knights 2 away from king
		
		#3 knights 1 away from king
		
		#4 bishops on an open diagonal
		
		#5 enemy has an exposed triagonal to king 
		
			#(multiplier for how many turns this is true)
			
			#(boolean on if a queen is available)
			
		#6 exposed 2D time diagonal to king
		
			#multiplier on number of turns
			
			#multiplier on number of bishops and queens
		
# Big idea #2: "Hand tuning of what board states are considered"

Many move combinations are not interesting. And while technically generating an exaustive list of all the move possiblities is hard,
we can come up with a heuristic for what moves will be considered. Some examples:

	#Ignoring combinatoric time travel moves 
	
		while sometimes doing 2 time travel moves in a row is good - most of the time it isnt interesting	
		
		so all combinatoric moves can be ignored for now
		
	#Ignore time travel moves when behind on timelines
	
		when a player is behind on timelines, their timetravel moves can be largely ignored 
		
	#Ignore pawn moves away from king
	
    #Ignore sacrifical squares
	
		moving a pieces to an empty square that is being attacked by an enemy piece is usually bad
		
	#Reject time travel moves below a certain threshold
	
		time traveling is only good if the move is VERY good, 
		
		so time travel moves should be largely ignored unless they look exceptionally good
		
		(or if they are the only choice left)
		
	#Add some "parameters" to these "hand-tuned" systems that can be adjusted
	
		for example, having a score treshold for what states are considered can be a parameter that the genetic algorithm can optimize
		
		Some more examples of adjustable parameters:
		
		#1 "which pieces are considered at"
		
		#2 "how far away pawns are from king to be ignored"
		
		#3 how good of a score a board must look for time travel to be ignored
		
		#4 at certain depths should certain attributes be ignored

"total moves" (white - black)

Score for each pieces