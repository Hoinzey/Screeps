var creepManager = require('creepManager');

module.exports.loop = function () {
    for(var currentRoomName in Game.rooms){
        var currentRoom = Game.rooms[currentRoomName];
        buildPaths(currentRoom);
        creepManager.run(currentRoom);
    }
}

function buildPaths(room){
    //room.createFlag(x,y,COLOR_RED)
    console.log(JSON.stringify(room.find(FIND_MY_SPAWNS).pos));

    //createConstructionSite
}