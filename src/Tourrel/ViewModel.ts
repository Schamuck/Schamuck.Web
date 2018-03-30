/// <reference path="../../typings/typings.d.ts"/>


window.onload = function() 
{
    let vm = new TourrelViewModel();
    vm.cal = function(){
        alert("sfjlsj")
    };
    ko.applyBindings(vm);
}

function person(name, amount) 
{
    var self = this;
    self.name = name;
    self.contribution = ko.observable(amount);
    self.contribution.subscribe(function(){
        console.log("event fired");
    });
    //_this.resources.revenue.subscribe(_this.onValueChange.bind(_this));
}


// Overall viewmodel for this screen, along with initial state
function TourrelViewModel() 
{
    var self = this;  

    self.expenses = [33,56];
    // Editable data
    self.personInstances = ko.observableArray([
        new person("person1", self.expenses[0]),
        new person("person2", self.expenses[1])
    ]);

    // Computed data
    self.totalCost = ko.computed(function() 
    {
       var total = 0;
       for (var i = 0; i < self.personInstances().length; i++)
           total += self.personInstances()[i].contribution();
       return total;
    });    
    
    self.headAverage = ko.computed(function() 
    {
        return self.totalCost()/self.personInstances().length; ;
    });

    // Operations
    self.addPerson = function() 
    {
        self.personInstances.push(new person("", 0));

    }
    self.removePerson = function(seat) { self.personInstances.remove(seat) }
}







   






