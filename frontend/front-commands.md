**Create React App**

```
npx create-react-app . --template @appacademy/react-redux-v17 --use-npm
```

**Instal dependency**

- This dependency will allow your frontend to extract cookies from the browser.

```
npm install js-cookie
```

**Testing in the browser console**

```
store.dispatch(sessionActions.login({credential: "Demo-User", password:"password"}))
```
