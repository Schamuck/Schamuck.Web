window.onload = function () {
    let vm = new ViewModel();
    ko.applyBindings(vm);
};
class ViewModel {
    constructor() {
        this.glob = {
            instances: ko.observableArray(),
            totalCost: ko.observable(0),
            headAverage: ko.observable(0),
        };
    }
    addPerson() {
        this.glob.instances.push(new Person(this.glob, "", ""));
        this.glob.instances.valueHasMutated();
    }
    removePerson(person) {
        this.glob.instances.remove(person);
        this.calculate();
    }
    calculate() {
        let total = 0;
        let count = this.glob.instances().length;
        for (var i = 0; i < count; i++) {
            total += parseFloat(this.glob.instances()[i].cont());
            this.glob.totalCost(total);
            this.glob.headAverage(total / count);
        }
    }
}
class Person extends ViewModel {
    constructor(glob, name, amount) {
        super();
        this.cont = ko.observable();
        this.name = name;
        this.cont(amount);
        this.glob = glob;
        this.cont.subscribe(this.onChaneContirbution.bind(this));
    }
    onChaneContirbution() {
        this.calculate();
    }
}
