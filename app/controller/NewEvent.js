Ext.define('EventReminder.controller.NewEvent', {
extend: 'Ext.app.Controller',
xtype: 'neweventctr',
requires: ['Ext.LoadMask', 'Ext.MessageBox', 'EventReminder.view.People', 'EventReminder.view.Event', 'EventReminder.view.Recurrence', 'EventReminder.view.Activity'],
config: {
refs: {
    newevent : 'newEvent',
    main: 'main',
    people: 'people',
    peopleList: 'people #PeopleList',
    activity: 'activity',
    activityList: 'activity #ActivityList',
    newEventId: 'newEvent #ID',
    newEventCategory: 'newEvent #selectCategory',
    newEventPeopleList: 'newEvent #peopleList',
    peopleName: 'people #personName',
    peopleContact: 'people #personContact',
    newEventSelectDate: 'newEvent #selectDate',
    newEventTimeSelect: 'newEvent #eventTimeSelect',
    newAlertTimeSelect: 'newEvent #alertTimeSelect',
    newEventMessage: 'newEvent #message',
    newEventPriority: 'newEvent #priority',
    newEventActivity: 'newEvent #activity',
    newEventHidden: 'newEvent #hiddenField',
    recurrence: 'recurrence',
    newEventRecurrence: 'newEvent #recurrence',
    event:'event',
    maindnd: 'main #dndmode'
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

    //Clearing the text in search field
    this.getPeopleName().setValue("");
    this.getPeopleContact().setValue("");
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
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var time = this.getNewAlertTimeSelect().getValue();
var ampm = time.split(" ")[1];
var minutes = parseInt((time.split(" ")[0]).split(":")[1]);
var hours;
if(ampm == "PM")
{
    if(parseInt((time.split(" ")[0]).split(":")[0]) != 12)
        hours = (parseInt((time.split(" ")[0]).split(":")[0])+12)%24;
    else
        hours = 12;
}
else{
    if(parseInt((time.split(" ")[0]).split(":")[0]) != 12)
        hours = parseInt((time.split(" ")[0]).split(":")[0])%24;
    else
        hours = 0;
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
    EventID: this.getNewEventId().getValue(),
    category: this.getNewEventCategory().getValue(),
    date: newDate,
    eventTime: this.getNewEventTimeSelect().getValue(),
    alertTime: this.getNewAlertTimeSelect().getValue(),
    message: this.getNewEventMessage().getValue(),
    priority: (this.getNewEventPriority().getLabel() == 'Priority')?'Medium':(this.getNewEventPriority().getLabel()),
    activities: activities,
    people: people
});


//Checking The presence of People if Activities are involved
if(Ext.getStore("Activity").getCount() != 0 && Ext.getStore("EventPeople").getCount() == 0)
{
    Ext.Msg.alert("Insufficient Inputs");
    return;
}
if(Ext.getStore("Activity").getCount() == 0 && Ext.getStore("EventPeople").getCount() != 0){
    Ext.Msg.alert("Insufficient Inputs");
    return;
}

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
    //Replenish the ID
    this.getNewEventId().setValue((new Date()).getTime());

    //Alert message
    Ext.Msg.alert("Event Saved");

    //Set the Notification alert for this reminder
    //First create a settings config for the event reminder

    //Set the phone LED lights for different priorities
    var led;
    if(event.get('priority') == "High")
        led = "FF0000";
    else if(event.get('priority') == "Medium")
        led = "00FF00";
    else
        led = "0000FF";

    //Create a Reminder notification
    cordova.plugins.notification.local.schedule({
        id: event.get('EventID'),
        title: event.get('category'),
        text: event.get('message'),
        at: newDate,
        led: led,
        badge: 1
    });



    //Attach a trigger handler
    cordova.plugins.notification.local.on("trigger", function(notification) {
         //Synthesize the speech stating the event details
          TTS.speak("You have a "+event.get('category')+" ahead and the message is : "+event.get('message'), function(){console.log("Truth was spoken!")}, function(){console.log("Why you no speak?")});
          console.log("Speak");

        //Carry out the activities listed in the activities variable
            //Check for call, email or text activity
            var call = new RegExp("Call");
            var text = new RegExp("Text");
            var email = new RegExp("Email");
            if(call.test(activities))
            {
                //Call the People involved in the event
                //Get all the people and their phone numbers
                var personStore = Ext.create("Person");
                var eventPeople = people.split(", ");
                eventPeople = eventPeople.substring(0, eventPeople.length-2);
                for(var i=0; i<eventPeople.length; i++){
                    var index = personStore.findExact("name", eventPeople[i]);
                    var record = personStore.getAt(index);
                    var phoneNumber = record.get('contact');
                    window.plugins.CallNumber.callNumber(function(){console.log("Calling Successfully")}, function(){console.log("Error in calling the phone number")}, phoneNumber);
                }
            }
            else if(text.test(activities)){
                //Send a text to the people involved in the event
                var personStore = Ext.create("Person");
                var eventPeople = people.split(", ");
                eventPeople = eventPeople.substring(0, eventPeople.length-2);
                for(var i=0; i<eventPeople.length; i++){
                    var index = personStore.findExact("name", eventPeople[i]);
                    var record = personStore.getAt(index);
                    var phoneNumber = record.get('contact');
                    //configuration for sms
                    var options = {
                                replaceLineBreaks: false,
                                android: {
                                    intent: '' // App sends an sms without Opening the Native Text messaging app
                                }
                    };
                     sms.send(phoneNumber, event.message, options, function(){console.log("Message Sent");}, function(){console.log("Message not Sent");});
                }
            }
            else if(email.test(activities)){
                //Send an email to all the people involved in the event
                var personStore = Ext.create("Person");
                var eventPeople = people.split(", ");
                eventPeople = eventPeople.substring(0, eventPeople.length-2);
                for(var i=0; i<eventPeople.length; i++){
                    var index = personStore.findExact("name", eventPeople[i]);
                    var record = personStore.getAt(index);
                    var emailId = record.get('contact');

                  //Send an email to this person
                  cordova.plugins.email.open({
                      to:          emailId, // email addresses for TO field
                      subject:    event.get('category'), // subject of the email
                      body:       event.get('message'), // email body (for HTML, set isHtml to true)
                  }, function(){console.log("Email sent successfully");}, this);
                }
            }


     //Open up the Event
     cordova.plugins.notification.local.on("click", function (notification, state) {
        //Display Event Details
            console.log("Notification clicked");
            this.getEventID().setValue(event.get('EventID'));
            this.getEventCategory().setHtml(event.get('category'));
            this.getEventTime().setHtml("Event Starts at: "+event.get('eventTime'));
            this.getAlertTime().setHtml("Alert is set at: "+event.get('alertTime'));
            this.getEventMessage().setHtml("Message: "+event.get('message'));
            this.getEventPriority().setHtml(event.get('priority')+" Priority");
            this.getActivity().setHtml("Follow up with "+event.get('activities'));
            this.getEventDate().setTitle("Dated : "+(new Date(event.get('date'))).toDateString());

            //Adding the people
            this.getPeople().setHtml("With : "+event.get('people'));


            //Calculating recurrence
            var recurrence = event.get('Recur')=="none"?"Recurrence Not Set":event.get('Recur');
            //console.log(recurrence);
            if(recurrence != 'Recurrence Not Set'){
                var recurrenceStore = Ext.getStore('Recurrence');
                var index = recurrenceStore.findExact('RecurrenceId', parseInt(recurrence));
                //console.log(index);
                var RecurRecord = recurrenceStore.getAt(index);

                var type = RecurRecord.get('Type');
                var interval;
                if(type == 'Daily'){
                    type = "Days"
                }
                else if(type == 'Weekly'){
                    type = "Weeks"
                }
                else{
                    type = "Months"
                }

                recurrence = "Repeat every "+RecurRecord.get('Interval')+" "+type+" "+RecurRecord.get('Count')+" times";
            }

            this.getRecurrence().setHtml(recurrence);

            // Show the event with some animation
            this.getEvent().show({type: 'flip'});

     }, this);


     //Once the Notification fires, open up the popup view
      Ext.Viewport.animateActiveItem(this.getEvent(), {type: 'slide', direction: 'left'});

    });


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
    this.getActivity().setHidden(false);
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