import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  StyleSheet,
  View,
  Image,
  Text,
  BVLinearGradient,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { connect } from 'react-redux'
import { List, WhiteSpace } from 'antd-mobile-rn'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { createAction, NavigationActions } from '../utils'

const Item = List.Item

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
     tabBarLabel: '我的',
     tabBarIcon:({ focused, tintColor }) => (
      <Image style={[styles.icon, { tintColor: focused ? '#ffb4b8' : 'gray' }]} source={require('../images/account.png')}/>
    )
  }
  gotoTarget = (target) => {
    this.props.dispatch(NavigationActions.navigate({ routeName: target }))
  }

  render() {
    const { onScroll = () => {} } = this.props;
    const list = [
      {
        leftLabel: '个人资料',
        rightLabel: '',
        targetPage: 'PersonalData',
        iconUrl: require('../images/AccountData.png')
      },
      {
        leftLabel: '福利社',
        rightLabel: '积分换好礼',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountGift.png')
      },
      {
        leftLabel: '推荐给好友',
        rightLabel: '领60积分',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountRecommend.png')
      },
      {
        leftLabel: '打印商城',
        rightLabel: '戳我打印宝宝成长记',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountPrint.png')
      },
      {
        leftLabel: '我的订单',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountOrder.png')
      },
      {
        leftLabel: '参与活动',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountActivity.png')
      },
      {
        leftLabel: '意见反馈',
        rightLabel: '',
        targetPage: 'Feedback',
        iconUrl: require('../images/AccountSuggest.png')
      }
    ]

    const pancel = [
      {
        pancelItemText: '我收藏的',
        iconUrl: require('../images/AccountCollect.png'),
        targetPage: 'MyCollection'
      },
      {
        pancelItemText: '我发布的',
        iconUrl: require('../images/AccountPublish.png'),
        targetPage: 'MyCollection'
      },
      {
        pancelItemText: '我回复的',
        iconUrl: require('../images/AccountReply.png'),
        targetPage: 'MyCollection'
      },
      {
        pancelItemText: '加入的群组',
        iconUrl: require('../images/AccountGroup.png'),
        targetPage: 'MyCollection'
      }
    ]

    const listItems = list.map((listItem, index) => (
      <Item arrow="horizontal" key={index}
        onClick={() => this.gotoTarget(listItem.targetPage)}
      >
        <View style={styles.listItemText}>
          <Image source={listItem.iconUrl} style={styles.listItemIcon} />
          <View
            style={{ 
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row'}}>
            <View style={{ width: '50%' }}>
              <Text style={styles.listItemTextLeft}>{listItem.leftLabel}</Text>
            </View>
            {listItem.rightLabel === '' ? (<View></View>) : (
              <View style={{ width: '50%', paddingTop: 2 }}>
                <Text style={styles.listItemTextRight}>{listItem.rightLabel}</Text>
              </View>
            )}
          </View>
        </View>
      </Item>
    ))

    const pancelItems = pancel.map((pancelItem, index) => (
      <View key={index} style={{ width: '25%' }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.gotoTarget(pancelItem.targetPage)}
        >
          <View style={styles.pancelItem}>
            <Image source={pancelItem.iconUrl} style={styles.pancelItemIcon} />
            <Text style={styles.pancelItemText}>{pancelItem.pancelItemText}</Text>
          </View>
        </TouchableOpacity>
      </View>
      ))
    return ( 
      <ParallaxScrollView
        onScroll={onScroll}
        headerBackgroundColor="#333"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image style={{height: PARALLAX_HEADER_HEIGHT,width: window.width}} source={require('../images/AccountBackground.png')}/>
            <View style={{position: 'absolute',top: 0, width: window.width,backgroundColor: 'rgba(0,0,0,0)', height: 50}}></View>
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={ styles.parallaxHeader }>
            <Image style={ styles.avatar } source={require('../images/headPortrait.jpeg')}/>
            <Text style={ styles.sectionSpeakerText }>日华</Text>
          </View>
        )}>
        <View>
          <View style={styles.pancel}>{pancelItems}</View>
          <View style={styles.container}>
            <WhiteSpace />
            <List>{listItems}</List>
          </View>
        </View>
      </ParallaxScrollView>
    )
  }
}
const window = Dimensions.get('window')

const AVATAR_SIZE = 120
const ROW_HEIGHT = 50
const PARALLAX_HEADER_HEIGHT = 220
const STICKY_HEADER_HEIGHT = 50
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end',
  },
  stickySectionText: {
    color: '#fff',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 35
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: '#fff',
    fontSize: 24,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  },
  icon: {
    width: 30,
    height: 30
  },
  pancel: {
    padding: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  pancelItem: {
    alignItems: 'center'
  },
  pancelItemText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
  },
  pancelItemIcon: {
    width: 30,
    height: 30
  },
  listItemText: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  listItemIcon: {
    width: 22,
    height: 22
  },
  listItemTextLeft: {
    fontSize: 14,
    paddingLeft: 10,
    lineHeight: 22
  },
  listItemTextRight: {
    color: '#bbb',
    fontSize: 12,
    marginRight: 2,
    textAlign: 'right',
    lineHeight: 22
  }
})

export default Account
