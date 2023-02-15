function elementFix(opt){
    try{
        if( opt.state && $(opt.obj).length > 0 ){
            var _state
            ,   _scWd = screen.width
            ,   _hd = $(opt.obj)
            ,   _hdTop = _hd.offset().top
            ,   _winTop = $(window).scrollTop();

            ( $(opt.subObj).length > 0 && _scWd > 768 ) ? _state = true : _state = false;
    
            
            if( _state ){
                var _sub = $(opt.subObj)
                ,   _subTop = _sub.offset().top;

                if ( !$('.sub_thumb').length ) _sub.before('<div class="sub_thumb" style="height: 0;"></div>'); 
            }
    
            $(window).scroll(function(){
                var _winPos = $(window).scrollTop() || window.pageYOffset;

                if( _winPos > 0 || _winPos > _hdTop ){
                    _hd.addClass('fixed');
                    if( opt.toggle && userBrowserChk() != 'ie' ){
                        if( _winPos > _winTop ){
                            _hd.css({
                                'transform' : '-webkit-translateY(-' + _hd.outerHeight() + 'px)',
                                'transform' : 'translateY(-' + _hd.outerHeight() + 'px)'
                            });
                        }else{
                            _hd.css({
                                'transform' : '-webkit-translateY(0)',
                                'transform' : 'translateY(0)'
                            });
                        }
					}
                    if( _state && _sub.length > 0 && _winPos >= _subTop - _hd.outerHeight() ){
                        $('.sub_thumb').css('height', _sub.outerHeight());
                        _sub.addClass('fixed').css('top', _hd.outerHeight() + 'px');
                    }else{
                        $('.sub_thumb').css('height', 0);
                        _sub.removeClass('fixed').css('top', 0);
                    }
                }else{
                    _hd.removeClass('fixed');
                }
                _winTop = _winPos;
            }).trigger('scroll');
        }
    }catch(e){
        console.log("%c[ERROR]%c Find Element Error search for 'elementFix'", "bold; color: red;", "color: beige");
    }
}


var fixedBasic = new elementFix({
    state : false,          // 사용여부 :: true or false
    toggle : false,         // 스크롤 다운 & 업 상황에 따른 Element 노출 및 가림 처리 여부 :: true or false
    obj : '#header',        // Fixed Element Selecter
    subObj : '.navPath'     // Add Fixed Element Selecter
});