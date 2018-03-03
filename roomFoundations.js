const walls="walls";

function getThingTypeFromThing(tile){
    if(tile.type=="terrain"){
        return type.terrain;
    }
    if(tile.type=="structure"){
        return type.structure.structureType;
    }
    if(tile.type=="constructionSite"){
        return type.structure.structureType;
    }
}

var roomFoundations = {
    buildRoom : function(currentRoom){
        // let flags = currentRoom.find(FIND_FLAGS);
        // flags.forEach(function(flag){
        //     flag.remove();
        // })
        // let conSites = currentRoom.find(FIND_CONSTRUCTION_SITES);
        // conSites.forEach(function(site){
        //     site.remove();
        // })
        if(currentRoom.memory.lastCheckControllerLevel!=undefined){
            if(currentRoom.memory.lastCheckControllerLevel < currentRoom.controller.level){
                this.buildExtensions(currentRoom);
                this.buildContainers(currentRoom);
                currentRoom.memory.lastCheckControllerLevel = currentRoom.controller.level;
            }
        }else{
            currentRoom.memory.lastCheckControllerLevel=0;
            try{
              this.buildContainers(currentRoom);
              this.buildExtensions(currentRoom);
            }catch(err){
                console.log("Cannae handle this atm");
            }
        }
    },
    buildContainers : function(currentRoom){
        let containerAllowance = 0;
        for(var count=0; count <= currentRoom.controller.level; count++ ){
            containerAllowance += CONTROLLER_STRUCTURES.container[count];
        }
        var currentAmountOfContainers = currentRoom.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType ==STRUCTURE_CONTAINER}).length;
        currentAmountOfContainers += currentRoom.find(FIND_CONSTRUCTION_SITES, {filter: (constructionSite) => constructionSite.structureType == STRUCTURE_CONTAINER}).length
        console.log("Total:"+containerAllowance+" Current:"+currentAmountOfContainers);
        if(currentAmountOfContainers<containerAllowance){
            currentRoom.find(FIND_SOURCES).forEach(function(source){
                currentRoom.createFlag(currentRoom.memory.sourceinfo[source.id].x,currentRoom.memory.sourceinfo[source.id].y,null,COLOR_BLUE);
                // if(currentRoom.createConstructionSite(currentRoom.memory.sourceinfo[source.id].x,currentRoom.memory.sourceinfo[source.id].y,STRUCTURE_CONTAINER)==0){
                //     let containerPosition = new RoomPosition(currentRoom.memory.sourceinfo[source.id].x,currentRoom.memory.sourceinfo[source.id].y,currentRoom.name);
                //     let sourceContainers = currentRoom.memory.sourceContainers;
                //     let containerObject = containerPosition;
                //     if(sourceContainers==undefined){
                //         console.log("No memory entry");
                //         sourceContainers={};
                //         sourceContainers[currentRoom.name+" "+containerPosition.x+" "+containerPosition.y] = containerObject;
                //         currentRoom.memory.sourceContainers = sourceContainers;
                //     }else{
                //         sourceContainers[currentRoom.name+" "+containerPosition.x+" "+containerPosition.y] = containerObject;
                //         currentRoom.memory.sourceContainers = sourceContainers;
                //     }
                // }
            });
        }
    },
    buildExtensions : function(currentRoom){
        let extensionAllowance = 0;
        for(var count=0; count <= currentRoom.controller.level; count++ ){
            extensionAllowance += CONTROLLER_STRUCTURES.extension[count];
        }
        var currentAmountOfExtensions = currentRoom.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_EXTENSION}).length;
        currentAmountOfExtensions += currentRoom.find(FIND_CONSTRUCTION_SITES, {filter: (constructionSite) => constructionSite.structureType == STRUCTURE_EXTENSION}).length
        if(currentAmountOfExtensions<extensionAllowance){
            currentRoom.find(FIND_MY_SPAWNS).forEach(function(spawn){
                let offset=2;
                while(currentAmountOfExtensions<extensionAllowance){
                    let xPos = spawn.pos.x - offset;
                    let yPos = spawn.pos.y - offset;
                        for(xPos; xPos<=spawn.pos.x+offset ;xPos++){
                            if(currentAmountOfExtensions==extensionAllowance){
                                break;
                            }
                            console.log("X: "+xPos);
                            yPos = spawn.pos.y - offset;
                            for(yPos;yPos<=spawn.pos.y+offset;yPos++){
                                console.log("Y: "+yPos);
                                console.log("Validating X:"+xPos+" Y:"+yPos+" total is at "+currentAmountOfExtensions+" of "+extensionAllowance);
                                console.log("Offset: "+offset);
                                if(currentAmountOfExtensions==extensionAllowance){
                                    break;
                                }
                                if(checkAdjacentSquaresForExtensionOrWall(xPos,yPos,currentRoom)===true){
                                    console.log("---------------------------------------------------------------")
                                    if(currentRoom.createConstructionSite(xPos,yPos,STRUCTURE_EXTENSION) == 0){
                                        currentAmountOfExtensions++
                                        // currentRoom.createConstructionSite(x-1,y,STRUCTURE_ROAD);
                                        // currentRoom.createConstructionSite(x+1,y,STRUCTURE_ROAD);    
                                        console.log("---------------------------------------------------------------")
                                    }
                                }
                            }
                        }
                        console.log("-increasing offset")
                    offset++
                }
            });
        }
    }
};
function checkAdjacentSquaresForExtensionOrWall(x,y,currentRoom){
    let offset=1;
    let xPosition = x - offset;
    let yPosition = y - offset;
    let validTile=true;
    let hasSomethingBesideIt=false;
    // console.log("_____________"+x+"_____________________"+y);
    currentRoom.lookAtArea(y+1,x-1,y+1,x+1,{asArray:true});
    var targets = currentRoom.lookAtArea(y-1,x-1,y+1,x+1,{asArray:true});
    // console.log("-----------------");
    // _.each(targets,function(thing){
    //         console.log(JSON.stringify(thing));
    // })
    // console.log("-----------------");
    if(_.findWhere(targets,{type: "terrain", terrain: "wall"})){
        console.log("Failing at wall")
        validTile=false;
    }
    // console.log("After looking for wall:"+validTile+" in :"+JSON.stringify(targets));
    if(validTile==false){
        return false;
    }
    if(_.findWhere(targets,{type: "structure", structure: {structureType: "spawn"}})){
        console.log("I am indeed beside a cons spawn")
        hasSomethingBesideIt=true;
    }
    if(_.findWhere(targets,{type: "constructionSite"})){
        console.log("I am indeed beside a cons site")
        hasSomethingBesideIt=true;
    }
    
    if(currentRoom.lookForAt(LOOK_STRUCTURES,x,y).length){
        console.log("Cannae build due to a structure being here already")
        validTile=false;
    }else if(currentRoom.lookForAt(LOOK_CONSTRUCTION_SITES,x,y).length){
        console.log("Cannae build due to a site being here already")
        validTile=false;
    }
     return validTile && hasSomethingBesideIt;
}



module.exports = roomFoundations;