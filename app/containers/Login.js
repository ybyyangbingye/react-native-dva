import React, { Component,PropTypes } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Button, Touchable } from '../components'

import { createAction, NavigationActions } from '../utils'

import { ScrollView } from 'react-native';

import { List, InputItem,Toast } from 'antd-mobile-rn';

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  state = {
    hasError: false,
    value: '',
    code:'',
    codeTime:60,
    text:'获取验证码'
  }
  onLogin = () => {
    Toast.info("hello");
    //this.props.dispatch(createAction('app/login')())
  }
   onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('Please enter 11 digits');
    }
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  getCode=(value)=>{
    let val = this.state.value.replace(/\s/g, '');
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!phoneReg.test(val)){
      Toast.info("请输入合法的电话号码");
    }else{

    }
  }
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  }
  ComponentDidMount(){
    this.interVal = setInterval(()=>{
      if(codeTime<=0){
        this.stop();
      }else{
        codeTime--;
        this.setState({
          text:codeTime+'s重新发送'
        })
      }
    },1000)
  }
  stop() {
     clearInterval(this.interval);
    }

  render() {
    return (
      <ScrollView >
       <View >
            <List  renderHeader={() => 'Hi 等的就是你'}>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Image  style={styles.textIcon} source={require('../images/iphone.png')}/>
                <View style={{flex:1}}>
                <InputItem
                placeholder="请输入11位手机号码"
                type="phone"
                value={this.state.value}
                onChange = {this.onChange}
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                />
                </View>
                <Button text={this.state.text} style={{width:110,marginRight:10}} onPress = {this.getCode} value={this.state.codeTime}/>
              </View>
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Image  style={styles.textIcon} source={require('../images/code.png')}/>
                <View style={{flex:1}}>
                  <InputItem  placeholder="请输入短信验证码" style={{borderBottomWidth:0}}/>
                </View>
              </View>
           </List>
           <Button text="登录" onPress={this.onLogin} style={styles.button}/>
        </View>
    </ScrollView>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    close: {
      position: 'absolute',
      right: 10,
      top: 30,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: 'gray',
    },
    textIcon:{
      width:20,
      height:20,
      margin:20
    },
    button:{
      borderRadius:20,
      margin:20
    }
  })

export default Login
