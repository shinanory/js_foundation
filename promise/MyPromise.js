
/*
    Promise用一个函数作为参数
    Promise内部用进行一系列初始化，内部定义了两个方法，一个用于成功，一个用于失败
    初始化结束Promise将内部两个方法赋给传入的函数，并执行传入的函数

    new Promise的时候：
    1. 传入一个函数作为参数，函数接受两个参数，成功和失败
    2. Promise内部进行一系列初始化
    3. Promise内部内部定义了两个方法，一个返回成功，一个返回失败
    4. Promise将内部两个方法赋给传入的函数，并执行传入的函数

*/

function t2(exc){
    const a = () => {console.log('a')}
    const b = () => {console.log('b')}
    exc(a, b)
}

function MyPromise(executor){
    this.PromiseStates = 'pending'
    this.PromiseResult = null
    this.a = (data) =>{
        if(!this.PromiseStates === 'pending')
            return
        this.PromiseStates = 'fulfilled'
        this.PromiseResult = data
        if(this.callback.onResolved){
            this.callback.onResolved(data)
        }
    }
    this.b = (data) =>{
        if(!this.PromiseStates === 'pending')
            return
        this.PromiseStates = 'rejected'
        this.PromiseResult = data
        if(this.callback.onRejected){
            this.callback.onRejected(data)
        }
    }

    try{
        executor(this.a, this.b) // executor使得promise外部可以调用内部定义好的方法
    }catch(err){
        this.b(err)
    }
}


MyPromise.prototype.callback = {}
MyPromise.prototype.then = function(onResolved, onRejected){
    if(this.PromiseStates === 'fulfilled'){
        MyPromise.prototype.callback = {
            onResolved,
            onRejected
        }
    }
    if(this.PromiseStates === 'fulfilled'){
        setTimeout(()=>{
            onResolved(this.PromiseResult)
        }) 
    }
    if(this.PromiseStates === 'rejected'){
        setTimeout(()=>{
            onRejected(this.PromiseResult)
        })
    }
}