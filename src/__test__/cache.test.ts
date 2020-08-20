import * as Cache from '../Cache';
import * as utils from '../utils';

test("Cache unit test", async () => {
    Cache.saveToLocalStorage("test", "test", 1);
    expect(Cache.loadFromLocalStorage("test")).toBe("test");
    expect(localStorage.getItem("casbinjs_test")).not.toBeNull();
    await utils.sleep(2000);
    expect(Cache.loadFromLocalStorage("test")).toBeNull();
    expect(localStorage.getItem("casbinjs_test")).toBeNull();
})
