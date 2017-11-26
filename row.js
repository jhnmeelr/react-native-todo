import React, { Component } from 'react';

import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default class Row extends Component {
  render() {
    const { text, complete, onComplete, onRemove } = this.props;

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={onComplete}
        />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.destroy}>X</Text>
        </TouchableOpacity>
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
  },
  destroy: {
    fontSize: 20,
    color: '#cc9a9a',
  }
});
