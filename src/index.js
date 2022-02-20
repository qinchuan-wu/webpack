

let p=new Promise((resolve,reject)=>{
    // setTimeout(()=>{
    //     // resolve("ok")
    //     reject("error")
    // },2000)
    resolve("ok")
    // reject("error")
})
const res=p.then((value)=>{
    console.log(value)
},reason=>{
    console.warn(reason)
})
console.log("111",res)








