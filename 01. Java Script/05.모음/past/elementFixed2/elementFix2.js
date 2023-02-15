function winChk(){
    var _size;
    
    if( screen.width < 768 ){
        _size = 'mobile';
    }else {
        _size = 'pc';
    }
        
    return _size;
}

function elementFix(opt){
    try{
        if( $(opt.obj).length > 0 ){
            var _header = $(opt.obj)
            ,   _hdTop = _header.offset().top
            ,   _winTop = 0
            ,   _elSubOpt;
            
            if( winChk() === 'pc' ){
                $('.allMenuWrap').on({
                    mouseenter : function() {
                        _header.addClass('mouse_on').find('.innerWrap').css('height', 100 + heightChk('.subDep'));
                    },
                    mouseleave : function() {
                        _header.removeClass('mouse_on').find('.innerWrap').attr('style', '');
                    }
                });
            }else{
                $('.allMenuWrap .dep a').each(function(){
                    if( $(this).hasClass('on') ){
                        $(this).parent().siblings('.subDep').show();
                    }
                });
                $('.allMenuWrap .dep a').on('click', function(){
                    var _this = $(this)
                    ,   _sub = _this.parent().siblings('.subDep');

                    if( _this.hasClass('on') ){
                        _this.removeClass('on');
                        _sub.slideUp();
                    }else{
                        $('.allMenuWrap .dep a').not(_this).removeClass('on');
                        $('.allMenuWrap .subDep').not(_sub).slideUp();
                        _this.addClass('on');
                        _sub.slideDown();
                    }
                });
            }
            
            function elMoving(el, now, pre){
                var target = $(el)
                ,   css = ({
                        top : ( target.attr('id') === 'header' ) ? '0px' : _header.outerHeight() + 'px', 
                        bottom : ( target.attr('id') === 'header' ) ? '-' + _header.outerHeight() + 'px' : '0px',
                    });
                
                if( now >  pre ){
                    target.css('top', css.bottom)
                }else if( now < pre ){
                    target.css('top', css.top)
                }
            };
            
            function elSub(el){
                var target = $(el);

                if( !target.length > 0 ) return false;
                if( !$('.fix_dummy').length ) target.before('<div class="fix_dummy" style="height: 0px; overflow: hidden;"></div>');

                _elSubOpt = ({
                    obj : $(target),
                    height : $(target).height(),
                    dummy : $('.fix_dummy'),
                    dumTop : $('.fix_dummy').offset().top,
                    state : true
                });

                return _elSubOpt;
            }
            
            if( $(opt.subObj).length > 0 ){
                elSub(opt.subObj);
            }

            if( winChk() === 'mobile' && _elSubOpt != undefined){
                setTimeout(function(){
                    _elSubOpt.height = $(opt.subObj).height();
                }, 100);
            }

            $(window).scroll(function(){
                var _winPos = $(window).scrollTop();
                if( _winPos > 0 || _winPos > _hdTop ){
                    _header.addClass('fixed');

                    if( $(opt.subObj).length > 0 ){
                        if ( _elSubOpt.state ) 
                        var _obj = _elSubOpt.obj
                        ,   _sTop = _elSubOpt.dumTop
                        ,   _dum = $(_elSubOpt.dummy);
                        
                        if( _winPos > _sTop ){
                            _obj.addClass('fixed')
                            _dum.css('height', _elSubOpt.height);
                        }else if( _winPos < _sTop - _header.outerHeight() ){
                            _obj.removeClass('fixed').css('top', '0');
                            _dum.css('height', '0');
                        }
                    }
                    if( opt.moving ){
                        elMoving(
                            _header,
                            _winPos > _winTop,
                            _winPos, _winTop
                        );
                        elMoving(
                            '.navPath', 
                            _winPos > _winTop, 
                            _winPos, _winTop
                        );
                    }
                }else{
                    _header.removeClass('fixed');
                }
                _winTop = _winPos;
            }).trigger("scroll");
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