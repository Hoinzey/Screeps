var sieger = {
    run : function(creep){
        creep.moveTo(Game.flags.Siege,{reusePath:true});
        if(creep.room.name==Memory.siegeRoom.name){
            let nearestHostile;
            if(creep.memory.target==undefined){
                nearestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                creep.memory.target = nearestHostile.id;
            }else{
                nearestHostile = Game.getObjectById(creep.memory.target);
                // console.log(nearestHostile);
                if(nearestHostile==undefined){
                    nearestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                    if(nearestHostile!=undefined){
                        creep.memory.target = nearestHostile.id;   
                    }else{
                        //Must be no boyos left to kill
                        siegeObject = Memory.siegeRoom;
                        siegeObject.hostileCount = 0;
                        Memory.siegeRoom = siegeObject;
                    }
                }
            }
            //Time to Kill boys.
            if(nearestHostile!=undefined){
                if(creep.attack(nearestHostile) == ERR_NOT_IN_RANGE){
                    creep.moveTo(nearestHostile);
                }else if(creep.attack(nearestHostile) == ERR_NO_BODYPART){
                    creep.say("harakiri!");
                    creep.suicide();
                }
            }else{
                let hostileBuilding = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) => structure.structureType!="controller"});
                if(hostileBuilding!=undefined){
                    //Time to burn the houses down
                    // console.log(hostileBuilding.structureType);
                    // if(hostileBuilding.structureType==){
                        
                    // }
                    if(hostileBuilding!=undefined){
                        if(creep.attack(hostileBuilding) == ERR_NOT_IN_RANGE){
                            creep.moveTo(hostileBuilding);
                        }else if(creep.attack(hostileBuilding) == ERR_NO_BODYPART){
                            creep.say("harakiri!");
                            creep.suicide();
                        }
                    }else{
                        //The houses are burned
                        siegeObject = Memory.siegeRoom;
                        siegeObject.enemiesPresent = false;
                        siegeObject.claim = true;
                        siegeObject.claimed = false;
                        Memory.siegeRoom = siegeObject;
                    }
                }else{
                    let hostileController = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                    if(creep.signController(hostileController,
                        "War is peace."+
                        "Freeom is slavery."+
                        "Ignorance is strength") == ERR_NOT_IN_RANGE){
                        creep.moveTo(hostileController);
                    }else if(creep.signController(hostileController,
                        "War is peace."+
                        "Freeom is slavery."+
                        "Ignorance is strength") == 0){
                        // console.log("Signed");
                        siegeObject = Memory.siegeRoom;
                        siegeObject.enemiesPresent = false;
                        siegeObject.claim = true;
                        siegeObject.claimed = false;
                        Memory.siegeRoom = siegeObject;
                        creep.say("harakiri!");
                        creep.suicide();
                    }
                }
            }
        }
    }
};

module.exports = sieger