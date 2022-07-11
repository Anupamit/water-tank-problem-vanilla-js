function fetchArr(){
    let fromElement = document.getElementById('inputArr');
    let inputArr = fromElement.value.split(',')
    let bricks = showBricksAndWater(inputArr)
    showBricksAndWater(inputArr,bricks)
}

function  createChartTable(xAxisNamesArr, outputArr, id){
    let dom = document.getElementById(id);
    let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    let app = {};
    let option = {
    xAxis: {
        type: 'category',
        data: xAxisNamesArr
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: outputArr,
        type: 'bar'
        }
    ]
    };
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
}

function showBricksAndWater(bricks){
let finalCase = []
let firstcase = []
let secondCase = []
let result = []
let lastVlueForFirstCase = 0
let lastVlueForSecondCase = 0
for(let  i = 0; i<bricks.length; i++){
    let brick = bricks[i]
    if(brick == 0){
        firstcase.push(lastVlueForFirstCase)
    }else{
        firstcase.push('-')
        lastVlueForFirstCase = brick
    }
}
for(let  i = bricks.length -1; i>=0; i--){
    let brick = bricks[i]
    if(brick == 0){
        secondCase[i] = lastVlueForSecondCase
    }else{
        secondCase[i] = '-'
        lastVlueForSecondCase = brick
    }
}
for(let  i = 0; i<bricks.length; i++){
    let fc = firstcase[i]
    let sc = secondCase[i]
    if(fc == '-'){
        finalCase[i] = '-'
    }else{
        finalCase[i] = fc - sc > 0 ? sc : fc;
    }
}
for(let  i = 0; i<bricks.length; i++){
    let brick = bricks[i]
    if(brick == 0){
        // water
        result.push({
            value: finalCase[i],
            itemStyle: {
                color: '#0000FF'
            }
        })
    }else{
        // brick
        result.push({
            value: brick,
            itemStyle: {
                color: '#FFFF00'
            }
        })
    }
}
console.log(firstcase)
console.log(secondCase)
console.log(finalCase)
console.log(result)
createChartTable(bricks, result, 'chart-container')
}
