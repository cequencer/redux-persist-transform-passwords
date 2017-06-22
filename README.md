## redux-persist-transform-passwords
Store some parts of your state in the macOS Keychain, Credential Vault on Windows, or `libsecret` on Linux. Uses [`keytar`](https://github.com/atom/node-keytar). Adheres to the `redux-persist` [transform API](https://github.com/rt2zz/redux-persist#transforms), but [async transforms](https://github.com/rt2zz/redux-persist/pull/360) must be enabled.

## Install
```
npm i redux-persist-transform-passwords --save
```

## Usage

Given a state shape like:

``` js
{
  credentials: {
    username: 'charlie',
    password: 'hunter42'
  }
}
```

Supply either a getter string (see Lodash [get](https://lodash.com/docs/4.17.4#get)) or a function that, given your input state, returns a getter string:

```js
import { persistStore } from 'redux-persist';
import createPasswordTransform from 'redux-persist-transform-passwords';

const passwordTransform = createPasswordTransform({
  serviceName: 'com.mySecretCompany.mySecretApp',
  passwordPaths: 'credentials.password',
  whitelist: ['authReducer']
});

persistStore(store, {
  transforms: [passwordTransform],
  asyncTransforms: true
});
```

Before serialization, the values at `passwordPaths` will be removed from your state and written into `keytar`. When the store is rehydrated, the secrets are read in from `keytar` and reapplied to your state.

You can find more usage examples by reading the tests.

## API

* `createPasswordTransform(config)` - Creates a new transform instance

* `config (Object)` - Configuration parameters
    * `serviceName (String)` - The top-level identifier for your app to store items in the keychain.
    * `accountName (String)` - (Optional) A sub-identifier for individual entries. If not provided, strings taken from `passwordPaths` will be used.
    * `passwordPaths (String|Array<String>|((state) => String|Array<String>)` - (Optional) Lodash getter path(s) to passwords in your state, or a function that, given your state, returns path(s). Leave empty to write the entire reducer.
    * `clearPasswords (Boolean)` - (Optional) Whether or not to clear the properties from `passwordPaths` before the state is persisted. Defaults to `true`.
    * `serialize (Boolean)` - (Optional) Whether or not to serialize password properties as JSON strings. Defaults to `false`.
    * `logger ((message, ...args) => void)` - (Optional) An optional logging method. Defaults to `noop`.
