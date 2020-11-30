const Chess = require('5d-chess-js');
//const Bot = require('./minmaxdraft.js');
const Bot = require('./minmaxTTWeight2.js');
//const Botrand = require('./random.js');
//test for required turn1 time travel:
//gameforTest = '[Variant \"standard\"]; 1w. 1:e2:e4; 1b. 1:e7:e5; 2w. 2:d2:d4; 2b. 2:d7:d5; 3w. 3:e4:xd5;3b. 3:e5:xd4; 4w. 4:Qd1:xd4; 4b. 4:Qd8:xd5; 5w. 5:Qd4:xd5; 5b. 5:Ng8:f6; 6w. 6:Ng1:f3; 6b. 6:Bf8:c5; 7w. 7:Qd5:xc5; 7b. 7:Nb8:a6; 8w. 8:Nb1:a3; 8b. 8:Na6:b4; 9w. 9:Qc5:xb4; 9b. 9:Bc8:h3; 10w. 10:Bc1:f4; 10b. 10:a7:a6; 11w. 11:Bf4:xc7; 11b. 11:b7:b5; 12w. 12:Ra1:d1; 12b. 12:Ra8:a7; 13w. 13:Qb4:g4; 13b. 13:h7:h6; 14w. 14:Qg4:xg7; 14b. 14:Bh3:g4; 15w. 15:Bf1:c4; 15b. 15:Ra7:a8; 16w. 16:Ke1:d2; 16b. 16:Rh8:h7; 17w. 17:Kd2:c1;17b. 17:Rh7:h8;18w. 18:Qg7:xf6;18b. 18:Rh8:h7;19w. 19:Qf6:g7;19b. 19:Rh7:h8;20w. 20:Rh1:e1; 20b. 20:Bg4:e6; 21w. 21:Re1:f1; 21b. 21:Be6:h3; 22w. 22:g2:xh3; 22b. 22:h6:h5; 23w. 23:Rf1:e1'
gameforTest = '[Variant \"standard\"]'



var chess = new Chess();
chess.import(gameforTest)
var bot1Global = {};
var bot2Global = {};

console.time('Total Bot Time');
for(var i = 0;!chess.inCheckmate && i < 100;i++) {
  var action = {};

  if(chess.player === 'white') {
    action = Bot(Chess, new Chess(chess.export()), undefined, bot1Global);
  }
  else {
    action = Bot(Chess, new Chess(chess.export()), undefined, bot2Global);
  }
  try {
    for(var j = 0;j < action.moves.length;j++) {
      chess.move(action.moves[j]);
    }
    chess.submit();
    console.log(chess.export('notation_short'));
  }
  catch(err) {
    console.log(action);
    console.log(chess.moves('notation_short', false, false));
    console.log(chess.export('notation_short'));
    throw err;
  }
}
console.timeEnd('Total Bot Time');
console.log(chess.export('notation_short'));
