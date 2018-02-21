var roomSetup={
    run : function(currentRoom){
        //Set up the rooms memory objects such as locations of sources
        findSourceHarvestablePositions(currentRoom);
        // createStartingContainers(currentRoom);
    }
};

function findSourceHarvestablePositions(currentRoom){
//Get the an array with objects containing X and Y coords.
    var targets = [];
    currentRoom.find(FIND_SOURCES).forEach(function(source){
        targets.push({x:source.pos.x,y:source.pos.y});
    });
    _.each(targets,function(target){
        let tarPos = new RoomPosition(target.x,target.y,currentRoom.name);
        let pathTiles = currentRoom.findPath(spawn.pos,tarPos,{ignoreCreeps:true});
        //Take end points on path for best spot for harvesting
        // pathTiles.forEach(function(dest){
        //     if(currentRoom.createConstructionSite(dest.x,dest.y,STRUCTURE_ROAD) != 0){
        //     }
        // });
        console.log("Last point for source is "+ pathTiles[pathTiles.length-1])
    })


    // let sources = currentRoom.find(FIND_SOURCES);
    // currentRoom.memory.totalSources = sources.length;
    // _.each(sources,function(source){
    //     let offset=1;     
    //     let counter=0;
    //     let xPos = source.pos.x - offset;
    //     let yPos = source.pos.y - offset;
        
    //     let finalx;
    //     let finaly;
    //     let foundDest=false
    //     for(var x =xPos; x<=source.pos.x+offset ;x++){
    //         if(!foundDest){
    //             for(var y=yPos;y<=source.pos.y+offset;y++){
    //                 if(!foundDest){
    //                     let tiles = currentRoom.lookAt(x,y);
    //                     tiles.forEach(function(object){
    //                         if(object.type == LOOK_TERRAIN && (object.terrain=='swamp' || object.terrain=='plain')){
    //                             finalx = x;
    //                             finaly =y;
    //                             foundDest=true;
    //                         }
    //                     });
    //                 }else{break;}
    //             }
    //         }else{break;}
    //     }
    //     console.log("Setting up sourceInfo");
    //     let sourceObject={x:finalx, y:finaly,id: source.id};
    //     let sourceInformation = currentRoom.memory.sourceinfo;
    //     if(sourceInformation==undefined){
    //         console.log("No Source info entry");
    //         sourceInformation=[];
    //         sourceInformation.push(sourceObject);
    //         currentRoom.memory.sourceinfo = sourceInformation;
    //         return source;
    //     }else{
    //         sourceInformation.push(sourceObject);
    //         currentRoom.memory.sourceinfo = sourceInformation;
    //         return source;
    //     }  
    // })
}

function  createStartingContainers(currentRoom){
            currentRoom.find(FIND_SOURCES).forEach(function(source){
                console.log("Info is :"+currentRoom.memory.sourceinfo[source.id]);
                if(currentRoom.memory.sourceinfo[source.id]==undefined){
                }else{
                    // console.log(currentRoom.createConstructionSite(Memory.sourceinfo[source.id].pos.x,Memory.sourceinfo[source.id].pos.y,STRUCTURE_CONTAINER));
                    // console.log("X:"+Memory.sourceinfo[source.id].x+" Y:"+Memory.sourceinfo[source.id].y);
                    if(currentRoom.createConstructionSite(currentRoom.memory.sourceinfo[source.id].x,currentRoom.memory.sourceinfo[source.id].y,STRUCTURE_CONTAINER)==0){
                        //Save this position in memory
                        
                        let containerPosition = new RoomPosition(currentRoom.memory.sourceinfo[source.id].x,currentRoom.memory.sourceinfo[source.id].y,currentRoom.name);
                        let sourceContainers = currentRoom.memory.sourceContainers;
                        let containerObject = containerPosition;
                        // console.log(JSON.stringify(containerObject));
                        if(sourceContainers==undefined){
                            console.log("No memory entry");
                            sourceContainers=[];
                            sourceContainers.push(containerObject);
                            currentRoom.memory.sourceContainers = sourceContainers;
                            // return source;
                        }else{
                            sourceContainers.push(containerObject);
                            currentRoom.memory.sourceContainers = sourceContainers;
                        }
                    }
                }
            });
            let controller = currentRoom.controller;
                let controllerPosition = controller.pos;
                // console.log("Here");
                if(currentRoom.memory.controllerContainer==undefined){
                    if(currentRoom.createConstructionSite(controllerPosition.x+1,controllerPosition.y+1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x+1,y:controllerPosition.y+1,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x+1,controllerPosition.y-1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x+1,y:controllerPosition.y-1,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x-1,controllerPosition.y-1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x-1,y:controllerPosition.y-1,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x-1,controllerPosition.y+1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x-1,y:controllerPosition.y+1,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x,controllerPosition.y+1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x,y:controllerPosition.y+1,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x,controllerPosition.y-1,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x,y:controllerPosition.y-1,roomName :currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x-1,controllerPosition.y,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x-1,y:controllerPosition.y,roomName:currentRoom.name};
                    }
                    else if(currentRoom.createConstructionSite(controllerPosition.x+1,controllerPosition.y,STRUCTURE_CONTAINER)==0){
                        currentRoom.memory.controllerContainer = {x:controllerPosition.x+1,y:controllerPosition.y,roomName:currentRoom.name};
                    }
                }
                    
    }

module.exports = roomSetup;