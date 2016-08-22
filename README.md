# werd

> Words API for JavaScript

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/werd"><img alt="npm version" src="https://badge.fury.io/js/werd.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

An unofficial Words API library for JavaScript with a CLI.

See [wordsapi.com](https://www.wordsapi.com/) for details on the Words API, "an API for the English language".

<img alt="werd demo" src="https://github.com/sdgluck/werd/blob/master/demo.gif">

## Install

__API__

```sh
npm install --save werd
```

__CLI__

```sh
npm install --global werd
```

## Requirements

- Mashape Words API key ([get one here](https://market.mashape.com/wordsapi/wordsapi/pricing))
- Node >= v4 for CLI

## Import

```js
// ES6
import werd from 'werd'
```

```js
// CommonJS
var werd = require('werd')
```

```html
<!-- Script, available at `window.werd` -->
<script src="/node_modules/werd/dist/werd.min.js"></script>
```

## API

_Read the Words API documentation for more details:_

https://market.mashape.com/wordsapi/wordsapi

### `werd(word) : Promise<Object>`

Get a word definition object. Also available as `werd.get()`.

- __word__ {String} The word

Returns a Promise that resolves to the word definition object.

### `werd.{operation}(word) : Promise<Object>`

Get data for the given word respective to the chosen operation.

- __word__ {String} The word

Returns a Promise that resolves with the respective data.

Available operations:

```js
definitions, synonyms, antonyms, examples, typeOf, hasTypes,
partOf, instanceOf, hasInstances, similarTo, also, syllables,
entails, memberOf, hasMembers, substanceOf, hasSubstances,
inCategory, hasCategories, usageOf, hasUsages, inRegion,
regionOf, pertainsTo, rhymes, frequency, pronunciation, hasParts
```

## CLI Usage

You will be prompted for your Mashape API key the first time you use the CLI.

```sh
$ werd|word --help

  Usage
    $ werd|word <word> [<operation>]

  Inputs
    word, the word to query
    operation, the query operation (default: get)

  Examples
    $ word chump
    $ werd program synonyms
    $ werd ocean syllables
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`werd` was created by [Sam Gluck](https://twitter.com/sdgluck) and is released under the MIT license.
