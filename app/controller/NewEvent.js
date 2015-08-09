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
    newEventActivity: 'newEvent #activity',
    newEventHidden: 'newEvent #hiddenField'
},
control: {
    newevent: {
        backCommand: 'onBack',
        priorityChangeCommand: 'onPriorityChange',
        addEventCommand: 'onAddEvent',
        eventTimeSelectCommand: 'onEventTimeSelect',
        alertTimeSelectCommand: 'onAlertTimeSelect',
        removePersonCommand: 'onRemovePerson',
        addPeopleCommand: 'onAddPeople'
}
}
},

//Back button handling
onBack: function(){
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Adding people Popup
onAddPeople:function(){
    var peoplePopup = this.getPeople();
    peoplePopup.show();
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
if(this.getNewEventPeopleList().getData() != null){
    person = new Array();
    person.push((this.getNewEventPeopleList().getData()[0]).getData().name);
    //console.log(this.getNewEventPeopleList().getData());
}

//Setting the default value of the activity
var activity = this.getNewEventActivity().getValue()?this.getNewEventActivity().getValue():"none";

//setting the values to the NewEvent Store
var event = Ext.create('EventReminder.model.Event', {
    EventID: (new Date()).getTime(),
    category: this.getNewEventCategory().getValue(),
    date: this.getNewEventSelectDate().getValue(),
    eventTime: this.getNewEventTimeSelect().getValue(),
    alertTime: this.getNewAlertTimeSelect().getValue(),
    message: this.getNewEventMessage().getValue(),
    people: person,
    priority: this.getNewEventPriority().getLabel(),
    activities: activity
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
    this.getNewEventActivity().setValue("none");

    //Destroying the loader mask
    //loader.destroy();
    Ext.Msg.alert("Event Saved");
}
},
onRemovePerson:function(index){
    console.log("Removing the record");
    console.log(index);
   //this.getNewEventPeopleList().removeAt(index);
   //this.getNewEventPeopleList().refresh();
   Ext.getStore('EventPeople').removeAt(index);
   Ext.getStore('EventPeople').sync();
}
});