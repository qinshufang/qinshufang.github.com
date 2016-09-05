/**
 * Created by ijiajia on 2016/4/27.
 */
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
/**
 *
 * @param obj
 * @param json
 *        name, value
 * @param option
 *      duration  时间
 *      easing    运动形式
 *          linear  匀速
 *          ease-in 加速
 *          ease-out 减速
 *      complete  回调函数
 */
function move(obj, json, option){
    var option=option || {};
    option.duration=option.duration || 700;
    option.easing=option.easing || 'ease-out';
    var start={};
    var dis={};     //要变化的
    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));

        dis[name]=json[name]-start[name];
    }
    var count=Math.round(option.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch(option.easing){
                case 'linear':
                    var a=n/count;                    //变化比例
                    var cur=start[name]+dis[name]*a;  //当前变化成多少
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
                    break;
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            option.complete  && option.complete();
        }
    }, 30);
}