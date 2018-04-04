window.onload = function () {
    let vm = new TourrelViewModel();
    vm.cal = function () {
        alert("sfjlsj");
    };
    ko.applyBindings(vm);
};
function person(name, amount) {
    var self = this;
    self.name = name;
    self.contribution = ko.observable(amount);
    self.contribution.subscribe(function () {
        console.log("event fired");
    });
}
function TourrelViewModel() {
    var self = this;
    self.expenses = [33, 56];
    self.personInstances = ko.observableArray([
        new person("person1", self.expenses[0]),
        new person("person2", self.expenses[1])
    ]);
    self.totalCost = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.personInstances().length; i++)
            total += self.personInstances()[i].contribution();
        return total;
    });
    self.headAverage = ko.computed(function () {
        return self.totalCost() / self.personInstances().length;
        ;
    });
    self.addPerson = function () {
        self.personInstances.push(new person("", 0));
    };
    self.removePerson = function (seat) { self.personInstances.remove(seat); };
}
