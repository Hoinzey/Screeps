var roomSetup={
    run : function(currentRoom){
        //Set up the rooms memory objects such as locations of sources
        commitRoomSourcesAndSpawnsToMemory(currentRoom);
        buildPaths(currentRoom);
    }
};

function commitRoomSourcesAndSpawnsToMemory(currentRoom){
    currentRoom.find(FIND_MY_SPAWNS).forEach(function(spawn){
        let spawnObject={ x:spawn.pos.x , y:spawn.pos.y , id:spawn.id}
        let spawnInformation = currentRoom.memory.spawninfo
        // currentRoom.memory.spawninfo = undefined;

            if(spawnInformation==undefined){
                console.log("No Source info entry");
                spawnInformation={};
                spawnInformation[spawnObject.id]=spawnObject;
                currentRoom.memory.spawninfo = spawnInformation;
            }else{
                spawnInformation[spawnObject.id]=spawnObject;
                currentRoom.memory.spawninfo = spawnInformation;
            }

        currentRoom.find(FIND_SOURCES).forEach(function(source){
            let tarPos = new RoomPosition(source.pos.x,source.pos.y,currentRoom.name);
            let pathTiles = currentRoom.findPath(spawn.pos,tarPos,{ignoreCreeps:true});

            let sourceObject={x:pathTiles[pathTiles.length-2].x, y:pathTiles[pathTiles.length-2].y,id: source.id};
            let sourceInformation = currentRoom.memory.sourceinfo;
            // currentRoom.memory.sourceinfo = undefined;

            if(sourceInformation==undefined){
                console.log("No Source info entry");
                sourceInformation={};
                sourceInformation[sourceObject.id] = sourceObject;
                currentRoom.memory.sourceinfo = sourceInformation;
            }else{
                sourceInformation[sourceObject.id] = sourceObject;
                currentRoom.memory.sourceinfo = sourceInformation;
            }
        });
    });
}

function buildPaths(currentRoom){
    _.each(currentRoom.find(FIND_MY_SPAWNS),function(spawn){
        let spawnInformation = currentRoom.memory.spawnInfo;
        // console.log(spawnInformation);
        if(spawnInformation==undefined){
            let spawnObject = {x:spawn.pos.x,y:spawn.pos.y};
            let  spawnInfo={};
            spawnInfo[spawn.id] = spawnObject;
            currentRoom.memory.spawnInfo=spawnInfo;
        }else if(!_.contains(spawnInformation,spawnInformation[spawn.id])){
            let spawnObject = {x:spawn.pos.x,y:spawn.pos.y};
            currentRoom.memory.spawnInfo[spawn.id] = spawnObject;
        }
        let targets = pathTargets(currentRoom);
        // console.log(targets.length);
        _.each(targets,function(target){
            let tarPos = new RoomPosition(target.x,target.y,currentRoom.name);
            let pathTiles = currentRoom.findPath(spawn.pos,tarPos,{ignoreCreeps:true});
            pathTiles.forEach(function(dest){
                currentRoom.createConstructionSite(dest.x,dest.y,STRUCTURE_ROAD)
                // }
                // currentRoom.createFlag(dest.x,dest.y,null,COLOR_RED);
            });
        })
        
    })
}

function pathTargets(currentRoom){
    var targets = [];
    currentRoom.find(FIND_SOURCES).forEach(function(source){
        targets.push({x:source.pos.x,y:source.pos.y});
    });
    currentRoom.find(FIND_MY_SPAWNS).forEach(function(spawn){
        let offset=1;
        let xPos = spawn.pos.x - offset;
        let yPos = spawn.pos.y - offset;
        for(var x =xPos; x<=spawn.pos.x+offset ;x++){
            for(var y=yPos;y<=spawn.pos.y+offset;y++){
                //  if(x==spawn.pos.x+1 && y==spawn.pos.y+1){
                //     currentRoom.createConstructionSite(x,y,STRUCTURE_CONTAINER);
                //     continue;
                // }
                // currentRoom.createFlag(x,y);
                let obj = {x:x,y:y};
                // console.log(obj.x + " "+ obj.y);
                targets.push(obj);
            }
        }
        targets.push({x:spawn.pos.x,y:spawn.pos.y});
    });
    targets.push({x:currentRoom.controller.pos.x,y:currentRoom.controller.pos.y});
    return targets;
}
module.exports = roomSetup;