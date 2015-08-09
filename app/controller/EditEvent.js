Ext.define('EventReminder.controller.EditEvent', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'main',
            editEvent: 'editevent',
            editEventCategory: 'editevent #selectCategory',
            editEventDate: 'editevent #selectDate',
            editEventPeopleList: 'editevent #peopleList',
            editEventMessage: 'editevent #message',
            editEventActivities: 'editevent #activity',
            editEventID: 'editevent #hiddenField',
            editTimeSelect: 'editevent #eventTimeSelect',
            alertTimeSelect: 'editevent #alertTimeSelect',
            editEventPriority: 'editevent #priority',
            upcoming: 'upcoming',
            upcomingEventList: 'upcoming #upcomingEventList',
            people: 'people',
            editPrev : 'editevent #prev',
            past: 'past'
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
                removePeopleCommand: 'onRemovePeople'
            }
        }
    },
    onBack: function(){

    //Set the value of Back with the appropriate view
        var back;
        if(this.getEditPrev().getValue() == "Past")
            back = this.getPast();
        else
            back = this.getUpcoming();

    //Clear the adhoc store
        Ext.getStore('EventPeople').removeAll();
        Ext.getStore('EventPeople').sync();

        Ext.Viewport.animateActiveItem(back, {type: 'slide', direction: 'right'});
    },
    onAddPeople: function(){
        var peoplePopup = this.getPeople();
        peoplePopup.show();
    },
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

        //Adding the contact number to the person
        if(Ext.getStore('EventPeople').getData().getAt(0) == null)
            var person = Ext.create('EventReminder.model.Person', {name: 'none', contact: ''});
        else
            var person = Ext.getStore('EventPeople').getData().getAt(0).getData().name;



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
            hours = (parseInt((time.split(" ")[0]).split(":")[0])+12)%24;
        }
        else{
            hours = parseInt((time.split(" ")[0]).split(":")[0]);
        }

        //creating the new date
        var newDate = new Date(year, month, day, hours, minutes);
        console.log(newDate);


        //Validating the current Event Note
        var eventModel = Ext.create('EventReminder.model.Event', {
            EventID: this.getEditEventID().getValue(),
            category: this.getEditEventCategory().getValue(),
            date:  newDate,
            eventTime: this.getEditTimeSelect().getValue(),
            alertTime: this.getAlertTimeSelect().getValue(),
            message: this.getEditEventMessage().getValue(),
            people: person,
            priority: this.getEditEventPriority().getLabel(),
            activities: this.getEditEventActivities().getValue()
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
                category : this.getEditEventCategory().getValue(),
                date : this.getEditEventDate().getValue(),
                eventTime : this.getEditTimeSelect().getValue(),
                alertTime : this.getAlertTimeSelect().getValue(),
                people : person,
                message : this.getEditEventMessage().getValue(),
                priority : this.getEditEventPriority().getLabel(),
                activities : this.getEditEventActivities().getValue(),
                EventID : this.getEditEventID().getValue()
            };
            console.log(event);

            //Passing the Updated Event Object to be updated
            dbutils.updateEvent(event);

            //Event Edited Successfully
             Ext.Msg.alert("Changes Saved");
        }
    },

    //Deleting the Event from Upcoming Events List
    onTrashEvent: function(){

    //Code for Deleting this record
    var dbutils = Ext.create("EventReminder.utils.Dbutils");
    dbutils.deleteRecord(this.getEditEventID().getValue());

    //Refreshing the list
    this.getUpcomingEventList().refresh();

    //Syncing the store
    Ext.getStore("Upcoming").sync();

    //Code for traversing back to the Main View
    Ext.Msg.alert("Event Deleted");
    this.onBack();
    },

    //When the item disclosee of the people list is clicked
    //Person item should be removed
    onRemovePeople: function(index){
        Ext.getStore('EventPeople').removeAt(index);
        Ext.getStore('EventPeople').sync();
    }

});