  /*global phpCode, resultBody, uniter */
  var uniter = require('uniter');
  'use strict';

  export async function get_And_Execute_PhpCode(req, res){
    const {code}= req.body;
    console.log(code);
    try{
    var phpEngine = uniter.createEngine('PHP');

    var result1= phpEngine.getStdout().on('data', function (data) {
        console.log(data);
      });

    var result=  phpEngine.execute(code).fail(function (error) {
        console.log(error.toString());
      });
      console.log(result);
      if (result1.data!="") {
        res.json({
          "response":result1.data
        });
      }else {
        res.json({
          "response":result.valueArgs[0].message
        });
      }

    }catch(error){
      console.log(error);
      res.status(500).json({
        message: 'something went wrong',
        data:{

        }
      });
    }
  }
