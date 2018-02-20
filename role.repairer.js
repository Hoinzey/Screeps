var sourceSelector = require('sourceSelector');
var roleRepairer = {
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
	    }
	    
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.memory.path = undefined;
            creep.memory.targetsourceid=undefined;
	       // creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
	        let targets = creep.room.memory.structures;
	        targets = _.filter(targets,function(structure){
	            structure.structureType!=STRUCTURE_WALL && structure.hits < structure.hitsMax
	        });
	       // var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType!=STRUCTURE_WALL && structure.hits < structure.hitsMax});
	       
	        let walls = _.filter(targets,function(structure){
	            structure.hits < 120000 && structure.structureType==STRUCTURE_WALL
	        });
	       // creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < 120000 && structure.structureType==STRUCTURE_WALL});
	       // console.log('Walls length'+walls.length);
            if(walls.length){
                // console.log('Repairing wall');
                creep.say('MTR');
                if(creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(walls[0]);
                }
            }else
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('MTR');
                    creep.moveTo(targets[0]);
                }
            }
	    }else {
	        let source = sourceSelector.selectEnergyLocation(creep);
            let path = creep.memory.path;
        //   console.log(creep.name+" path is "+creep.memory.path+" to "+source);
            if(path == undefined && source!=undefined){
              path =  Room.serializePath(creep.pos.findPathTo(source));
              creep.memory.path = path;
            }
        //   console.log(creep.name+" upgrader source is "+source);
            if(creep.pos.isNearTo(source)){
                creep.gather(creep,source);
            }else{
            //   console.log(creep.name+" moving to "+source);
            //   console.log(creep.name+" result of move "+creep.moveByPath(creep.memory.path));
               if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND && source!=undefined){
                    console.log("upgrader had to change path for src");
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(source));
                }
           }
           let currentposObj = {x:creep.pos.x,y:creep.pos.y};
            this.checkIfStaticTooLong(creep,source);
            creep.memory.currentpos = currentposObj;
	    }
	},
    checkIfStaticTooLong : function(creep,destinationPoint){
        let currentposObj = {x:creep.pos.x,y:creep.pos.y};
        if(creep.memory.currentpos==undefined){
            creep.memory.currentpos = currentposObj;    
        }else if(creep.memory.currentpos.x==creep.pos.x && creep.memory.currentpos.y==creep.pos.y){
            let staticCount = creep.memory.staticcount;
            if(staticCount == undefined){
                creep.memory.staticcount = 0;
            }else{
                creep.memory.staticcount +=1;       
            }
            if(staticCount>15){
                // console.log("Creep:"+creep.name+" has been static too long, recalculating path");
                creep.memory.path = Room.serializePath(creep.pos.findPathTo(destinationPoint));
                creep.memory.staticcount =0;
            }
        }else{
            creep.memory.staticcount =0;    
        }
    }
}

module.exports = roleRepairer;