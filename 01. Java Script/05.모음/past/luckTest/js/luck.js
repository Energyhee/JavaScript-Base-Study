function luck(state){
    try{
        if (state){
            var _el = $('.luckyEl')
            ,   _btn = _el.find('button')
            ,   _sel = _el.find('select')
            ,   _tit = _el.find('p .chap')
            ,   _val = _sel.val()
            ,   _result = _el.find('.result')
            ,   _clickEl = _el.find('.clickNum')
            ,   _clickNum = 0
            ,   _succEl = _el.find('.clickSucc')
            ,   _succNum = 0
            ,   _failEl = _el.find('.clickFail')
            ,   _failNum = 0
            ,   _restore = $('.restore');

            function remove(){
                _clickNum = 0;
                _succNum = 0;
                _failNum = 0;
                _clickEl.text('0');
                _succEl.text('0');
                _failEl.text('0');
                _el.find('.me').text('0');
                _el.find('.chn').text('0');
                _result.text('');
                _restore.html('');

                _el.find('.com1').text(_val);
                switch (_val) {
                    case '2' :
                        _el.find('.com2').text(100);
                        break;
                    case '3' :
                        _el.find('.com2').text(81);
                        break;
                    case '4' :
                        _el.find('.com2').text(64);
                        break;
                    case '5' :
                        _el.find('.com2').text(50);
                        break;
                    case '6' :
                        _el.find('.com2').text(26);
                        break;
                    case '7' :
                        _el.find('.com2').text(15);
                        break;
                    case '8' :
                        _el.find('.com2').text(7);
                        break;
                }
            }

            function action(opt, opt2){
                _el.find('.me').text(opt + '%');
                _el.find('.chn').text(opt2 + '%');
                if( opt >= opt2 ){
                    _succNum += 1;
                    _succEl.text(_succNum);
                    _result.removeClass('gray').text('성공');
                    _restore.html('');
                }else{
                    _failNum += 1;
                    _failEl.text(_failNum);
                    if ( $('.luckyEl #state')[0].checked === true ){
                        _result.addClass('gray').text('실패');
                        fail(opt, opt2);   
                    }
                }
            }
            
            function fail(succ, menum){
                switch (succ) {
                    case 100 :
                        compare(succ, menum);
                        break;
                    case 81 :
                        compare(succ, menum);
                        break;
                    case 64 :
                        compare(succ, menum);
                        break;
                    case 50 :
                        compare(succ, menum);
                        break;
                    case 26 :
                        compare(succ, menum);
                        break;
                    case 15 :
                        compare(succ, menum);
                        break;
                    case 7 :
                        compare(succ, menum);
                        break;
                }
            }

            function compare(num, me){
                var _failArr = [
                    //              1강      2강     3강      4강     5강
                    /* 2 => 3 */ ['1~100'],
                    /* 3 => 4 */ ['36~100', '1~35'],
                    /* 4 => 5 */ ['46~100', '1~45'],
                    /* 5 => 6 */ ['26~60', '61~100', '1~25'],
                    /* 6 => 7 */ ['1~10', '33~63', '64~100', '11~32'],
                    /* 7 => 8 */ ['1~4', '5~14', '37~67', '68~100', '15~36']
                ]
                ,   _pop = $('.result_pop')
                ,   _dep = _failArr[_val - 3]
                ,   _txt = '응~👌🏻 어쩔티비~ 📺💁🏻‍♂️ 저쩔티비~📺 💁🏻‍♀️ 안물티비~안궁티비~뇌절티비~우짤래미~ 저짤래미~ 쿠쿠루삥뽕🕺🏻 지금 화났죠?🔥😛 개킹받죠? 죽이고 싶죠? 🤗어차피 내가 사는곳 모르죠? 응~못 죽이죠?👊🏻🤟🏻 어~또 빡치죠? 😌아무것도 모르죠? 아무것도 못하죠?😉 그냥 화났죠? 냬~알걨섑니댸👏🏻🙃🙃 아무도 안물 안궁~🤣 물어본 사람?🙋🏻‍♀️ 궁금한 사람?🙋🏻‍♂️ 응 근데 어쩔티비죠? 약올리죠? 응~ 어쩔 저쩔 안물 안궁😚✌🏻!~!~!~!~!!!'

                

                for(i = 0; i < _dep.length; i++ ){
                    var _min = parseInt(_dep[i].split('~')[0])
                    ,   _max = parseInt(_dep[i].split('~')[1]);

                    if ( _min <= me &&  _max >= me ){
                        _restore.html('<b>' + (i + 1) + ' 복구ㅋㅋㅋ</b>' + _txt);
                    }
                }
                /*
                _pop.addClass('open',setTimeout(function(){
                    _pop.removeClass('open');
                },5000));
                */
                _pop.addClass('open').find('.result_pop_close').on('click', function(){
                    _pop.removeClass('open');
                });
            }

            _sel.on({
                change : function() {
                    _val = $(this).val();
                    _tit.text(_val + '강');
                    remove();
                },
                click : function() {
                    var _arr = $(this).siblings('.arr');

                    ( _arr.hasClass('open') ) ? _arr.removeClass('open') : _arr.addClass('open');
                }
            });

            _btn.on('click', function(){
                var _chn = Math.floor(Math.random()*100+1);

                _clickNum += 1;
                _clickEl.text(_clickNum);

                switch (_val) {
                    case '2' :
                        action(100, _chn);
                        break;
                    case '3' :
                        action(81, _chn);
                        break;
                    case '4' :
                        action(64, _chn);
                        break;
                    case '5' :
                        action(50, _chn);
                        break;
                    case '6' :
                        action(26, _chn);
                        break;
                    case '7' :
                        action(15, _chn);
                        break;
                    case '8' :
                        action(7, _chn);
                        break;
                }
            });
        }
    }catch(e){
        console.log("%c[ERROR]%c Find Element Error search for 'luck'", "bold; color: red;", "color: beige");
    }
}

(function(){
    luck(true)         // 사용여부 :: true or false
})();