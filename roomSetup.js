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
module.exports = roomSetup;