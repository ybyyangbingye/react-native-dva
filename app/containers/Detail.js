import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Image, } from 'react-native'
import { connect } from 'react-redux'

import { Button } from '../components'

import { NavigationActions } from '../utils'

import Echarts from 'native-echarts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

var dimensions = require('Dimensions');
var {width,height} = dimensions.get('window');

@connect()
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 20,
      heathState: '良好',
      height: 0,
      weight: 0,
      heightIsUp: false,
      weightIsUp: true,
    }
  }

  static navigationOptions = {
    title: 'Detail',
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  render() {
    const dataOption = {
      backgroundColor: 'rgba(252, 104, 99, 0.6)',
      title: {
          text: ''
      },
      tooltip: {},
      legend: {
          data:['身高','体重'],
          right: 6,
      },
      dataZoom: [
        //禁止缩放
        {
          type: 'inside',
          disabled: true,
        },

      ],
      xAxis: {
          data: ['1', '2', '3', '4', '5', '6', '7']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        show: false,
      },
      series: [{
          name: '身高',
          type: 'line',
          data: [5, 6, 7, 8, 9, 10, 11],
          smooth: true,
          lineStyle: {
            color: '#fff',
          },
      },{
          name: '体重',
          type: 'line',
          data: [25, 26, 27, 28, 29, 30, 31],
          smooth: true,
          lineStyle: {
            color: '#aaa',           
          },
      }],
      label: {
        //显示数值
        normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
        }
      }
    };
    const scoreOption = {
      tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
          feature: {
              restore: {},
              saveAsImage: {}
          }
      },
      series: [
          {
              name: '业务指标',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 50, name: '完成率'}]
          }
      ]
  };
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.menuImage}
            source={require('../images/menu.png')}
          />   
        </View>  
        <View style={styles.chart}>
          <Echarts option={dataOption} height={height*0.5-40} width={width} />
        </View>  
        <View style={styles.healthScore}>
          <View style={styles.scoreChart}>
            <AnimatedCircularProgress
              size={width*0.36}
              width={8}
              fill={this.state.score}
              tintColor="#00e0ff"
              rotation={225}
              arcSweepAngle={270}
              backgroundColor="#eee">
              {
                (fill) => (
                  <View>
                    <Text style={styles.chartTop}>
                      { this.state.score }分
                    </Text>
                    <Text style={styles.chartBootom}>
                      健康得分
                    </Text>
                  </View>    
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={styles.scoreText}>
            <Text style={styles.textTop}>
              <Text>您的宝宝健康健康状况</Text>
              <Text style={{ color: 'red', fontSize: 20, }} >{this.state.heathState}</Text>
            </Text>
            <Text style={styles.textBottom}>
              家长是孩子们的榜样，一起锻炼吧
            </Text>
          </View>
        </View>
        <View style={styles.data}>
          <View style={styles.dataHeight}>           
            <Text style={styles.dataTop}>
              身高
            </Text>            
            <Text style={styles.dataMiddle}>
              <Text style={{ fontSize: 20, fontFamily: 'bold', }}>{this.state.height}</Text>
              <Text style={{ fontSize: 12, marginLeft: 10, }} > cm</Text>
            </Text>            
            <View style={styles.dataBottom}>
              {
                this.state.heightIsUp === true
                ? (<Image source={require('../images/arrow_up.png')} style={styles.arrowImage} />)
                : (<Image source={require('../images/arrow_gray.png')} style={styles.arrowImage} />)
              }
            </View>          
          </View>
          <View style={styles.dataWeight}>
            <Text style={styles.dataTop}>
              身高
            </Text>            
            <Text style={styles.dataMiddle}>
              <Text style={{ fontSize: 20, fontFamily: 'bold', }}>{this.state.weight}</Text>
              <Text style={{ fontSize: 12, marginLeft: 10, }} > kg</Text>
            </Text>
            <View style={styles.dataBottom}>
              {
                this.state.weightIsUp === true
                ? (<Image source={require('../images/arrow_up.png')} style={styles.arrowImage} />)
                : (<Image source={require('../images/arrow_gray.png')} style={styles.arrowImage} />)
              }
            </View>          
          </View>
        </View>     
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  title: {
    height: 40,
    backgroundColor: 'rgba(252, 104, 99, 0.6)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  menuImage: {
    width: 26,
    height: 26,
  },
  chart: {
    flex: 0,
    width: width,
    height: height*0.5-60,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  healthScore: {
    height: height*0.3,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    width: width,
    flexDirection: 'row',
  },
  scoreChart: {
    width: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTop: {
    fontSize: 18,
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  chartBottom: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  textTop: {
    paddingRight: 40,
    paddingBottom: 10,
    fontSize: 18,
  },
  textBottom: {
    color: 'orange',
    fontSize: 12,
  },
  scoreText: {
    width: '50%',
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    height: height*0.2,
    width: width,
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  dataHeight: {
    width: '50%',
    flex: 1,
    borderRightColor: '#aaa',
    borderRightWidth: 1,
    justifyContent: 'space-between',
  },
  dataWeight: {
    width: '50%',
    flex: 1,
    justifyContent: 'space-between',
  },
  dataTop: {
    textAlign: 'center',
    color: '#000',
    textAlignVertical: 'bottom',
    height: '30%',
  },
  dataMiddle: {
    textAlign: 'center',
    color: '#000',
    textAlignVertical: 'center',
    flex: 1,
  },
  dataBottom: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '30%',
  },
  arrowImage: {
    width: 16,
    height: 16,
  }
})

export default Detail
