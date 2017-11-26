let city=new Object;

function init(){
	city.api="https://t5.haotown.cn/blogapi/";
	if(localStorage.getItem('love')){
		city.love=JSON.parse(localStorage.getItem('love'));
	}else{
		city.love=new Array;
	}
	city.loadp=10;
	city.s=0;
	city.e=city.s+city.loadp;
	city.footer=document.querySelector('.footer');
	
	if(getQueryString("pid")){
		loadallone(getQueryString("pid"));
	}else if(getQueryString("class")){
		
	}else{
		loadpage(city.s, city.e);
	}
}
function uplove(i){
	city.love.push(i);
	localStorage.setItem('love',JSON.stringify(city.love));
}
function islove(pid){
	for (let i = 0; i < city.love.length; i++) {
		if(city.love[i]==pid){
			return true;
			break
		}
	}
	return false;
}

  function xhr(url, method='GET', data=null) {
    return new Promise(function(res, rej) {
      try {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            res(xhr.responseText)
          } else if(xhr.readyState == 4) {
            rej(xhr.status)
          }
        }
        xhr.open(method, url, true)
        xhr.send(data)
      } catch(e) {}
    })
  }
  
  function loadpage(i,j,callback){
	xhr(city.api+'page?s='+i+'&e='+j).then(function(t){
	  	let json=JSON.parse(t);
	  	if(json.code==200){
	  		console.log("加载成功");
	  		let data=json.data;
	  		let warp=document.querySelector('.container ')
	  		for (let i = 0; i < data.length; i++) {
	  			let t=data[i]
	  			if(!t.commentsnumber){
	  				t.commentsnumber=""
	  			}
	  			warp.appendChild(creatpost(t.title,t.briefly,t.time,t.classify,t.commentsnumber,t.love,t.pid));
	  			if(callback){callback();}
	  		}
	  		if(data.length!=city.loadp){
	  			city.footer.style.display='block';
	  			city.isend=true
	  		}
	  	}
	  })
	}
  
  function loadone(e){
  	xhr(city.api+'post?id='+e.pid).then(function(t){
		let json = JSON.parse(t);
		if (json.code == 200) {
		    let p = e.querySelector(".post-con");
		    p.className = "post-con all";
		    p.onclick = "";
		    p.innerHTML = marked(json.data);
		    e.querySelector(".post-showall-btn").style.display = 'none'
		}
	})
  }

function loadallone(pid){
	xhr(city.api+'one?id='+pid).then(function(t){
		let j=JSON.parse(t);
		if(!j.commentsnumber){
	  		j.commentsnumber=""
	  	}
		city.isend='true';
		city.footer.style.display='block';
		let warp=document.querySelector('.container ');
		let ec=creatpost(j.title,j.data,j.time,j.classify,j.commentsnumber,j.love,j.pid,"all");
		warp.appendChild(ec);
		opencom(ec);
	})
	
}
function opencom(e) {
    let c = e.querySelector('.post-ex');
    if (e.hco) {
        c.innerHTML = "";
        e.hco = false
    } else {
        new Hco(c, 'blog', e.pid);
        e.hco = true;
    }

}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function creatpost(a, b, c, d, e, f, g,h) {
    let ele = document.createElement('div');
    let post;
    if(islove(g)){
    	f="已";
    }
    if(h&&h=="all"){
    	post=`<div class="post-con all">${marked(b)}</div>`
    }else{
    	post=`<div class="post-con small" onclick="loadone(this.parentNode)">${marked(b)}</div>
				<div class="post-showall-btn pointer">阅读全文 <svg class="icon" aria-hidden="true"><use xlink:href="#icon-arrow-down"></use></svg></div>`
    }
    ele.className = "box post";
    ele.innerHTML = `<h2 class="title"><a href="?pid=${g}" target="_blank">${a}</a></h2>
				${post}
				<div class="post-bottom">
					<div class="post-bottom-time">发表于${gettime(c)}</div>
					<div class="post-bottom-classify"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon-class"></use></svg>分类:${d}</div>
					<div class="post-bottom-comnum pointer"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-comment"></use></svg>${e}评论</div>
					<div class="post-bottom-love pointer"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-love1"></use></svg><span>${f}喜欢</span></div>
					<div class="post-bottom-share pointer"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-share"></use></svg>分享</div>
				</div>
				<div class="post-ex"></div>
				`
	ele.pid=g;
	return ele;
  }


  function gettime(time){
  	let temp;
  	//时区
  	const nowdate=new Date();
  	const c=nowdate.getTimezoneOffset();
	const nowtime=new Date().getTime();
	
	let timed=nowtime-time-c*60000;
	if(timed<60000){
		temp='刚刚';
	}else if(timed<60000*60){
		temp=new Date(timed).getMinutes()+'分钟前';
	}else if(timed<60000*60*24){
		temp=new Date(timed).getHours()+'小时前';
	}else{
		let t=new Date(parseInt(time));
		temp=t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日'
	}
	return temp;
  }
 
  
  //事件
  document.querySelector('.container').addEventListener('click',
    function(e) {
        let ele = e.target;

        if (ele.nodeName == "SPAN") {
            ele = ele.parentNode;
        }
        if (ele.nodeName == "use") {
            ele = ele.parentNode
        }
        if (ele.nodeName == "svg") {
            ele = ele.parentNode
        }
        if (ele.classList.contains("pointer")) {
            if (ele.classList.contains("post-bottom-comnum")) {
                //评论
                opencom(ele.parentNode.parentNode)
            } else if (ele.classList.contains("post-bottom-love")) {
                //喜欢
                if (!ele.love) {
                    ele.love = true;
                    ele.querySelector('span').innerHTML = '已喜欢';
                    uplove(ele.parentNode.parentNode.pid);
                    xhr(city.api+"love?id=" + ele.parentNode.parentNode.pid).then(function(t) {
                        console.log(t)
                    })
                }
            } else if (ele.classList.contains("post-bottom-share")) {
                //分享
            } else if (ele.classList.contains("post-showall-btn")) {
                loadone(ele.parentNode);
            }
        }
    })
  
  document.addEventListener('scroll',function(){
  	if(document.documentElement.clientHeight+document.documentElement.scrollTop>=document.documentElement.offsetHeight-30){
  		if(!city.isload){
  			console.log("加载下一页");
  			city.isload=true;
  			city.s+=city.loadp;
  			city.e=city.s+city.loadp;
  			if(!city.isend){
				loadpage(city.s, city.e,function(){city.isload=false});
			}
  		}
  	}
  })
	init();