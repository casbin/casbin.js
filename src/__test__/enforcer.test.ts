import * as casbin from "casbin-core"
import { Authorizer } from "../Authorizer";
import { basicModelStr, rbacModelStr, rbacWithDomainsModelStr} from './models';

const respData = JSON.stringify({
    m: basicModelStr,
    p: [
        ["p", "alice", "data1", "read"],
        ["p", "alice", "data2", "write"]
    ]
});

test('Authorizer enforcer API', async() => {
    const authorizer = new Authorizer("auto", {endpoint: "whatever"});
    await authorizer.initEnforcer(respData);
    authorizer.user = "alice";
    expect(await authorizer.can("write", "data2")).toBe(true);
    expect(await authorizer.cannot("read", "data2")).toBe(true);
    expect(await authorizer.canAll("read", ["data1", "data2"])).toBe(false);
    expect(await authorizer.canAny("read", ["data1", "data2"])).toBe(true);
})

const respDataWithDomain = JSON.stringify({
    m:rbacWithDomainsModelStr,
    p: [
        [
            "p",
            "admin",
            "domain1",
            "data1",
            "read"
        ],
        [
            "p",
            "admin",
            "domain1",
            "data2",
            "write"
        ],
        [
            "g",
            "alice",
            "admin",
            "domain1"
        ],
    ]
})

test('Authorizer enforcer with domain API', async() => {
    const authorizer = new Authorizer("auto", {endpoint: "whatever"});
    await authorizer.initEnforcer(respDataWithDomain);
    authorizer.user = "alice";
    expect(await authorizer.can("read", "data1", "domain1")).toBe(true);
    expect(await authorizer.cannot("write", "data1", "domain1")).toBe(true);
    expect(await authorizer.canAny("write", ["data1", "data2"], "domain1")).toBe(true);
    expect(await authorizer.canAll("write", ["data1", "data2"], "domain1")).toBe(false);
})

// The shape returned by casbin's "CasbinJsGetPermissionForUser": the grouping
// policies live under their own "g" key, not inside "p".
const respDataWithSeparateGroupingRules = {
    m: rbacModelStr,
    p: [
        ["p", "admin", "data1", "read"],
        ["p", "admin", "data1", "write"],
        ["p", "user", "data1", "read"],
    ],
    g: [
        ["g", "alice", "admin"],
        ["g", "bob", "user"],
    ],
};

test('Authorizer enforcer with grouping policies in the "g" section', async() => {
    const authorizer = new Authorizer("auto", {endpoint: "whatever"});
    await authorizer.initEnforcer(JSON.stringify(respDataWithSeparateGroupingRules));
    authorizer.user = "alice";
    expect(await authorizer.can("read", "data1")).toBe(true);
    expect(await authorizer.can("write", "data1")).toBe(true);
    authorizer.user = "bob";
    expect(await authorizer.can("read", "data1")).toBe(true);
    expect(await authorizer.can("write", "data1")).toBe(false);
})

test('Manual mode accepts the model and policies of CasbinJsGetPermissionForUser', async() => {
    const authorizer = new Authorizer("manual");
    authorizer.setPermission(respDataWithSeparateGroupingRules);
    await authorizer.setUser("alice");
    expect(await authorizer.can("read", "data1")).toBe(true);
    expect(await authorizer.can("write", "data1")).toBe(true);
    expect(await authorizer.can("read", "data2")).toBe(false);

    const fromString = new Authorizer("manual");
    fromString.setPermission(JSON.stringify(respDataWithSeparateGroupingRules));
    await fromString.setUser("bob");
    expect(await fromString.can("read", "data1")).toBe(true);
    expect(await fromString.cannot("write", "data1")).toBe(true);
})

const s = `[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
`

test('Load casbin from strings.', async () => {
    const m = new casbin.Model(s);
    const e = await casbin.newEnforcer(m);

    await e.addPolicy("alice", "data1", "read");
    expect(await e.enforce("alice", "data1", "read")).toBe(true);
    expect(await e.enforce("alice", "data1", "write")).toBe(false);
})
