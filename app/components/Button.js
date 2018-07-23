import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Touchable from './Touchable'

export const Button = ({ text, children, style, textStyle, ...rest }) => (
  <Touchable style={[styles.button, style]} {...rest}>
    <Text style={[styles.text, textStyle]}>{text || children}</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#cc7073',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    color: '#cc7073',
  },
})

export default Button
