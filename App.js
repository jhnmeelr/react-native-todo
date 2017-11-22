import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Header from './header';
import Footer from './footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [],
    };
  }

  handleAddItem = () => {
    const { value, items } = this.state;

    if (!value) return;

    const item = { key: Date.now(), text: value, complete: false };

    this.setState({ items: [ ...items, item ], value: '' });
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <View style={styles.container}>
        <Header
          value={value}
          onAddItem={this.handleAddItem}
          onChange={this.handleChange}
        />
        <View style={styles.content}>

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
  }
});
