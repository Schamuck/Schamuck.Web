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
        totalCost : ko.observable(),
        headAverage: ko.observable(),
        
    }
    private addPerson():void
    {   // glob to be passed as the Person class doesn't have the instances updated, also for while remove Person class needs it
        this.glob.instances.push(new Person(this.glob,"","",""));
        this.glob.instances.valueHasMutated();
    }
    private removePerson(person):void
    {
        this.glob.instances.remove(person);
        this.calculate();
        this.calcBalance();
    }
   
    public av =0;
    public calculate():void
    {
        let total = 0
        let count =this.glob.instances().length;
        for (var i = 0; i < count; i++)
        {
            let iCont = parseFloat( this.glob.instances()[i].cont());
            total += iCont;
            this.glob.totalCost(total);
            let av = total/count;
            this.glob.headAverage(av.toFixed(2));
            this.av = av;
        }
    }

    public calcBalance():void
    {
        let total = 0
        let count =this.glob.instances().length;
        for (var i = 0; i < count; i++)
        {
            let iCont = parseFloat( this.glob.instances()[i].cont());
            
            let bal = "$ "+(this.av-iCont).toFixed(2);
            this.glob.instances()[i].balance(bal);
        }
    }
}

class Person extends ViewModel
{  
    public name:string;
    public cont = ko.observable();
    public balance = ko.observable();
    constructor(glob,name,amount,bal)
    {
        super();
        this.name = name;
         this.cont(amount);
         this.balance(bal);
        this.glob =glob;
        this.cont.subscribe(this.onChaneContirbution.bind(this));
    }

    private onChaneContirbution():void
    {
        this.calculate();
        this.calcBalance();
    }


}