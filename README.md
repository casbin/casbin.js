# Casbin.js

[![NPM version](https://img.shields.io/npm/v/casbin.js)](https://www.npmjs.com/package/casbin.js)
[![Continuous integration](https://github.com/casbin/casbin.js/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/casbin/casbin.js/actions/workflows/ci.yml)
[![codebeat badge](https://codebeat.co/badges/74b3febb-292f-4633-81df-3a76ea445cd8)](https://codebeat.co/projects/github-com-casbin-casbin-js-master)
![Code size](https://img.shields.io/github/languages/code-size/casbin/casbin.js)

Casbin.js is a frontend port of a backend Casbin service, which facilitates the manipulation, management and storage of the user permission in a frontend application.

## Example

We demostrate the usage of Casbin.js with [a React app](https://github.com/casbin-js/examples/tree/master/react). View the code to see more details.


You can use `manual` mode in Casbin.js, and set the permission whenever you wish.
```javascript
const casbinjs = require('casbin.js');

// Set the user's permission:
// He/She can read 2 objects: data1 and data2
// Can write 1 objects: data1
const permission = {
    "read": ['data1', 'data2'],
    "write": ['data1']
}

// Run casbin.js in manual mode, which requires you to set the permission manually.
const authorizer = new casbinjs.Authorizer("manual");

authorizer.setPermission(permission);

authorizer.can("read", "data1").then(result => {
  console.log(result)
})
authorizer.cannot("write", "data2").then(result => {
  console.log(result)
});
```

You can also use the `auto` mode. In details, specify an casbin backend service endpoint when initialize the Casbin.js authorizer, and set the subject when the frontend user identity changes. Casbin.js will automatically fetch the permission from the endpoint. (A pre-configurated casbin service API is required at the backend.)
```javascript
const casbinjs = require('casbin.js');

// Set your backend casbin service url
const authorizer = new casbinjs.Authorizer('auto', {endpoint: 'http://Domain_name/casbin/api'});

// When the identity shifts, reset the user. Casbin.js will automatically fetch the permission from the endpoint.
await authorizer.setUser("Tom");

// Evaluate the permission
authorizer.can("read", "data1").then();
```

More functionalities of Casbin.js are still under development. Feel free to raise issues to share your features suggestions!

## TODO MAP
- [x] Permission cache.
- [ ] Cookie mode.
- [ ] Lightweight enforcer (avoid the abuse of async functions).
- [ ] Integration with other modern frontend frameworks.



