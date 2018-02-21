var roomSetup={
    run : function(currentRoom){
        //Set up the rooms memory objects such as locations of sources
        commitRoomSourcesAndSpawnsToMemory(currentRoom);
        // createStartingContainers(currentRoom);
    }
};

function commitRoomSourcesAndSpawnsToMemory(currentRoom){
currentRoom.find(FIND_MY_SPAWNS).forEach(function(spawn){
    let spawnObject={x:spawn.x,y:spawn.pos.y,id: spawn.id};
    let spawnInformation = currentRoom.memory.spawninfo;

        if(spawnInformation==undefined){
            console.log("No Source info entry");
            spawnInformation=[];
            spawnInformation.push(spawnObject);
            currentRoom.memory.spawninfo = spawnInformation;
        }else{
            spawnInformation.push(spawnObject);
            currentRoom.memory.spawninfo = spawnInformation;
        }

    currentRoom.find(FIND_SOURCES).forEach(function(source){
        let tarPos = new RoomPosition(source.pos.x,source.pos.y,currentRoom.name);
        let pathTiles = currentRoom.findPath(spawn.pos,tarPos,{ignoreCreeps:true});

        let sourceObject={x:pathTiles[pathTiles.length-2].x, y:pathTiles[pathTiles.length-2].y,id: source.id};
        let sourceInformation = currentRoom.memory.sourceinfo;

        if(sourceInformation==undefined){
            console.log("No Source info entry");
            sourceInformation=[];
            sourceInformation.push(sourceObject);
            currentRoom.memory.sourceinfo = sourceInformation;
        }else{
            sourceInformation.push(sourceObject);
            currentRoom.memory.sourceinfo = sourceInformation;
        }
    });
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