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

## Development

```bash
yarn run build
```
