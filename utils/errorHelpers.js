const { MongooseError ,} = require('mongoose')


function errorHelper(err){
      if(err instanceof MongooseError){
        return Object.values(err.errors).map(x => x.message)
      }else if(err){
        return [err.message]
      }

}

module.exports = {
    errorHelper,
}