describe("Config file test", () => {
  it("should the value of a key", () => {
    var config = Config.newConfigFromText(`[request_definition]
    r = sub, obj, act`);

    assert.equal("sub, obj, act", config.get("request_definition::r"));
  });
});
