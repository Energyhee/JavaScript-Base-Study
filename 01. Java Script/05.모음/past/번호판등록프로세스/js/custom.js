const _Fn = {
    setEvent : (btn, scope, event) => {
        try{
            let tBtn = document.querySelectorAll(btn),
                tCont = document.querySelectorAll(scope);

            tBtn.forEach((bEl, idx) => {
                bEl.addEventListener(event, (thisEl) => {
                    _Fn.setClass(bEl, 'active');
                    _Fn.setClass(tCont[idx], 'on');
                });
            });
        }catch{
            console.log('※ _Fn.setEvent ERROR');
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
            console.log('※ _Fn.setClass ERROR');
        }
    }
};

$(document).ready(function(){
    _Fn.setEvent('.toggle-btn', '.toggle-cont', 'click');

    let datePicker = document.querySelector('#datepicker'),
        dateTimePicker = document.querySelector('#datetimepicker');

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
                    document.querySelector('#datepicker').value = '';
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