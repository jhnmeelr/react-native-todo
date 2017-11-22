import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Header from './header';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
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
