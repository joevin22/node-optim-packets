'use strict';

const _  = require('lodash');

const MAXSIZE = 10;

function reorder(values) {
  let items = [];
  if(values && values.length > 0) {
    items = _.sortBy(values).reverse();
  }
  return items;
}

function groupItems(values, element, index) {
  let group = {
    values: [element],
    total: element
  };
  values.splice(index, 1);
  
  let i = 0;
  while(i < values.length) {
    let item = parseInt(values[i]);
    if (group.total + item <= MAXSIZE) {
      group.values.push(item);
      group.total += item;
      //console.log('childPackets in ', values);
      values.splice(i, 1);
      //console.log('childPackets out ', values);
      i = 0;
    } else {
      i++;
    }
  }

  return group;
}

function optimiz(values) {
  //console.log(`optimiz: ${values}`);
  let result = [];
  
  let y = 1;
  while(y > 0) {

    let index = values.length-1;
    let element = parseInt(values[index]) || 0;
    //console.log(`value: ${values[index]} - index: ${index}`);
    
    if (index < 0) {
      y = 0;
      break;
    }
    
    let group = groupItems(values, element, index);
    //console.log(`values: ${values}`);
    if (group.total > 0) {
      result.push(group);
    }
  
  }

  if (values && values.length > 0) {
    result.push({values: values, total: values.length});
  }

  return result;
}

function standardOptimiz(values) {
  let result = [];

  let item = {
    total: 0,
    values: []
  };

  for (let index = 0; index < values.length; index++) {
    let element = parseInt(values[index]) || 0;
    if (item.total + element <= MAXSIZE) {
      item.total += element;
      item.values.push(element);
    } else {
      result.push(item);
      item = { total: element, values: [element] };
    }
  }

  if (item.total > 0) {
    result.push(item);
  }

  return result;
}

// Exposition
module.exports.reorder = reorder;
module.exports.optimiz = optimiz;
module.exports.standardOptimiz = standardOptimiz;
