window.onload = function(){
	searchEffect();
	
	timeBack();
	
	bannerEffect();
};

//导航栏JS效果
function searchEffect(){
	//获取搜索块
	var search = document.querySelector(".jd_search");
	//获取轮播图
	var banner = document.querySelector(".jd_banner");
	//获取轮播图的高度
	var bannerHeight = banner.offsetHeight;
	//console.log(bannerHeight);
	//获取轮播图卷曲出去的高度
	window.onscroll = function(){
		var offsetTop = document.documentElement.scrollTop;
		//console.log(offsetTop);
		//当offsetTop < bannerHeight时，搜索块的透明度才发生改变
		var opacity = 0;
		if(offsetTop < bannerHeight){
			opacity = offsetTop / bannerHeight;
			search.style.backgroundColor = "rgba(233,35,34,"+opacity+")"
		}
	}
}

//掌上秒杀  倒计时效果
function timeBack(){
	//获取所有的span 
	var spans = document.querySelector(".jd_sk-time").querySelectorAll("span");
	
	var totalTime = 5400;//时间以 秒 为单位，假设开始时间为 01:30:00
	//开启定时器
	var timeId = setInterval(function(){
		totalTime--;
		//当时间减到0时，继续会成-1-1:-1-1：-1-1，所以时间减到0时，清除定时器，不再进行下面的操作
		if(totalTime < 0){
			clearInterval(timeId);
			return;
		}
		//获得时 分 秒
		var hour = Math.floor(totalTime / 3600);  //Mathfloor()向下取整
		var minute = Math.floor(totalTime % 3600 / 60);
		var second = Math.floor(totalTime % 60);
		
		//设置时 分 秒
		spans[0].innerHTML = Math.floor(hour / 10); 
		spans[1].innerHTML = Math.floor(hour % 10);
		
		spans[3].innerHTML = Math.floor(minute / 10);
		spans[4].innerHTML = Math.floor(minute % 10);
		
		spans[6].innerHTML = Math.floor(second / 10);
		spans[7].innerHTML = Math.floor(second % 10);
	},1000);
	
}

function bannerEffect(){
	var banner = document.querySelector(".jd_banner");
	var imgBox = banner.querySelector("ul:first-of-type");
	//获取li中的第一张图片
	var first = imgBox.querySelector("li:first-of-type");
	//console.log(first);
	//获取li中的最后一张图片
	var last = imgBox.querySelector("li:last-of-type");
	//复制第一个图片到最后
	imgBox.appendChild(first.cloneNode(true));
	//复制最后一张图片到第一个
	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
	
	//设置样式
	//获取所有li元素
	var lis = imgBox.querySelectorAll("li");
	//获取li元素的数量
	var count = lis.length;
	//获取banner的高度
	var bannerWidth = banner.offsetWidth;
	//console.log(bannerWidth);
	//设置ul的宽度
	imgBox.style.width = count * bannerWidth + "px";
	//设置每一个li元素的宽度
	for(var i = 0;i < lis.length;i++){
		lis[i].style.width = bannerWidth  + "px";
	}
	//设置偏移
	imgBox.style.left = -bannerWidth + "px";
	
	var index = 1;//因为发生了一张图片的偏移，所以索引不再是0
	
	//当屏幕变化的时候，重新计算宽度
	window.onresize=function(){
		//获取宽度值，并覆盖之前的
		bannerWidth = banner.offsetWidth;
		imgBox.style.width = count * bannerWidth + "px";
		for(var i = 0;i < lis.length;i++){
			lis[i].style.width = bannerWidth  + "px";
		}
		imgBox.style.left = (-index * bannerWidth) + "px";
	}
	
	//自动轮播效果
	
	var startTime = function(){
		timeId = setInterval(function(){
			index++;
			//过渡效果
			imgBox.style.transition = "left 0.5s ease-in-out";
			//设置偏移
			imgBox.style.left = (-index * bannerWidth) + "px";
			//console.log(index);
			//判断是否轮播到最后一张图片
			setTimeout(function(){
				if(index == count-1){
					index = 1;
					imgBox.style.transition = "none";
					imgBox.style.left = (-index * bannerWidth) + "px";
				};
			},500);
		},2000); //每隔两秒切换一次图片
	}
	startTime();
	
	//设置点轮播
	var setIndicator = function(index){
		var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
		for(var i=0;i<indicator.length;i++){
			indicator[i].classList.remove("active");
			indicator[index-1].classList.add("active");
		}
	}
	
	var timeId;
	//手动轮播效果
	var startX,moveX,distanceX;
	//判断当前过渡效果是否结束
	var isEnd = true;
	//手指触摸到屏幕时
	imgBox.addEventListener("touchstart",function(e){
		//清除定时器
		clearInterval(timeId);
		startX = e.targetTouches[0].clientX;
	});
	//手指在屏幕上移动时
	imgBox.addEventListener("touchmove",function(e){
		if(isEnd = true){
			moveX = e.targetTouches[0].clientX;
			distanceX = moveX - startX;
			imgBox.style.transition = "none";
			imgBox.style.left = (-index * bannerWidth + distanceX) + "px";
		}
	});
	
	
	//手指离开时
	imgBox.addEventListener("touchend",function(e){
		isEnd = false;
		//判断滑动的距离，当滑动距离大于100时，进行翻页
		if(Math.abs(distanceX) > 100){ //distanceX有正负值
			if(distanceX > 0){//到上一张
				index--;
			}else{ //到下一张
				index++;
			}
			imgBox.style.transition = "left 0.5s ease-in-out";
			imgBox.style.left = (-index * bannerWidth) + "px";
		}else if(Math.abs(distanceX) > 0){
			imgBox.style.transition = "left 0.5s ease-in-out";
			imgBox.style.left = (-index * bannerWidth) + "px";
		};
		/*将上一次move所产生的数据重置为0*/
		startX = 0;
		moveX = 0;
		distanceX = 0;
	});
	
	/*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
	imgBox.addEventListener("webkitTransitionEnd",function(){
		//如果滑动到了第一张，索引值改为5，即count-2;
		//如果滑动到了最后一张，索引值改为1;
		if(index == count-1){
			index = 1;
			imgBox.style.transition = "none";
			imgBox.style.left = (-index * bannerWidth) + "px";
		}else if(index == 0){
			index = count-2;
			imgBox.style.transition = "none";
			imgBox.style.left = (-index * bannerWidth) + "px";
		}
		
		setIndicator(index);
		
		setTimeout(function(){
			isEnd = true;
			clearInterval(timeId);
			startTime();
		},500);
		
	});
}
