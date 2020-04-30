describe("Config file test", () => {
  it("should the value of a key", () => {
    var config = Config.newConfigFromText(`[request_definition]
    r = sub, obj, act`);

    assert.equal("sub, obj, act", config.get("request_definition::r"));
  });
  it("Test Default Effector", () => {
    var effector = new DefaultEffector();
    var effect = effector.mergeEffects(
      "some(where (p_eft == allow))",
      [Effect.Allow, Effect.Deny],
      [0, 1]
    );
    assert.equal(true, effect);
  });

  it("Basic Enforcer", async () => {
    const e = await newEnforcer(
      newModel(`[request_definition]
    r = sub, obj, act
    
    [policy_definition]
    p = sub, obj, act
    
    [policy_effect]
    e = some(where (p.eft == allow))
    
    [matchers]
    m = r.sub == p.sub && r.obj == p.obj && r.act == p.act`),
      new StringAdapter("p, alice, data1, get")
    );

    assert(true, await e.enforce("alice", "data1", "get"))
  });
});
