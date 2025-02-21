let pr = new Promise((resolve, reject)=>{
    console.log(1)
    resolve('text')
})
pr.then(res=>{
    console.log(res)
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log('finally')
})