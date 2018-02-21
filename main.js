var creepHandler = require('creepHandler');
var creepFactory = require('creepFactory');
// var roomBuilder = require('roomBuilder');
var roomFoundations = require('roomFoundations');
var roomSetup = require('roomSetup');
// const profiler = require('screeps-profiler');

// profiler.enable();

module.exports.loop = function () {
    // profiler.wrap(function() {
    for(var currentRoomName in Game.rooms){
        var currentRoom = Game.rooms[currentRoomName];
        // if(currentRoom.memory.setupComplete==undefined){
            roomSetup.run(currentRoom);
            // currentRoom.memory.setupComplete = true;
        // }
        // Testwwww
        // currentRoom.memory.structures = currentRoom.find(FIND_STRUCTURES);
        // roomFoundations.buildRoom(currentRoom);
        // currentRoom.memory.structures = currentRoom.find(FIND_STRUCTURES);
        // creepFactory.run(currentRoom);
        // creepHandler.run(currentRoom);
    }
    
    // var tower = Game.getObjectById('58a8a84fca7c6f4d60332527');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.structureType!=STRUCTURE_WALL && structure.hits < structure.hitsMax
    //     });
    //     // console.log("Tower targeting "+closestDamagedStructure.structureType)
    //     if(closestDamagedStructure && tower.energy > (tower.energyCapacity/100)*30) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    // var tower2 = Game.getObjectById('58ac1c5623b1355f5f528265');
    // if(tower2) {
    //     var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax //structure.structureType!=STRUCTURE_WALL &&
    //     });
    //     // console.log("Tower targeting "+closestDamagedStructure.structureType)
    //     if(closestDamagedStructure && tower2.energy > (tower2.energyCapacity/100)*50) {
    //         tower2.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower2.attack(closestHostile);
    //     }
    // }
    // });
}