import React, {
  Component
} from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  Picker,
  DatePicker,
} from 'react-native'
import {
  connect
} from 'react-redux'

import {
  List,
  Radio,
  WhiteSpace
} from 'antd-mobile-rn'
import {
  Button
} from '../components'

import {
  NavigationActions
} from '../utils'

const RadioItem = Radio.RadioItem

@connect()
class BasicRadioExample extends React.Component < any, any > {
  state = {
    identity: '',
  }

  render() {
    return (
      <View style={styles.userInput}>
        <RadioItem
          defaultChecked="true"
          onChange={(event: any) => {
            if (event.target.checked) {
              this.setState({ identity: 1 })
            }
          }}
          style={{ color: '#000' }}
        >
          妈妈
        </RadioItem>
        <RadioItem
          defaultChecked="true"
          onChange={(event: any) => {
            if (event.target.checked) {
              this.setState({ identity: 2 })
            }
          }}
        >
          爸爸
        </RadioItem>
      </View>
    )
  }
}

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '宝宝圈',
    tabBarIcon: ({
      focused,
      tintColor
    }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? '#ff2760' : 'gray' }]}
        source={require('../images/circle.png')}
      />
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      babyName: '',
      babyBirth: '',
      babySex: '',
      identity: 1,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.backgroundImage}
            source={require('../images/head.jpg')}
          >
            <Text style={styles.promptTitle}>填写资料</Text>
            <Text style={styles.promptText}>花一分钟填写您的资料</Text>
            <Text style={styles.promptText}>我们可以给您定制专属的内容</Text>
            <Image
              style={styles.loginImage}
              source={require('../images/head.jpg')}
            />
            <Image
              style={styles.cameraImage}
              source={require('../images/camera.png')}
            />
            <Text style={styles.promptChange}>修改头像</Text>
          </Image>
        </View>
        <View style={styles.main}>
          <View style={styles.inputItem}>
            <Text style={styles.label}>宝宝小名</Text>
            <TextInput
              style={styles.userInput}
              placeHolder="点击填写"
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>生日</Text>
            <TextInput
              style={styles.userInput}
              placeHolder="点击填写"
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>性别</Text>
            <RadioItem
              defaultChecked="true"
              checked={this.state.babySex === 1}
              onChange={(event: any) => {
                if (event.target.checked) {
                  this.setState({ babySex: 1 })
                }
              }}
              style={styles.userRadio}
            >
              男
            </RadioItem>
            <RadioItem
              checked={this.state.babySex === 2}
              onChange={(event: any) => {
                if (event.target.checked) {
                  this.setState({ babySex: 2 })
                }
              }}
              style={styles.userRadio}
            >
              女
            </RadioItem>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.label}>我是宝宝的</Text>
            <RadioItem
              defaultChecked="true"
              checked={this.state.identity === 1}
              onChange={(event: any) => {
                if (event.target.checked) {
                  this.setState({ identity: 1 })
                }
              }}
              style={styles.userRadio}
            >
              妈妈
            </RadioItem>
            <RadioItem
              checked={this.state.identity === 2}
              onChange={(event: any) => {
                if (event.target.checked) {
                  this.setState({ identity: 2 })
                }
              }}
              style={styles.userRadio}
            >
              爸爸
            </RadioItem>
          </View>
        </View>
        <View style={styles.bottom}>
          <Button style={styles.startTravel} textStyle={styles.startTravelText}>
            开启成长之旅
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    position: 'relative',
  },
  backgroundImage: {
    backgroundColor: 'green',
    width: null,
    height: null,
    // 设置图片填充模式
    resizeMode: 'stretch',
  },
  icon: {
    width: 32,
    height: 32,
  },
  promptTitle: {
    fontSize: 28,
    color: 'red',
    marginBottom: 10,
  },
  promptText: {
    fontSize: 20,
    color: 'red',
  },
  loginImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  promptChange: {
    fontSize: 18,
    color: '#666',
  },
  main: {
    flex: 1,
    height: 300,
    margin: 20,
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#FFF',
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderBottomColor: '#444',
    borderWidth: 1,
    height: 60,
  },
  label: {
    fontSize: 20,
    color: '#222',
    width: 120,
  },
  userInput: {
    width: 200,
    flex: 1,
  },
  userRadio: {
    width: 100,
    flex: 1,
    borderBottomColor: '#fff',
  },
  bottom: {
    height: 100,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startTravel: {
    backgroundColor: 'red',
    color: '#fff',
    width: 300,
    height: 50,
    borderRadius: 20,
  },
  startTravelText: {
    fontSize: 20,
    color: '#fff',
  },
})

export default Home