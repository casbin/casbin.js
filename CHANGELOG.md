# 1.0.0-beta.1 (2021-08-22)


### Bug Fixes

* `getImplicitPermissionsForUser` works with rmMap ([#272](https://github.com/casbin/casbin.js/issues/272)) ([0d59239](https://github.com/casbin/casbin.js/commit/0d5923998fa71648c8f77a23f67ffffac2a09343))
* add cache to generateGFunction ([e90bed2](https://github.com/casbin/casbin.js/commit/e90bed24f6e6e3cd5b33a433c4fe7a27e494cabe))
* add casbin-cpp to supported languages. ([b856734](https://github.com/casbin/casbin.js/commit/b85673432f8a150490fd5134797508ccd368b81f))
* add check if the adapter implements BatchAdapter ([a415838](https://github.com/casbin/casbin.js/commit/a415838a514706af8a9399c899959bdb069619d4))
* add checks fieldValues to remove filtered policy ([6e144fb](https://github.com/casbin/casbin.js/commit/6e144fb9a895332245006ef3a28c47d022654895))
* Add examples. ([5cf950a](https://github.com/casbin/casbin.js/commit/5cf950ad25eecfad59281d5ba9d6ddae5cde199e))
* Add imports and batchFileAdapter implementation. ([3804c3d](https://github.com/casbin/casbin.js/commit/3804c3d76802614104016a011c07c11c54a94632))
* add missing await ([523ce85](https://github.com/casbin/casbin.js/commit/523ce8508ce45d7e79673bb0b498ed017772815d))
* Add tests for batch operations. ([e6ad7af](https://github.com/casbin/casbin.js/commit/e6ad7af69344a5bd95b6490f162dba83d10c98fb))
* Added ABAC policy logic to the private enforcer. ([c6fc487](https://github.com/casbin/casbin.js/commit/c6fc48750313b400fb98e12802b3422bfc1921bf))
* Added util functions and util tests. ([72918bc](https://github.com/casbin/casbin.js/commit/72918bc677e898251dd4375516c31254e79eb6b8))
* check adapter type ([a74314d](https://github.com/casbin/casbin.js/commit/a74314d6c4e1e1c8731128e6bfe9e2de1b3f45ce))
* compatible types ([58242a5](https://github.com/casbin/casbin.js/commit/58242a56f9f72b1a06e4901867f502b73674d640))
* downgrade expression-eval back to v2.0.0 to avoid semantic-release failure, revert: https://github.com/casbin/node-casbin/pull/222 ([8c0b1fd](https://github.com/casbin/casbin.js/commit/8c0b1fd6b59c39350e90c768c54577396f89fefe))
* downgrade target from ESNext to ES2017 for building esm ([7dfcf93](https://github.com/casbin/casbin.js/commit/7dfcf93a2eb7a9c9116f55341537a4c81840e3d4))
* fix buildRoleLinks to isolate groups ([0fb6ae7](https://github.com/casbin/casbin.js/commit/0fb6ae798ef692aaef890472421f980b58a4dfec))
* fix CasbinJsGetPermissionForUser() ([#251](https://github.com/casbin/casbin.js/issues/251)) ([98c11f1](https://github.com/casbin/casbin.js/commit/98c11f1451e71b0b002b140387f2a38bb9957c38))
* fix errror type ([dc9e5b5](https://github.com/casbin/casbin.js/commit/dc9e5b5db766d64918a7670f6b3b72f70e84ca28))
* fix logic error and add unittests ([82124e3](https://github.com/casbin/casbin.js/commit/82124e3dccfbee9a2a9b75606ff1d4d2c4c03202))
* fix unexpected parser action ([3074fa9](https://github.com/casbin/casbin.js/commit/3074fa9050ca073eb4c0f4197c63f13e9e7f9ebf))
* getImplicitPermissionsForUser missing domain parameter ([584624c](https://github.com/casbin/casbin.js/commit/584624c99eabca68fc790d66fc4737511d92b074))
* ignore print model ([f426131](https://github.com/casbin/casbin.js/commit/f426131e752143251db6c11a7352d91d959cb503))
* improve load policy line ([9f12511](https://github.com/casbin/casbin.js/commit/9f12511e5fbfb16646b38ad30e345beee5179c9d))
* improve tokens separator ([687e96f](https://github.com/casbin/casbin.js/commit/687e96f1495de12bc7acd37bf56af57af490b0b6))
* improve update into adapter before model ([0e9ccc6](https://github.com/casbin/casbin.js/commit/0e9ccc6b2e4387b9130df8af4fa0e23f7e73958b))
* Merge conflicts. ([7179b17](https://github.com/casbin/casbin.js/commit/7179b17f7733f72fdd1d13ca6a7818415deb6d9c))
* remove lodash ([293a852](https://github.com/casbin/casbin.js/commit/293a852803d5e83562a36bc35cdf48def0f0088b))
* remove unused import ([2f8801c](https://github.com/casbin/casbin.js/commit/2f8801c47e716f69c36b49a73a45c67d9c751b92))
* remove use spread operator with await in array ([6e4f876](https://github.com/casbin/casbin.js/commit/6e4f87676301470a178ccd10efd28f6758cc738e))
* rename StringAdapter to MemoryAdapter ([aa92d40](https://github.com/casbin/casbin.js/commit/aa92d40851d605d482b2a32841120bd30baff9eb))
* stackoverflow in getImplicitRolesForUser ([d0fc49f](https://github.com/casbin/casbin.js/commit/d0fc49fb12c7cbb9f985d444c1ed7613ded0121b))
* support comments after expression ([c97cb26](https://github.com/casbin/casbin.js/commit/c97cb26441d79316960a0464e8d56918859d969c))
* Support for loadIncrementalFilteredPolicy ([72c2001](https://github.com/casbin/casbin.js/commit/72c2001ab064d190bfa5bcd305829d083eca52f7))
* support pattern function in 3rd args of g ([#199](https://github.com/casbin/casbin.js/issues/199)) ([27005f8](https://github.com/casbin/casbin.js/commit/27005f85829f11193cb4ecfd14be5ed6e64ad63c))
* tests. ([4da5291](https://github.com/casbin/casbin.js/commit/4da52916d27f262a4813d2b4ff78461312b67c22))
* transfer from micromatch to picomatch ([#264](https://github.com/casbin/casbin.js/issues/264)) ([6be1b06](https://github.com/casbin/casbin.js/commit/6be1b06f2225bc906b2a0e215ff8635c6dd3422f))
* update expression-eval ([95de296](https://github.com/casbin/casbin.js/commit/95de29650251af781d8638011dcc5cabeef2784c))
* use csv-like format ([32ec20d](https://github.com/casbin/casbin.js/commit/32ec20d07ff1c0f21c910a450398d7163ca1d1be))
* **builtinoperators:** fix function keyMatch3 ([1245aa0](https://github.com/casbin/casbin.js/commit/1245aa072b47135b49cb70abeed0796908a8feb7)), closes [#214](https://github.com/casbin/casbin.js/issues/214)
* **enforcer.ts:** fix deleteUser and improve deleteRole description ([1e6af16](https://github.com/casbin/casbin.js/commit/1e6af16e939543a56dbf9cb5d39924263186fc9a)), closes [#118](https://github.com/casbin/casbin.js/issues/118)
* **rbac:** fix defaultRoleManager hasRole method ([#211](https://github.com/casbin/casbin.js/issues/211)) ([4f3ba65](https://github.com/casbin/casbin.js/commit/4f3ba65429f91250485b8a0b070f16cb750955cd))
* update casbinJsGetPermissionForUser for v0.1.0 Casbin.js ([#186](https://github.com/casbin/casbin.js/issues/186)) ([6c277e8](https://github.com/casbin/casbin.js/commit/6c277e8858cf07d9a098817b72710a30c4117fa9))


### Features

* add addMatchingFunc to DefaultRoleManager ([cc04e65](https://github.com/casbin/casbin.js/commit/cc04e659a1c3b78bb12dcccbb2149bfd9d96c97c))
* add BuildIncrementalRoleLinks ([b565005](https://github.com/casbin/casbin.js/commit/b5650055a6e8c47da49dc3b7eb8646bb5bda90d9))
* add casbinJsGetPermissionForUser ([30ae126](https://github.com/casbin/casbin.js/commit/30ae126b962df6fc580ce943f20e8bf0ce5349c3))
* add enforceEx() ([#271](https://github.com/casbin/casbin.js/issues/271)) ([762efd9](https://github.com/casbin/casbin.js/commit/762efd9d9766fbc8e95f9d5160413ed2a8c6ce88))
* add getImplicitUsersForPermission ([ad9df14](https://github.com/casbin/casbin.js/commit/ad9df1417cbdb7e0d9065c78e86181d193778adf))
* add glob pattern to built-in function ([8415fc2](https://github.com/casbin/casbin.js/commit/8415fc2648796d033c85771e27219bd32541982e))
* add initRmMap ([87f8011](https://github.com/casbin/casbin.js/commit/87f801109e9cf4b0b423e3b76e1a8b9987b1b600))
* Add lazyload option at enforcer init method ([#289](https://github.com/casbin/casbin.js/issues/289)) ([e858dcb](https://github.com/casbin/casbin.js/commit/e858dcbab2351de038e2c5385bbfd20b7aa255ad))
* add named addMatchingFunc ([65d3a26](https://github.com/casbin/casbin.js/commit/65d3a2655c638085938de9df4efa5a7d16bfa788))
* add policyArrayToString and policyStringToArray to util ([e71b40f](https://github.com/casbin/casbin.js/commit/e71b40fc1917f1f8bd4f64d24372f6044c052102))
* add priority_policy_explicit support ([#250](https://github.com/casbin/casbin.js/issues/250)) ([763c18e](https://github.com/casbin/casbin.js/commit/763c18e7f3cfa068e7b61fdd7491dd0365b86dca))
* add support for `in` operator ([a44c6a9](https://github.com/casbin/casbin.js/commit/a44c6a99ed36634a67e7888472e8f6d324b257f4))
* add sync mode ([70e4e12](https://github.com/casbin/casbin.js/commit/70e4e12610dc42b6f25f8df268611ee1a0cbc7bd))
* add unittest ([3cd5b73](https://github.com/casbin/casbin.js/commit/3cd5b7307b54342849029c957ceec81fc84f0fdd))
* add updatePolicy() ([#234](https://github.com/casbin/casbin.js/issues/234)) ([a3218f1](https://github.com/casbin/casbin.js/commit/a3218f1a5d134838c0fb90c8ad1c8751e26c6332)), closes [#235](https://github.com/casbin/casbin.js/issues/235)
* avoid miss initialize() ([1394e8d](https://github.com/casbin/casbin.js/commit/1394e8ddfdc4cc9d8859ae034a8f36fb9e3b54e7))
* changing TypeScript target from ES6 to ES2017 ([6f4f50f](https://github.com/casbin/casbin.js/commit/6f4f50f205dfb7187e34a0439f2b4f0bf6ed5a47))
* controls whether to automatically notify Watcher ([2ce07c2](https://github.com/casbin/casbin.js/commit/2ce07c29cd49c6da304063e8075923b739fc5145))
* enforceSync ([ff41f0a](https://github.com/casbin/casbin.js/commit/ff41f0a7c6eebbfafe985a929eba9e70f2c4b162))
* implement csv parser ([f2ddaab](https://github.com/casbin/casbin.js/commit/f2ddaab9223cd83d21978c473525b469cd419a4b))
* implement string adapater ([fabd784](https://github.com/casbin/casbin.js/commit/fabd784ff5f2c2dbb0e1ddc3867b18adeb423da8))
* implementation cachedEnforcer ([0ace1a6](https://github.com/casbin/casbin.js/commit/0ace1a66a36d5fe3ada37bfaaa938b84fc001c58))
* improve effector for improve performance ([57de7b2](https://github.com/casbin/casbin.js/commit/57de7b2f1d21ceebb7097552c86721d94cac2275))
* support RBAC for syncedEnforcer ([#150](https://github.com/casbin/casbin.js/issues/150)) ([2bf4299](https://github.com/casbin/casbin.js/commit/2bf42996d035eaa4dd659d781f2ce6b89fc396df))
* sync with upstream ([ca4b572](https://github.com/casbin/casbin.js/commit/ca4b57268f0cfe362a46237d583fd907578423d0))
* synchronized enforcer ([ecec514](https://github.com/casbin/casbin.js/commit/ecec514a582f1bfad94214b61ee06fc1cab3fc36))
* use new license format ([284d2a4](https://github.com/casbin/casbin.js/commit/284d2a48cd67db8c197de24a99029858dbbe2da8))


### improvement

* convert all management_api to async function ([e9f4d38](https://github.com/casbin/casbin.js/commit/e9f4d38e153b10ffbd4fa09355ec72eb3dae47cd))


### BREAKING CHANGES

* **model** addPolicies, removePolicies and removeFilteredPolicy returns [boolean, string[][]]
* - provides a new interface for Effector
* see #
