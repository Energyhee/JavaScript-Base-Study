function animationAction(opt){
    try{
        if( opt.state && $('[data-' + opt.obj + ']').length > 0 ) {
            $('[data-' + opt.obj + ']').each(function(){
                var _this = $(this)
                ,   _type = _this.data('motion')
                ,   _duration = _this.data('duration')
                ,   _delay = _this.data('delay')
                ,   _elTop = _this.offset().top
                ,   _elSet;
        
                if( _type === 'slide-up' || _type === 'slide-down' ){
                    _elSet = 'translateY(0px)';
                }else if( _type === 'slide-left' || _type === 'slide-right' ){
                    _elSet = 'translateX(0px)';
                }else if( _type === 'scale-up' || _type === 'scale-down' ){
                    _elSet = 'scale(1)';
                }else if( _type === 'text-up' || _type === 'text-down' ){
                    _elSet = 'translateY(0px)';
                }
                
                $(window).on('scroll', function(){
                    var winScroll = $(document).scrollTop() || window.pageYOffset;

                    if( winScroll > _elTop - ( $(window).height() * .75 ) ){
                        if( _this.hasClass('acition') ) return false;
                        if( _type === 'text-up' || _type === 'text-down' ){
                            for( var i = 0; i <= _this.find('.txt').length; i++ ){
                                _this.find('.txt').eq(i).css({
                                    'transition-duration' : _duration + 's',
                                    'transition-delay' :  i / 10 + 's',
                                    'transform' : _elSet + ' scale(1)',
                                    'opacity' : '1'
                                });
                            }
                        }else{
                            _this.css({
                                'transition-duration' : _duration + 's',
                                'transition-delay' : _delay + 's',
                                'transform' : _elSet,
                                'opacity' : '1'
                            });
                        }
                        _this.addClass('acition');
                    }
                }).trigger('scroll');
            });
        }
    }catch(e){
        console.log("%c[ERROR]%c Find Element Error search for 'animationAction'", "bold; color: red;", "color: beige");
    }
}

function scrollSmooth(opt){
    try{
        if ( opt.state ){
            var el = $(opt.el)
            ,   type = opt.type;
    
            el.each(function(i) {
                var _this = $(this);
    
                document.addEventListener('touchstart', _this,{
                    capture: true,
                    passive: true
                });
    
                _this.on('mousewheel', function(e) {
                    e.preventDefault();
                    var target = $(this)
                    ,   deltaY = 0
                    ,   elContents = el.eq(i)
                    ,   elIndex = elContents.index()
                    ,   movePos = $(window).scrollTop();
    
                    var scope;
    
                    if (!event) event = window.event;
    
                    if (event.wheelDeltaY){
                        deltaY = event.wheelDeltaY;
                    }else{
                        deltaY = event.wheelDelta;
                    }
    
                    if ( deltaY < 0 ) {
                        if ( elContents.next().length > 0 ){
                            scope = elContents.next().attr('data-section');
                            navProgressbar(elIndex + 2, el.length);
                            $('.allMenu > li').removeClass('active');
                            $('.allMenu ').find('[data-scope="'+ scope +'"]').addClass('active');
                            movePos = elContents.next().offset().top;
                            elContents.removeClass('view')
                            elContents.next().addClass('view');
                        }else{
                            scope = elContents.attr('data-section');
                        }
                    }else{
                        if ( elContents.prev().length > 0 ){
                            scope = elContents.prev().attr('data-section');
                            navProgressbar(elIndex, el.length);
                            $('.allMenu > li').removeClass('active');
                            $('.allMenu ').find('[data-scope="'+ scope +'"]').addClass('active');
                            movePos = elContents.prev().offset().top;
                            elContents.removeClass('view')
                            elContents.prev().addClass('view');
                        }else{
                            scope = elContents.attr('data-section');
                        }
                    }
                    $('#header ul').find('li').removeClass('active').parent().find('[data-scope="' + scope + '"]').addClass('active');
                    $('html, body').stop().animate({ scrollTop: movePos + 'px' },  opt.duration);
                });
            });
        }
    }catch(e){
        console.log("%c[ERROR]%c Find Element Error search for 'scrollSmooth'", "bold; color: red;", "color: beige");
    }
}

function navProgressbar(idx,total) {
	try {
		var barEl = $('.side-progressbar span'),
			conIdx = idx;
		if ( barEl.css('height') < 0 ){
			barEl.css('height', 100 /total + '%');
		}
		barEl.css('height', conIdx / total * 100 + '%');
	}catch(e){
		console.log('navProgressbar error');
	}
}

function allMenu(state){
    if( state ){
        var btn = $('.side-allmenu-btn'),
            menu = $('.side-allmenu-wrap'),
            body = $('body');
        menu.css({
            'height' : window.innerHeight + 'px'
        });
        btn.on('click', function(e){
            var _this = $(this);
            btn.toggleClass('open');
            menu.toggleClass('open');
            body.toggleClass('scroll-none');
        })
    }
}

function navScope(state){
    if ( state ){
        $('.side-progressbar span').css('height', 100/$('.allMenu > li').length + '%');
        $('.allMenu > li').on('click', function(){
            var move = $(this).attr('data-scope');
            navLinkCheck(move, $(this).index());
        });
    }
}

function navLinkCheck(scope, idx){
    $('.allMenu > li').removeClass('active');
    $('.allMenu ').find('[data-scope="'+ scope +'"]').addClass('active');

    navProgressbar(idx + 1, $('.allMenu > li').length);

    $('html, body').animate({
        scrollTop: $('#container').find('[data-section="'+ scope +'"]').offset().top
    }, 700);
}

(function(){
    allMenu(true);
    navScope(true);
    var WindowSectionScroll = new scrollSmooth({
        state : true,
        duration : 800,
        el : '#container .text'
    });
    var aniBasic = new animationAction({
        state : true,           // 사용여부 :: true or false
        obj : 'motion'          // 사용여부 :: true or false
    });
})();