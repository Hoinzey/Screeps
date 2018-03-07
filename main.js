var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var creepManager = require('creepManager');

module.exports.loop = function () {
    for(var currentRoomName in Game.rooms){
        var currentRoom = Game.rooms[currentRoomName];
        creepManager.run(currentRoom);
    }
}