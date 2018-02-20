require('prototype.gather')();
var sourceSelector = require('sourceSelector');
var rooleFounder = {

    /** @param {Creep} creep **/
    run: function(creep,currentRoom) {
        if(creep.room.name==Memory.siegeRoom.name && creep.room.controller.level==2){
            this.build(creep);
        }else{
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	       // console.log(creep.name+" Generating path for upgrader")
	        creep.memory.path = Room.serializePath(Game.getObjectById(Memory.siegeRoom.controllerID));
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
	        let roomController = Game.getObjectById(Memory.siegeRoom.controllerID);
	        if(creep.pos.isNearTo(roomController)){
	            creep.upgradeController(roomController);
	        }else{
	            if(creep.memory.path == undefined){
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(roomController));
                }
                if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND){
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(roomController));
                }
                let currentposObj = {x:creep.pos.x,y:creep.pos.y};
                this.checkIfStaticTooLong(creep,roomController);
                creep.memory.currentpos = currentposObj;
	        }
        }else {
           let source = sourceSelector.selectEnergyLocation(creep);
           let path = creep.memory.path;
        //   console.log(creep.name+" path is "+creep.memory.path+" to "+source);
           if(path == undefined){
              path =  Room.serializePath(creep.pos.findPathTo(source));
              creep.memory.path = path;
           }
        //   console.log(creep.name+" upgrader source is "+source);
           if(creep.pos.isNearTo(source)){
                creep.gather(creep,source);
           }else{
            //   console.log(creep.name+" moving to "+source);
            //   console.log(creep.name+" result of move "+creep.moveByPath(creep.memory.path));
               if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND){
                    console.log("upgrader had to change path for src");
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(source));
                }
           }
           let currentposObj = {x:creep.pos.x,y:creep.pos.y};
            this.checkIfStaticTooLong(creep,source);
            creep.memory.currentpos = currentposObj;
        }
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
    },
	build: function(creep){
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => structure.structureType=="spawn"
            });
            if(targets.length) {
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
	
};

module.exports = rooleFounder;