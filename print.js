'use strict'

const chalk = require('chalk')

const frequencyGlossary = {
  zipf: '1-7 scale of how common the word is in the English language',
  perMillion: 'number of times the word is likely to appear in a corpus of one million English words',
  diversity: '0-1 scale that shows the likelihood of a word appearing in an English document that is part of a corpus'
}

const listLoggers = {
  synonyms: 'Synonyms of WORD',
  antonyms: 'Antonyms of WORD',
  rhymes: 'Rhymes of WORD',
  examples: 'Examples of WORD',
  also: 'Words of which WORD is a part',
  entails: 'Words that are implied by WORD',
  hasCategories: 'Categories of WORD',
  hasInstances: 'Words that are examples of WORD',
  hasMembers: 'Words that belong to the group defined by WORD',
  hasParts: 'Words that are a parts of WORD',
  hasSubstances: 'Words that are substances of WORD',
  hasTypes: 'More specific examples of WORD',
  hasUsages: 'Words that are examples of the domain of WORD',
  inRegion: 'Geographical areas where WORD is used',
  inCategory: 'The domain category to which WORD belongs',
  typeOf: 'Words that are more general than WORD',
  instanceOf: 'Words that WORD is an example of',
  memberOf: 'Groups to which WORD belongs',
  partOf: 'The larger whole to which WORD belongs',
  pertainsTo: 'Words to which WORD is relevant',
  regionOf: 'Words used in the geographical area of WORD',
  similarTo: 'Words that are similar to WORD, but which are not synonyms',
  substancesOf: 'Substances to which WORD is a part of',
  usageOf: 'Words that WORD is a domain usage of'
}

function highlightValues (strings, values) {
  let i = 0
  return strings.reduce((heading, str) => {
    return heading + str + (values[i] ? chalk.yellow(values[i++]) : '')
  }, '')
}

function logHeading (strings) {
  const values = Array.from(arguments).slice(1)
  console.log(`\n    ${highlightValues(strings, values)}\n`)
}

function logList (list) {
  if (list.length) {
    console.log('\t' + list.join('\n\t'))
  } else {
    console.log('\tNo data')
  }
}

function listFn (heading, propName) {
  return (word, data) => {
    console.log(`\n    ${heading.replace('WORD', chalk.yellow(word))}\n`)
    logList(data[propName])
  }
}

Object.assign(module.exports, Object.keys(listLoggers).reduce((obj, key) => {
  const heading = listLoggers[key]
  obj[key] = listFn(heading, key)
  return obj
}, {}))

module.exports.frequency = (word, data) => {
  logHeading`Frequency of ${chalk.yellow(data.word)}`
  console.log(`\t${chalk.yellow('zipf')}: ` + data.frequency.zipf || '?')
  console.log(`\t${chalk.yellow('perMillion')}: ` + data.frequency.perMillion || '?')
  console.log(`\t${chalk.yellow('diversity')}: ` + data.frequency.diversity || '?')

  logHeading`Glossary`
  Object.keys(frequencyGlossary).forEach(key => {
    console.log(`\t${chalk.yellow(key)}: ${frequencyGlossary[key]}`)
  })
}

module.exports.pronunciation = (word, data) => {
  const results = data.pronunciation
  const keys = Object.keys(results)

  logHeading`Pronunciation of ${word}`
  keys.length && keys.forEach((key) => {
    console.log(`\t${chalk.yellow(key)}: ${results[key]}\n`)
  })
}

module.exports.syllables = (word, data) => {
  logHeading`Syllables of ${word}`
  console.log(`\t${data.syllables.list.join(', ')}`)
}

module.exports.random =
module.exports.get =
module.exports.definitions = (word, data) => {
  const results = data.results || []

  logHeading`${word}`

  results.length && console.log(results.map((result, i) => {
    return `\t${i + 1}. ${chalk.yellow(result.partOfSpeech)}, ${result.definition}\n\n`
  }).join(''))
}
