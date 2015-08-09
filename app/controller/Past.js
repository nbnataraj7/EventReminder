Ext.define('EventReminder.controller.Past', {
extend: 'Ext.app.Controller',
config: {
refs: {
past: 'past',
main: 'main',
editEvent: 'editevent',
editTimeSelect: 'editevent #eventTimeSelect',
alertTimeSelect: 'editevent #alertTimeSelect',
editEventPriority: 'editevent #priority',
editCategory: 'editevent #selectCategory',
editDate: 'editevent #selectDate',
editList: 'editevent #peopleList',
editMessage: 'editevent #message',
editActivity: 'editevent #activity',
editHidden: 'editevent #hiddenField',
editPrev : 'editevent #prev'

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

    this.getEditHidden().setValue(data.EventID);
    this.getEditCategory().setValue(data.category);
    this.getEditDate().setValue(new Date());
    this.getEditMessage().setValue(data.message);
    this.getEditEventPriority().setLabel(data.priority);
    this.getEditActivity().setValue(data.activities);
    this.getEditTimeSelect().setValue(data.alertTime);
    this.getAlertTimeSelect().setValue(data.eventTime);

    //Adding people
    var people = Ext.create('EventReminder.model.Person', {
        name: data.people,
        contact: data.contact
    });
    Ext.getStore('EventPeople').add(people);
    Ext.getStore('EventPeople').sync();
    this.getEditList().setHeight(this.getEditList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());

     //Setting the value of previous screen
     this.getEditPrev().setValue("Past");


     //Setting the Edit Event Screen to the viewport
     Ext.Viewport.animateActiveItem(editEventScreen, {type: 'slide', direction: 'left'});
},

//Clearing out all the past reminders
onClear: function(){
console.log("Clearing out");
Ext.getStore("Upcoming").removeAll();
Ext.getStore("Upcoming").sync();
}
});