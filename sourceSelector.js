

var sourceSelector = {
    selectSource: function(creep){
        //Only for Harvesters
       if(creep.memory.targetsourceid!=undefined){
           return Game.getObjectById(creep.memory.targetsourceid);
       }
        let currentRoomSources = creep.room.find(FIND_SOURCES);
        currentRoomSources.forEach(function(source){
            let totalAtSource = _.filter(Game.creeps, (creep) => creep.memory.targetsourceid == source.id).length;
            if(totalAtSource==0){
                 creep.memory.targetsourceid = source.id;
                 return Game.getObjectById(source.id);
            }
        });
    },
    selectEnergyLocation: function(creep){
        let targets;
        let closestTarget = undefined;
        let secondClosestTarget = undefined;
        let destinationSource = undefined
        if(creep.memory.role=="upgrader"){
            let controllerContainer = this.getControllerContainer(creep);
             if(controllerContainer!=undefined && controllerContainer.store[RESOURCE_ENERGY] > creep.carryCapacity*2){
                 return controllerContainer;
             }
        }
       let sourceContainerPositions = this.getSourceContainers(creep);
       if(sourceContainerPositions!=undefined){
         return sourceContainerPositions;
       }
       
       //No containers available, check for dropped energy
       let droppedEnergyPosition = this.getDroppedEnergySources(creep);
     
       if(destinationSource == undefined){
           destinationSource = droppedEnergyPosition;
       }
         return destinationSource;
    },
    getControllerContainer : function(creep){
        try{
            let controllerContainer = creep.room.lookForAt(LOOK_STRUCTURES,creep.room.memory.controllerContainer.x,creep.room.memory.controllerContainer.y);
             if(controllerContainer[0].structureType=="container"){
                 return controllerContainer[0];
             }else if(controllerContainer[1].structureType=="container"){
                 return controllerContainer[1];
             }
             return undefined;
         }catch(error){
             return undefined;
         }
    },
    getSourceContainers : function(creep){
        try{
             let sourceContainerPositions = creep.room.memory.sourceinfo;
     //   console.log(sourceContainerPositions);
             if(sourceContainerPositions!=undefined){
         //       //Check for container stuff and things
         //       //Perhaps just work off what one has the least energy ?  ?  ?
         let container = undefined;
         for(let i=0 ; i<sourceContainerPositions.length;i++){
             let containterPos = sourceContainerPositions[i];
             var objects = creep.room.lookForAt(LOOK_STRUCTURES,containterPos.x,containterPos.y);
             container = _.findWhere(objects,{structureType: "container"});
             if(container!=undefined && container.store[RESOURCE_ENERGY] > creep.carryCapacity*2){
                 return container;
             }   
         }
       }
       return undefined;
        }catch(error){
            console.log("Source Cont Err "+error)
            return undefined;
        }
    },
    getDroppedEnergySources : function(creep){
        try{
            let sourcePositions = creep.room.memory.sourceinfo;
             // console.log("Source positions "+sourcePositions);
             if(sourcePositions.length){
                 let droppedEnergySource = undefined;
                 for(let i=0 ; i<sourcePositions.length;i++){
                     droppedSourcePos = sourcePositions[i];
                     let objects = creep.room.lookForAt(LOOK_ENERGY,droppedSourcePos.x,droppedSourcePos.y);
                     if(objects.length){
                         for(let t=0 ; t<objects.length;t++){
                             if(droppedEnergySource == undefined){
                                 droppedEnergySource = objects[t];
                             }else if(objects[t].energy > droppedEnergySource.energy){
                                 droppedEnergySource = objects[t];
                             }
                         }
                     }
                 }
             // console.log("Dropped energy source "+droppedEnergySource);
             return droppedEnergySource;
             }
        }catch(error){
            console.log("Dropped Energy Err "+error)
            return undefined;
        }
    },
    getGremlinDepositSource : function(creep){
             let targets = _.filter(creep.room.memory.structures, function(structure){
                 return (structure.structureType == STRUCTURE_EXTENSION 
                         || structure.structureType == STRUCTURE_SPAWN 
                         || structure.structureType == STRUCTURE_TOWER) 
                         && (structure.energy < structure.energyCapacity);
             });
             if(targets.length > 0) {
                 return targets[0];
             }
             let controllerContainer = sourceSelector.getControllerContainer(creep);
             if(controllerContainer!=undefined && controllerContainer.store[RESOURCE_ENERGY]!=controllerContainer.storeCapacity){
                 return controllerContainer;
             }
    }
 };
 
 module.exports = sourceSelector;