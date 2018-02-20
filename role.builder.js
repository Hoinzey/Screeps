var sourceSelector = require('sourceSelector');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // if(creep.room.controller.level==2){
        //     //Time to build
        //     this.build(creep);
        // }
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                // console.log(creep.name + ' target '+targets[0]);
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.say("BMB");
                    creep.moveTo(targets[0]);
                }
            }else{
                creep.memory.role = 'upgrader';
            }
	    }
	    else {
	        var source = sourceSelector.selectEnergyLocation(creep);
           
           
           //TODO change this to be memory and serialized paths etc
            //   console.log("Source is "+source);
    	       if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
                        if(creep.moveTo(source) == ERR_NOT_FOUND){
                            creep.moveTo(source); 
                            // console.log("Gremlin had to update path");
                            // creep.memory.path = Room.serializePath(creep.pos.findPathTo(source));
                        }
                    }else if(creep.pickup(source) == ERR_INVALID_TARGET){
                        if(creep.withdraw(source,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(source); ;
                        }
                    }
	    }
	}
};

module.exports = roleBuilder;