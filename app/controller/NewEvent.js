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
    newEventHidden: 'newEvent #hiddenField',
    recurrence: 'recurrence',
    newEventRecurrence: 'newEvent #recurrence'
},
control: {
    newevent: {
        backCommand: 'onBack',
        priorityChangeCommand: 'onPriorityChange',
        addEventCommand: 'onAddEvent',
        eventTimeSelectCommand: 'onEventTimeSelect',
        alertTimeSelectCommand: 'onAlertTimeSelect',
        removePersonCommand: 'onRemovePerson',
        addPeopleCommand: 'onAddPeople',
        recurrenceCommand: 'onRecurrence'
}
}
},

//Back button handling
onBack: function(){
    Ext.getStore('EventPeople').removeAll(true);
    Ext.getStore('EventPeople').sync();
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Adding people Popup
onAddPeople:function(){
    var peoplePopup = this.getPeople();
    peoplePopup.show();
},

//Adding an Event Time from a custom time picker
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

//Adding an alert time from a custom time picker
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

//Adding the contact name to the person
if(Ext.getStore('EventPeople').getData().getAt(0) == null){
    var person = 'none';
    }
else
    var person = Ext.getStore('EventPeople').getData().getAt(0).getData().name;

//Setting the default value of the activity
var activity = this.getNewEventActivity().getValue()?this.getNewEventActivity().getValue():"none";

//Calculating the Date and time at which the alert is been created
var date = this.getNewEventSelectDate().getValue();
//adding hours and minute details
var year = parseInt(20+""+date.getYear()%100);
var month = date.getMonth();
var day = date.getDate();
var time = this.getNewAlertTimeSelect().getValue();
var ampm = time.split(" ")[1];
var minutes = parseInt((time.split(" ")[0]).split(":")[1]);
var hours;
if(ampm == "PM")
{
    hours = (parseInt((time.split(" ")[0]).split(":")[0])+12)%24;
}
else{
    hours = parseInt((time.split(" ")[0]).split(":")[0]);
}

//creating the new date
var newDate = new Date(year, month, day, hours, minutes);
console.log(newDate);

//setting the values to the NewEvent Store
var event = Ext.create('EventReminder.model.Event', {
    Recur: this.getNewEventRecurrence().getValue(),
    EventID: (new Date()).getTime(),
    category: this.getNewEventCategory().getValue(),
    date: newDate,
    eventTime: this.getNewEventTimeSelect().getValue(),
    alertTime: this.getNewAlertTimeSelect().getValue(),
    message: this.getNewEventMessage().getValue(),
    people: person,
    priority: (this.getNewEventPriority().getLabel() == 'Priority')?'Medium':(this.getNewEventPriority().getLabel()),
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
    this.getNewEventPeopleList().removeAll();
    this.getNewEventPriority().setValue("");
    this.getNewEventActivity().setValue("none");
    this.getNewEventRecurrence.setValue("none");

    //Destroying the loader mask
    //loader.destroy();
    Ext.Msg.alert("Event Saved");
}
},

//Function for removing person from the list
onRemovePerson:function(index){
    console.log("Removing the record");
    console.log(index);
   Ext.getStore('EventPeople').removeAt(index);
   Ext.getStore('EventPeople').sync();

    //Increase the height of the list to adjust items
    this.getNewEventPeopleList().setHeight(this.getNewEventPeopleList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());
},

//Setting an event as Recurring one
onRecurrence: function(){
    this.getRecurrence().show();
}

});