let log = console.log;
class Modern {
    constructor(selecter, optionList){
        this._sel = selecter;
        this._opt = optionList;
        log(this._sel, this._opt);
        this.total = () => {
            log('toatl function call');    
        }
        this.total();
    }
}
class ModernItem extends Modern {
    constructor(opt1, opt2){
        super(opt1, opt2);
    }
}