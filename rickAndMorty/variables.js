const generatedInitValue = () => {
    var charactersAvailable = new Array();

    for (let index = 0; index < 50; index++) {
        charactersAvailable.push({id: index+1, lastPetition: ''});    
    }

    return charactersAvailable;
}

module.exports = {
    generatedInitValue
}