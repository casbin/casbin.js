# Casbin.js

[![GitHub Actions](https://github.com/apache/casbin-casbin.js/workflows/build/badge.svg)](https://github.com/apache/casbin-casbin.js/actions)
[![Release](https://img.shields.io/github/release/apache/casbin-casbin.js.svg)](https://github.com/apache/casbin-casbin.js/releases/latest)
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![install size](https://packagephobia.now.sh/badge?p=casbin.js)](https://packagephobia.now.sh/result?p=casbin.js)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/S5UjpzGZjN)

[npm-image]: https://img.shields.io/npm/v/casbin.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/casbin.js
[download-image]: https://img.shields.io/npm/dm/casbin.js.svg?style=flat-square
[download-url]: https://npmjs.org/package/casbin.js

Casbin.js is the frontend library for [Casbin](https://casbin.org), which facilitates the manipulation, management and storage of the user permission in a frontend application.

## Example

We demonstrate the usage of Casbin.js with [a React app](https://github.com/casbin-js/examples/tree/master/src). View the code to see more details.


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

In `manual` mode you can also pass the model and policies produced by the backend's
`CasbinJsGetPermissionForUser` (a JSON object with the keys `m`, `p` and `g`) to
`setPermission`. Casbin.js then builds a real enforcer from that data, so roles (`g`
rules) are taken into account. Remember to set the user, since the request is evaluated
as `(user, object, action)`.
```javascript
const authorizer = new casbinjs.Authorizer("manual");

// The JSON string or object returned by CasbinJsGetPermissionForUser
authorizer.setPermission(responseFromApi);
await authorizer.setUser("alice");

authorizer.can("read", "data1").then(result => {
  console.log(result)
});
```

### Users with several roles

A user may hold any number of roles at the same time, and a role may inherit from
another role. Casbin.js evaluates the `g` rules with the same RBAC engine as the
backend, so the user gets the permissions of every one of those roles. This needs
the model and policies described above: the plain `{action: [objects]}` map holds no
roles at all, only the flattened result.
```javascript
// g, alice, admin
// g, alice, editor
// g, admin, root
const authorizer = new casbinjs.Authorizer("manual");
authorizer.setPermission(responseFromApi);
await authorizer.setUser("alice");

// Granted by "admin", by "editor", and by the "root" role that "admin" inherits.
await authorizer.can("read", "data1");

// ["admin", "editor", "root"]
await authorizer.getRoles();

// [["admin", "data1", "read"], ["editor", "data2", "write"], ...]
await authorizer.getImplicitPermissions();
```

For a model with domains, pass the domain to each of them: `authorizer.can("read", "data1", "domain1")`,
`authorizer.getRoles("domain1")`.

You can also use the `auto` mode. In details, specify a casbin backend service endpoint when initializing the Casbin.js authorizer, and set the subject when the frontend user identity changes. Casbin.js will automatically fetch the permission from the endpoint. (A pre-configurated casbin service API is required at the backend.)
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




