import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'

import { List } from 'antd-mobile-rn'
import { NavigationActions } from '../utils'

const Item = List.Item

@connect()
class Feedback extends Component {
  static navigationOptions = {
    title: '意见反馈',
  }

  gotoFeedbackFillin = () => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'FeedbackFillin' })
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.feedbackBackground}>
            <Image
              style={{ width: '100%', height: 145 }}
              resizeMode="contain"
              source={require('../images/feedback.png')}
            />
          </View>
          <TouchableHighlight onPress={this.gotoFeedbackFillin}>
            <View style={styles.toFeedback}>
              <Image
                style={styles.feedbackIcon}
                source={require('../images/feedbackIcon.png')}
              />
              <Text>戳我反馈</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.commonProblem}>
            <Text>常见问题</Text>
          </View>
          <List>
            <Item extra="" arrow="horizontal" onClick={this.gotoFeedbackFillin}>
              <Text style={styles.listItemText}>如何邀请亲友？</Text>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}>
              <Text style={styles.listItemText}>
                邀请亲友/好友不成功怎么办？
              </Text>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}>
              <Text style={styles.listItemText}>
                领取的新人领悟怎么还没发货？
              </Text>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}>
              <Text style={styles.listItemText}>如何更换绑定的手机号？</Text>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}>
              <Text style={styles.listItemText}>如何联系客服？</Text>
            </Item>
            <Item arrow="horizontal" onClick={() => {}}>
              <Text style={styles.listItemText}>
                视频上传出现问题？（闪退、黑屏等）
              </Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>
                照片、视频怎么下载保存到本地？
              </Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>
                兑换的商品/新人礼物是坏的怎么办？
              </Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>怎么删除宝宝的亲友？</Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>
                发布了小视频为什么没有奖励积分？
              </Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>如何修改收货地址？</Text>
            </Item>
            <Item arrow="horizontal">
              <Text style={styles.listItemText}>
                反馈问题后什么时候能处理？
              </Text>
            </Item>
          </List>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  feedbackBackground: {
    margin: 0,
    padding: 0,
  },
  feedbackIcon: {
    marginRight: 5,
    width: 20,
    height: 18,
  },
  toFeedback: {
    backgroundColor: '#fff',
    padding: 15,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 14,
  },
  commonProblem: {
    padding: 15,
  },
})

export default Feedback
