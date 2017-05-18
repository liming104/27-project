function addEvent(dom,type,fn){
	if(dom.addEventListener){
					dom.addEventListener(type,fn,false);
				}else if(dom.attachEvent){
					dom.attachEvent('on'+type,fn);
				}else{
					dom['on'+type] = fn;
				}
			};
			var ref = new Wilddog("https://dmq.wilddogio.com/");
			var msg = ref.child("message");
			msg.on("child_added"
				, function(snapshot,error) {
				var str = snapshot.val();
				var index = str.indexOf(",");
				var time = str.substr(0,index);
				var curr = new Date().getTime();
				var mis = 10000;
				if(curr - mis <= time){
					addDm(dmqContainer,str.substr(index+1));
				}
			});
			
			var int = document.getElementById('int');
			addEvent(int,'keydown',function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];           
				if(e && e.keyCode==13){
					if(this.value.length <= 20){
						msg.push(new Date().getTime()+","+this.value);
						this.value = '';
					}
				}
			});
			
			function addDm(dom,content){
				var div = document.createElement('div');
				div.className = 'dmFnt';
				div.appendChild(document.createTextNode(content));
				
				var style = div.style;
				style.top = Math.floor((dom.clientHeight - 20) * Math.random())+"px";
				
				dom.appendChild(div);
				
				var right = -div.clientWidth;
				style.right = right+"px";
				style.width = div.clientWidth;
				
				var finish = 1000;
				var speed = (Math.abs(right) + document.body.clientWidth) / finish;
				var timer = setInterval(function(){
					right += speed;
					style.right = right + "px";
					if(right >= document.body.clientWidth){
						clearInterval(timer);
						dom.removeChild(div);
					}
				},10);
			};