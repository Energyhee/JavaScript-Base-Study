// 입력란
function inpCheck(e){
    var scope = e.originalEvent
    ,   eCode = scope.keyCode;

    switch (eCode){
        case 13 : // action enter
            scope.target.blur();
            break;
        case 32 : // action space
            scope.returnValue = false;
            break;
    }
}

// 입력값 여부
function inpValue(e, type){
    var scope = e.originalEvent
    ,   val = scope.target.value
    ,   reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

    switch (type){
        case 'number' :
            val = val.replace(/[^0-9]/g,"");
            break;
        case 'keySign' :
            val = val.replace(reg,"");
            break;
        default : 
            val = val;
            break;
    }

    return val;
}

// 로딩바 숨김
function hideLoading(){
    $('.loading-wrap').hide();
}

// 로딩바
function makeLoading(sec, end){
    var _sec = (typeof sec === 'number') ? sec : 1
    ,   _end = (typeof end === 'number') ? end : 3;

    if(!$('.loading-wrap').length){
        var mHtml = `<div class="loading-wrap">
                    <div class="inner">
                        <div class="bar" style="animation-duration: ${_sec}s"></div>
                    </div>
                </div>`; 

        $('body').prepend(mHtml);
    }else{
        $('.loading-wrap').attr('animation-duration', `${_sec}s`).show();
    }
    setTimeout(() => hideLoading(), _end * 1000);
}

// 추가 금액
function numCnt(){
    var plus = 0;

    $('.box label.check input').on('change', function(e){
        var inp = $(e.target)
        ,   prev;

        (inp.prop('checked')) ? plus += parseInt(inp.val()) : plus = plus - parseInt(inp.val());
        if(plus > 0){
            prev = (prev =! NaN) ? parseInt($('.amount').attr('data-total')) : 0;
            $('.addAmount p').removeClass('empty').html(`<span class="amount" data-total="${plus}">${prev}</span>만원`);
            $('.amount').prop('Counter', prev).stop().animate({
                Counter: plus
            }, {
                duration: 500,
                step : (now) => {
                    $('.amount').text(Math.ceil(now));
                }
            });
            prev = prev
            plus = plus;
        }else{
            $('.addAmount p').addClass('empty').html('내 차를 자랑하면, 견적 금액이 올라가요.');
        }
    });
}

function optDetph(){
    $('.parent').each(function(){
        if($(this).siblings('.child').length){
            var par = $(this)
            ,   child = $(this).siblings('.child');
            par.find('label').on('change', function(e){
                var idx = $(this).index()
                ,   elm = child.find('.depth2');
        
                if($(elm[idx]).length){
                    $(elm).hide();
                    $(elm[idx]).fadeIn(400);
                }else{
                    $(elm).hide();
                }
            })   
        }
    });
};

function actNext(){
    var next = $('.btn.next');
    
    next.on('click', function(){
        var btn = $(this)
        ,   wrap = btn.parents('.stepSection');
    
        if(wrap.next('.stepSection').length){
            btn.addClass('on');
            wrap.next('.stepSection').addClass('active');
            $('html, body').stop().animate({
                scrollTop : wrap.next('.stepSection')[0].offsetTop
            }, 800, 'swing', function() { 
                console.log('end');
            });
        }
    });
}

(function(){ 
    actNext();
    optDetph();
    numCnt();

    // 입력창 이벤트
    $('.inp').on({
        keydown : (e) => {
            inpCheck(e);
        },
        keyup : (e) => {
            inpCheck(e);
        },
        input : (e) => {
            // makeLoading(1.5, 3);
            // inpCheck(e);
            // console.log(`element :`, e.target, ` // value :  ${inpValue(e)} // lenght : ${inpValue(e).length}`);
        },
        change : (e) => {
            
        }
    }); 
})();

// 선행이 되어야 할 기능
// ★ 0. 로딩바 구현 
// ★ 1. 입력란 띄어쓰기 막기
// 2. 값 입력 되어 있는지 확인
// 3. 확인 또는 다음, 이전 버튼 클릭 시 화면 전환
// 4. 페이지 로드 시 입력 된 값 자동노출
// 5. 프로그레스 바 (진척도)
// ★ 6. 가짓수 (선택에 따른 다른 버튼 영역 노출)
// ★ 7. 내 차량 자랑 할 때 추가 금액 + 기능 및 애니메이션
// 8. 파일첨부 기능
// 10. 