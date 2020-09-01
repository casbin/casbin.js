import * as casbin from "casbin"
import { Authorizer } from "../Authorizer";
import { basicModelStr } from "./models";

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
