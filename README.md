# casbin.js

[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![install size](https://packagephobia.now.sh/badge?p=casbin.js)](https://packagephobia.now.sh/result?p=casbin)
[![codebeat badge](https://codebeat.co/badges/c17c9ee1-da42-4db3-8047-9574ad2b23b1)](https://codebeat.co/projects/github-com-casbin-casbin.js-master)
[![GitHub Actions](https://github.com/casbin/casbin.js/workflows/main/badge.svg)](https://github.com/casbin/casbin.js/actions)
[![Coverage Status](https://coveralls.io/repos/github/casbin/casbin.js/badge.svg?branch=master)](https://coveralls.io/github/casbin/casbin.js?branch=master)
[![Release](https://img.shields.io/github/release/casbin/casbin.js.svg)](https://github.com/casbin/casbin.js/releases/latest)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/casbin/lobby)

[npm-image]: https://img.shields.io/npm/v/casbin.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/casbin.js
[download-image]: https://img.shields.io/npm/dm/casbin.js.svg?style=flat-square
[download-url]: https://npmjs.org/package/casbin.js

**News**: still worry about how to write the correct `casbin.js` policy? [Casbin online editor](http://casbin.org/en/editor) is coming to help!

![casbin Logo](casbin-logo.png)

`casbin.js` is a powerful and efficient open-source access control library for TypeScript/JavaScript projects. It provides support for enforcing authorization based on various [access control models](https://en.wikipedia.org/wiki/Computer_security_model).

## All the languages supported by Casbin:

| [![golang](https://casbin.org/img/langs/golang.png)](https://github.com/casbin/casbin) | [![java](https://casbin.org/img/langs/java.png)](https://github.com/casbin/jcasbin) | [![nodejs](https://casbin.org/img/langs/nodejs.png)](https://github.com/casbin/node-casbin) | [![php](https://casbin.org/img/langs/php.png)](https://github.com/php-casbin/php-casbin) |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Casbin](https://github.com/casbin/casbin)                                             | [jCasbin](https://github.com/casbin/jcasbin)                                        | [node-Casbin](https://github.com/casbin/node-casbin)                                        | [PHP-Casbin](https://github.com/php-casbin/php-casbin)                                   |
| production-ready                                                                       | production-ready                                                                    | production-ready                                                                            | production-ready                                                                         |

| [![python](https://casbin.org/img/langs/python.png)](https://github.com/casbin/pycasbin) | [![dotnet](https://casbin.org/img/langs/dotnet.png)](https://github.com/casbin-net/Casbin.NET) | [![c++](https://casbin.org/img/langs/cpp.png)](https://github.com/casbin/casbin-cpp) | [![rust](https://casbin.org/img/langs/rust.png)](https://github.com/casbin/casbin-rs) |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [PyCasbin](https://github.com/casbin/pycasbin)                                           | [Casbin.NET](https://github.com/casbin-net/Casbin.NET)                                         | [Casbin-CPP](https://github.com/casbin/casbin-cpp)                                   | [Casbin-RS](https://github.com/casbin/casbin-rs)                                      |
| production-ready                                                                         | production-ready                                                                               | beta-test                                                                            | production-ready                                                                      |

## Documentation

https://casbin.org/docs/en/overview

## Installation

```shell script
# NPM
npm install casbin.js@next --save

# Yarn
yarn add casbin.js@next
```

## Get started

New a `casbin.js` enforcer with a model string and a memory policy, see [Model](#official-model) section for details:

```node.js
import { newEnforcer, newModel, MemoryAdapter } from 'casbin.js';

const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`);

const adapter = new MemoryAdapter(`
p, alice, data1, read
p, bob, data2, write
p, data2_admin, data2, read
p, data2_admin, data2, write

g, alice, data2_admin
`);

const enforcer = await newEnforcer(model, adapter);
```

> **Note**: you can also initialize an enforcer with policy in DB instead of file, see [Persistence](#policy-persistence) section for details.

Add an enforcement hook into your code right before the access happens:

```node.js
const sub = 'alice'; // the user that wants to access a resource.
const obj = 'data1'; // the resource that is going to be accessed.
const act = 'read'; // the operation that the user performs on the resource.

// Async:
const res = await enforcer.enforce(sub, obj, act);
// Sync:
// const res = enforcer.enforceSync(sub, obj, act);

if (res) {
  // permit alice to read data1
} else {
  // deny the request, show an error
}
```

Besides the static policy file, `casbin.js` also provides API for permission management at run-time.
For example, You can get all the roles assigned to a user as below:

```node.js
const roles = await enforcer.getRolesForUser('alice');
```

See [Policy management APIs](#policy-management) for more usage.

## Policy management

Casbin provides two sets of APIs to manage permissions:

- [Management API](https://casbin.org/docs/en/management-api): the primitive API that provides full support for Casbin policy management.
- [RBAC API](https://casbin.org/docs/en/rbac-api): a more friendly API for RBAC. This API is a subset of Management API. The RBAC users could use this API to simplify the code.

## Official Model

https://casbin.org/docs/en/supported-models

## Policy persistence

https://casbin.org/docs/en/adapters

## Policy consistence between multiple nodes

https://casbin.org/docs/en/watchers

## Role manager

https://casbin.org/docs/en/role-managers

## Contributors

This project exists thanks to all the people who contribute.
<a href="https://github.com/casbin/casbin.js/graphs/contributors"><img src="https://opencollective.com/casbin.js/contributors.svg?width=890&button=false" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/casbin#backer)]

<a href="https://opencollective.com/casbin#backers" target="_blank"><img src="https://opencollective.com/casbin/backers.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/casbin#sponsor)]

<a href="https://opencollective.com/casbin/sponsor/0/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/1/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/2/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/3/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/4/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/5/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/6/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/7/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/8/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/casbin/sponsor/9/website" target="_blank"><img src="https://opencollective.com/casbin/sponsor/9/avatar.svg"></a>

## License

This project is licensed under the [Apache 2.0 license](LICENSE).

## Contact

If you have any issues or feature requests, please contact us. PR is welcomed.

- https://github.com/casbin/casbin.js/issues
- Tencent QQ group: [546057381](//shang.qq.com/wpa/qunwpa?idkey=8ac8b91fc97ace3d383d0035f7aa06f7d670fd8e8d4837347354a31c18fac885)
