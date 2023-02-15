// 입력 항목 삭제
function del(obj){
    $(obj).parent().parent('tr').remove();
}

// 입력 항목 삭제
function delInp(obj){
    $(obj).siblings('input').val('');
}

// 문자열 숫자로 리턴
function comma(num){
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

// 숫자만
function action(num){
    return parseInt(num.replace(/[^0-9]/g, ""));
};

function calculator(opt){
    try{
        if( opt.state ){
            function word(){
                var _elm = $('.word')
                ,   _tbm = _elm.find('table')
                ,   _btn = _elm.find('.resultBtn');

                // 입력 항목 추가
                function add(){
                    var _add = _tbm.find('.addCon')
                    ,   _addBtn = _add.find('.add')
                    ,   _addName = _add.find('.name')
                    ,   _make = '';

                    _addBtn.on('click', function(){
                        if ( _addName.val().length > 0 ){
                            _make += '<tr class="check">';
                                _make += '<th>';
                                    _make += '<span class="name">'+ _addName.val() + '</span>';
                                    _make += '<button class="del" onclick="del(this);">삭제</span>';
                                _make += '</th>';
                                _make += '<td>';
                                    _make += '<span class="data">';
                                        _make += '<input type="text" value="">';
                                        _make += '<button class="delInp" onclick="delInp(this);">삭제</span>';
                                    _make += '</span>';
                                _make += '</td>';
                            _make += '</tr>';

                            _addName.val('');
                            _add.before(_make).prev().find('input').focus();
                            _make = '';

                            write('check');
                        }else{
                            alert('항목명을 입력해주세요.');
                            _addName.focus();
                        }
                    });
                }

                // 지출 계산
                function result(){
                    var _pay = action(_tbm.find('tr.result .data input').val())
                    ,   _etc = _tbm.find('tr.etc .data')
                    ,   _totalElm = _tbm.find('tr.total  .data')
                    ,   _totalNum = 0
                    ,   _addPrice = 0;

                    _tbm.find('tr:not(.addCon):not(.result) input').each(function(){
                        var _this = $(this)
                        ,   _val = _this.val();

                        if ( _val.length > 0 ){
                            if( _this.parents('.plus').length ){
                                _addPrice += action(_val);
                            }else{
                                _totalNum += action(_val);
                            }
                        }
                    });

                    _totalElm.text(comma(_totalNum));
                    _etc.text(comma((_addPrice + _pay) - _totalNum));
                };

                // 콤마
                function write(obj){
                    var _inpChk;

                    if( obj === 'check' ){
                        _inpChk = _tbm.find('tr.check input');
                        _inpChk.unbind('input');
                    }else{
                        _inpChk = _tbm.find('tr:not(.addCon) input');
                    }

                    _inpChk.each(function(){
                        var _this = $(this);

                        _this.on('input', function(){
                            var _inp = $(this);

                            if( _inp.val.length > 0 ){
                                if ( action(_inp.val()) > 0 ){
                                    _inp.val(comma(action(_inp.val())));
                                }else{
                                    alert('숫자만 입력이 가능합니다.');
                                    _inp.val('');
                                }
                            }
                        });
                    });
                }

                add();      // 입력 항목 추가
                write();    // 작성중 콤마

                _btn.on('click', function(){
                    if ( _tbm.find('.result input').val().length > 0 ){
                        result(); // 지출 계산
                    }else{
                        alert('급여를 입력해주세요.');
                        _tbm.find('.result input').focus();
                    }
                });
            }

            word();
        }
    }catch(e){
        console.log("%c[ERROR]%c Find Element Error search for 'calculator'", "bold; color: red;", "color: beige");
    }
}


(function(){
    var cal = new calculator({
        state : true,          // 사용여부 :: true or false
    });
})();