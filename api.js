/* global Promise:false, define:false, module:false, self:false */

'use strict'

if (typeof define === 'function' && define.amd) {
  define('werd', function () { return werd })
} else if (typeof module === 'object' && module.exports) {
  module.exports = werd
} else {
  self.werd = werd
}

var axios = require('axios')
var queryString = require('query-string')

var constants = require('./constants')

var API = constants.API
var METHODS = constants.METHODS

function request (url) {
  return axios.get(url).then(function (response) {
    if (String(response.status) !== '200') {
      return Promise.reject(Error(response.status + ' response: ' + response.body))
    }
    return response.data
  })
}

function werd (mashapeKey) {
  if (typeof mashapeKey !== 'string') {
    throw new Error('Expecting mashapeKey to be a string')
  }

  axios.defaults.headers['X-Mashape-Key'] = mashapeKey
  axios.defaults.headers['Accept'] = 'application/json'

  return api
}

function api (word) {
  if (typeof word !== 'string') {
    return Promise.reject(Error('Expecting word to be a string'))
  }
  return request([API, word].join('/'))
}

api.get = api

api.search = function (options) {
  if (!options) {
    return Promise.reject(Error('Expecting options object'))
  }
  return request(API + '?' + queryString.stringify(options))
}

api.random = function () {
  return request(API + '?random=true')
}

METHODS.forEach(function (wordDetailSlug) {
  api[wordDetailSlug] = function (word) {
    if (typeof word !== 'string') {
      return Promise.reject(Error('Expecting word to be a string'))
    }
    return request([API, word, wordDetailSlug].join('/'))
  }
})
