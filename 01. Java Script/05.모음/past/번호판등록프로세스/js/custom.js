const _Fn = {
    setClass : (scope, name, type) => {
        try{
            let target = (typeof scope == 'string') ? document.querySelectorAll(scope)[0] : scope;
            switch (type) {
                default : 
                    (target.classList.contains(name) != true) ? target.classList.add(name) : target.classList.remove(name);
                    break;
                case 'add' : 
                    if(target.classList.contains(name) != true) target.classList.add(name);
                    break;
                case 'remove' : 
                    if(target.classList.contains(name) === true) target.classList.remove(name);
                    break;
            }
        }catch(error){
            console.log('※ _Fn.setClass Error \n', error);
        }
    },
    setPaste : (wrap, target) => {
        try{
            let val = target.value,
                span = target.closest('li').querySelector('.sel-data');

            span.children[0].innerText = val;
            if ( target.closest('.mixInp') != null ) {
                _Fn.valReset(wrap, target);
            }
        }catch(error){
            console.log('※ _Fn.setPaste Error \n', error);
        }
    },
    valReset : (wrap, el) => {
        try{
            let rObj = wrap.querySelectorAll('input[type="radio"]'),
                tObj = wrap.querySelector('input[type="text"]');

            if (el.getAttribute('type') === 'radio' && tObj.value.length > 0){
                tObj.value = '';
                _Fn.setClass(tObj.closest('.last'), 'focus');
            }else if(el.getAttribute('type') === 'text'){
                rObj.forEach((obj) => {
                    if ( obj.checked === true ) obj.checked = false;
                });
            }
        }catch(error){
            console.log('※ _Fn.valReset Error \n', error);
        }
    },
    valReturn : (obj) => {
        try{
            let inp = obj.querySelectorAll('input'),
                val = '';

            inp.forEach((el) => {
                let type = el.getAttribute('type');
                
                switch (type) {
                    default : 
                        if (el.checked === true) val += el.value;
                        break;
                    case 'checkbox' : 
                        if (el.checked === true) val += el.value;
                        break;
                    case 'text' : 
                        if (el.value.length > 0) val += el.value;
                        break;
                }
            });

            return val;
        }catch(error){
            console.log('※ _Fn.valReturn Error \n', error);
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    const datePicker = document.querySelector('#datepicker'),
          dateTimePicker = document.querySelector('#datetimepicker'),
          toggleCont = document.querySelector('.toggle-wrap');

    if(toggleCont){
        const tBtn = toggleCont.querySelectorAll('.toggle-btn'),
              tCont = toggleCont.querySelectorAll('.toggle-cont'),
              mixInp = toggleCont.querySelector('.mixInp');

        tBtn.forEach((bEl, idx) => {
            let dataEl = bEl.querySelector('.sel-data');

            if(_Fn.valReturn(tCont[idx]).length > 0) dataEl.children[0].innerText = _Fn.valReturn(tCont[idx]);

            bEl.addEventListener('click', () => {

                _Fn.setClass(bEl, 'active');
                _Fn.setClass(tCont[idx], 'on');

                (dataEl != null && _Fn.valReturn(tCont[idx]).length > 0) ? dataEl.style.display = 'flex' : dataEl.style.display = 'none';

                if ( bEl.classList.contains('scrollNone') != true ){
                    window.scrollTo({ 
                        top : bEl.offsetTop, 
                        behavior : 'smooth' 
                    });
                }
            });
        });

        document.querySelectorAll('input').forEach((inp) => {
            if(inp.getAttribute('type')  === 'radio' || inp.getAttribute('type')  === 'checkbox' ){
                inp.addEventListener('click', (event) => {
                    _Fn.setPaste(mixInp, event.target);
                });
            }else if(inp.getAttribute('type')  === 'text'){
                inp.addEventListener('input', (event) => {
                    _Fn.setPaste(mixInp, event.target);
                });
                inp.addEventListener('focus', (event) => {
                    _Fn.setPaste(mixInp, event.target);
                    if(event.target.closest('.last') != null) _Fn.setClass(event.target.closest('.last'), 'focus', 'add');
                });
                inp.addEventListener('blur', (event) => {
                    if(event.target.value.length < 1 && event.target.closest('.last') != null) _Fn.setClass(event.target.closest('.last'), 'focus', 'remove');
                });
            }
        });
    }

    if(datePicker){
        $('#datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            closeText: '취소',
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
            onClose : () => {
                if ( window.event.target.classList.contains('ui-datepicker-close') ) {
                    datePicker.value = '';
                }
            },
        });
    }

    if(dateTimePicker){
        $('#datetimepicker').datetimepicker({
            allowTimes: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
            datepicker: false,
            format: 'H:i',
            lang: 'kr',
        });
    }
});