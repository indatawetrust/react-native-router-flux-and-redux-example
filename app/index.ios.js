/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, StatusBar} from 'react-native';

import {Router, Actions, Scene} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';

// components
import PostComponent from './components/PostComponent';

import promiseMiddleware from 'redux-promise-middleware';

// create store...
const middleware = [
  promiseMiddleware()
];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="post" hideNavBar={true} component={PostComponent} />
  </Scene>,
);

export default class app extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('app', () => app);
