const _ = require('lodash');
const { ObjectId } = require('mongodb');

module.exports.isValid = function(data) {
  return _.isEqual(data, {
    title: data?.title,
    value: data?.value,
    type: data?.type,
    category: data?.category,
  })
}


module.exports.isValidId = function(id) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}