var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleGremlin = require('role.gremlin');
var scout = require('role.scout');
var sieger = require('role.sieger');
var claimer = require('role.claimer');
var founder = require('role.founder');

var creepHandler ={
    run: function(currentRoom){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'gremlin') {
                roleGremlin.run(creep);
            }
            if(creep.memory.role == 'upgrader'){
                roleUpgrader.run(creep,currentRoom);
            }
            if(creep.memory.role == 'builder'){
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'repairer'){
                roleRepairer.run(creep);
            }
            if(creep.memory.role == 'scout'){
                scout.run(creep);
            }
            if(creep.memory.role == 'sieger'){
                sieger.run(creep);
            }
            if(creep.memory.role == 'claimer'){
                claimer.run(creep);
            }
            if(creep.memory.role == 'founder'){
                founder.run(creep);
            }
        }
    }
};


module.exports = creepHandler;