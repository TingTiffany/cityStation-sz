$(document).ready(function(){
	
	$('.lawyer').hover(function(){
		$(this).find('.bg-orange, .lawyer-title').animate({
			bottom: '60px'
		}, 300);
		$(this).find('.bg-black, .lawyer-cont').animate({
			bottom: 0
		}, 300);
	}, function(){
		$(this).find('.bg-orange, .lawyer-title, .bg-black, .lawyer-cont').animate({
			bottom: '-100%'
		});
	});
	
	$('.case-recommend>.carousel .item-box').hover(function(){
		$(this).find('.bg-black, >p').animate({
			bottom: 0
		}, 300);
	}, function(){
		$(this).find('.bg-black, >p').animate({
			bottom: '-100%'
		});
	});
	
	$('#side-carousel .item').hover(function(){
		$(this).find('.bg-black, p').animate({
			bottom: 0
		}, 300);
	}, function(){
		$(this).find('.bg-black, p').animate({
			bottom: '-100%'
		});
	});
	
	$('#about .about4 .appear-box').hover(function(){
		$(this).find('.bg-black, >p').animate({
			bottom: 0
		}, 300);
	}, function(){
		$(this).find('.bg-black, >p').animate({
			bottom: '-100%'
		});
	});
	
	$('.consulting-lawyer>.lawyer-box>a').hover(function(){
		$(this).find('.bg-black, .lawyer-border').animate({
			bottom: 0
		}, 300);
	}, function(){
		$(this).find('.bg-black, .lawyer-border').animate({
			bottom: '-100%'
		});
	});
	
	
	//客户案例页面左侧展开收起效果
	$('.collapse-panel>li>span').click(function(){
		$(this).children('.fa').toggleClass('fa-plus-circle fa-minus-circle');
		$(this).next('.collapse-sub').slideToggle();
	});
	
	
	//专业领域页面分类hover效果
	$('.spyCont .profession-link>a').hover(function(){
		$(this).children('.fa').toggleClass('fa-square-o fa-square cl-gray cl-orange');
	});
	
	
	//定位监听菜单
	if($('#spyMenu').length == 1){
		setSpyMenu();
		$(window).resize(function(){
			var tim;
			tim = setTimeout(function(){
				clearTimeout(tim);
				setSpyMenu();
			}, 400);
		});
	}
	
	
	//环形加载效果
	if($('.tab-pane .ring').length != 0){
		initRing($('.tab-pane.active'));
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var $div = $('.tab-pane.active');
			if(!$div.hasClass('ready')){
				initRing($div);
			}
		});
	}
	
	
	//圆弧形轮播图左右箭头切换效果
	$('.circle-carousel>a').on('click', function(){
		var $a = $(this),
				$lis = $a.siblings('ul').children('li'),
				len = $lis.length - 1,
				str = '';
		if($a.hasClass('right')){
			for(var i = len; i >= 0; i--){
				if(i == len){
					str = $lis.eq(i).attr('style');
				}
				if(i - 1 < 0){
					$lis.eq(i).attr('style', str);
				}else{
					$lis.eq(i).attr('style', $lis.eq(i-1).attr('style'));
				}
			}
		}else if($a.hasClass('left')){
			for(var i = 0; i <= len; i++){
				if(i == 0){
					str = $lis.eq(i).attr('style');
				}
				if(i + 1 <= len){
					$lis.eq(i).attr('style', $lis.eq(i+1).attr('style'));
				}else{
					$lis.eq(i).attr('style', str);
				}
			}
		}
	});
	
	
	//圆弧形轮播图效果
	if($('.circle-carousel').length == 1){
		initCircleCarousel($('#about'));
		$(window).resize(function(){
			var tim;
			tim = setTimeout(function(){
				clearTimeout(tim);
				initCircleCarousel($('#about'));
			}, 400);
		});
	}else if($('.circle-carousel').length > 1){
		initCircleCarousel($('.tab-pane.active'));
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var $div = $('.tab-pane.active');
			if(!$div.hasClass('ready')){
				initCircleCarousel($div);
			}
		});
		$(window).resize(function(){
			var tim;
			tim = setTimeout(function(){
				clearTimeout(tim);
				$('.tab-pane').removeClass('ready');
				initCircleCarousel($('.tab-pane.active'));
			}, 400);
		});
	}
	
});

function setSpyMenu(){
	var w = $('.container').outerWidth(),
			r = parseFloat((document.body.clientWidth - w) / 2) - 105,
			r = r < 0 ? r + 105 : r;
	$('#spyMenu').css({
		'right': r
	});
}

function initRing($div){
	$div.addClass('ready').find('.ring').each(function(){
		var cent = $(this).attr('cent');
		$(this).removeAttr('cent');
		loadRing($(this), cent);
	});
}

function loadRing($t, cent){
	var tim, 
			num = 0, 
			max = 124 / 100 * cent;
	tim = setInterval(function(){
		if(num < max){
			num += 1;
			$t.css('background-position-x', -104 * num);
		}else{
			clearInterval(tim);
		}
	}, 50);
}

function initCircleCarousel($div){
	$div.find('.circle-carousel li').removeAttr('style');
	
	var len = ($div.find('.circle-carousel li').length - 1) / 2,
			$li = $div.find('.circle-carousel li').eq(len),
			w = 0, 
			t = 0,
			ml = 0,
			idx = -1,
			maxIdx = -1,
			cw = $('.container').width() / 2;
	
	$li.prevAll('li').each(function(n){
		n += 1;
		idx = $(this).index();
		w = Math.pow(0.9, n) * 600;
		t = (340 - 340 * w / 600) / 2;
		ml = cw - (cw - 300) / len * idx;
		$(this).css({
			'top': t,
			'width': w,
			'margin-left': -ml,
			'opacity': Math.pow(0.9, n),
			'z-index': idx
		});
		$div.find('.circle-carousel li').eq(idx + n * 2).css({
			'top': t,
			'width': w,
			'opacity': Math.pow(0.9, n),
			'z-index': idx
		});
		maxIdx = idx > maxIdx ? idx : maxIdx;
	});
	
	$li.css({
		'top': 0,
		'width': '600px',
		'margin-left': '-300px',
		'z-index': maxIdx+1
	}).nextAll('li').each(function(n){
		n += 1;
		ml = ((cw - $div.find('.circle-carousel li:last-child').width() + cw/2) / len) * n - cw/2; 
		$(this).css('margin-left', ml);
	});
	$div.addClass('ready');
}