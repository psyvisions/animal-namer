WP = require 'wordpos'
wp = new WP()
Promise = require 'bluebird'
fs = require 'fs'
_ = require 'lodash'

Promise.promisifyAll fs

animal = -> 
  fs.readFileAsync 'animals.json', 'utf8'
  .then JSON.parse
  .then _.sample

adj = (letter) ->
  new Promise (resolve, reject) ->
    wp.randAdjective {startsWith: letter.toLowerCase()}, resolve

name = ->
  ad = ''
  an = ''

  animal()
  .then (result) ->
    an = result
    adj an[0]
  .get 0
  .then (ad) -> 
    ad = ad[0].toUpperCase() + ad[1..ad.length]
    ad + ' ' + an

module.exports = 
  animal: animal
  adj: adj
  name: name