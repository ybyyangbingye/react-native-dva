import React, { PureComponent } from 'react'
import {
  BackHandler,
  Animated,
  Easing,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation'
import { TabBar, SearchBar } from 'antd-mobile-rn'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Loading from './containers/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Circle from './containers/Circle'
import Milestone from './modules/mileStone/index'
import Account from './containers/Account'
import Detail from './containers/Detail'
import Feedback from './containers/Feedback'
import FeedbackFillin from './containers/FeedbackFillin'
import PersonalData from './containers/PersonalData'
import MyCollection from './containers/MyCollection'

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarPosition: 'bottom',
        showLabel: false,
        tabBarLabel: '时光机',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={[styles.icon, { tintColor: focused ? tintColor : '#ababab' }]}
            source={require('./images/timeMachine.png')}
          />
        ),
      },
    },
    Milestone: {
      screen: Milestone,
      navigationOptions: {
        tabBarPosition: 'bottom',
        showLabel: false,
        tabBarLabel: '里程碑',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={[styles.icon, { tintColor: focused ? tintColor : '#ababab' }]}
            source={require('./images/notes.png')}
          />
        ),
      },
    },
    Circle: {
      screen: Circle,
      navigationOptions: {
        tabBarPosition: 'bottom',
        showLabel: false,
        tabBarLabel: '宝宝圈',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={[styles.icon, { tintColor: focused ? tintColor : '#ababab' }]}
            source={require('./images/AccountGroup2.png')}
          />
        ),
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarPosition: 'bottom',
        showLabel: false,
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            style={[styles.icon, { tintColor: focused ? tintColor : '#ababab' }]}
            source={require('./images/account.png')}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#cc7073',
      inactiveTintColor: '#999',
      style: {
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        backgroundColor: 'white',
      },
    },
  }
)

HomeNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]

  return {
    headerTitle: routeName,
  }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: {
        headerTransparent: true,
        headerStyle: { borderBottomColor: 'rgba(0,0,0,0)' },
        headerTitleStyle: { color: 'rgba(0,0,0,0)' },
      },
    },
    Detail: { screen: Detail },
    Feedback: { screen: Feedback },
    FeedbackFillin: { screen: FeedbackFillin },
    PersonalData: { screen: PersonalData },
    MyCollection: { screen: MyCollection },
  },
  {
    headerMode: 'float',
  }
)

const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
      header: {
        titleStyle: {
          color: '#700',
        },
      },
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  constructor(props: any) {
    super(props)
    this.state = {
      selectedTab: 'redTab',
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  renderContent(pageText: any) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    )
  }

  onChangeTab(tabName: any) {
    this.setState({
      selectedTab: tabName,
    })
  }

  render() {
    const { app, dispatch, router } = this.props
    if (app.loading) return <Loading />

    return <App dispatch={dispatch} state={router} />
    // return (<TabBar
    //   unselectedTintColor="#949494"
    //   tintColor="#33A3F4"
    //   barTintColor="#ccc"
    // >
    //   <TabBar.Item
    //     title="Life"
    //     selected={this.state.selectedTab === 'blueTab'}
    //     onPress={() => this.onChangeTab('blueTab')}
    //   >
    //     {this.renderContent('Life Tab')}
    //   </TabBar.Item>
    //   <TabBar.Item
    //     title="Koubei"
    //     badge={2}
    //     selected={this.state.selectedTab === 'redTab'}
    //     onPress={() => this.onChangeTab('redTab')}
    //   >
    //     {this.renderContent('Koubei Tab')}
    //   </TabBar.Item>
    //   <TabBar.Item
    //     title="Friend"
    //     selected={this.state.selectedTab === 'greenTab'}
    //     onPress={() => this.onChangeTab('greenTab')}
    //   >
    //     {this.renderContent('Friend Tab')}
    //   </TabBar.Item>
    //   <TabBar.Item
    //     title="My"
    //     selected={this.state.selectedTab === 'yellowTab'}
    //     onPress={() => this.onChangeTab('yellowTab')}
    //   >
    //     {this.renderContent('My Tab')}
    //   </TabBar.Item>
    // </TabBar>)
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
})
export default Router
