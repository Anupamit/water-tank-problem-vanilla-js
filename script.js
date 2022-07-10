function  createChartTable(inputArr, outputArr){
    console.log('anp1')
    let dom = document.getElementById('chart-container');
    console.log(dom)
    let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    console.log('anp2')
    let option = {
    xAxis: {
        type: 'category',
        data: inputArr
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
    console.log('anp3')
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    console.log('anp4')
    window.addEventListener('resize', myChart.resize);
}

let bricks = [0,4,0,0,0,6,0,6,4,0]
// firstcase =      [0,-,-,6, 6,-]
// secondCase=      [6,-,-,7,7,-]
// finalCase = [0, -,-, 6, 6, -]
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
createChartTable(bricks, result)