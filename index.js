function waterTank(arr){
    let firstNo = arr[0]
    let secondNo = arr[1]
    let firstNoIndex = 0;
    let tank = 0
    for(let i = 0; i < arr.length; i++){
        if(i == 0){
            firstNo = arr[i]
            firstNoIndex = 0
        }else if(arr[i] != 0){
            secondNo  = arr[i]
            let minNo = firstNo - secondNo > 0 ? secondNo : firstNo;
            let gap = i - (firstNoIndex + 1);
            let waterUnit = minNo *  gap;
            tank += waterUnit
            console.log({i, firstNoIndex, firstNo, secondNo, minNo, gap, waterUnit});
            console.log('-----------------');
            firstNo = arr[i]
            firstNoIndex = i
        }
        
    }
    console.log('waterunit', tank)
}
let arr=[0,4,0,0,0,6,0,6,4,0];
console.log(waterTank(arr));
