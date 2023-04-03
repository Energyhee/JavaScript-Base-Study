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
});