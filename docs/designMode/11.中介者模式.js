// function Player(name, teamColor) {
//   this.partners = [];
//   this.enemies = [];
//   this.state = 'live';
//   this.name = name;
//   this.teamColor = teamColor;
// }

// Player.prototype.win = function() {
//   console.log('winner:' + this.name)
// }

// Player.prototype.lose = function() {
//   console.log('loser:' + this.name)
// }

// Player.prototype.die = function() {
//   var allDead = true;
//   this.state = 'dead';
//   for(var i = 0, partner; partner = this.partners[i++];) {
//     if (partner.state != 'dead') {
//       allDead = false;
//       break;
//     }
//   }
//   if (allDead === true) {
//     this.lose();
//     for(var i = 0, partner; partner = this.partners[i++];) {
//       partner.lose();
//     }
//     for(var i = 0, enemy; enemy = this.enemies[i++];) {
//       console.log(this.enemies)
//       enemy.win();
//     }
//   }
// }

// var players = [];

// var playerFactory = function(name, teamColor) {
//   var newPlayer = new Player(name, teamColor);
//   for(var i = 0, player; player = players[i++];) {
//     if (player.teamColor === newPlayer.teamColor) {
//       player.partners.push(newPlayer)
//       newPlayer.partners.push(player)
//     } else {
//       player.enemies.push(newPlayer);
//       newPlayer.enemies.push(player)
//     }
//   }
//   players.push(newPlayer);
//   return newPlayer;
// }
// console.log(players)

// var player1 = playerFactory('皮蛋', 'red');
// var player2 = playerFactory('小乖', 'red');
// var player3 = playerFactory('宝宝', 'red');
// var player4 = playerFactory('小强', 'red');

// var player5 = playerFactory('黑妞', 'blue');
// var player6 = playerFactory('葱头', 'blue');
// var player7 = playerFactory('胖墩', 'blue');
// var player8 = playerFactory('海盗', 'blue');

// player1.die();
// player2.die();
// player3.die();
// player4.die();


// 泡泡堂中介者模式
 
function Player(name, teamColor) {
  this.state = 'live';
  this.name = name;
  this.teamColor = teamColor;
}

Player.prototype.win = function() {
  console.log('won:' + this.name)
}

Player.prototype.lose = function() {
  console.log('lost:' + this.name)
}

/**玩家死亡 */

Player.prototype.die = function() {
  this.state = 'dead';
  playDirecotr.reciveMessage('playerDead', this); // 发消息给中介者，玩家死亡
}

/** 移除玩家 */

Player.prototype.remove = function() {
  playDirecotr.reciveMessage('removePlayer', this); // 发消息给中介者，移除玩家
}

/** 玩家换队 */

Player.prototype.changeTeam = function(color) {
  playDirecotr.reciveMessage('changeTeam', this, color); // 发消息给中介者，玩家换队
}

var playerFactory = function(name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  playDirecotr.reciveMessage('addPlayer', newPlayer); // 发消息给中介者，新增玩家
  return newPlayer;
}

var playDirecotr = (function() {
  var players = {}; 
  var operations = {};
  /** 新增 */
  operations.addPlayer = function(player) {
    var teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player)
  }
  /**移除 */
  operations.removePlayer = function(player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor] || [];
    for(var i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }
  /**换队 */
  operations.changeTeam = function(player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  }
  /** 死亡 */
  operations.playerDead = function(player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor] || [];
    var allDead = true;
    this.state = 'dead';
    for(var i = 0, player; player = teamPlayers[i++];) {
      if (player.state != 'dead') {
        allDead = false;
        break;
      }
    }
    if (allDead === true) {
      this.lose();
      for(var i = 0, player; player = teamPlayers[i++];) {
        player.lose();
      }
      for(var i = 0, enemy; enemy = this.enemies[i++];) {
        console.log(this.enemies)
        enemy.win();
      }
    }

    for(var color in players) {
      if (color !== teamColor) {
        var teamPlayers = players[color];
        for(var i = 0, player; player = teamPlayers[i++];) {
          player.win()
        } 
      }
    }
  }
})
