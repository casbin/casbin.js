import * as casbin from "casbin"
import { Authorizer } from "../Authorizer";
import { basicModelStr, rbacWithDomainsModelStr} from './models';

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
    const m = casbin.newModelFromString(s);
    const e = await casbin.newEnforcer(m);

    await e.addPolicy("alice", "data1", "read");
    expect(await e.enforce("alice", "data1", "read")).toBe(true);
    expect(await e.enforce("alice", "data1", "write")).toBe(false);
})
