
function longestConsec(strarr, k) {
    const n = strarr.length;
    if (n === 0 || k > n || k <= 0) { 
      return "";
    }
let lenghtchecker=''
for (let i=0; i<strarr.length; i++){
let sliced = strarr.slice(i,k)
let str =''
for (slice of sliced){
    str += slice
}   
if (str.length>lenghtchecker.length){
    lenghtchecker=str;
}
k++
}
return lenghtchecker
}





console.log(longestConsec(["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"], 3))