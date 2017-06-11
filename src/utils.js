'use strict';

const _  = require('lodash');

const MAXSIZE = 10;

/**
 * @typedef PacketModel
 * @type {Object}
 * @property {Array} values Les valeurs du paquet.
 * @property {number} total La taille totale du paquet.
 */

/**
 * Fonction permettant de regrouper des valeurs mineures par paquet
 * a partir d'un tableau de valeurs et d'un element parent. 
 * L'element parent correspond a une valeur deja categorisee.
 * 
 * @param {string[]} values - tableau de valeurs 
 * @param {number} element - element parent categorise 
 * @param {number} index - index courant du parent
 * @returns {PacketModel}
 */
function groupItems(values, element, index) {
  // on categorise notre element parent
  let group = {
    values: [element],
    total: element
  };
  // on supprime cette valeur de notre tableau
  values.splice(index, 1);
  // on traite toutes les valeurs qui peuvent etre categorisees
  let i = values.length;
  while (i > 0) { // FIXME: patch
    let idx = i-1;
    let item = parseInt(values[idx]);
    if (group.total + item <= MAXSIZE) {
      group.values.push(item);
      group.total += item;
      values.splice(idx, 1);
    } else {
      // console.log(`group item ${group.values}, item : ${item}`);
      i--;
    }
  }

  return group;
}

/**
 * Fonction permettant de reorganiser un tableau de valeurs (ASC)
 * 
 * @param {Array} values - tableau de valeurs a ordonner
 * @returns {Array} Le tableau de valeurs dans l'ordre croissant 
 */
function reorder(values) {
  let items = [];
  if(values && values.length > 0) {
    items = _.sortBy(values);
  }
  return items;
}

/**
 * Fonction permettant de presenter des valeurs.
 * 
 * @param {Array<PacketModel>} packets - tableau de valeurs a formatter
 * @returns {Array<string>} un tableau de valeurs formattees  
 */
function formatData(packets) {
  let result = [];
  if (packets && packets.length > 0) {
    result = _.map(packets, function(o) {
                let group = o.values && o.values.length > 0 ? o.values.join('') : ''; 
                return group;
            });
  }
  return result;
}

/**
 * Fonction permettant d'optimiser un regroupement de valeurs
 * par paquet de N elements.
 * 
 * @param {Array} [values] - tableau de valeurs
 * @returns {Array<PacketModel>} un tableau de paquets
 */
function optimiz(values) {
  //console.log(`optimiz: ${values}`);
  let result = [];

  // on traite toutes les valeurs du tableau 
  let y = Array.isArray(values) ? values.length : 0;
  for (let i = y; i > 0; i--) {
    // on recupere la derniere valeur du tableau (qui correspond a la valeur MAX)
    let index = values.length-1;
    const item = parseInt(values[index]) || 0;
    // on test la valeur de l'index 
    if (index < 0) {
      // nous n'avons plus d'element dans notre tableau de valeurs
      i = 0;
      continue;
    }
    
    // on prepare notre paquet d'articles et on l'ajoute a notre tableau final
    let group = groupItems(values, item, index);
    if (group.total > 0) { 
      result.push(group); 
    }

  }
  
  return result;
}

/**
 * Fonction permettant de regrouper un tableau de valeurs
 * par groupe de N articles.
 * 
 * @param {Array} values - tableau de valeurs a traiter
 * @returns {Array<PacketModel>} un tableau de paquets
 */
function optimizOrigin(values) {
  let result = [];
  if (!values || values.length < 1) { return result; }

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

// Exposition des methodes 
module.exports.reorder = reorder;
module.exports.optimiz = optimiz;
module.exports.optimizOrigin = optimizOrigin;
module.exports.formatData = formatData;
