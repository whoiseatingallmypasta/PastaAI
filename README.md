# PastaAI
An AI for open-source 5D chess game.


# Current Build Summary

The current version of the code is just a work-in-progress draft.

The code looks at the board state at depth2 and finds the minMax for the a heuristic 
that finds is based on the "difference in total number of moves of white vs black"

# To-do list

* AI vs RandomAI

* Ensure lateral moves work correctly

* Need more tunable scoring systems for each board state

* Need to add at least one more layer of depth

* Incorporation of null moves


# Algorithmic Ideas 
## 1. Tuning which types of moves are ignored and when (before search)

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


## 2. Implement many different tunable scoring systems

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
		
```
[Variant "standard"]
1w. 1:e2:e3
1b. 1:e7:e6
2w. 2:Qd1:g4
2b. 2:Qd8:e7
3w. 3:Bf1:b5
3b. 3:Nb8:c6
4w. 4:Bb5:xc6
4b. 4:d7:xc6
5w. 5:Nb1:c3
5b. 5:Qe7:h4
6w. 6:Qg4:xh4
6b. 6:g7:g5
7w. 7:Qh4:g4
7b. 7:Bf8:d6
8w. 8:Qg4:xe6
8b. 8:Bc8:xe6
9w. 9:g2:g4
9b. 9:Ng8:f6
10w. 10:Ng1:f3
10b. 10:Nf6:e4
11w. 11:Nc3:xe4
11b. 11:Bd6:b4
12w. 12:Ne4:f6
12b. 12:Ke8:d8
13w. 13:c2:c3
13b. 13:Be6:c4
14w. 14:Nf6:d7
14b. 14:Kd8:xd7
15w. 15:Nf3:e5
15b. 15:Kd7:e8
16w. 16:Ne5:xc4
16b. 16:Ke8:f8
17w. 17:c3:xb4
17b. 17:Kf8:g7
18w. 18:Ke1:e2
18b. 18:Ra8:d8
19w. 19:d2:d4
19b. 19:Rd8:xd4
20w. 20:e3:xd4
20b. 20:Rh8:e8
21w. 21:Nc4:e5
21b. 21:Re8:xe5
22w. 22:d4:xe5
22b. 22:Kg7:g6
23w. 23:Bc1:e3
23b. 23:c6:c5
24w. 24:Be3:xc5
24b. 24:Kg6:g7
25w. 25:Bc5:d6
25b. 25:c7:xd6
26w. 26:Ra1:c1
26b. 26:d6:xe5
27w. 27:Rc1:c3
27b. 27:f7:f5
28w. 28:Rc3:c7
28b. 28:Kg7:g6
29w. 29:g4:xf5
29b. 29:Kg6:f6
30w. 30:Rh1:d1
30b. 30:a7:a6
31w. 31:Rd1:d6
31b. 31:Kf6:xf5
32w. 32:Rc7:f7
32b. 32:Kf5:g4
33w. 33:Rd6:h6
33b. 33:e5:e4
34w. 34:b4:b5
34b. 34:a6:xb5
35w. 35:a2:a3
35b. 35:b7:b6
36w. 36:b2:b4
36b. 36:e4:e3
37w. 37:f2:f4
37b. 37:g5:xf4
38w. 38:h2:h3
38b. 38:Kg4:g3
39w. 39:Ke2:e1
39b. 39:e3:e2
40w. 40:Rf7:c7
40b. 40:f4:f3
41w. 41:Rc7:c3
41b. 41:Kg3:g2
42w. 42:Rh6:g6
42b. 42:h7:xg6
43w. 43:Rc3:d3
43b. 43:g6:g5
44w. 44:Rd3:e3
44b. 44:Kg2:g3
45w. 45:a3:a4
45b. 45:Kg3:g2
46w. 46:a4:xb5
46b. 46:g5:g4
47w. 47:h3:xg4
48w. 48:Re3:d3
48b. 48:Kg3:g2
49w. 49:g4:g5
49b. 49:f3:f2
50w. 50:Ke1:xe2
50b. 50:f2:Bf1
```