# React-Inject-Reducer

<h1 align="center">React Inject Reducer</h1>

Library to inject and eject reducers asynchronous to allow your redux store to grow / reduce dynamically.

---

## Install

If you are using yarn

```bash
$ yarn add react-inject-reducer
```

If you are using npm

```bash
$ npm install react-inject-reducer
```

## Example Usage

Using Context Method

```jsx
import { InjectReducerProvider, useInjectReducer } from 'react-inject-reducer';

const Component = () => {
  const { injectReducer, ejectReducer } = useInjectReducer();

  React.useEffect(() => {
    injectReducer({ reducer1 });

    return () => {
      ejectReducer({ reducer1 });
    };
  }, []);
};

const InjectedComponent = () => {
  return (
    <InjectReducerProvider>
      <Component />
    </InjectReducerProvider>
  );
};

export default InjectedComponent;
```

Using HOC way

```jsx
import { withInjectReducer } from 'react-inject-reducer';

const Component = props => {
  const { injectReducer, ejectReducer } = props;

  React.useEffect(() => {
    injectReducer({ reducer1 });

    return () => {
      ejectReducer({ reducer1 });
    };
  }, []);
};

const InjectedComponent = withInjectReducer(Component);
export default InjectedComponent;
```

## Demo

1) Notice that going between different routes, we can inject and eject the reducers dynamically
2) The initialReducer which was created at the start will remain if it is not being ejected

https://user-images.githubusercontent.com/65809727/146409302-155bfa7f-dab6-44ad-8856-dacfbc6ad928.mov


## Development

```bash
yarn run build
```
