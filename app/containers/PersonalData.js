import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, NativeModules, Platform } from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace, ImagePicker, ActionSheet } from 'antd-mobile-rn'
import { Button } from '../components'
import { createAction, NavigationActions } from '../utils'

const Item = List.Item
const native = NativeModules.HttpCache

@connect()

class PersonalData extends Component {
  static navigationOptions = {
    tabBarLabel: '个人资料',
  }

  constructor(props: any) {
    super(props)
    this.state = {
      files2: [],
      http: '0',
      image: '0',
      all: '0',
      clicked: 'none',
      text: '',
    }
  }

  componentDidMount() {
    // this.getData();
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  handleFile2Change = (files2: any) => {
    this.setState({
      files2,
    })
  }

  getData() {
    alert(native.getImageCacheSize + native.getHttpCacheSize),
      this.setState({
        http: native.getHttpCacheSize,
        image: native.getImageCacheSize,
        all: native.getImageCacheSize + native.getHttpCacheSize,
      })
  }



  // async clearCache(){
  //   try {
  //     await httpCache.clear();
  //     alert('清除缓存成功');
  //     await this.getData();
  //   } catch(err){
  //     alert('错误', err.message);
  //   }
  // }

  render() {
    const { login } = this.props
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>头像</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight}>测试</Text>
            </View>
          </View>
        </Item>
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>昵称</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight}>日华</Text>
            </View>
          </View>
        </Item>
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>性别</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight}>男</Text>
            </View>
          </View>
        </Item>
        <WhiteSpace />
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>收货地址</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight} />
            </View>
          </View>
        </Item>
        <WhiteSpace />
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>清除缓存</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight}>{this.state.http}</Text>
            </View>
          </View>
        </Item>
        <Item arrow="horizontal" onClick={() => {}}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>消息通知</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight} />
            </View>
          </View>
        </Item>
        <View style={{ marginTop: 30 }}>
          <View style={[{ padding: 8 }]}>
            <Button onClick={this.showActionSheet}>showActionSheet</Button>
          </View>
          <Text style={[{ padding: 8 }]}>
            clicked button: {this.state.clicked}
          </Text>
          <View style={[{ padding: 8 }]}>
            <Button onClick={this.showShareActionSheet}>
              showShareActionSheet
            </Button>
          </View>
          <Text style={[{ padding: 8 }]}>{this.state.text}</Text>
        </View>
        {login ? (
          <Button text="退出登录" style={styles.logout} onPress={this.logout} />
        ) : (
          <Button text="登录" style={styles.logout} onPress={this.gotoLogin} />
        )}
      </View>
    )
  }

  showActionSheet = () => {
    const BUTTONS = [
      'Operation1',
      'Operation2',
      'Operation3',
      'Delete',
      'Cancel',
    ];
    ActionSheet.showActionSheetWithOptions(
      {
        title: 'Title',
        message: 'Description',
        options: BUTTONS,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 3,
      },
      (buttonIndex: any) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      },
    );
  }
  showShareActionSheet = () => {
    const opts: any = {
      message: 'Message to go with the shared url',
      title: 'Share Actionsheet',
    };

    if (Platform.OS === 'ios') {
      opts.url = 'https://www.alipay.com/';
      opts.tintColor = '#ff0000';
      opts.excludedActivityTypes = ['com.apple.UIKit.activity.PostToTwitter'];
    }

    ActionSheet.showShareActionSheetWithOptions(
      opts,
      (error: any) => alert(error),
      (success: any, method: any) => {
        let text;
        if (success) {
          text = `Shared with ${method}`;
        } else {
          text = 'Did not share';
        }
        this.setState({ text });
      },
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  // 列表样式
  listItemText: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listItemTextLeft: {
    fontSize: 14,
    paddingLeft: 10,
    lineHeight: 22,
  },
  listItemTextRight: {
    color: '#bbb',
    fontSize: 12,
    marginRight: 2,
    textAlign: 'right',
    lineHeight: 22,
  },

  // 退出登录
  logout: {
    marginTop: 25,
  },
})

export default PersonalData
