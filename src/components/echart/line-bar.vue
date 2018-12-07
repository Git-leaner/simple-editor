<template>
	<div  ref="line_bar" style="height: 100%;width: 100%;"></div>
</template>
<script type="text/javascript">
import echarts  from 'echarts'
export default {
  name: 'lineBar',
  props:{
      rosepiedata: {
          legendData: Array,
          datas:Array ,
          colors: Array,
          format:String,
      }
  },
  data () {
    return{
        // legendData:[],
        // datas : [],
        // colors : [] //图例颜色
    }
  },
  mounted () {
    this.$nextTick(function(){
          this.createLine();
      })
  },
  methods:{
 	
    createLine:function(){
    	var alldata=[
	        {
	            "deptname": "SmartIDE",
	            "feedbackCount": 80,
	            "overallSatisfaction": 4
	        },
	        {
	            "deptname": "Git",
	            "feedbackCount": 110,
	            "overallSatisfaction": 4.1
	        },
	        {
	            "deptname": "java",
	            "feedbackCount": 210,
	            "overallSatisfaction": 4.2
	        },
	        {
	            "deptname": "javascript",
	            "feedbackCount": 310,
	            "overallSatisfaction": 4.5
	        }
	        ,
	        {
	            "deptname": "coffer",
	            "feedbackCount": 410,
	            "overallSatisfaction": 4.7
	        }
	        ,
	        {
	            "deptname": "webpack",
	            "feedbackCount": 510,
	            "overallSatisfaction": 5
	        }
	    ]
	  	var datas4=['OverallSatisfaction','FeedbackCount'],datas=[],datas2=[],datas3=[];
	  	alldata.forEach(it=>{
	  		datas.push(it.deptname);
            datas2.push(it.overallSatisfaction);
            datas3.push(it.feedbackCount);
	  	})
      var lineChart = echarts.init(this.$refs.line_bar),
            option = [];
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '25%',
                    top:'5%',
                    containLabel: true
                },
                legend: {
                    bottom: '10%',
                    top:'85%',
                    itemWidth:15,
                    itemHeight:15,
                    itemGap:120,
                    textStyle: {
                        color :  'rgb(153, 153, 153)',
                    },
                    data:datas4
                },


                xAxis: [
                    {
                        splitLine:{show: false},
                        type: 'category',
                        axisTick: {
                            show : false,
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999999',
                                width:0,

                            }
                        },
                        axisLabel:{
                            rotate:40
                        },
                        data: datas
                    }
                ],
                yAxis: [
                    {
                        splitLine:{show:true,
                            lineStyle : {
                                color : '#eaeaea',
                                /*type : 'dashed',*/
                                width : 1
                            }},

                        type: 'value',
                        min: 1,
                        max: 5,
                        height:1,
                        color:'# F1F1F1',
                        splitNumber : 10,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: '#999999',
                                width:0
                            }
                        }, axisTick : { //刻度
                        show : false
                    },
                        axisLabel: {
                            formatter: '{value}',
                        }
                    },
                    {
                        splitLine:{show:false},
                        type: 'value',
                        min: 0,
                        max: 500,
                        splitNumber : 10,
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: '#999999',
                                width:0
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }, axisTick : { //刻度
                        show : false
                    }
                    }
                ],
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                },

                series: [
                    {
                        // barWidth: 9,//柱状条宽度
                        itemStyle: {
                            normal: {
                                show: true,//鼠标悬停时显示label数据
                                // barBorderRadius: [10, 10, 10, 10],//柱形图圆角，初始化效果
                                // color:'#FF882A'
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0.5, color: "#FF882A" // 0% 处的颜色
                                    }, {
                                        offset: 0.6, color: '#eee' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: "#FF882A" // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        name:datas4[0],
                        type:'line',
                        // barCategoryGap:'5%',
                        yAxisIndex: 0,
                        // symbol:'circle',
                        symbol:"../../assets/icon_dot.png",
                        symbolSize: [10,10],
                        data:datas2

                    },
                    {
                        itemStyle: {
                            normal: {
                                show: true,//鼠标悬停时显示label数据
                                barBorderRadius: [10, 10, 10, 10],//柱形图圆角，初始化效果
                                color:"#FD995F"
                            }
                        },
                        barWidth: 14,//柱状条宽度
                        name:datas4[1],
                        type:'bar',
                        yAxisIndex: 1,
                        barCategoryGap:'5%',
                        data:datas3

                    }
                ]
            };



        // 使用刚指定的配置项和数据显示图表。
        lineChart.setOption(option);


        if(datas.length>13) {
            lineChart.setOption({
                dataZoom: [
                    {
                        show: true,
                        textStyle:false,
                        start: 0,
                        bottom: '0%',
                        top: '97%',
                        end: 60,
                        backgroundColor: '#fff',
                        fillerColor: 'rgba(255,129,29,0.2)',
                        color: '#ffffff',
                        handleStyle: {
                            color: '#ff811d',
                        }
                    }]
            });
        }else{
            lineChart.setOption({
                dataZoom: [
                    {
                        show: false,
                        textStyle:false,
                        start: 0,
                        bottom: '0%',
                        top: '97%',
                        end: 100,
                        backgroundColor: '#fff',
                        fillerColor: 'rgba(255,129,29,0.2)',
                        color: '#ffffff',
                        handleStyle: {
                            color: '#ff811d',
                        }
                    }],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    top:'5%',
                    containLabel: true
                },
                legend: {
                    bottom: '0%',
                    top:'95%',
                    itemWidth:15,
                    itemHeight:15,
                    textStyle: {
                        color :  'rgb(153, 153, 153)',
                    },
                    data:datas4
                },
            });
        }
        lineChart.dispatchAction({
            type : 'showTip'
        }, function() {})
    }
    }
  }
</script>
<style lang="scss">

</style>