import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard, ActivityIndicator, AsyncStorage } from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return !item.complete;
    if (filter === 'COMPLETED') return item.complete;
  });
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      loading: true,
      allComplete: false,
      filter: 'ALL',
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('items').then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false });
      } catch (e) {
        this.setState({ loading: false });
      }
    });
  }

  setSource = (items, itemsDatasource, otherState = {}) => {
    const { dataSource } = this.state;

    this.setState({
      items,
      dataSource: dataSource.cloneWithRows(itemsDatasource),
      ...otherState,
    });

    AsyncStorage.setItem('items', JSON.stringify(items));
  }

  handleFilter = (filter) => {
    const { items } = this.state;

    this.setSource(items, filterItems(filter, items), { filter });
  }

  handleClearComplete = () => {
    const { filter, items } = this.state;
    const newItems = filterItems('ACTIVE', items);

    this.setSource(newItems, filterItems(filter, newItems));
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

  handleRemoveItem = (key) => {
    const { items, filter } = this.state;
    const newItems = items.filter((item) => item.key !== key);

    this.setSource(newItems, filterItems(filter, newItems));
  }

  handleAddItem = () => {
    const { value, items, filter } = this.state;
    if (!value) return;

    const item = { key: Date.now(), text: value, complete: false };
    const newItems = [ ...items, item ];

    this.setSource(newItems, filterItems(filter, newItems), { value: '' });
  }

  handleToggleAllComplete = () => {
    const { allComplete, items, filter } = this.state;
    const complete = !allComplete;
    const newItems = items.map((item) => ({ ...item, complete }));

    this.setSource(newItems, filterItems(filter, newItems), { allComplete: complete });
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  renderRow = ({ key, ...value }) => (
    <Row
      key={key}
      onRemove={() => this.handleRemoveItem(key)}
      onComplete={(complete) => this.handleToggleComplete(key, complete)}
      {...value}
    />
  )

  renderSeparator = (sectionId, rowId) => <View key={rowId} style={styles.separator} />

  render() {
    const { items, filter, value, dataSource, loading } = this.state;

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
        <Footer
          count={filterItems('ACTIVE', items).length}
          filter={filter}
          onFilter={this.handleFilter}
          onClearComplete={this.handleClearComplete}
        />
        {loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
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
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
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
