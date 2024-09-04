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