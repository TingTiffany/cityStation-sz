var qtim;

$(document).ready(function(){
	
	resizeWin();
	$(window).resize(function(){
		var tim;
		tim = setTimeout(function(){
			clearTimeout(tim);
			resizeWin();
		}, 400);
	});
	
	var i = 0,
	  	max = $('.main> .scroll-show').length;
	$(window).on('scroll', function() {
		var $div = $('.main>.scroll-show:eq('+i+')');
	  if(i < max){
	  	if($(this).scrollTop() >= $div[0].offsetTop){
		  	if($div.hasClass('show-left')){
		  		$div.animate({
			      left: '0px',
			      opacity: 1
			    }, 1000);
		  	}else{
		  		$div.animate({
			      right: '0px',
			      opacity: 1
			    }, 1000);
		  	}
		  	if($div.hasClass('consult')){
		  		setTimeout(function(){scrollQuestion();}, 1000);
		  	}else if($div.hasClass('advantage')){
		  		setTimeout(function(){scrollNum(); addNum();}, 1000);
		  	}
		    i += 1;
		  }
	  }else{
	  	$(window).off('scroll');
	  }
	});
	
	
	setInterval(function(){
		$('.consult>.consult-link>.link-cont .angle-down').animate({
			'top': '10px'
		});
	}, 10);
	setInterval(function(){
		$('.consult>.consult-link>.link-cont .angle-down').animate({
			'top': '0px'
		});
	}, 10);
	
	$('.consult>.consult-pic').hover(function(){
		clearInterval(qtim);
	}, function(){
		scrollQuestion();
	});
	
});

function resizeWin(){
	var w = $('.container').outerWidth(),
			m = parseFloat((document.body.clientWidth - w) / 2);
	//设置banner满屏
	$('.banner').height($(window).height() - $('.header').outerHeight(true))
		.find('.container').css('left', m < 0 ? 0 : m);
	
	//设置
	$('.consult').width(w + m).css('margin-right', 0);
	
	//设置
	$('.advantage').width(w + m).css('margin-left', 0);
}

function scrollQuestion(){
	var $div = $('.consult>.consult-pic .consult-question'),
			h = $div.height();
	qtim = setInterval(function(){
		var t = parseInt($div.css('top'));
		if(t <= -h){
			$div.css('top', '100%');
		}else{
			$div.css({
				'top': t - 1
			});
		}
	}, 10);
}


function addNum(){
	var numtim, 
			num = 0, 
			max = parseInt($('.advantage .advantage-cont:eq(2) .cl-orange').text());
	numtim = setInterval(function(){
	$('.advantage .advantage-cont:eq(2) .cl-orange').text(num+'%');
		num += 1;
		if(num > max){
			clearInterval(numtim);
		}
	}, 1);
}

function scrollNum(){
	$('.advantage .advantage-cont:eq(0) .cl-orange>b').each(function(i){
		var n = $(this).text(),
				h = $(this).height();
		$(this).text('');
		$(this).animate({
			'background-position-y': -(n*(30+h)) + 'px'
		}, i*1000);
	});
	$('.advantage .advantage-cont:eq(1) .cl-orange>b').each(function(i){
		var n = $(this).text(),
				h = $(this).height();
		$(this).text('');
		$(this).animate({
			'background-position-y': -(n*(30+h)) + 'px'
		}, i*1000);
	});
}