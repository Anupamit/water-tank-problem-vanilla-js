//1. fetch input feild value
//2. create table formet
//3. water wall container
//4. only water container
//5. count water units

function fetchArr() {
    let inputElement=document.getElementById('inputArr')
    let inputArr=inputElement.value.split(',')
    let bricks =waterAndBricks(inputArr)
    let water =onlyWater(inputArr)
    waterAndBricks(inputArr,bricks)
    onlyWater(inputArr,water)
}

function createTable(xaxisinput,outputArr,id) {
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
    });
    var option;
    option = {
    xAxis: {
        type: 'category',
        data: xaxisinput
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

const countWaterUnits = (finalCase) => {
    let sum = 0
    for (let i = 0; i < finalCase.length; i++) {
        let element = finalCase[i];
        if (element != '-') {
            sum += +element
        }
    }
    return sum
}

function waterAndBricks(bricks) {
    let finalCase=[]
    let firstCase=[]
    let secondCase=[]
    let result=[]
    let lastValueForFirstCase=0
    let lastValueForSecondCase=0
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if (element == 0) {
            firstCase.push(lastValueForFirstCase)
        }else{
            firstCase.push('-')
            lastValueForFirstCase =element
        }
    }
    for (let  i = bricks.length - 1; i >= 0; i--) {
        let element = bricks[i];
        if (element == 0) {
            secondCase[i] = lastValueForSecondCase
        }else{
            secondCase[i]= '-'
            lastValueForSecondCase=element
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let fc=firstCase[i]
        let sc=secondCase[i]
        if (fc == '-') {
            finalCase[i]='-'
        }else{
            finalCase[i]=fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if(element == 0){
            result.push({
                value: finalCase[i],
                itemStyle: {
                    color: '#0000FF'
                }
            })
        }else{
            result.push({
                value: element,
                itemStyle: {
                    color: '#FFFF00'
                }
            })
        }
    }
    console.log(firstCase);
    console.log(secondCase);
    console.log(finalCase);
    console.log(result);
    console.log(countWaterUnits(finalCase));
    createTable(bricks,result,'chart-container')
    let outputSpan = document.getElementById('waterunit')
    outputSpan.innerHTML= `Total ${countWaterUnits(finalCase)} Water Units` 
}


function onlyWater(water) {
    let firstCase=[]
    let secondCase=[]
    let finalCase=[]
    let result=[]
    let lastValueForFirstCase=0
    let lastValueForSecondCase=0
    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            firstCase.push(lastValueForFirstCase)
        }else{
            firstCase.push('-')
            lastValueForFirstCase=element
        }
    }
    for (let  i = water.length-1; i >= 0; i--) {
        let element = water[i];
        if (element == 0) {
            secondCase[i]='-'
        }else{
            secondCase.push('-')
            lastValueForSecondCase=element
        }
    }
    for (let i = 0; i < water.length; i++) {
        let fc=firstCase[i];
        let sc=secondCase[i]
        if (fc == '-') {
            finalCase[i]='-'
        }else{
            finalCase[i]= fc - sc > 0 ? sc : fc
        }
    }
    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            result.push({
                value:finalCase[i],
                itemStyle:{
                    color:'#0000FF'
                }
            })
        }else{
            result.push({
                value:0,
                itemStyle:{
                    color:'#0000FF'
                }
            })
        }
    }
    createTable(water,result,'chart-container1')
}