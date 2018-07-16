import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

// import { Button } from '../components'
import Button from 'antd-mobile-rn/lib/button'
import { NavigationActions } from '../utils'

@connect()
class Home extends Component {
  static navigationOptions = {
    // tabBarLabel: ({ focused, tintColor }) => <Text style={[styles.tabBarLabel,{tintColor: focused ? '#ff2760' : 'gray'}]}>时光机</Text>,
    tabBarLabel: '时光机',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? '#ff2760' : 'gray' }]}
        source={require('../images/timeMachine.png')}
      />
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button>Start</Button>
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
