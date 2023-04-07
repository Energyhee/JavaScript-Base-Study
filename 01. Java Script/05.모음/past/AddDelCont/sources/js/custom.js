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
};

document.addEventListener('DOMContentLoaded', function(){

});