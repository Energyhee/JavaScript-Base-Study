const _Fn = {
    findEl : (cen, scope) => {
        let center = document.querySelector(cen),
            state;

        if(!scope) return center;
        if (scope.includes('.')){
            state = 'CLASS';
        }else if(scope.includes('#')){
            state = 'ID';
        }else{
            state = 'TAG';
        }

        switch(state){
            default : 
                console.log('tag');
                break;
            case 'CLASS' :
                console.log('class');
                break; 
            case 'ID' :
                console.log('id');
                break; 
        }
    },
    setEvent : (btn, scope, event, type) => {
        try{
            let target = document.querySelectorAll(btn),
                cont = document.querySelectorAll(scope);

            target.forEach((bEl) => {
                bEl.addEventListener(event, (btnEl) => {
                    _Fn.setClass(btnEl.target, 'on', type);
                    cont.forEach((cEl) => {
                        _Fn.setClass(cEl, 'active', type);
                    });
                });
            });
        }catch{
            console.log(' ※ _Fn.setEvent Error "search for setEvent" ');
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
            console.log(' ※ _Fn.setClass Error "search for setClass" ');
        }
    }
};



_Fn.findEl('.flex', '.box');                    // obj, find
_Fn.setEvent('.flex .btn', '.box', 'click');    // obj, cont, event
_Fn.setClass('.flex', 'dddd', 'add');           // obj, class, toggle or add or remove