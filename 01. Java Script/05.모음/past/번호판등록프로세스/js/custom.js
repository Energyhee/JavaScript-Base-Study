const _Fn = {
    setPaste : (obj) => {
        try{
            let inp = obj.querySelectorAll('input'),
                val = '';

            inp.forEach((el) => {
                let type = el.getAttribute('type');
                
                switch (type) {
                    default : 
                        if (el.checked === true) val = el.value;
                        break;
                    case 'text' : 
                        if (el.value.length > 0) val = el.value;
                        break;
                }
            });

            return val;
        }catch{
            console.log('※ _Fn.getValue Error');
        }
    },
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
        }catch{
            console.log('※ _Fn.setClass Error');
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
        }catch{
            console.log('※ _Fn.valReset Error');
        }
    },
    dataResult : () => {
        try{
            let dataSpan = document.querySelectorAll('.sel-data'),
                dataArr = [];

            dataSpan.forEach((span) => {
                dataArr.push(span.children[0].innerText);
            })
            
            return dataArr;
        }catch{
            console.log('※ _Fn.dataResult Error');
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    const datePicker = document.querySelector('#datepicker'),
          dateTimePicker = document.querySelector('#datetimepicker'),
          toggleCont = document.querySelector('.toggle-wrap');

    if(toggleCont){
        const tBtn = toggleCont.querySelectorAll('.toggle-btn'),
              tCont = toggleCont.querySelectorAll('.toggle-cont');

        tBtn.forEach((bEl, idx) => {
            bEl.addEventListener('click', () => {
                let dataEl = bEl.querySelector('.sel-data');

                _Fn.setClass(bEl, 'active');
                _Fn.setClass(tCont[idx], 'on');

                // 데이터 받아서 넣기
                if (dataEl != null && _Fn.setPaste(tCont[idx]).length > 0) {
                    dataEl.style.display = 'flex';
                    dataEl.children[0].innerText = _Fn.setPaste(tCont[idx]);
                }else{
                    dataEl.style.display = 'none';
                }
                if ( bEl.classList.contains('scrollNone') != true ){
                    window.scrollTo({ 
                        top : bEl.offsetTop, 
                        behavior : 'smooth' 
                    });
                }
            });
        });

        const mixInp = toggleCont.querySelector('.mixInp'),
              mixText = mixInp.querySelector('input[type="text"]'),
              mixRadio = mixInp.querySelector('input[type="text"]');
        
        document.querySelectorAll('input').forEach((inp) => {
            if (inp.getAttribute('type')  === 'radio' || inp.getAttribute('type')  === 'checkbox' ){
                // 데이터 받아서 넣기
                inp.addEventListener('click', (event) => {
                    let val = event.target.value,
                        span = event.target.closest('li').querySelector('.sel-data');
    
                    span.children[0].innerText = val;
                    _Fn.valReset(mixInp, event.target);
                });
            }else if(inp.getAttribute('type')  === 'text'){
                // 데이터 받아서 넣기
                inp.addEventListener('input', (event) => {
                    let val = event.target.value,
                        span = event.target.closest('li').querySelector('.sel-data');
    
                    span.children[0].innerText = val;
                    _Fn.valReset(mixInp, event.target);
                });
            }
        });

        mixText.addEventListener('focus', (event) => {
            _Fn.valReset(mixInp, event.target);
            _Fn.setClass(event.target.closest('.last'), 'focus', 'add');
        })
        mixText.addEventListener('blur', (event) => {
            if ( event.target.value.length < 1 ) _Fn.setClass(event.target.closest('.last'), 'focus', 'remove');
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