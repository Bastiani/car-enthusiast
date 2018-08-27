// @flow
import * as React from "react";
import { AsyncStorage, Text } from "react-native";

import { isFunction } from "../../utils";

type Car = {
  manufacturer: string,
  model: string,
  year: string,
  date: string
};
type Props = {};
type State = { storageResult: Array<Car> };

export function withStorage(WrappedComponent, key, getParams) {
  return class extends React.Component<Props, State> {
    state = { storageResult: null };

    async componentDidMount() {
      isFunction(getParams) ? this.getRegister() : this.getAll();
    }

    getRegister = async () => {
      const list = await AsyncStorage.getItem(key);
      const listObj = JSON.parse(list);
      if (isFunction(getParams)) {
        const params = getParams(this.props);
        const param = Object.keys(params)[0];
        const paramVal = params[Object.keys(params)[0]];
        const register = listObj.filter(val => val[param] === paramVal)[0];
        this.setState({ storageResult: register });
        return register;
      }
      this.setState({ storageResult: listObj });
      return null;
    };

    getAll = async () => {
      const list = await AsyncStorage.getItem(key);
      const listObj = JSON.parse(list);

      this.setState({ storageResult: listObj });
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

    deleteRegister = async () => {
      try {
        const existingItens = await AsyncStorage.getItem(key);
        const itens = JSON.parse(existingItens);
        const params = getParams(this.props);
        const param = Object.keys(params)[0];
        const paramVal = params[Object.keys(params)[0]];
        const newItens = itens.filter(val => val[param] != paramVal);
        await AsyncStorage.setItem(key, JSON.stringify(newItens));
        this.setState({ storageResult: newItens });
      } catch (error) {
        throw error;
      }
    };

    // alterRegister = async () => {
    //   const register = await this.getRegister();
    //   AsyncStorage.mergeItem(key, )
    // }

    render() {
      const { storageResult } = this.state;
      if (storageResult === null) {
        return <Text>Loading...</Text>;
      }
      return (
        <WrappedComponent
          storageResult={storageResult}
          refreshStorage={this.refreshStorage}
          createRegister={this.createRegister}
          {...this.props}
        />
      );
    }
  };
}