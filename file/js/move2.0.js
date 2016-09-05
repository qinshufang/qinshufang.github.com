/**
 * Created by ijiajia on 2016/4/28.
 */
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
// linear
// ease-in
// ease-out
function move(obj, json, option){
    // 考虑默认值
    var option=option || {};
    option.duration=option.duration || 700;
    option.easing=option.easing || 'ease-out';

    // 准备东西
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));//
        if(isNaN(start[name])){
            switch(name){
                case 'marginTop':
                    start[name]=obj.offsetTop;
                    break;
                case 'marginLeft':
                    start[name]=obj.offsetLeft;
                    break;
                case 'opacity':
                    start[name]=1;
                    break;
                case 'left':
                    start[name]=obj.offsetLeft;
                    break;
                case 'top':
                    start[name]=obj.offsetTop;
                    break;
                // ....borderWidth
            }
        }
        dis[name]=json[name]-start[name];
    }

    var count=Math.floor(option.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){



            switch(option.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
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
            option.complete && option.complete();
        }
    },30);
}