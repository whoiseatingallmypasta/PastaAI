valuesArr = ["v1","v2","v3","v4","v5"];
removeValFromIndex = [0,2,4];    
for (i = removeValFromIndex.length -1; i >= 0; i--) {
   valuesArr.splice(removeValFromIndex[i],1)
}