var creepFactory = {
    run: function(currentRoom){
        var currentRoomSpawns = currentRoom.find(FIND_MY_SPAWNS);
        for(var spawnCount=0;spawnCount<currentRoomSpawns.length;spawnCount++){
            var currentSpawn = currentRoomSpawns[spawnCount];
            for(var name in Memory.creeps) {
                if(!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
            
            var totalCreepCount = currentRoom.find(FIND_MY_CREEPS);
            var totalGremlins = _.filter(Game.creeps, (creep) => creep.memory.role == 'gremlin' && creep.pos.roomName == currentRoom.name);
            var totalHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.pos.roomName == currentRoom.name);
            var totalUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.pos.roomName == currentRoom.name);
            var totalBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.pos.roomName == currentRoom.name);
            var totalRepairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.pos.roomName == currentRoom.name);
            var totalScouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.pos.roomName == currentRoom.name);
            var totalSiegers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sieger' && creep.pos.roomName == currentRoom.name);
            var totalClaimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.pos.roomName == currentRoom.name);
            var totalfounders = _.filter(Game.creeps, (creep) => creep.memory.role == 'founder' && creep.pos.roomName == currentRoom.name);
            var constructionSites = currentRoom.find(FIND_CONSTRUCTION_SITES);
            var energyAvailable = currentRoom.energyAvailable
            // if(Memory.siegeRoom!=undefined){
            //     if(totalScouts<1){
            //         currentSpawn.createCreep([MOVE],{role:'scout'});
            //         console.log("Spawning Scout");
            //     }
            //     if(Memory.siegeRoom.enemiesPresent==true){
            //         if(totalSiegers<2){
            //             console.log("Spawning Sieger");
            //             currentSpawn.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE],{role:'sieger'});
            //         }
            //     }
            //     if(Memory.siegeRoom.claim==true && totalClaimers.length<1){
            //         console.log("Spawning claimer");
            //         currentSpawn.createCreep([CLAIM,MOVE],{role:'claimer'});
            //     }
            //     if(Memory.siegeRoom.claimed==true && totalfounders.length<2){
            //         console.log("Spawning founder");
            //         currentSpawn.createCreep([WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],{role:'founder'});
            //     }
            // }
    
            if(totalCreepCount.length<1|| totalCreepCount == undefined){
                // console.log('I have no creeps!');
                currentSpawn.createCreep([WORK,WORK,MOVE],{role:'harvester'});
            }
            else
            if(totalGremlins.length<1 || totalGremlins == undefined){
                // console.log('I need more gremlins!');
                currentSpawn.createCreep([CARRY,CARRY,MOVE],{role:'gremlin'});
            }
            else if(totalHarvesters.length<2){
                if(energyAvailable >=550){
                    currentSpawn.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE],{role:'harvester'});
                }else if(energyAvailable >=300){
                    currentSpawn.createCreep([WORK,WORK,MOVE],{role:'harvester'});
                }else{
                    currentSpawn.createCreep([WORK,MOVE],{role:'harvester'});
                }
            }
            else if(totalGremlins.length<2){
                if(energyAvailable >=500){
                    currentSpawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],{role:'gremlin'});
                }else if(energyAvailable >=300){
                    currentSpawn.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],{role:'gremlin'});
                }
            }
            else if(totalBuilders.length<2 && constructionSites.length){
                if(energyAvailable >=400){
                 console.log('Spawning Builder');
                 currentSpawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],{role:'builder'});
                }else{
                 console.log('Spawning Builder');
                 currentSpawn.createCreep([WORK,CARRY,MOVE],{role:'builder'});
                }
            }
            else if(totalUpgraders.length<2){
                if(energyAvailable >=600){
                 currentSpawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],{role:'upgrader'});
                 console.log('Spawning Upgrader');
                }else if(energyAvailable >=500){
                 currentSpawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],{role:'upgrader'});
                 console.log('Spawning Upgrader');
                }else{
                 console.log('Spawning Upgrader');
                 currentSpawn.createCreep([WORK,CARRY,MOVE],{role:'upgrader'});
                }
            }
            else if(totalRepairer.length<1){
                 if(energyAvailable >=400){
                  console.log('Spawning Repairer');
                  currentSpawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],{role:'repairer'});
                 }else{
                  console.log('Spawning Repairer');
                  currentSpawn.createCreep([WORK,CARRY,MOVE],{role:'repairer'});
                 }
            }
        }
    }
};
module.exports = creepFactory