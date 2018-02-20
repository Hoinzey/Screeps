require('prototype.gather')();
var sourceSelector = require('sourceSelector');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,currentRoom) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        console.log(creep.name+" Generating path for upgrader")
	        creep.memory.path = Room.serializePath(creep.pos.findPathTo(creep.room.controller));
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
	        let roomController = creep.room.controller;
	        if(creep.pos.isNearTo(roomController)){
	            creep.upgradeController(creep.room.controller);
	        }else{
	            if(creep.memory.path == undefined){
                    console.log("Instansiating upgrader path")
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(creep.room.controller));
                }
                if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND){
                    console.log("upgrader had to change path for controller");
                    creep.memory.path = Room.serializePath(creep.pos.findPathTo(creep.room.controller));
                }
                let currentposObj = {x:creep.pos.x,y:creep.pos.y};
                this.checkIfStaticTooLong(creep,creep.room.controller);
                creep.memory.currentpos = currentposObj;
                creep.say('UMU');
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
               if(source!=undefined && creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND){
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
            if(staticCount>15 && destinationPoint!=undefined){
                console.log("Creep:"+creep.name+" has been static too long, recalculating path");
                creep.memory.path = Room.serializePath(creep.pos.findPathTo(destinationPoint));
                creep.memory.staticcount =0;
            }else{
                // console.log("Destination point invalid for Upgrader "+creep.name +" in "+creep.room.name)
                creep.say("NTD")
            }
        }else{
            creep.memory.staticcount =0;    
        }
    }
	
};

module.exports = roleUpgrader;