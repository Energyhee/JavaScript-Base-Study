const _Fn = {
    setEvent : (btn, scope, event) => {
        try{
            let tBtn = document.querySelectorAll(btn),
                tCont = document.querySelectorAll(scope);

            tBtn.forEach((bEl, idx) => {
                bEl.addEventListener(event, (thisEl) => {
                    // # btn
                    _Fn.setClass(bEl, 'active');
                    // # cont
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
                    // # toggle
                    (target.classList.contains(name) != true) ? target.classList.add(name) : target.classList.remove(name);
                    break;
                case 'add' : 
                    // # add
                    if(target.classList.contains(name) != true) target.classList.add(name);
                    break;
                case 'remove' : 
                    // # remove
                    if(target.classList.contains(name) === true) target.classList.remove(name);
                    break;
            }
        }catch{
            console.log('※ _Fn.setClass ERROR');
        }
    }
};

_Fn.setEvent('.toggle-btn', '.toggle-cont', 'click');   // # obj, cont, event
