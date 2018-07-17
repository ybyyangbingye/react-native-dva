import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  NativeModules,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace,InputItem} from 'antd-mobile-rn'
import { Button } from '../components'
import { createAction, NavigationActions } from '../utils'
import ImagePicker from 'react-native-image-picker'
import ActionSheet from 'react-native-actionsheet'

const Item = List.Item
const native = NativeModules.HttpCache
const options=['男','女','取消']
var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}

@connect()
class PersonalData extends Component {
  static navigationOptions = {
    tabBarLabel: '个人资料',
  }

  constructor(props: any) {
    super(props)
    this.state = {
      avator:require('../images/avator.jpg'),
      nickName:'Rhea',
      gender:'女',
      address:'',
      arrow:'horizontal',
      show:true
    }
  }

  componentDidMount() {
    // this.getData();
  }
 showActionSheet = () => {
    this.ActionSheet.show();
  }
  cameraAction = () =>{
         ImagePicker.showImagePicker(photoOptions,(response) =>{
             console.log('response'+response);
             if (response.didCancel){
                 return
             }else{
              let source = { uri: 'data:image/jpeg;base64,' + response.data }
              this.setState({
                avator:source
              })
             }
         })
    }

  render() {
    const { login } = this.props
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <Item arrow="horizontal" onClick={this.cameraAction}>
          <View style={styles.listItemText}>
            <View style={{ width: '90%' }}>
              <Text style={styles.listItemTextLeft}>头像</Text>
            </View>
            <View style={{ width: '10%', paddingTop: 2 }}>
              <Image source={require('../images/avator.jpg')} style={styles.avator}/>
            </View>
          </View>
        </Item>
        <Item arrow={this.state.arrow} onClick={() => {
          this.setState({
            show:false
          })
        }}>
          <View style={styles.listItemText}>
            <View style={{ width: '65%' }}>
              <Text style={styles.listItemTextLeft}>昵称</Text>
            </View>
            <View style={{ width: '35%', paddingTop: 2 }}>
            {
              this.state.show ==true ? (<Text style={styles.listItemTextRight}>{this.state.nickName}</Text>):( 
               <InputItem style={{borderBottomWidth:0}} 
               defaultValue={this.state.nickName}
               clear
               onChange={(value) => {this.setState({
                nickName:value,
                arrow:''
               })
                }}
                onBlur={()=>{
                  this.setState({
                    arrow:'horizontal',
                    show:true
                  })
                }}
                ></InputItem>
                )}
            </View>
          </View>
        </Item>
        <Item arrow="horizontal" onClick={this.showActionSheet}>
          <View style={styles.listItemText}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>性别</Text>
            </View>
            <View style={{ width: '50%', paddingTop: 2 }}>
              <Text style={styles.listItemTextRight}>{this.state.gender}</Text>
               <ActionSheet ref={o=> this.ActionSheet = o}
                options={options}
                cancelButtonIndex={2}
                onPress = { (index) => {
                  if(index<2){
                     this.setState({
                    gender:options[index]
                  })
                  }
                }}/>
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
        <View style={{ marginTop:30,alignItems:'center' }}>
            <Button style={{borderRadius:50,width:'40%',backgroundColor:'#cc7073',borderWidth:0}}>
            <Text style={{color:'#fff'}}>保存</Text></Button>
        </View>
      </View>
    )
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
    lineHeight: 40,
  },
  listItemTextRight: {
    color: '#aaa',
    fontSize: 12,
    marginRight: 2,
    textAlign: 'right',
    lineHeight: 40,
  },

  // 退出登录
  logout: {
    marginTop: 25,
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
})

export default PersonalData
