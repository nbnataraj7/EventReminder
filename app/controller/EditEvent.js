Ext.define('EventReminder.controller.EditEvent', {
    extend: 'Ext.app.Controller',
    xtype: 'editeventctr',
    requires: ['Ext.LoadMask', 'Ext.MessageBox', 'EventReminder.view.People', 'EventReminder.view.Event', 'EventReminder.view.Recurrence', 'EventReminder.view.Activity'],
    config: {
        refs: {
            main: 'main',
            editEvent: 'editevent',
            editEventCategory: 'editevent #selectEditCategory',
            editEventDate: 'editevent #selectDate',
            editEventPeopleList: 'editevent #peopleList',
            editEventMessage: 'editevent #message',
            editEventActivities: 'editevent #activity',
            editEventID: 'editevent #hiddenField',
            editTimeSelect: 'editevent #eventTimeSelect',
            alertTimeSelect: 'editevent #alertTimeSelect',
            editEventPriority: 'editevent #priority',
            editEventRecurrence: 'editevent #recurrence',
            upcoming: 'upcoming',
            upcomingEventList: 'upcoming #upcomingEventList',
            people: 'people',
            editPrev : 'editevent #prev',
            past: 'past',
            recurrence: 'recurrence',
            activity: 'activity',
            activityList: 'activity #ActivityList',
            event: 'event'
        },
        control: {
            editEvent: {
                backCommand: 'onBack',
                eventTimeCommand: 'onEventTime',
                alertTimeCommand: 'onAlertTime',
                priorityChangeCommand: 'onPriorityChange',
                saveChangesCommand: 'saveChanges',
                trashEventCommand: 'onTrashEvent',
                addPeopleCommand: 'onAddPeople',
                removePeopleCommand: 'onRemovePeople',
                editRecurrenceCommand: 'onEditRecurrence',
                editActivityCommand: 'onEditActivity',
                addActivitiesCommand: 'onAddActivities'
            }
        }
    },
    onBack: function(){

    //Set the value of Back with the appropriate view
    //As well as Apply appropriate filters
        var back;
        if(this.getEditPrev().getValue() == "Past"){
            back = this.getPast();
            console.log("Filter Upcoming");
            this.fireEvent("filterUpcomingCommand", this);
         }
        else{
            back = this.getUpcoming();
            console.log("Filter Past");
            this.fireEvent("filterPastCommand", this);
         }

     //Get back to Main
      Ext.Viewport.animateActiveItem(back, {type: 'slide', direction: 'right'});

    //Clear the adhoc store
        Ext.getStore('EventPeople').removeAll();
        Ext.getStore('EventPeople').sync();
        this.getEditEventPeopleList().refresh();


    //Clear the adhoc activities store
        Ext.getStore('Activity').removeAll();
        Ext.getStore('Activity').sync();
        this.getEditEventActivities().refresh();


    },

    //Adding people from a popup
    onAddPeople: function(){
        var peoplePopup = this.getPeople();
        peoplePopup.show({type: 'slide', direction: 'left'});
    },

    //Setting the event time using custom time picker
    onEventTime:function(){
        var utils = Ext.create('EventReminder.utils.Utilities');
        var eventTimePicker = utils.createTimePicker();
        Ext.Viewport.add(eventTimePicker);
        eventTimePicker.show();
        var me = this;
        eventTimePicker.addListener('change', function(scope, value, eOpts){
        //console.log(this.getEditEventTimeSelect());
        me.getEditTimeSelect().setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
        });
    },

    //Setting the alert time using custom time picker
    onAlertTime:function(){
        var utils = Ext.create('EventReminder.utils.Utilities');
        var eventTimePicker = utils.createTimePicker();
        Ext.Viewport.add(eventTimePicker);
        eventTimePicker.show();
        var me = this;
        eventTimePicker.addListener('change', function(scope, value, eOpts){
        //console.log(this.getEditEventTimeSelect());
        me.getAlertTimeSelect().setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
        });
    },

    //Function to Handle priority change
    onPriorityChange: function(newValue){
        if(newValue < 35)
          this.getEditEventPriority().setLabel("Low");
        else if(newValue < 75)
          this.getEditEventPriority().setLabel("Medium");
        else
          this.getEditEventPriority().setLabel("High");
    },

    //Saving the edits in the database table
    saveChanges: function(){

        //Code for Editing the record in the database table
        console.log("Saving the Changes");
        var dbutils = Ext.create('EventReminder.utils.Dbutils');

        //Adding People To the Event
        var people;
        if(Ext.getStore('EventPeople').getData().getAt(0) == null){
            //Creating a Dummy
            people = 'none'
            }
        else{
            var personStore = Ext.getStore('EventPeople');
            people = "";
            personStore.each(function(item, index, length){
                people += item.get('name')+", ";
            });

            //Trimming out the ending punctuation
            people = people.substring(0, people.length-2);
        }

        //Calculating the Date and time at which the alert is been created
        var date = this.getEditEventDate().getValue();
        //adding hours and minute details
        var year = parseInt(20+""+date.getYear()%100);
        var month = date.getMonth();
        var day = date.getDate();
        var time = this.getAlertTimeSelect().getValue();
        var ampm = time.split(" ")[1];
        var minutes = parseInt((time.split(" ")[0]).split(":")[1]);
        var hours;
        if(ampm == "PM")
        {
            if(parseInt((time.split(" ")[0]).split(":")[0]) != 12)
                hours = (parseInt((time.split(" ")[0]).split(":")[0])+12)%24;
            else
                hours = (parseInt((time.split(" ")[0]).split(":")[0])+12);
        }
        else{
            if(parseInt((time.split(" ")[0]).split(":")[0]) != 12)
                hours = parseInt((time.split(" ")[0]).split(":")[0]);
            else
                hours = (parseInt((time.split(" ")[0]).split(":")[0])+12);
        }


        //creating the new date
        var newDate = new Date(year, month, day, hours, minutes);


        //check for date
        var now = new Date();
        if(newDate < now){
            Ext.Msg.alert("Cannot create Past Event");
            return;
        }

        //Calculating the activities string
        var activities = "none";
        var activitiesStore = Ext.getStore('Activity');
        if(activitiesStore.getCount() != 0){
            activities = "";
            activitiesStore.each(function(item, index, length){
                activities += item.get('text')+", ";
            });

        //Trimming out the ending punctuation
        activities = activities.substring(0, activities.length-2);
        }

        //Validating the current Event Note
        var eventModel = Ext.create('EventReminder.model.Event', {
            EventID: this.getEditEventID().getValue(),
            category: this.getEditEventCategory().getValue(),
            date:  newDate,
            eventTime: this.getEditTimeSelect().getValue(),
            alertTime: this.getAlertTimeSelect().getValue(),
            message: this.getEditEventMessage().getValue(),
            people: people,
            priority: this.getEditEventPriority().getLabel(),
            activities: activities
        });
        var errors = eventModel.validate();
        if(!errors.isValid())
        {
            console.log("One or more errors");
            Ext.Msg.alert("One or more errors");
        }
        else{
            //Creating an Updated event Object to pass
            var event = {
                Recur: this.getEditEventRecurrence().getValue(),
                category : this.getEditEventCategory().getValue(),
                date : newDate,
                eventTime : this.getEditTimeSelect().getValue(),
                alertTime : this.getAlertTimeSelect().getValue(),
                people : people,
                message : this.getEditEventMessage().getValue(),
                priority : this.getEditEventPriority().getLabel(),
                activities : activities,
                EventID : this.getEditEventID().getValue()
            };
            console.log(event);

            //Passing the Updated Event Object to be updated
            dbutils.updateEvent(event);


            //Set the Notification Alert for the Event
            //First create a settings config for the event reminder
            //Message to be displayed in the Phone's Notification bar
            var message = "with "+event.people+" \n Message: "+event.message;
            var options = {
                title: event.category,
                message: message,
                seconds: Math.floor(((new Date(event.date)) - (new Date))/1000),
                badge: 1
            }
            //Create a Reminder notification
            window.localNotification.add(
                    event.EventID,
                    options,
                    function(){
                       console.log("Notification set");
                    },
                    function(){
                        console.log("Error in setting Notification");
                    }
            );


             //Attach a Local Notification event handler
             var me = this;
             document.addEventListener("receivedLocalNotification", function(){

            //Once the Notification fires, open up the popup view
            Ext.Viewport.animateActiveItem(this.getEvent(), {type: 'slide', direction: 'left'});

             //Synthesize the speech stating the event details
            TTS.speak(event.get('message'), function(){console.log("Truth was spoken!")}, function(){console.log("Why you no speak?")});
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

             }, false);

             //Set the alarm for this event

             window.wakeuptimer.wakeup(
                function(res){
                    console.log(res.get('type'))
                },
                function(){
                    console.log("Error")
                },

                // a list of alarms to set
                {
                     alarms : [{
                         type : 'onetime',
                         time : { hour : hours, minute : minutes},
                         extra : { message : 'json containing app-specific information to be posted when alarm triggers' },
                         message : 'Alarm has expired!'
                    }]
                }
             );

            //Event Edited Successfully
             Ext.Msg.alert("Changes Saved");
        }

    },

    //Deleting the Event from Upcoming Events List
    onTrashEvent: function(){


    //Move to previous screen
    this.onBack();

    //Code for Deleting this record
    var dbutils = Ext.create("EventReminder.utils.Dbutils");
    dbutils.deleteRecord(parseInt(this.getEditEventID().getValue()));

    //Refreshing the list
    //this.getUpcomingEventList().refresh();

    //Syncing the store
    Ext.getStore("Upcoming").sync();

    //Code for traversing back to the Main View
    Ext.Msg.alert("Event Deleted");

    //Also cancel the reminder created
    window.localNotification.cancel(parseInt(this.getEditEventID().getValue()));

    },

    //When the item disclosee of the people list is clicked
    //Person item should be removed
    onRemovePeople: function(index){
        Ext.getStore('EventPeople').removeAt(index);
        Ext.getStore('EventPeople').sync();

    //Increase the height of the list to adjust items
    this.getEditEventPeopleList().setHeight(this.getEditEventPeopleList().getItemHeight()*Ext.getStore('EventPeople').getData().getCount());
    },

    //Editing the Recurrence of the Event
    onEditRecurrence: function(){
        console.log("Editing recurrence");
        this.getRecurrence().show({type: 'slide', direction: 'left'});

    },


    //Editing the activities
    onEditActivity: function(index){
        console.log('Editing activities');
        var activitiesStore = Ext.getStore('Activity');
        activitiesStore.removeAt(index);
        activitiesStore.sync();
    },

    //Adding more activities
    onAddActivities: function(){
        this.getActivity().show({type: 'slide', direction: 'left'});
    }
});