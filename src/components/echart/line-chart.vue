<template>
	<div  ref="line_chart" style="height: 100%;width: 100%;"></div>
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
    	
       var   option = null,
            legendData = [],
            series = [],
            monthData = [],
            colors = [ 'rgba(253,153,95)', ' rgba(187, 113, 216,.65)', 'rgba(108, 146, 217,.65)', 'rgba(117, 227, 227,.65)', 'rgba(139, 237, 131,.65)', 'rgba(212, 208, 88,.65)'," #95DCFF" ]; //图例颜色
      var staticData=[{
        dimensionName:'aaa',
        str:'1.2'
      },{
        dimensionName:'bbb',
        str:'1.3'
      },{
        dimensionName:'ccc',
        str:'1.4'
      },{
        dimensionName:'ddd',
        str:'1.5'
      },{
        dimensionName:'eee',
        str:'1.6'
      },]
      var lineChart = echarts.init(this.$refs.line_chart);
        for (var i = 0; i < staticData.length; i++) {
            //获取图例名称
            legendData.push(staticData[i].dimensionName);
            //获取图例名称及各月份y轴数据
            var serie = {
                name : staticData[i].dimensionName,
                type : 'line',
                stack : staticData[i].dimensionName,
                data : staticData[i].str,
                symbolSize : 10, //折线点圆圈大小
                showAllSymbol : true,
                symbol : 'emptyCircle',
                itemStyle : {
                    normal : {
                        borderWidth : 2,
                        color : colors[i],
                        label : {
                            show : false,
                            position : 'inside',
                            formatter : '{c}',
                            textStyle : {
                                color : '#3a3e55'
                            }
                        }
                    },
                    emphasis : {
                        label : {
                            // show: true,
                            textStyle : {
                                // fontWeight: 'bold',
                                // color: '#3a3e55',
                                // background :"red"
                            }
                        }
                    }
                },
                lineStyle : {
                    normal : {
                        // type: 'dotted',
                        color : colors[i]
                    }
                }
            }
            series.push(serie);
        }
        //获取x轴
 
        var monthList = ["Jan","Feb","Mar","Apr","May ","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var monthData=[]
        for (var i = 0; i < 6; i++) {
            monthData.push(monthList[parseInt(monthData[i])-1]);
        }

        option = {
            textStyle : {
                color : '#999999',
                fontSize : "12"
            },
            title : {
                // link: '#js_column',
                show : true,
                textStyle : {
                    fontSize : 24,
                    color : '#333333',
                    fontWeight : '400'
                },
            },
            tooltip : {
                trigger : 'axis',
                backgroundColor : 'rgba(255,255,255,1)',
                extraCssText : 'box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);',
                textStyle : {
                    color : '#333'
                },
                formatter : function(params) {
                    var res
                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].value != null) {
                            res = '<div style="width: 213px;" class="legend-box">';
                        } else {
                            res = '';
                        }
                    }
                    // res += '<strong>' + params[0].name + '</strong>';//悬浮框标题

                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].value != null) {
                            res += '<p class="legend-text">' + '<i  style="background-color: ' + colors[i] + ';!important;" class="legend-icon legend-icon' + i + '"></i>' + params[i].seriesName + '  ' + '<span style="float: right;margin-right:5px">' + params[i].value + '</span>'
                        } else {
                        }
                    }
                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].value != null) {
                            res += '</p></div>';
                        } else {
                            res = '';
                        }
                    }
                    return res;
                }
            },
            grid : {
                show : false,
                top : '8',
                left : '1.5%',
                right : '25',
                bottom : '30',
                containLabel : true,
                shadowColor : '#fff5ec'
            },
            xAxis : {
                lineStyle : {
                    color : "red",
                    fontSize : "12"
                },
                type : 'category',
                boundaryGap : true,
                data : monthData,
                axisTick : { //刻度
                    show : false
                },
                axisLine : {
                    show : false,
                    lineStyle : {
                        color : "#999",
                        fontSize : "12"
                    }
                },
                splitLine : { //网格线
                    show : false,
                    type : 'dotted',
                    shadowColor : '#fff5ec'
                }
            },

            yAxis : {
                axisLine : {
                    show : false,
                }, //y轴线隐藏

                type : 'value',
                boundaryGap : [ 0, 0.01 ],
                splitNumber : 5,
                max : 5,
                min : 1,
                axisTick : {
                    show : false
                },
                // X轴变成虚线
                splitLine : {
                    show : true,
                    lineStyle : {
                        color : '#eaeaea',
                        type : 'dashed',
                        width : 1
                    }
                },
            },
            series : series
        };
        // 使用刚指定的配置项和数据显示图表。
        lineChart.setOption(option);
        lineChart.setOption({
            series : [ {
                lineStyle : {
                    normal : {
                        //type: 'dotted',
                        //width: 6
                    }
                }
            } ]
        })
        lineChart.dispatchAction({
            type : 'showTip'
        }, function() {})
    }
    }
  }
</script>
<style lang="scss">

</style>