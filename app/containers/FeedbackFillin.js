import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { TextareaItem } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import { Button } from '../components'

@connect()
class FeedbackFillin extends Component {
  static navigationOptions = {
    tabBarLabel: '意见反馈',
  }

  componentDidMount() {}

  feedbackSumbit = () => {}

  render() {
    return (
      <View>
        <Text style={styles.titleText}>反馈内容</Text>
        <View style={styles.feedbackTextareaItem}>
          <TextareaItem
            style={{ fontSize: 14 }}
            rows={8}
            placeholder="请详细描述您碰到的问题，我们会尽快解决"
            count={150}
          />
        </View>
        <Text style={styles.titleText}>联系方式</Text>
        <View style={{ backgroundColor: '#fff' }}>
          <TextInput
            style={styles.phoneNumber}
            clear
            placeholder="选填，便于我们联系您解决问题"
          />
        </View>
        <Button
          text="提交反馈"
          style={styles.feedbackSubmit}
          onPress={this.feedbackSumbit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    padding: 10,
  },
  phoneNumber: {
    padding: 12,
  },
  feedbackTextareaItem: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
  },
  feedbackSubmit: {
    marginTop: 25,
  },
})

export default FeedbackFillin
