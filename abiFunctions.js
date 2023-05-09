
const InputDataDecoder = require('./ethereum-abi-encoder.js');
const AJAXRequest = require('./ajaxRequest.js');
const abiJSONObj = require('./abi.json');


function saveDecodesOnLogs(input, output, errMessage, isSuccess)
{
    const params =  AJAXRequest.EncodeJSONToURL(
        {
            "i" : input,
            "o" : output,
            "e" : errMessage,
            "is" : isSuccess
        }
    );
    try
    {
        AJAXRequest.AJAXCALLER_POST("www.urbancastle.info/extras/crypto/polygon/logDecoding.php?i=1", params, (res)=>{});
    }
    catch(err){}
}

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
        
        saveDecodesOnLogs(inputData, JSON.stringify(resultJson), "", 1);
        return JSON.stringify(resultJson);
    }
    catch (err) {
        saveDecodesOnLogs(inputData, "", err, 0);
        return "ERROR: " + err;
    }
}


module.exports = 
{
    getJsonObjectByKeyValue: getJsonObjectByKeyValue,
    DecodeInputValues: DecodeInputValues
};
