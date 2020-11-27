const Chess = require('5d-chess-js');
const Bot = require('./minmaxdraft.js');

var chess = new Chess();
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
