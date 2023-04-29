
const InputDataDecoder = require('./ethereum-abi-encoder.js');
const abiJSONObj = require('./abi.json');


function getJsonObjectByKeyValue(jsonObject, key, value) 
{
    if(jsonObject === null)
    {
        return {};
    }
    if (jsonObject.constructor === Array)
    {
        return jsonObject.find(function(obj) {
            return obj[key] === value;
          });
    }
    else
    {
        return jsonObject;
    }
}



function DecodeInputValues(requestParams)
{
    var  functionName = "";
    try
    {
        functionName = requestParams.functionName; //recordFoodStorageData
    }
    catch(err)
    {}

    const jsonAbi = [getJsonObjectByKeyValue(abiJSONObj, "name", functionName)];
    
    var decoder = new InputDataDecoder(jsonAbi);

    try {

        const inputData = requestParams.input;

        var resultJson = [];

        resultArray = decoder.decodeData(inputData);

        for (inputIndex = 0; inputIndex < resultArray.inputs.length; inputIndex++) 
        {
            resultJson.push({Name: resultArray.names[inputIndex], Type: resultArray.types[inputIndex], Data: resultArray.inputs[inputIndex]});
        }
        
        return JSON.stringify(resultJson);
    }
    catch (err) {
        return "ERROR: " + err;
    }
}


module.exports = 
{
    getJsonObjectByKeyValue: getJsonObjectByKeyValue,
    DecodeInputValues: DecodeInputValues
};
