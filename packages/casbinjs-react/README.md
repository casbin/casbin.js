# Casbin.js

This is a React library that enhances casbin.js

# Example

This is an ideal examples for this library.

> (We haven't implemented these features yet)

```jsx
import React from 'react';
import newEnforcer from '@casbinjs/core';
import { CasbinProvider, Enforce } from '@casbinjs/react';

const model = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
`;

const policy = `
p, alice, data1, read
`;

const enforcer = newEnforcer(model, policy);

const sub = 'alice'; // the user that wants to access a resource.
const obj = 'data1'; // the resource that is going to be accessed.
const act = 'read'; // the operation that the user performs on the resource.,

// With Component
export default function App() {
    return (
        <CasbinProvider enforcer={enforcer} sub={sub}>
            <Enforce obj={obj} act={act}>
                <p>can read data1</p>1
            </Enforce>

            <Enforce deny obj={obj} act={act}>
                <p>cannot read data1</p>
            </Enforce>
            <Enforce sub={sub} obj={obj} act={act}>
                <p>{sub} cannot read data1</p>
            </Enforce>
        </CasbinProvider>
    );
}

// With hook
export default function App() {
    const enforcer = useEnforcer();
    const roles = enforcer.getRolesForUser(sub);
    return enforcer.enforce(obj, act) ? ( // also enforcer.enforce(sub, obj, act)
        <p>can read data1</p>
    ) : (
        <p>cannot read data1</p>
    );
}

// With HOC
const WrappedApp = function (props) {
    return props.enforcer.enforce(obj, act) ? <p>can read data1</p> : <p>cannot read data1</p>;
};
export default App = injectCasbin(WrappedApp);
```
