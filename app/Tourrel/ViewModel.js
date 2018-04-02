window.onload = function () {
    let vm = new TourrelViewModel();
    ko.applyBindings(vm);
};

function person(name, amount) 
{
    var self = this;
    this.name = name;
    this.contribution = ko.observable(amount);
    this.calc = function()
    {
       //vm.totalCost.bind(this); 
    }
    // self.contribution.subscribe(function () 
    // {
    //     console.log("event fired");
    // });
}

function TourrelViewModel() 
{
    var self = this;
    self.expenses = [33, 56];
    self.personInstances = ko.observableArray([
        new person("person1", self.expenses[0]),
        new person("person2", self.expenses[1])
    ]);
    // self.totalCost = ko.computed(function () {
    //     var total = 0;
    //     for (var i = 0; i < self.personInstances().length; i++)
    //         total += self.personInstances()[i].contribution();
    //     return total;
    // });

    self.totalCost = ko.pureComputed({
        read: function () {
            var total = 0;
            for (var i = 0; i < self.personInstances().length; i++)
                total += self.personInstances()[i].contribution();
            return total ;
        },
        write: function (value) {
            return (self.totalCost +value);
        },
        owner: this
    });

    self.headAverage = ko.computed(function () {
        return self.totalCost() / self.personInstances().length;
        
    });
    self.addPerson = function () 
    {
        self.personInstances.push(new person("", 0));
    };
    self.removePerson = function (person) { self.personInstances.remove(person); };

}
