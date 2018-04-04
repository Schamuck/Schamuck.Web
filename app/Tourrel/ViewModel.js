window.onload = function () {
    let vm = new ViewModel();
    ko.applyBindings(vm);
};
class ViewModel {
    constructor() {
        this.glob = {
            instances: ko.observableArray(),
            totalCost: ko.observable(),
            headAverage: ko.observable(),
        };
        this.av = 0;
    }
    addPerson() {
        this.glob.instances.push(new Person(this.glob, "", "", ""));
        this.glob.instances.valueHasMutated();
    }
    removePerson(person) {
        this.glob.instances.remove(person);
        this.calculate();
        this.calcBalance();
    }
    calculate() {
        let total = 0;
        let count = this.glob.instances().length;
        for (var i = 0; i < count; i++) {
            let iCont = parseFloat(this.glob.instances()[i].cont());
            total += iCont;
            this.glob.totalCost(total);
            let av = total / count;
            this.glob.headAverage(av.toFixed(2));
            this.av = av;
        }
    }
    calcBalance() {
        let total = 0;
        let count = this.glob.instances().length;
        for (var i = 0; i < count; i++) {
            let iCont = parseFloat(this.glob.instances()[i].cont());
            let bal = "$ " + (this.av - iCont).toFixed(2);
            this.glob.instances()[i].balance(bal);
        }
    }
}
class Person extends ViewModel {
    constructor(glob, name, amount, bal) {
        super();
        this.cont = ko.observable();
        this.balance = ko.observable();
        this.name = name;
        this.cont(amount);
        this.balance(bal);
        this.glob = glob;
        this.cont.subscribe(this.onChaneContirbution.bind(this));
    }
    onChaneContirbution() {
        this.calculate();
        this.calcBalance();
    }
}
