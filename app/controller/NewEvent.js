Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
xtype: 'neweventctr',
requires: ['Ext.LoadMask', 'Ext.MessageBox'],
config: {
refs: {
    newevent : 'newEvent',
    main: 'main',
    people: 'people',
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
        addEventCommand: 'onAddEvent',
        eventTimeSelectCommand: 'onEventTimeSelect',
        alertTimeSelectCommand: 'onAlertTimeSelect',
        removePersonCommand: 'onRemovePerson'
}
}
},

//Back button handling
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Adding an Event Time
onEventTimeSelect:function(){
    var utils = Ext.create('EventReminder.utils.Utilities');
    var eventTimePicker = utils.createTimePicker();
    Ext.Viewport.add(eventTimePicker);
    eventTimePicker.show();
    var me = this;
    eventTimePicker.addListener('change', function(scope, value, eOpts){
    me.getNewEventTimeSelect().setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
    });
},

//Adding an alert time
onAlertTimeSelect:function(){
    var utils = Ext.create('EventReminder.utils.Utilities');
    var eventTimePicker = utils.createTimePicker();
    Ext.Viewport.add(eventTimePicker);
    eventTimePicker.show();
    var me = this;
    eventTimePicker.addListener('change', function(scope, value, eOpts){
    me.getNewAlertTimeSelect().setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
    });
},

//Function for adding people to the event list
onAddPeople: function(){
    //var peoplePopup = Ext.create('EventReminder.view.People');
    var peoplePopup = this.getPeople();
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

//Adding the contact number to the person
var person;
if(this.getNewEventPeopleList().getData() != null)
    person =  (this.getNewEventPeopleList().getData()[0]).getData().contact;
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
//Some errors are present
    //console.log("one or more Errors");
    Ext.Msg.alert("One or more errors");
}
else{
//No errors

/*
//Adding a loader mask
    var loader = {
        xtype: 'loadmask',
        message: 'Saving Event'
        };
    Ext.Viewport.add(loader);
*/
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

    //Destroying the loader mask
    //loader.destroy();
    Ext.Msg.alert("Event Saved");
}
},
onRemovePerson:function(){
   this.getNewEventPeopleList().removeAll(true, true);
}
});