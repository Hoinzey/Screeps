var sourceSelector = require('sourceSelector');
var harvester = {
     run: function(creep) {
        let source = sourceSelector.selectSource(creep);
        let harvestPoint = creep.memory.harvestSpot;
        // console.log(creep.name +" "+creep.moveTo(sourcePosition.x,sourcePosition.y) +" Creep is at "+creep.pos.x+" "+creep.pos.y);
        if(harvestPoint==undefined){
            let sourceContainerPositions = creep.room.memory.sourceinfo;
            for(let i=0 ; i<sourceContainerPositions.length;i++){
                // console.log("Container pos obj "+sourceContainerPositions[i])
                if(sourceContainerPositions[i].id==source.id){
                    creep.memory.harvestSpot = sourceContainerPositions[i];
                }
            }
        }
        if(!creep.pos.isEqualTo(harvestPoint.x,harvestPoint.y)){
            // console.log(creep.name+ " is here moving to source "+source.pos.x+" "+source.pos.y +" i am at "+creep.pos.x+" "+creep.pos.y)
            creep.moveTo(harvestPoint.x,harvestPoint.y);
        }
            creep.harvest(source);
        
    }
};

module.exports = harvester;