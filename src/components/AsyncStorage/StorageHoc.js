// @flow
import * as React from "react";
import { AsyncStorage, Text } from "react-native";

import { isFunction } from "../../utils";

// type Car = {
//   id: string,
//   manufacturer: string,
//   model: string,
//   year: string,
//   date: string
// };

type Props = {};
type State = { storageResult: Array<Object> };

export function withStorage(WrappedComponent, key, getParams) {
  return class extends React.Component<Props, State> {
    _hasUnmounted = false;

    state = { storageResult: null };

    async componentDidMount() {
      if (!this._hasUnmounted) {
        isFunction(getParams) ? this.getRegister() : this.getAll();
      }
    }

    componentWillUnmount() {
      this._hasUnmounted = true;
    }

    getRegister = async () => {
      const list = await AsyncStorage.getItem(key);
      const listObj = JSON.parse(list);
      const params = getParams(this.props);
      const param = Object.keys(params)[0];
      const register = listObj.filter(val => val[param] === params[param])[0];
      this.setState({ storageResult: register });
    };

    getAll = async () => {
      const list = await AsyncStorage.getItem(key);
      const listObj = JSON.parse(list);

      this.setState({ storageResult: listObj || [] });
    };

    refreshStorage = async () => this.getAll();

    createRegister = async values => {
      try {
        const existingItens = await AsyncStorage.getItem(key);
        let newItens = JSON.parse(existingItens);
        if (!newItens) {
          newItens = [];
        }
        newItens.push(values);
        await AsyncStorage.setItem(key, JSON.stringify(newItens));
        this.setState({ storageResult: newItens });
      } catch (error) {
        alert(error);
        throw error;
      }
    };

    deleteRegister = async args => {
      try {
        const existingItens = await AsyncStorage.getItem(key);
        const itens = JSON.parse(existingItens);
        const param = Object.keys(args)[0];
        const newItens = itens.filter(val => val[param] != args[param]);
        await AsyncStorage.setItem(key, JSON.stringify(newItens));
        this.setState({ storageResult: newItens });
      } catch (error) {
        throw error;
      }
    };

    alterRegister = async values => {
      await this.deleteRegister({ id: values.id });
      await this.createRegister(values);
    };

    render() {
      const { storageResult } = this.state;
      if (storageResult === null) {
        return <Text>...</Text>;
      }

      return (
        <WrappedComponent
          storageResult={storageResult}
          refreshStorage={this.refreshStorage}
          createRegister={this.createRegister}
          deleteRegister={this.deleteRegister}
          alterRegister={this.alterRegister}
          {...this.props}
        />
      );
    }
  };
}
