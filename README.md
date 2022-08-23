# React Native sample app with GraphQL

This is a sample React Native app, using a fake GraphQL API server ([json-graphql-server](https://github.com/marmelab/json-graphql-server)). 
It is a small app where you can browse through a list of posts, see details of each individual post and add new posts.

![image](https://im.ezgif.com/tmp/ezgif-1-b46ce8c23e.gif)

In order to start the app, you would have first to install dependencies:

```
yarn install
```

If you want to use it on iOS (otherwise you can skip this step), you would need to install pods:

```
npx pod-install
```

And then you can run it on iOS:

```
yarn ios
```

Or on Android:

```
yarn Android
```

You would also have to run the fake GraphQL server, which you can do by running:

```
yarn server
```

Or you can run the server and React Native metro builder at the same time by running:

```
yarn dev
```
