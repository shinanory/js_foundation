// 收集依赖
class Dep {
    constructor(){
        console.log('dep的构造器')
        // 订阅-发布模式，用数组存储订阅变量的地方，数组里放的是watcher的示例
        this.subs = []
    }
    // 添加订阅
    addSub(sub){
        this.subs.push(sub)
    }
    // 通知更新
    notify(){
        console.log('notify')
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor(obj, key, cb){
        console.log('watcher的构造器')
        // 将 Dep.target 指向自己
        // 然后触发属性的 getter 添加监听
        // 最后将 Dep.target 置空
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }
    update() {
        // 获得新值
        this.value = this.obj[this.key]
       // 我们定义一个 cb 函数，这个函数用来模拟视图更新，调用它即代表更新视图
        this.cb(this.value)
      }
}

// 使用闭包，val是闭包变量
function defineReactive(obj, key, val) {
    console.log(key)
    const dep = new Dep()

    // 递归调用，对val的子对象进行数据劫持
    let childOb = observe(val)

    Object.defineProperty(obj, key, {
        // 可枚举
        enumerable: true,
        // 可配置
        configurable: true,
        // getter与setter进行数据劫持
        get(){
            console.log('访问' + key)
            // 将 Watcher 添加到订阅
            if (Dep.target) {
                dep.addSub(Dep.target) // 新增
            }
            return val
        },
        set(newVal){
            console.log('设置' + key)
            val = newVal
            // 若新值为对象，同样需要递归监听
            childOb = observe(newVal)
            // 发布订阅模式，通知dep
            dep.notify()
        }
    })
}

class Observer {
    //构造器
    constructor(obj){
        console.log('Observer构造')
        this.dep = new Dep()
        Object.defineProperty(obj, '__ob__', {
            enumerable: false,
            value: this,
        })
        // 如果是数组，更换原型
        if (Array.isArray(obj)){
            Object.setPrototypeOf(obj, newArray)
            // 数组的特殊遍历
            for (let i=0, len=obj.length; i<len; i++){
                observe(obj[i])
            }
        }
        // 不是数组，继续遍历对象属性
        else{
            for (let key in obj){
                defineReactive(obj, key, obj[key])
            }
        }
    }
    // walk(obj){
    //     for (let key in obj){
    //         defineReactive(obj, key, obj[key])
    //     }
    // }
}
function observe(obj){
    // obj 必须为一个对象
    if (typeof(obj) != 'object')
        return;
    let ob;
    if (typeof(obj.__ob__) != 'undefined'){
        ob = obj.__ob__;
    }
    else{
        ob = new Observer(obj);
    }
    return ob;
}

// 改写数组的方法
const newArray = Object.create(Array.prototype)
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
methods.forEach(methodName => {
    // 备份
    const original = Array.prototype[methodName]
    // 定义新方法
    Object.defineProperty(newArray, methodName, {
        enumerable: false,
        configurable: true,
        value: function(){
            const ob = this.__ob__
            // 获取新增的元素
            let inserted = []
            if (methodName === 'push' || methodName === 'unshift'){
                inserted = [...arguments]
            }
            else if (methodName === 'splice'){
                inserted = [...arguments].slice(2)
            }
            // 劫持新增元素
            if (inserted){
                for (let i=0, len=inserted.length; i<len; i++){
                    observe(inserted[i])
                }
            }

            ob.dep.notify()

            // 恢复原功能，将this指定为调用对象
            let result = original.apply(this, [...arguments])

            console.log('啦啦啦')
            return result
        }
    })
})

let test = {
    name:{
        now:{
            first: 'anon',
            last: 'chihaya'
        },
        old: 'rin',
    },
    sex: 1,
    npy: ['rana', 'soyo', 'tomori', 'rikki']
}
observe(test)
// test.sex=0
// test.npy.push('rana')
// console.log(test)

let dp = new Dep()
dp.addSub(() => {
    console.log('emit here')
})
dp.notify()