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
  TouchableOpacity,
} from 'react-native'
import {
  connect
} from 'react-redux'

import {
  Radio,
  WhiteSpace,
  List,
  InputItem,
} from 'antd-mobile-rn'
import {
  Button
} from '../components'

import {
  NavigationActions
} from '../utils'

import ActionSheet from 'react-native-actionsheet'
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

// const RadioItem = Radio.Item
const Item = List.Item

const options = ['妈妈','爸爸','取消']

var radio_props = [
  {label: '男', value: 0 },
  {label: '女', value: 1 }
];

@connect()

class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: '点击填写'
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date)
    this.setState({
      date: date.toLocaleDateString(),
    })
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker} >
          <Text style={{ textAlign: 'right' }}>{this.state.date}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }

}

class RadioButtonProject extends Component {
   constructor(props) {
    super(props)
    this.state = {
      gender:1,
    }
  }
  render() {
    return (
      <RadioForm
        radio_props={radio_props}
        initial={0}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={'#2196f3'}
        animation={true}
        buttonSize={10}
        labelStyle={{fontSize: 14, color: '#aaa', marginRight: 10,}}
        onPress={(value) => {this.setState({gender:value})}}
      />
    );
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
        source={require('../images/AccountGroup.png')}
      />
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      babyName: '',
      babyBirth: '',
      identity: '妈妈',
      gender:'女',
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.promptTitle}>填写资料</Text>
          <Text style={styles.promptText}>花一分钟填写您的资料</Text>
          <Text style={styles.promptText}>我们可以给您定制专属的内容</Text>         
          <View style={styles.headImage}>
            <Image
              style={styles.loginImage}
              source={require('../images/head.jpg')}
            />
            <Image
              style={styles.cameraImage}
              source={require('../images/camera.png')}
            />            
          </View>
          <Text style={styles.promptChange}>修改头像</Text>
        </View>
        <View style={styles.main}>

          <Item arrow="horizontal">
            <View style={styles.listItemText}>
              <View style={{ width: '50%' }}>
                <Text style={styles.listItemTextLeft}>宝宝小名</Text>
              </View>
              <View style={{ width: '50%', paddingTop: 2 }}>
                <InputItem style={{borderBottomWidth:0}} 
                  placeholder='点击填写'
                  ></InputItem>
              </View>
            </View>
          </Item>

          <Item arrow="horizontal">
            <View style={styles.listItemText}>
              <View style={{ width: '50%' }}>
                <Text style={styles.listItemTextLeft}>生日</Text>
              </View>
              <View style={{ width: '50%', paddingTop: 2, }}>
                <DateTimePickerTester />
              </View>
            </View>
          </Item>
          <WhiteSpace />

          <Item>
            <View style={styles.listItemText}>
              <View style={{ width: '50%' }}>
                <Text style={styles.listItemTextLeft}>性别</Text>
              </View>
              <View style={{ width: '50%', paddingTop: 2,  alignItems: 'flex-end', }}>
                <RadioButtonProject style={styles.listItemTextRight} />
              </View>
            </View>
          </Item>
          <WhiteSpace />

          <Item arrow="horizontal" onClick={this.showActionSheet}>
            <View style={styles.listItemText}>
              <View style={{ width: '50%' }}>
                <Text style={styles.listItemTextLeft}>我是宝宝的</Text>
              </View>
              <View style={{ width: '50%', paddingTop: 2 }}>
                <Text style={styles.listItemTextRight}>{this.state.identity}</Text>
                <ActionSheet ref={o=> this.ActionSheet = o}
                  options={options}
                  cancelButtonIndex={2}
                  onPress = { (index) => {
                    if(index<2){
                       this.setState({
                        identity:options[index]
                      })
                    }
                }}/>
              </View>
            </View>
          </Item>
          <WhiteSpace />

        </View>
        <View style={styles.bottom}>
          <Button style={styles.startTravel} textStyle={styles.startTravelText}>
            开启成长之旅
          </Button>
        </View>
      </ScrollView>
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
    height: 220,
    position: 'relative',
  },
  headImage: {
    position: 'relative',
  },
  icon: {
    width: 30,
    height: 30,
  },
  promptTitle: {
    fontSize: 22,
    color: 'red',
    marginBottom: 6,
  },
  promptText: {
    fontSize: 16,
    color: 'red',
  },
  loginImage: {
    marginTop: 6,
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
    bottom: 0,
    right: 0,
  },
  promptChange: {
    fontSize: 14,
    color: '#666',
  },
  main: {
    flex: 1,
    height: 200,
    margin: 20,
  },
  // 列表样式
  listItemText: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listItemTextLeft: {
    fontSize: 14,
    paddingLeft: 10,
  },
  listItemTextRight: {
    color: '#aaa',
    fontSize: 14,
    marginRight: 2,
    textAlign: 'right',
  },
  label: {
    fontSize: 16,
    color: '#222',
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
    height: 60,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startTravel: {
    backgroundColor: 'red',
    width: 200,
    height: 40,
    borderRadius: 20,
  },
  startTravelText: {
    fontSize: 18,
    color: '#fff',
  },
})

export default Home