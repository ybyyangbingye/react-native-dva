import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import { Tabs } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import { PullView } from 'react-native-pull'

@connect()
class MyCollection extends Component {
  static navigationOptions = {
    tabBarLabel: '收藏夹',
  }

  constructor(props) {
    super(props)
    this.state = { refreshing: false }
    this.onPullRelease = this.onPullRelease.bind(this)
    this.topIndicatorRender = this.topIndicatorRender.bind(this)
  }

  componentDidMount() {}

  getLength = str => {
    let realLength = 0
    let charCode = -1
    for (let i = 0; i < str.length; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) realLength += 1
      else realLength += 2
    }
    return realLength
  }

  onPullRelease(resolve) {
    setTimeout(() => {
      resolve()
    }, 3000)
  }

  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = { position: 'absolute', left: 10000 }
    const show = { position: 'relative', left: 0 }
    setTimeout(() => {
      if (pulling) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: show })
        this.txtPullok && this.txtPullok.setNativeProps({ style: hide })
        this.txtPullrelease &&
          this.txtPullrelease.setNativeProps({ style: hide })
      } else if (pullok) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: hide })
        this.txtPullok && this.txtPullok.setNativeProps({ style: show })
        this.txtPullrelease &&
          this.txtPullrelease.setNativeProps({ style: hide })
      } else if (pullrelease) {
        this.txtPulling && this.txtPulling.setNativeProps({ style: hide })
        this.txtPullok && this.txtPullok.setNativeProps({ style: hide })
        this.txtPullrelease &&
          this.txtPullrelease.setNativeProps({ style: show })
      }
    }, 1)
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
        }}
      >
        <ActivityIndicator size="small" color="gray" />
        <Text
          ref={c => {
            this.txtPulling = c
          }}
        >
          下拉刷新
        </Text>
        <Text
          ref={c => {
            this.txtPullok = c
          }}
        >
          松开刷新
        </Text>
        <Text
          ref={c => {
            this.txtPullrelease = c
          }}
        >
          玩命刷新中
        </Text>
      </View>
    )
  }

  render() {
    const tabs = [
      { title: '帖子' },
      { title: '知识' },
      { title: '经验' },
      { title: '食谱' },
      { title: '儿歌' },
    ]

    const posts = [
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      },
      {
        postName: '我是想顺产的啊，为啥要我剖腹产',
        postContent:
          '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
        postImg: require('../images/headPortrait.jpeg'),
      }
    ]

    const postsList = posts.map((post, index) => (
      <View style={styles.postsList} key={index}>
        <View style={{ width: '80%' }}>
          <View style={styles.postName}>
            <Text style={styles.postNameText}>{post.postName}</Text>
          </View>
          <Text style={styles.postContent}>
            {this.getLength(post.postContent) > 36
              ? `${post.postContent.substr(0, 36)  }...`
              : post.postContent}
          </Text>
        </View>
        {post.postImg ? (
          <View>
            <Image source={post.postImg} style={styles.postImg} />
          </View>
        ) : (
          ''
        )}
      </View>
    ))

    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor="#cc7073"
          tabBarUnderlineStyle={{ backgroundColor: '#cc7073' }}
        >
          <ScrollView>
            <PullView
              style={{ width: Dimensions.get('window').width }}
              onPullRelease={this.onPullRelease}
              topIndicatorRender={this.topIndicatorRender}
              topIndicatorHeight={60}
            >
              <View>
                {posts.length === 0 ? (
                  <View style={styles.collectEmpty}>
                    <Image
                      style={styles.collectEmptyImg}
                      source={require('../images/CollectEmpty.png')}
                    />
                    <Text style={{ lineHeight: 24 }}>暂无收藏</Text>
                    <Text style={{ lineHeight: 24, color: '#999' }}>
                      好贴还是要收藏的，万一要看呢
                    </Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.gotoButton}>去看看</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>{postsList}</View>
                )}
              </View>
            </PullView>
          </ScrollView>
          <View>
            <View style={styles.collectEmpty}>
              <Image
                style={styles.collectEmptyImg}
                source={require('../images/CollectEmpty.png')}
              />
              <Text style={{ lineHeight: 24 }}>暂无收藏</Text>
              <Text style={{ lineHeight: 24, color: '#999' }}>
                好贴还是要收藏的，万一要看呢
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.gotoButton}>去看看</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.collectEmpty}>
              <Image
                style={styles.collectEmptyImg}
                source={require('../images/CollectEmpty.png')}
              />
              <Text style={{ lineHeight: 24 }}>暂无收藏</Text>
              <Text style={{ lineHeight: 24, color: '#999' }}>
                好贴还是要收藏的，万一要看呢
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.gotoButton}>去看看</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.collectEmpty}>
              <Image
                style={styles.collectEmptyImg}
                source={require('../images/CollectEmpty.png')}
              />
              <Text style={{ lineHeight: 24 }}>暂无收藏</Text>
              <Text style={{ lineHeight: 24, color: '#999' }}>
                好贴还是要收藏的，万一要看呢
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.gotoButton}>去看看</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.collectEmpty}>
              <Image
                style={styles.collectEmptyImg}
                source={require('../images/CollectEmpty.png')}
              />
              <Text style={{ lineHeight: 24 }}>暂无收藏</Text>
              <Text style={{ lineHeight: 24, color: '#999' }}>
                好贴还是要收藏的，万一要看呢
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.gotoButton}>去看看</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  collectEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 500,
  },
  collectEmptyImg: {
    width: 160,
    height: 120,
  },
  gotoButton: {
    borderWidth: 1,
    borderColor: '#cc7073',
    borderRadius: 15,
    lineHeight: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#cc7073',
    marginTop: 15,
  },

  // 列表
  postsList: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  postName: {
    borderLeftWidth: 3,
    borderColor: '#cc7073',
  },
  postNameText: {
    marginLeft: 10,
  },
  postContent: {
    color: '#9c9c9c',
    fontSize: 13,
    height: 30,
    marginTop: 10,
  },
  postImg: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
})

export default MyCollection
