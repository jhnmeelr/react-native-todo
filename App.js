import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

export default class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  setSource = (items, itemsDatasource, otherState = {}) => {
    const { dataSource } = this.state;

    this.setState({
      items,
      dataSource: dataSource.cloneWithRows(itemsDatasource),
      ...otherState,
    });
  }

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;

      return {
        ...item,
        complete
      };
    });

    this.setSource(newItems, newItems);
  }

  handleAddItem = () => {
    const { value, items } = this.state;
    if (!value) return;

    const item = { key: Date.now(), text: value, complete: false };
    const newItems = [ ...items, item ];

    this.setSource(newItems, newItems, { value: '' });
  }

  handleToggleAllComplete = () => {
    const { allComplete, items } = this.state;
    const complete = !allComplete;
    const newItems = items.map((item) => ({ ...item, complete }));

    this.setSource(newItems, newItems, { allComplete: complete });
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  renderRow = ({ key, ...value }) => (
    <Row
      key={key}
      onComplete={(complete) => this.handleToggleComplete(key, complete)}
      {...value}
    />
  )

  renderSeparator = (sectionId, rowId) => <View key={rowId} style={styles.separator} />

  render() {
    const { value, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header
          value={value}
          onAddItem={this.handleAddItem}
          onChange={this.handleChange}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#fff',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#f5f5f5',
  }
});
