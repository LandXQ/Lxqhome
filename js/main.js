window.onload=function(){
	xiao.app.toBanner();
	xiao.app.Totip();
  xiao.app.tosel();
  xiao.app.toRun();
}

var xiao={};
xiao.tools={};
xiao.tools.getByClass=function(oParent,sClass){
  var aEle=oParent.getElementsByTagName('*');
  var arr=[];
  for (var i=0;i<aEle.length;i++) {
  	if (aEle[i].className==sClass) {
  		arr.push(aEle[i]);
  	}
  }
  return arr;
};
xiao.tools.getStyle=function(obj,attr){
  if(obj.currentStyle){
      return obj.currentStyle[attr];
  }
  else{
    return getComputedStyle(obj,false)[attr];
  }

}
xiao.ui={};
xiao.ui.textchange=function(obj,str){
	obj.onfocus=function(){
		if (this.value==str) {
			this.value='';
		}
	};
	obj.onblur=function(){
		if (this.value=='') {
			this.value=str;
		}
	};
}
xiao.ui.fadeIn=function(obj){

	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iSpeed=5;
		if(value==100){
			clearInterval(obj.timer);
		}
		else{
			value+=iSpeed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity='+value+')';
		}
	},30)
    
}
xiao.ui.fadeOut=function(obj){
    var icur=xiao.tools.getStyle(obj,'opacity');
  if(icur==0){return false;}
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iSpeed=-5;
		if(value==0){
			clearInterval(obj.timer);
		}
		else{
			value+=iSpeed;
			obj.style.opacity=value/100;
			obj.style.filter='alpha(opacity='+value+')';
		}
	},30)
}

xiao.ui.moveLeft=function(obj,old,now){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
      var iSpeed=(now-old)/10;
      iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
      if(old==now){
        clearInterval(obj.timer);
      }
      else{
        old+=iSpeed;
        obj.style.left=old+'px';

      }
    },30);
    
};
xiao.app={};

xiao.app.toBanner=function(){
   var tab=document.getElementById('PicTab');
   var aLi=tab.getElementsByTagName('li');

   var oPrveBg=xiao.tools.getByClass(tab,'prve-bg')[0];
   var oNextBg=xiao.tools.getByClass(tab,'next-bg')[0];
   var Next=xiao.tools.getByClass(tab,'next')[0];
   var Prve=xiao.tools.getByClass(tab,'prve')[0];

   var iNaw=0;
   var timer=setInterval(auto,3000);
   function auto(){
       if(iNaw==aLi.length-1) {
       	iNaw=0;
       }
       else{
       	iNaw++;
       }
       for(var i=0;i<aLi.length;i++){
       	xiao.ui.fadeOut(aLi[i])
       }
       xiao.ui.fadeIn(aLi[iNaw]);
   }

   oPrveBg.onmouseover=Prve.onmouseover= function(){
   	Prve.style.display='block';
   };
   oNextBg.onmouseover=Next.onmouseover=function(){
   	Next.style.display='block';
   };
   oPrveBg.onmouseout=Prve.onmouseout=function(){
   	Prve.style.display='none';
   };
   oNextBg.onmouseout=Next.onmouseout=function(){
   	Next.style.display='none';
   };
}
xiao.app.Totip=function(){   //搜索框文字切换。
var Text1=document.getElementById('textone');
var Text2=document.getElementById('texttwo');
xiao.ui.textchange(Text1,'Search website');
xiao.ui.textchange(Text2,'Search website');
}
xiao.app.tosel=function(){
  var osel=document.getElementById('sell');
  var aDd=osel.getElementsByTagName('dd');
  var aUl=osel.getElementsByTagName('ul');
  var aH2=osel.getElementsByTagName('h2');
  for(var i=0; i<aDd.length;i++){
     aDd[i].index=i;
     aDd[i].onclick=function(){
      var This=this;
      for(var i=0;i<aUl.length;i++){
        aUl[i].style.display='none';
      }
      aUl[this.index].style.display='block';
      document.onclick=function(){
        aUl[This.index].style.display='none';  //document为整个页面，Dd点击事件会冒泡到document，触发document的点击事件。
      }
      window.event.cancelBubble=true;   //阻止冒泡事件
     }
  }
  for(var i=0;i<aUl.length;i++){
    aUl[i].index=i;
    (function(ul){
       var aLi=ul.getElementsByTagName('li');
      for(var i=0;i<aLi.length;i++){
        aLi[i].onmouseover=function(){
          this.className='active';     
        }
        aLi[i].onmouseout=function(){
          this.className='';
        }
        aLi[i].onclick=function(){
        aH2[this.parentNode.index].innerHTML=this.innerHTML; 
        this.parentNode.style.display='none'; 
        window.event.cancelBubble=true;// 同理要阻止冒泡。
        }
      }

    })(aUl[i]);
  }
}
xiao.app.toRun=function(){
  var oRun=document.getElementById('run1');
  var oUl=oRun.getElementsByTagName('ul')[0];
  var aLi=oRun.getElementsByTagName('li');

  var arrowL=xiao.tools.getByClass(oRun,'arrow-l')[0];
  var arrowR=xiao.tools.getByClass(oRun,'arrow-r')[0];
  var iNow=0;
  oUl.innerHTML+=oUl.innerHTML;
  oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';

  arrowL.onclick=function(){
    if(iNow==0){
      iNow=aLi.length/2;
      oUl.style.left=-oUl.offsetWidth/2+'px';
    }
   xiao.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
   iNow--;

  };

  arrowR.onclick=function(){
    if(iNow==aLi.length/2){
      iNow=0;
      oUl.style.left=0;
    }
   xiao.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
   iNow++;

  };

}