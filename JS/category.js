window.onload = function(){
	var ct_cLeft = document.querySelector(".ct_cLeft");
	//获取第一个ul标签
	var ulBox = document.querySelector("ul:first-of-type");
	//获取所有的li标签
	var lis = ulBox.querySelectorAll("li");
	//console.log(ulBox);
	var startY = 0;
	var moveY = 0;
	var distanceY = 0;
	//记录当前滑动的位置
	var currentY = 0;
	//获取左侧父容器的高度
	var leftHeight = ct_cLeft.offsetHeight;
	//获取ul容器的高度
	var ulBoxHeight = ulBox.offsetHeight;
	//console.log(ct_cLeft.offsetHeight+"---"+ulBox.offsetHeight);
	//静止状态下的最大值
	var maxTop = 0;
	//静止状态下的最小值
	var minTop = leftHeight - ulBoxHeight;
	//console.log(minTop);
	//滑动状态下的最大值
	var maxBounceTop = maxTop + 100;
	//滑动状态下的最小值
	var minBounceTop = minTop - 100;
	//console.log(maxBounceTop+"---"+minBounceTop);
	//触摸屏幕
	ulBox.addEventListener("touchstart",function(e){
		startY = e.targetTouches[0].clientY;
	});
	//移动
	ulBox.addEventListener("touchmove",function(e){
		moveY = e.targetTouches[0].clientY;
		distanceY = moveY - startY;
		//console.log(distanceY)
		//判断滑动的距离
		if(distanceY + currentY > maxBounceTop ||distanceY + currentY < minBounceTop){
			//console.log('超出范围了');
			return;
		}
		//先将之前可能添加的过渡效果清除
		ulBox.style.transition="none";
		//设置偏移
		ulBox.style.top = (distanceY + currentY) + "px";
		
	});
	//离开
	ulBox.addEventListener("touchend",function(e){
		//判断当前滑动的距离是否在静止状态和滑动状态下的最大top值之间
		if(distanceY + currentY > maxTop){
			currentY = maxTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top = maxTop + "px";
		}else if(distanceY + currentY < minTop){
			currentY = minTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top = minTop + "px";
		}else{
			currentY += distanceY;
		}
	});
	
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;
	}
	
	//添加移动端tap事件
	// itcast.tap(ulBox,function(e){
	// 	//清除所有li元素的样式
	// 	for(var i=0;i<lis.length;i++){
	// 		lis[i].classList.remove("active");
	// 	}
	// 	//为当前li元素添加样式
	// 	var li = e.target.parentNode;
	// 	li.classList.add("active");
	// 	var liHeight = li.offsetHeight;
	// 	//获取当前元素的索引值
	// 	var index = li.index;
	// 	ulBox.style.transition = "top 0.5s";
	// 	//判断当前偏移的值是否小于静止状态下最小top值
	// 	if(-index * liHeight < minTop){
	// 		ulBox.style.top = minTop + "px";
	// 		currentY = minTop;
	// 	}else{
	// 		ulBox.style.top = (-index * liHeight) + "px";
	// 		currentY = -index * liHeight;
	// 	}
	// })
	
	//使用zepto中的tap事件
	// $(ulBox).on("tap",function(e){
	// 	for(var i=0;i<lis.length;i++){
	// 		lis[i].classList.remove("active");
	// 	}
	// 	//为当前li元素添加样式
	// 	var li = e.target.parentNode;
	// 	li.classList.add("active");
	// 	var liHeight = li.offsetHeight;
	// 	//获取当前元素的索引值
	// 	var index = li.index;
	// 	ulBox.style.transition = "top 0.5s";
	// 	//判断当前偏移的值是否小于静止状态下最小top值
	// 	if(-index * liHeight < minTop){
	// 		ulBox.style.top = minTop + "px";
	// 		currentY = minTop;
	// 	}else{
	// 		ulBox.style.top = (-index * liHeight) + "px";
	// 		currentY = -index * liHeight;
	// 	}
	// })
	
	//使用fastclick.js来绑定
	if ('addEventListener' in document) {
	    document.addEventListener('DOMContentLoaded', function() {
	        /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
	        FastClick.attach(document.body);
	    }, false);
	}
	
	ulBox.addEventListener("click",function(e){
		for(var i=0;i<lis.length;i++){
			lis[i].classList.remove("active");
		}
		//为当前li元素添加样式
		var li = e.target.parentNode;
		li.classList.add("active");
		var liHeight = li.offsetHeight;
		//获取当前元素的索引值
		var index = li.index;
		ulBox.style.transition = "top 0.5s";
		//判断当前偏移的值是否小于静止状态下最小top值
		if(-index * liHeight < minTop){
			ulBox.style.top = minTop + "px";
			currentY = minTop;
		}else{
			ulBox.style.top = (-index * liHeight) + "px";
			currentY = -index * liHeight;
		}
	})
	
	
}