# balance-transport

## What

The hudson-taylor balance transport allows you to use multiple transports
when connecting to a service. This lets you do things like round robin between
connections, or use a specific transport depending on weightings etc.

## How

```
npm install ht-balance-transport --save
```

### new HTBalanceTransport(balanceMethod, [ transport, ... ])

```js
var ht = require('hudson-taylor');
var HTBalanceTransport = require('ht-balance-transport');

var t1 = new ht.Transports.HTTP({ host: "appbox1.example.com", port: 3000 });
var t2 = new ht.Transports.HTTP({ host: "appbox2.example.com", port: 3000 });

var client = new ht.Client({
  app: new HTBalanceTransport('random', [ t1, t2 ]);
});
```

### Balance Methods

#### random

This method will select a random transport from the list, and use that.

## License
ISC
