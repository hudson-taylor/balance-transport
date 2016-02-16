function _BalanceServer() {
  return function BalanceServer() {
    throw new Error("The balance transport only implements a client.");
  }
}

function _BalanceClient(balanceMethod, transports) {

  let clients = {};

  function getClient(i, callback) {
    if(!clients[i]) {
      clients[i] = new transports[i].Client();
      return clients[i].connect(function(err) {
        if(err) {
          return callback(err);
        }
        return callback(null, clients[i]);
      });
    }
    return callback(null, clients[i]);
  }

  function BalanceClient() {

  }

  BalanceClient.prototype.connect = function(done) {
    return done();
  }

  BalanceClient.prototype.disconnect = function(done) {
    return done();
  }

  BalanceClient.prototype.call = function(method, data, callback) {

    let client;

    switch(balanceMethod) {
      case "random": {
        let i = Math.floor(Math.random() * transports.length);
        getClient(i, finish);
      }
    }

    function finish(err, client) {
      if(err) {
        return callback(err);
      }
      client.call(method, data, callback);
    }

  }

  return BalanceClient;

}

export default function BalanceTransport(method, transports) {
  
  if(!transports) {
    throw new Error("You must pass 'transports' as a configuration option");
  }

  if(!transports.length) {
    throw new Error("You must pass at least 2 transports for this transport to be of use.");
  }

  let supportedMethods = [
    'random'
  ];

  if(!~supportedMethods.indexOf(method)) {
    throw new Error("The balance transport does not include: " + method);
  }

  if(transports.length === 1) {
    throw new Error("You're only passing 1 transport to this transport, you don't need this if you only have one.");
  }

  this.Server = _BalanceServer();
  this.Client = _BalanceClient(method, transports);

}
