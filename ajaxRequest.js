const request = require('request');


function AJAXCALLER_POST(URL, json_params, onSucessCallback, onErrorCallback = null) 
{
    request.post(URL, { json: json_params }, (error, response, body) => {
      if (error) 
      {
          if(onErrorCallback !== null)
          {
              onErrorCallback(error);
          }
      } 
      else 
      {
          if(onSucessCallback !== null)
          {
              onSucessCallback(body);
          }
      }
    });
}


module.exports = 
{
    AJAXCALLER_POST: AJAXCALLER_POST
};
