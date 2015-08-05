Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
xtype: 'neweventctr',
requires: 'Ext.LoadMask',
config: {
refs: {
    newevent : 'newEvent',
    main: 'main',
    newEventCategory: 'newEvent #selectCategory',
    newEventPeopleList: 'newEvent #peopleList',
    newEventSelectDate: 'newEvent #selectDate',
    newEventTimeSelect: 'newEvent #eventTimeSelect',
    newAlertTimeSelect: 'newEvent #alertTimeSelect',
    newEventMessage: 'newEvent #message',
    newEventPriority: 'newEvent #priority',
    newEventActivity: 'newEvent #activity'
},
control: {
    newevent: {
    backCommand: 'onBack',
    addPeopleCommand: 'onAddPeople',
    priorityChangeCommand: 'onPriorityChange',
    addEventCommand: 'onAddEvent'
}
}
},
//Back button handling
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},
//Function for adding people to the event list
onAddPeople: function(){
    var peoplePopup = Ext.create('EventReminder.view.People');
    peoplePopup.show();
},
//Function for changing the priority of the event
onPriorityChange:function(newValue){
    //console.log(newValue);
    if(newValue < 35)
        this.getNewEventPriority().setLabel("Low");
    else if(newValue < 75)
        this.getNewEventPriority().setLabel("Medium");
    else
        this.getNewEventPriority().setLabel("High");
},
//Creating a New Event Based on the entered Field Values
//and Validating them
onAddEvent:function(){

/*
console.log("Creating a new event");
console.log("Validating the Event fields");
console.log(this.getNewEventCategory().getValue());
console.log(this.getNewEventPeopleList().getData());
console.log(this.getNewEventSelectDate().getFormattedValue());
console.log(this.getNewEventTimeSelect().getValue());
console.log(this.getNewAlertTimeSelect().getValue());
console.log(this.getNewEventMessage().getValue());
*/

//Adding the contact number to the person
var person =  (this.getNewEventPeopleList().getData()[0]).getData().contact;
console.log(person);

//setting the values to the NewEvent Store
var event = Ext.create('EventReminder.model.Event', {
    category: this.getNewEventCategory().getValue(),
    date: this.getNewEventSelectDate().getFormattedValue(),
    eventTime: this.getNewEventTimeSelect().getValue(),
    alertTime: this.getNewAlertTimeSelect().getValue(),
    message: this.getNewEventMessage().getValue(),
    people: person,
    priority: this.getNewEventPriority().getValue(),
    activities: this.getNewEventActivity().getValue()
});

//Validating against the Event model
var errors = event.validate();

if(!errors.isValid()){
    console.log("one or more Errors");
    //console.log(errors);
}
else{
    console.log("No errors");
    this.fireEvent("insertEventCommand", event,  this);

    //Flush the contents of the new Event form
    this.getNewEventCategory().reset();
    this.getNewEventSelectDate().setValue("");
    this.getNewEventTimeSelect().setValue("");
    this.getNewAlertTimeSelect().setValue("");
    this.getNewEventMessage().setValue("");
    this.getNewEventPeopleList().removeAll(true, true);
    this.getNewEventPriority().setValue("");
    this.getNewEventActivity().setValue("");
}
}
});