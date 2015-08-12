Ext.define('EventReminder.controller.Past', {
extend: 'Ext.app.Controller',
config: {
refs: {
past: 'past',
pastPeople: 'past #peopleList',
main: 'main',
editEvent: 'editevent',
editTimeSelect: 'editevent #eventTimeSelect',
alertTimeSelect: 'editevent #alertTimeSelect',
editEventPriority: 'editevent #priority',
editCategory: 'editevent #selectEditCategory',
editDate: 'editevent #selectDate',
editList: 'editevent #peopleList',
editMessage: 'editevent #message',
editActivity: 'editevent #activity',
editHidden: 'editevent #hiddenField',
editPrev : 'editevent #prev',
editRecurrence: 'editevent #recurrence'

},
control: {
past: {
    backCommand: 'onBack',
    editEventCommand: 'onEditEvent',
    clearCommand: 'onClear'
}
}
},
onBack: function(){
console.log("Returned to Main");
Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},
onEditEvent: function(record){
    var editEventScreen = this.getEditEvent();

    //Setting the Default values of the form fields
    //Saving data in a variable
    var data = record.getData();
    this.getEditRecurrence().setValue(data.Recur);
    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date());
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.eventTime);
    this.getAlertTimeSelect().setValue(data.alertTime);


    //Adding people
    var all = data.people.split(', ');
    var personStore = Ext.getStore('Person');
    var adhocpeople = Ext.getStore('EventPeople');
    for(var i=0; i< all.length; i++){
        var person = all[i];
        var index = personStore.findExact('name', person);
        var record = personStore.getAt(index);
        adhocpeople.add(record);
        adhocpeople.sync();
    }

    //Adjusting the ItemList height
    this.getEditList().setHeight(this.getEditList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());

     //Setting the value of previous screen
     this.getEditPrev().setValue("Past");

     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(editEventScreen, {type: 'slide', direction: 'left'});
},

//Clearing out all the past reminders
onClear: function(){
console.log("Clearing out");
var upcoming = Ext.getStore("Upcoming");
upcoming.each(function(item, index, length){
   upcoming.remove(item);
});
upcoming.sync();
//this.getPastPeople().refresh();
}
});