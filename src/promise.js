function Promise(executor){

    //添加属性

    this.PromiseState="padding"
    this.PromiseResult= null 
    this.callback=[]
    const that = this
    function resolve(data){
        //判断状态
        if(that.PromiseState!=='padding') return
        //1.修改状态  promiseState
        that.PromiseState="fulfilled"
        //2.设置值  promiseResult
        that.PromiseResult=data
        that.callback.forEach((item)=>{
            item.onResolved(data)
        })

      
    }
    function reject(data){
        //判断状态
        if(that.PromiseState!=='padding') return
        //1.修改状态  promiseState
        that.PromiseState="rejected"
        //2.设置值  promiseResult
        that.PromiseResult=data
        that.callback.forEach((item)=>{
           item.onReject(data)
        })
    }
    try {
        //同步调用  执行器函数
        executor(resolve,reject);
    } catch (e) {
        reject(e)
           
    }
}

//添加then方法
Promise.prototype.then=function(onResolved,onReject){
    const that = this 
    return new Promise((resolve,reject)=>{

        //封装函数
        function callback(type){
            try {
                //获取执行函数的结果
                let result = type(this.PromiseResult)
                if(result instanceof Promise){
                    //
                    result.then(v=>{
                        resolve(v)
                    },r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
                
            } catch (error) {
                reject(error)
            }

        }



        //调用回调函数
        if(this.PromiseState==='fulfilled'){
            callback(onResolved)
        }
        if(this.PromiseState=='rejected'){
            callback(onReject) 
        }
        //判断padding 状态
        if(this.PromiseState=='padding'){
            //保存回调函数
            this.callback.push({
                onResolved:function(){
                    callback(onResolved)
                },
                onReject:function(){
                    callback(onReject)   
                },
                
            })
        }
    })
    


}