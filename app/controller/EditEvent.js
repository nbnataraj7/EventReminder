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
            people: 'people'
        },
        control: {
            editEvent: {
                backCommand: 'onBack',
                eventTimeCommand: 'onEventTime',
                alertTimeCommand: 'onAlertTime',
                priorityChangeCommand: 'onPriorityChange',
                saveChangesCommand: 'saveChanges',
                trashEventCommand: 'onTrashEvent',
                addPeopleCommand: 'onAddPeople'
            }
        }
    },
    onBack: function(){
        //this.getUpcoming().destroy();

        var back = this.getUpcoming();
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

        console.log(this.getEditEventPeopleList());

        //Validating the current Event Note
        var eventModel = Ext.create('EventReminder.model.Event', {
            EventID: this.getEditEventID().getValue(),
            category: this.getEditEventCategory().getValue(),
            date:  this.getEditEventDate().getValue(),
            eventTime: this.getEditTimeSelect().getValue(),
            alertTime: this.getAlertTimeSelect().getValue(),
            message: this.getEditEventMessage().getValue(),
            people: this.getEditEventPeopleList().getData().name,
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
                people : this.getEditEventPeopleList().getData().name,
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

    //Code for traversing back to the previous view
    var back = this.getUpcoming();
    Ext.Viewport.animateActiveItem(back, {type: 'slide', direction: 'right'});
    }
});