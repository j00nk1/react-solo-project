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

- login action

```js
store.dispatch(
  sessionActions.login({ credential: "Demo-User", password: "password" })
);
```

- addNote action

```js
store.dispatch(
  window.noteActions.addNote({
    userId: 5,
    title: "This is test title",
    content: "This is test content using frontend route",
  })
);
```
