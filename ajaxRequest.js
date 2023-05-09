const request = require('request');


function AJAXCALLER_POST(URL, json_params, onSucessCallback, onErrorCallback = null) 
{
    const options = {
          url: URL,
          method: 'POST',
          json: true,
          body: json_params,
          rejectUnauthorized: false
        };
    
    request(options, (error, response, body) => {
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
