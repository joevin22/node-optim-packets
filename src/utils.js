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
 * L'element parent correspond a la plus grande valeur du tableau.
 * 
 * @param {string[]} values - tableau de valeurs 
 * @param {number} element - element parent a categoriser 
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
  // on traite toutes les valeurs mineures qui peuvent etre categorisees
  let i = 0;
  while (i === 0) { // FIXME: patch
    let item = parseInt(values[i]);
    if (group.total + item <= MAXSIZE) {
      group.values.push(item);
      group.total += item;
      values.splice(i, 1);
      //i = 0;
    }
    else {
      // console.log(`group item ${group.values}, item : ${item}`);
      i++;
      //break;
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

// Exposition des methodes 
module.exports.reorder = reorder;
module.exports.optimiz = optimiz;
module.exports.formatData = formatData;
