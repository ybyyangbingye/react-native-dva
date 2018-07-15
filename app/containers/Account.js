import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, View, Image, Text, BVLinearGradient } from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace } from 'antd-mobile-rn'
// import { Button } from '../components'

import { createAction, NavigationActions } from '../utils'
import PersonalData from './PersonalData'

const Item = List.Item
const Brief = Item.Brief

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? '#ff2760' : 'gray' }]}
        source={require('../images/account.png')}
      />
    ),
  }

  gotoTarget = target => {
    this.props.dispatch(NavigationActions.navigate({ routeName: target }))
  }

  render() {
    const list = [
      {
        leftLabel: '个人资料',
        rightLabel: '',
        targetPage: 'PersonalData',
        iconUrl: require('../images/AccountData.png'),
      },
      {
        leftLabel: '福利社',
        rightLabel: '积分换好礼',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountGift.png'),
      },
      {
        leftLabel: '推荐给好友',
        rightLabel: '领60积分',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountRecommend.png'),
      },
      {
        leftLabel: '打印商城',
        rightLabel: '戳我打印宝宝成长记',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountPrint.png'),
      },
      {
        leftLabel: '我的订单',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountMoney.png'),
      },
      {
        leftLabel: '参与活动',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountActivity.png'),
      },
      {
        leftLabel: '意见反馈',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountSuggest.png'),
      },
    ]

    const pancel = [
      {
        pancelItemText: '我收藏的',
        iconUrl: require('../images/AccountCollect.png'),
      },
      {
        pancelItemText: '我发布的',
        iconUrl: require('../images/AccountRelease.png'),
      },
      {
        pancelItemText: '我回复的',
        iconUrl: require('../images/AccountReply.png'),
      },
      {
        pancelItemText: '加入的群组',
        iconUrl: require('../images/account.png'),
      },
    ]

    const listItems = list.map((listItem, index) => (
      <Item
        arrow="horizontal"
        key={index}
        onClick={() => this.gotoTarget(listItem.targetPage)}
      >
        <View style={styles.listItemText}>
          <Image source={listItem.iconUrl} style={styles.listItemIcon} />
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>{listItem.leftLabel}</Text>
            </View>
            {listItem.rightLabel === '' ? (
              ''
            ) : (
              <View style={{ width: '50%', paddingTop: 2 }}>
                <Text style={styles.listItemTextRight}>
                  {listItem.rightLabel}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Item>
    ))

    const pancelItems = pancel.map((pancelItem, index) => (
      <View style={styles.pancelItem} key={index}>
        <Image source={pancelItem.iconUrl} style={styles.pancelItemIcon} />
        <Text style={styles.pancelItemText}>{pancelItem.pancelItemText}</Text>
      </View>
    ))

    return (
      <View>
        <LinearGradient colors={['#bbb', '#fff']} style={styles.container}>
          <View style={styles.personalHomePage}>
            <View style={styles.personalHomePageLeft}>
              <Image
                style={styles.headPortrait}
                source={require('../images/headPortrait.jpeg')}
              />
            </View>
            <View style={styles.personalHomePageRight}>
              <View style={styles.phoneNumber}>
                <Text style={styles.phoneNumberText}>133****6016</Text>
              </View>
              <View style={styles.personalHomePageLabel}>
                <Text style={styles.personalHomePageLabelText}>个人主页</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.pancel}>{pancelItems}</View>
        <View style={styles.container}>
          <WhiteSpace />
          <List>{listItems}</List>
        </View>]
      </View>
    )
  }
}

const styles = StyleSheet.create({
  personalHomePage: {
    height: 120,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 20,
  },
  personalHomePageLeft: {
    width: '28%',
  },
  personalHomePageRight: {
    width: '72%',
  },
  personalHomePageLabel: {
    backgroundColor: '#bbb',
    width: 75,
    padding: 4,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    marginTop: 10,
  },
  personalHomePageLabelText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  headPortrait: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#ccc',
  },
  phoneNumber: {
    marginTop: 6,
  },
  phoneNumberText: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    height: 120,
  },
  icon: {
    width: 32,
    height: 32,
  },

  // 面板样式
  pancel: {
    padding: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  pancelItem: {
    width: '25%',
    alignItems: 'center',
  },
  pancelItemText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  pancelItemIcon: {
    width: 32,
    height: 32,
  },

  // 列表样式
  listItemText: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listItemIcon: {
    width: 22,
    height: 22,
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
})

export default Account
