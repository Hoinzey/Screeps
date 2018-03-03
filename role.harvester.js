var sourceSelector = require('sourceSelector');
var harvester = {
     run: function(creep) {
        let source = sourceSelector.selectSource(creep);
        let harvestPoint = creep.memory.harvestSpot;
        let sourceContainerPositions = creep.room.memory.sourceinfo;
        creep.memory.harvestSpot = sourceContainerPositions[source.id];
        if(!creep.pos.isEqualTo(harvestPoint.x,harvestPoint.y)){
            // console.log(creep.name+ " is here moving to source "+source.pos.x+" "+source.pos.y +" i am at "+creep.pos.x+" "+creep.pos.y)
            creep.moveTo(harvestPoint.x,harvestPoint.y);
        }
            creep.harvest(source);
    }
};

module.exports = harvester;