# react-click-cluck

React wrapper for [click-cluck](https://github.com/redneckz/click-cluck) utility.
Postpones "onClick" event to prevent it in case of "onDoubleClick" event.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Bundle size][bundlephobia-image]][bundlephobia-url]

## Installation

```shell
npm install --save @redneckz/react-click-cluck
```

## How-to

### React Example

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { clickCluck } from '@redneckz/react-click-cluck';

const TheBestProductButton = clickCluck()(
  props => (
    <button
      className="the-best-product"
      {...props}
    >
      Give me two!
    </button>
  )
);

ReactDOM.render(
  <TheBestProductButton
    onClick={() => console.log('Just wait a bit...')}
    onDoubleClick={() => console.log('Need a package?')}
  />,
  document.getElementById('root'),
);
```

Press twice intermittently. And you will get:

```console
Just wait a bit...
Just wait a bit...
```

Make double click. And here it is:

```console
Need a package?
```

Also timeout can be configured:

```javascript
const TheBestProductButton = clickCluck(
  500, // 500ms by default
)(
  'button' // Valid DOM component
);
```

# License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://badge.fury.io/js/%40redneckz%2Freact-click-cluck.svg
[npm-url]: https://www.npmjs.com/package/%40redneckz%2Freact-click-cluck
[travis-image]: https://travis-ci.org/redneckz/react-click-cluck.svg?branch=master
[travis-url]: https://travis-ci.org/redneckz/react-click-cluck
[coveralls-image]: https://coveralls.io/repos/github/redneckz/react-click-cluck/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/redneckz/react-click-cluck?branch=master
[bundlephobia-image]: https://badgen.net/bundlephobia/min/@redneckz/react-click-cluck
[bundlephobia-url]: https://bundlephobia.com/result?p=@redneckz/react-click-cluck
