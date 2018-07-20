import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

// import { Button } from '../components'
import Button from 'antd-mobile-rn/lib/button'
import { NavigationActions } from '../utils'

@connect()
class Home extends Component {
  gotoDetail = () => {
    this.props.dispatch.Navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.gotoDetail}>Start</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    color: '#ff2760',
  },
  tabBarLabel: {
    fontSize: 10,
  },
})

export default Home
