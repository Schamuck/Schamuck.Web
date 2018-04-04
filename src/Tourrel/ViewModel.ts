/// <reference path="../../typings/typings.d.ts"/>
window.onload = function() 
{
    let vm = new ViewModel();
    ko.applyBindings(vm);
}
class ViewModel
{
    public glob = {
        instances : ko.observableArray<any>(),
        totalCost : ko.observable(0),
        headAverage: ko.observable(0),
        
    }
    private addPerson():void
    {   // glob to be passed as the Person class doesn't have the instances updated, also for while remove Person class needs it
        this.glob.instances.push(new Person(this.glob,"",""));
        this.glob.instances.valueHasMutated();
    }
    private removePerson(person):void
    {
        this.glob.instances.remove(person);
        this.calculate();
    }
    public calculate():void
    {
        let total = 0;
        let count =this.glob.instances().length;
        for (var i = 0; i < count; i++)
        {
            total += parseFloat( this.glob.instances()[i].cont());
            this.glob.totalCost(total);
            this.glob.headAverage(total/count);
        }
    }
}

class Person extends ViewModel
{  
    public name:string;
    public cont = ko.observable();

    constructor(glob,name,amount)
    {
        super();
        this.name = name;
         this.cont(amount);
        this.glob =glob;
        this.cont.subscribe(this.onChaneContirbution.bind(this));
    }

    private onChaneContirbution():void
    {
        this.calculate();
    }
}