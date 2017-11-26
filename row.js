import React, { Component } from 'react';

import { View, Text, StyleSheet, Switch } from 'react-native';

export default class Row extends Component {
  render() {
    const { text, complete, onComplete } = this.props;

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={onComplete}
        />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  text: {
    fontSize: 24,
    color: '#4d4d4d',
  }
});