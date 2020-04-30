# casbin.js
[![Build Status](https://travis-ci.com/romitkarmakar/casbin.js.svg?branch=master)](https://travis-ci.com/romitkarmakar/casbin.js)

Casbin.js is the front-end port from [Node-Casbin](https://github.com/casbin/node-casbin) in Node.js. Most of their code is shared.

Casbin.js has been already used in [Casbin Online Editor](https://casbin.org/en/editor) for front-end enforcement, by [this commit](https://github.com/casbin/casbin-website/commit/ee916d5891eef18bb743c97299b263a036bb6a47).

We have plan to extract it into this repo, still work in progress. For now, you can just use the logic in Casbin Online Editor.

## Installation

- Clone the repository.

- Embed the js file in your web page.
```js
<script src="dist/casbin.js"></script>
```
- Now you can enforce policy locally.
```js
<script>
let model = `[request_definition]
    r = sub, obj, act
    
    [policy_definition]
    p = sub, obj, act
    
    [policy_effect]
    e = some(where (p.eft == allow))
    
    [matchers]
    m = r.sub == p.sub && r.obj == p.obj && r.act == p.act`;

let policy = `p, alice, data1, get
p, bob, data2, post`  

const e = await newEnforcer(
      newModel(model),
      new StringAdapter(policy)
    );

    var result = await e.enforce("alice", "data1", "get")
</script>
```