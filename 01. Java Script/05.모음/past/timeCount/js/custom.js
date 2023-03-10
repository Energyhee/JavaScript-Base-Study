function pricePercent(state, time){
    try {
        if( state && $HH('.list-item').length ){
            if ( $HH('.list-item').length < 9 ){
                $HH('.list-item').parent('.prdList').addClass('floatNone');
			}
            setTimeout(function(){
                $HH('.list-item').not('.list-item.saleCheck').each(function(){
                    var target = $HH(this),
                        be_price = '',
                        af_price = '';

                    target.addClass('saleCheck');

                    if (time){
                        if ( target.find('.sale_end_date').text().length > 0 ){
                            var start = target.find('.sale_start_date').text(),
                                end = target.find('.sale_end_date').text();
                            
                            var saleTime = new timeCountOption({
                                state : true,
                                share: true,
                                gauge :true,
                                type: 'H-M-S',
                                start : start,
                                end : end,
                                el : target.find('.description .timeCount'),
                            });
                        }else{
                        	$HH('.main_time_cont').hide();
                        }
                    }
                    
                    var _custom_price = target.find('.custom_price'),
                        _basic_price = target.find('.basic_price'),
                        _sale_price = target.find('.sale_price');

                    if ( onlyPrice(_sale_price) > 0 && parseInt(onlyPrice(_sale_price)) < parseInt(onlyPrice(_basic_price)) ){
                        _custom_price.hide();
                        _basic_price.addClass('line');
                        be_price = onlyPrice(_basic_price);
                        af_price = onlyPrice(_sale_price);
                    }else if( onlyPrice(_sale_price) > 0 && parseInt(onlyPrice(_sale_price)) === parseInt(onlyPrice(_basic_price)) && parseInt(onlyPrice(_custom_price)) != parseInt(onlyPrice(_basic_price)) ){
                        _sale_price.hide();
                        _custom_price.addClass('line');
                        _basic_price.removeClass('line');
                        be_price = onlyPrice(_custom_price);
                        af_price = onlyPrice(_basic_price);
                    }else if( onlyPrice(_sale_price) > 0 && parseInt(onlyPrice(_sale_price)) === parseInt(onlyPrice(_basic_price)) && parseInt(onlyPrice(_custom_price)) === parseInt(onlyPrice(_basic_price)) ){
                        _custom_price.hide();
                        _sale_price.hide();
                    }else{
                        if ( onlyPrice(_custom_price).length < 1 )_custom_price.hide();
                        if ( onlyPrice(_basic_price).length < 1 ) return false;
                        target.find('.sale_price').hide();
                        _custom_price.addClass('line');
                        _basic_price.removeClass('line');
                        be_price = onlyPrice(_custom_price);
                        af_price = onlyPrice(_basic_price);
                    }
                    
                    if ( be_price != af_price || be_price > af_price ){
                        var priceNum = 100-(af_price*100/be_price),
                            percentNum = Math.round(priceNum),
                            elAddHtml = '';
                        elAddHtml += ' <p class="sale_percent">';
                            elAddHtml += percentNum + '<span data-time=" ' + percentNum  + ' ">%</span>';
                        elAddHtml += '</p>';
                        if ( percentNum != '-Infinity' ){
                            target.find('.priceWrap').append(elAddHtml);
						}
                    }

                    if ( target.find('.iconWrap .icon_img').length > 0 && target.find('.iconWrap .icon_img').attr('alt') === '품절' && _basic_price.text() != '발매예정' ){
                        target.addClass('sold-out').find('.priceWrap').append('<p class="soldOut">Sold Out</p>');
					}
                })
            },500);
        }
    }catch(e){
        console.log('상품 가격계산을 진행 할 수 없습니다.');
    }
}

function timeCountOption(opt) {
	if (opt.state){
		try {
            // 
            function toString(num){
                try{
                    var str;
                    str = String(num);
                    return str;
                }catch(e){
                    console.log('error');
                }
            }
			// time digit
			function timeDigit(n) {
				try {
					var _dg = toString(n);
					if ( _dg.length > 1 ){
						_dg = _dg;
					}else{
						_dg = '0' + _dg;
					}
					return _dg;
				}catch(e){
					console.log('timeDigit error');
				}
			};
			
			// time IE setting split
			function timeSplit(time) {
				var sSplit = '';
				try {
					if ( time.indexOf('/') != -1 ){
						var t = time.split('/');
						for( var i=0; i < t.length; i++ ) {
							if ( i === 3 ){
								sSplit += 'T' + t[i].split(':')[0] + ':' + t[i].split(':')[1];
							}else if ( i === 2 ){
								sSplit += t[i];
							}else{
								sSplit += t[i] + '-';
							}
						}
					}else if( time.indexOf('-') != -1 ){
						var t = time.split(' ');
						sSplit += t[0] + 'T' + t[1];
					}

					return sSplit;
				}catch(e){
					console.log('timeSplit error');
				}
			};
			
			// time refresh
			function refresh(start, end, pasteEl, timer){
				try {
					var today = new Date(),
						distance = end - today;
					if (distance < 0 ){
						clearInterval(timer);
						pasteEl.removeClass('show');
						return;
					}else{
                    	$('.main_time_cont').addClass('hide');
                    }
                    
					var _days = timeDigit(Math.floor(distance / day)),
						_hour = timeDigit(Math.floor((distance % day) / hour)),
						_minutes = timeDigit(Math.floor((distance % hour) / minute)),
						_seconds = timeDigit(Math.floor((distance % minute) / second));
					
					if ( type.indexOf('D') == -1 ){
						pasteEl.find('.day').hide();
						_hour = parseInt(_days) * 24 + parseInt(_hour);
                        
                        var number = _hour;
                        var length = 2;

                        number=number+""//number를 문자열로 변환하는 작업
                        var str=""
                        for(var i=0;i<length-number.length;i++){
                          str=str+"0";
                        }
                        str=str+number;
                        console.log(str);
                        
                        
					}else{
						pasteEl.find('.day > span').html(_days);
					}
					if ( type.indexOf('H') == -1 ){
                        pasteEl.find('.hour').hide();
                        _minutes = (parseInt(_days) * 24 + parseInt(_hour)) * 60 + parseInt(_minutes);   
					}else{
						pasteEl.find('.hour > span').html(_hour);
					}

					pasteEl.find('.day > span').html(_days);
					pasteEl.find('.hour > span').html(str);
					pasteEl.find('.minutes > span').html(_minutes);
					pasteEl.find('.seconds > span').html(_seconds);
					if ( !pasteEl.hasClass('show') ){
						pasteEl.addClass('show');
					}
				}catch(e){
					console.log('refresh error');
				}
			};
			
			var	agent = navigator.userAgent.toLowerCase(),
				pasteEl = $(opt.el),
				type = opt.type,
				start = '',
				end = '',
				second = 1000,
				minute = second * 60,
				hour = minute * 60,
				day = hour * 24,
				mHtml = "",
				timer;
            
            
            if ( agent.indexOf('msie') != -1 || agent.indexOf('trident') != -1 ){
                 // 익스플로어
				start = new Date(timeSplit(opt.start));
				end = new Date(timeSplit(opt.end));
			}else if( agent.indexOf("safari") != -1 ){
                 // 사파리
				start = new Date(opt.start.replace(/-/g, "/"));
				end = new Date(opt.end.replace(/-/g, "/"));
			}else{
                 // 그외
        		start = new Date(opt.start);
				end = new Date(opt.end);
        	}
            

			if ( start > new Date() ) return;
            
			if ( pasteEl.length ){
				if ( !pasteEl.find('.timeWrap').length ) {
					mHtml += '<div class="timeWrap">';
						mHtml += '<p class="day"><span></span>days</p>';
						mHtml += '<p class="hour"><span></span>hours</p>';
						mHtml += '<p class="minutes"><span></span>minutes</p>';
						mHtml += '<p class="seconds"><span></span>seconds</p>';
					mHtml += '</div>';
					pasteEl.append(mHtml);
				}
                
				timer = setInterval(function(){refresh(start, end, pasteEl, timer)},1000);
			}
            
            
		}catch(e){
			console.log('time count error');
		}
	}
}