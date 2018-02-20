var claimer = {
    run : function(creep){
    creep.moveTo(Game.flags.Siege,{reusePath:true});
        if(creep.room.name==Memory.siegeRoom.name){
            let roomController = creep.room.controller;
            // console.log(creep.claimController(roomController))
            if(roomController!=undefined){
                if(creep.claimController(roomController) == ERR_NOT_IN_RANGE){
                    creep.moveTo(roomController);
                }else if(creep.claimController(roomController) == ERR_INVALID_TARGET){
                    console.log(roomController)
                    creep.moveTo(roomController);
                }else if(creep.claimController(roomController) == 0){
                    Memory.siegeRoom.claimed=true;
                    Memory.siegeRoom.claim=false;
                }
            }else{
                //We have the controller now
                // let siegeObject = Memory.siegeRoom;
                // siegeObject.claimed = true;
                // Memory.siegeRoom = siegeObject;
            }
        }
    }
};

module.exports = claimer;