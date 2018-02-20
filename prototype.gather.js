module.exports = function(){
    Creep.prototype.gather =
    function(creep,source){
        //Check what kind of source it is, and then gather the fucker
        let sourceType = source.structureType;
        if(sourceType == undefined){
            //This is dropped energy
            creep.pickup(source);
        }else {
            creep.withdraw(source,RESOURCE_ENERGY);
        }
    };
};