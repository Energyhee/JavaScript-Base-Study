const log = console.log;
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
            log('※ _Fn.setClass Error \n\n', error);
        }
    },
    setEvent : (scope, type) => {
        try{
            if(scope){

            }
        }catch(error){
            log('※ _Fn.setEvent Error \n\n', error);
        }
    }
    // setPaste : (wrap, target) => {
    //     try{
    //         let val = target.value
    //         ,   span = target.closest('li').querySelector('.sel-data');
                
    //         span.children[0].innerText = val;
    //         if(target.closest('.mixInp') != null) _Fn.valReset(wrap, target);
    //         (span != null && span.children[0].innerText.length > 0) ? span.style.display = 'flex' : span.style.display = 'none';

    //         if(target.closest('[class*="opt-group"]') != null){
    //             let num = parseInt(target.closest('[class*="opt-group"]').getAttribute('class').replace(/[^0-9]/g, ''))
    //             ,   opt = document.querySelector(`.opt${num}`)
    //             ,   scope = document.querySelector('#optScope')
    //             ,   scopeCar = document.querySelector('#carNumScope');

    //             if (target.getAttribute('id') === 'carNum'){
    //                 if(val.length > 0){
    //                     scopeCar.innerText = val;
    //                 }else{
    //                     scopeCar.innerHTML = '<span class="empty">차량번호를 입력해주세요.</span>';
    //                 }
    //             }else{
    //                 if(opt === null){
    //                     scope.innerHTML += `<span class="opt${num}">${val}</span>`;
    //                 }else{
    //                     opt.innerText = val;
    //                 }
    //             }
    //         }
    //     }catch(error){
    //         log('※ _Fn.setPaste Error \n\n', error);
    //     }
    // },
    // valReset : (wrap, el) => {
    //     try{
    //         let rObj = wrap.querySelectorAll('input[type="radio"]')
    //         ,   tObj = wrap.querySelector('input[type="text"]');

    //         if(el.getAttribute('type') === 'radio' && tObj.value.length > 0){
    //             tObj.value = '';
    //             _Fn.setClass(tObj.closest('.last'), 'focus');
    //         }else if(el.getAttribute('type') === 'text'){
    //             rObj.forEach((obj) => {
    //                 if( obj.checked === true ) obj.checked = false;
    //             });
    //         }
    //     }catch(error){
    //         log('※ _Fn.valReset Error \n\n', error);
    //     }
    // },
    // valReturn : (obj) => {
    //     try{
    //         let inp = obj.querySelectorAll('input')
    //         ,   val;

    //         inp.forEach((el) => {
    //             let type = el.getAttribute('type');
                
    //             switch (type) {
    //                 default : 
    //                     if(el.checked === true) val = el.value;
    //                     break;
    //                 case 'text' : 
    //                     if(el.value.length > 0) val = el.value;
    //                     break;
    //             }
    //         });

    //         if(val != undefined) return val;
    //     }catch(error){
    //         log('※ _Fn.valReturn Error \n\n', error);
    //     }
    // },
    // autoMove : (obj) => {
    //     try{
    //         let ul = document.querySelector('.toggle-wrap')
    //         ,   li = ul.querySelectorAll('li');

    //         li.forEach((el, idx) => {
    //             let btn = el.querySelector('.toggle-btn')
    //             ,   cont = el.querySelector('.toggle-cont');

    //             if (el === obj.closest('li')){
    //                 _Fn.setClass(btn, 'active', 'remove');
    //                 _Fn.setClass(cont, 'on', 'remove');
                    
    //                 if(el.nextElementSibling != null){
                        
    //                     _Fn.setClass(el.nextElementSibling.querySelector('.toggle-btn'), 'active', 'add');
    //                     _Fn.setClass(el.nextElementSibling.querySelector('.toggle-cont'), 'on', 'add');
                        
    //                     window.scrollTo({ 
    //                         top : el.nextElementSibling.offsetTop, 
    //                         behavior : 'smooth' 
    //                     });
    //                 }
    //             }
    //         });
    //     }catch(error){
    //         log('※ _Fn.autoMove Error \n\n', error);
    //     }
    // },
};

function Modern(selecter, option){
    const sel = document.querySelector(selecter);
    _Fn.setEvent(sel, 'click');
}

document.addEventListener('DOMContentLoaded', function(){
    let modern01 = new Modern('#slide01', {
        state : true,
        duration : .4
    });
    // test
    // document.querySelector('#slide01').addEventListener('click', (e) => {
    //     log(e.currentTarget, e.target);
    // });
});