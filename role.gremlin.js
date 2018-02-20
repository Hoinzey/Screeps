var sourceSelector = require('sourceSelector');
var roleGremlin = {
     run: function(creep) {
        //  console.log("My carry="+creep.carry.energy + " and my capacity="+creep.carryCapacity);
        if(creep.carry.energy == creep.carryCapacity && creep.memory.harvesting){
            creep.memory.harvesting = false;
            creep.memory.path = undefined;
            creep.memory.targetsourceid=undefined;
        }
	    if(creep.carry.energy < creep.carryCapacity) {
    	        let source = undefined;
    	        creep.memory.harvesting=true;
    	        creep.memory.dumping = false;
    	        if(creep.memory.targetsourceid != undefined){
    	            source = Game.getObjectById(creep.memory.targetsourceid);
    	            if(source == null){
    	                source = sourceSelector.selectEnergyLocation(creep);
    	                if(source != undefined){
    	                    creep.memory.targetsourceid = source.id;   
    	                }
    	            }
    	        }else{
    	            source = sourceSelector.selectEnergyLocation(creep);
    	           // console.log("Gremlin source "+source)
    	            if(source!=undefined){
    	                creep.memory.targetsourceid = source.id;
    	            }
    	        }
                if(source!=undefined){
                    let path = creep.memory.path;
                    if(path ==undefined){
                        creep.memory.path = Room.serializePath(creep.pos.findPathTo(source));
                    }
                    creep.memory.targetsourceid = source.id
                    if(creep.pos.isNearTo(source)){
                        // console.log("Gremlin gathering");
                        creep.gather(creep,source);
                    }else{
                        if(creep.moveByPath(path) == ERR_NOT_FOUND){
                            console.log("Gremlin had to update path");
                            creep.memory.path = Room.serializePath(creep.pos.findPathTo(source));
                        }
                    }
                    let currentposObj = {x:creep.pos.x,y:creep.pos.y};
                    this.checkIfStaticTooLong(creep,source);
                    creep.memory.currentpos = currentposObj;
                }
            } else {
                if(creep.memory.dumping == undefined || creep.memory.dumping==false){
                    creep.memory.dumping=true;
                }
                let depositPoint = sourceSelector.getGremlinDepositSource(creep);
                if(depositPoint!=undefined){
                    if(creep.pos.isNearTo(depositPoint)){
                        if(creep.transfer(depositPoint,RESOURCE_ENERGY)==0){
                            creep.memory.path = undefined;
                        }
                    }else{
                        if(creep.memory.path == undefined && depositPoint!=undefined){
                            console.log(creep.name + " Gremlin Depo "+depositPoint.pos.x + " "+depositPoint.pos.y)
                            creep.memory.path = Room.serializePath(creep.pos.findPathTo(depositPoint.pos.x,depositPoint.pos.y));
                        }
                        // console.log(creep.name+" Moving result= "+creep.moveByPath(creep.memory.path));
                        if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND && depositPoint!=undefined){
                            console.log("Gremlin had to change path for Depo");
                            creep.memory.path = Room.serializePath(creep.pos.findPathTo(depositPoint.pos.x,depositPoint.pos.y));
                        }
                        let currentposObj = {x:creep.pos.x,y:creep.pos.y};
                        this.checkIfStaticTooLong(creep,depositPoint);
                        creep.memory.currentpos = currentposObj;
                    }
                }else{
                    creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
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
            if(staticCount>25 && destinationPoint.pos!=undefined && destinationPoint.pos!=null){
                console.log("Creep:"+creep.name+" has been static too long, recalculating path to "+destinationPoint.pos);
                creep.memory.path = Room.serializePath(creep.pos.findPathTo(destinationPoint));
                creep.memory.staticcount =0;
            }
        }else{
            creep.memory.staticcount =0;    
        }
    }
};

module.exports = roleGremlin;