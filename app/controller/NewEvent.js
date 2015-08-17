Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
xtype: 'neweventctr',
requires: ['Ext.LoadMask', 'Ext.MessageBox'],
config: {
refs: {
    newevent : 'newEvent',
    main: 'main',
    people: 'people',
    activity: 'activity',
    activityList: 'activity #ActivityList',
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
        recurrenceCommand: 'onRecurrence',
        setDefaultsCommand: 'onDefaults',
        addActivityCommand: 'onAddActivity',
        removeActivityCommand: 'onRemoveActivity'
}
}
},

//Back button handling
onBack: function(){

    //Remove adhoc people
    Ext.getStore('EventPeople').removeAll(true);
    Ext.getStore('EventPeople').sync();
    this.getNewEventPeopleList().refresh();

    //Remove adhoc activities
    Ext.getStore('Activity').removeAll(true);
    Ext.getStore('Activity').sync();
    this.getActivityList().refresh();

    //Set the Viewport to Main
    Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
},

//Adding people Popup
onAddPeople:function(){
    //Uncomment the following lines for showing a people popup

    var peoplePopup = this.getPeople();
    //Add animation afterwards
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


//Setting the default value of the activity
var activities = "none";
var activityStore = Ext.getStore('Activity');
if(activityStore.getCount() != 0){
    activities = "";
    activityStore.each(function(item, index, length){
         activities += item.get('text')+", ";
    });

    //Trimming out the ending punctuation
    activities = activities.substring(0, activities.length-2);

}

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

//check for date
var now = new Date();
if(newDate < now){
    Ext.Msg.alert("Cannot create Event for past date");
    return;
}



//Adding People To the Event
if(Ext.getStore('EventPeople').getData().getAt(0) == null){
    //Creating a Dummy
    var people = 'none'
    }
else{
    var personStore = Ext.getStore('EventPeople');
    var people = "";
    personStore.each(function(item, index, length){
        people += item.get('name')+", ";
    });

    //Trimming out the ending punctuation
    people = people.substring(0, people.length-2);
}

//setting the values to the NewEvent Store
var event = Ext.create('EventReminder.model.Event', {
    Recur: this.getNewEventRecurrence().getValue(),
    EventID: (new Date()).getTime(),
    category: this.getNewEventCategory().getValue(),
    date: newDate,
    eventTime: this.getNewEventTimeSelect().getValue(),
    alertTime: this.getNewAlertTimeSelect().getValue(),
    message: this.getNewEventMessage().getValue(),
    priority: (this.getNewEventPriority().getLabel() == 'Priority')?'Medium':(this.getNewEventPriority().getLabel()),
    activities: activities,
    people: people
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
    this.getNewEventSelectDate().setValue(new Date());
    this.getNewEventTimeSelect().setValue("");
    this.getNewAlertTimeSelect().setValue("");
    this.getNewEventMessage().setValue("");
    //this.getNewEventPeopleList().removeAll();
    this.getNewEventPriority().setValue("");
    //this.getNewEventActivity().setValue("none");
    this.getNewEventRecurrence().setValue("none");

    //Destroying the loader mask
    //loader.destroy();
    Ext.Msg.alert("Event Saved");
}
},

//Function for removing person from the list
onRemovePerson:function(index){
   Ext.getStore('EventPeople').removeAt(index);
   Ext.getStore('EventPeople').sync();

    //Increase the height of the list to adjust items
    this.getNewEventPeopleList().setHeight(this.getNewEventPeopleList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());
},

//Setting an event as Recurring one
onRecurrence: function(){
    this.getRecurrence().show({type: 'slide', direction: 'left'});
},


//Setting Default Values
onDefaults: function(value){

    //search the category store
    var categoryStore = Ext.getStore('Category');
    var index = categoryStore.findExact('Category', value);
    var record = categoryStore.getAt(index);

    if(record == null)
        return;

    var activities = record.get('Activity');
    var ActivityModel = Ext.create('EventReminder.model.Activity', {
        text: activities,
        value: activities
    });

    Ext.getStore('Activity').removeAll();
    Ext.getStore('Activity').add(ActivityModel);
    Ext.getStore('Activity').sync();

    //Set the defaults
    if(record != null){
        this.getNewEventPriority().setValue(record.get('Priority'));
        if(record.get('Priority') < 35)
            this.getNewEventPriority().setLabel("Low");
        else if(record.get('Priority') < 70)
            this.getNewEventPriority().setLabel("Medium");
        else
            this.getNewEventPriority().setLabel("High");
    }
},

//Adding Multiple activities for an event
onAddActivity: function(){
    this.getActivity().show({type: 'slide', direction: 'left'});
},

//Removing an Activity from the event
onRemoveActivity: function(index){

    console.log("removing the activity");
    var store = Ext.getStore('Activity');
    store.removeAt(index);
    store.sync();
}
});