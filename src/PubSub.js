(function(root,factory){
    'use strict';
    var PubSub = {};
    root.PubSub = PubSub;
    factory(PubSub);
    if (typeof exports === 'object'){
        if (module !== undefined && module.exports) {
            exports = module.exports = PubSub; // Node.js specific `module.exports`
        }
        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
        module.exports = exports = PubSub; // CommonJS
    }
}((typeof window === 'object' && window ) || this,function(PubSub){
    'use strict';
    var contents = [];      //存放观察者订阅信息的数组
    //观察者添加订阅
    PubSub.subscribe = function(token,callback){
        var content = {
            token:token,
            callback:callback
        }
        contents.push(content);
    }
    //目标发布订阅，呼叫观察者执行
    PubSub.publish = function(token,data){
        for(var i=0; i<contents.length; i++){
            if(contents[i].token===token){
                contents[i].callback(data);
            }
        }
    }
    //观察者取消订阅
    PubSub.unsubscribe = function(token){
        for(var i=0; i<contents.length; i++){
            if(contents[i].token===token){
                contents.splice(i, 1);
            }
        }
    }
}) )