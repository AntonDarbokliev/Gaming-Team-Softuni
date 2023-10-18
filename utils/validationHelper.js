function isOwner(cryptoOwnerId,userId){
    if(cryptoOwnerId !== userId) throw new Error('You are not the owner of this coin');
  }

  module.exports = isOwner
  