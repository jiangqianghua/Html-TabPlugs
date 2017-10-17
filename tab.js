;(function($){
	var Tab = function(tab){
		var _this_ = this ;
		this.tab = tab ;
		this.config = {
			// 鼠标触发类型
			"triggerType":"mouseover",
			// 切换效果
			"effect":"default",
			//默认展示第几个tab
			"invoke":2,
			//用来定义自动切换时间
			"auto":5000
		};
		// 如果配置参数存在，就扩展掉默认的配置参数
		if(this.getConfig()){
			$.extend(this.config,this.getConfig());
		}
		var config = this.config;
		//console.log(this.config);

		this.tabItems = this.tab.find("ul.tab-nav li");
		this.contentItems = this.tab.find("div.content-wrap div.content-item");
		// 绑定对应的事件
		if(config.triggerType === "click"){
			this.tabItems.bind(config.triggerType,function(){
				_this_.invoke($(this));
			});
		}
		else if(config.triggerType === "mouseover"){
			this.tabItems.bind(config.triggerType,function(){
				_this_.invoke($(this));
			});
		}
		//判断自动切换
		if(config.auto){
			this.timer = null ;
			this.loop = 0 ;
			this.autoPlay();

			this.tab.hover(function(){
				window.clearInterval(_this_.timer);
			},function(){
				_this_.autoPlay();
			});
		}

		// 设置默认显示第几个tab
		if(config.invoke > 1){
			this.invoke(this.tabItems.eq(config.invoke-1));
		}
	};

	Tab.prototype = {
		autoPlay:function(){
			var _this_ = this ; 
			tabItems = this.tabItems ; 
			tabLength = tabItems.size();
			config = this.config ;
			this.timer = window.setInterval(function(){
				_this_.loop++ ;
				if(_this_.loop >= tabLength){
					_this_.loop = 0;
				}

				tabItems.eq(_this_.loop).trigger(this.config.triggerType);
			},config.auto);
		},
		// 事件驱动函数
		invoke:function(currentTab){
			var _this_ = this;
			var index = currentTab.index();
			currentTab.addClass("actived");
			currentTab.siblings().removeClass("actived");

			//执行不同的切换操作
			var effect = this.config.effect;
			if(effect === "default"){
				this.contentItems.eq(index).addClass("current").siblings().removeClass("current");
			}
			else if(effect === "fade"){
				this.contentItems.eq(index).fadeIn().siblings().fadeOut();
			}

			if(this.config.auto){
				this.loop = index ;
			}
		},
		// 获取配置参数
		getConfig:function(){
			var config = this.tab.attr("data-config");
			
			if(config && config != ""){
				return $.parseJSON(config);
			}
			else
			{
				return null ;
			}
		}
	};

	Tab.init = function(tabs){
		var _this_ = this ; 
		tabs.each(function(){
			new _this_($(this));
		});
	}
	// 组册成jquery方法
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
			});

			return this ;
		}

	});
	window.Tab = Tab ;
})(jQuery);