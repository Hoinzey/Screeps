var scout ={
    run: function(creep){
        creep.moveTo(Game.flags.Siege,{reusePath:true});
        if(creep.room.name==Memory.siegeRoom.name){
            siegeObject = Memory.siegeRoom;
            let hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            let noOfHostiles = 0;
            let hostilesFound = false;
            if(hostiles.length){
                hostilesFound = true
                noOfHostiles = hostiles.length;
            }
            siegeObject.enemiesPresent = hostilesFound;    
            siegeObject.scouted = true;
            siegeObject.hostileCount = noOfHostiles;
            siegeObject.controllerID = creep.room.controller.id;
            Memory.siegeRoom = siegeObject;
        }
    }
};

module.exports = scout;