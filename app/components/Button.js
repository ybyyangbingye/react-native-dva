import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Touchable from './Touchable'

import colorMatch from '../common/colorMatch'

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
    borderColor: colorMatch.mainColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
    color: colorMatch.mainColor,
  },
})

export default Button
