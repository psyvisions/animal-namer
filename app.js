// Generated by CoffeeScript 1.8.0
var Promise, WP, adj, animal, fs, name, wp, _;

WP = require('wordpos');

wp = new WP();

Promise = require('bluebird');

fs = require('fs');

_ = require('lodash');

Promise.promisifyAll(fs);

animal = function() {
  return fs.readFileAsync('animals.json', 'utf8').then(JSON.parse).then(_.sample);
};

adj = function(letter) {
  return new Promise(function(resolve, reject) {
    return wp.randAdjective({
      startsWith: letter.toLowerCase()
    }, resolve);
  });
};

name = function() {
  var ad, an;
  ad = '';
  an = '';
  return animal().then(function(result) {
    an = result;
    return adj(an[0]);
  }).get(0).then(function(ad) {
    ad = ad[0].toUpperCase() + ad.slice(1, +ad.length + 1 || 9e9);
    return ad + ' ' + an;
  });
};

module.exports = {
  animal: animal,
  adj: adj,
  name: name
};
