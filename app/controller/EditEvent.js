Ext.define('EventReminder.controller.EditEvent', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'main',
            editEvent: 'editevent',
            editTimeSelect: 'editevent #eventTimeSelect',
            alertTimeSelect: 'editevent #alertTimeSelect',
            editEventPriority: 'editevent #priority',
            upcoming: 'upcoming',
            upcomingEventList: 'upcoming #upcomingEventList'
        },
        control: {
            editEvent: {
                backCommand: 'onBack',
                addPeopleCommand: 'onAddPeople',
                eventTimeCommand: 'onEventTime',
                alertTimeCommand: 'onAlertTime',
                priorityChangeCommand: 'onPriorityChange',
                saveChangesCommand: 'saveChanges',
                trashEventCommand: 'onTrashEvent'
            }
        }
    },
    onBack: function(){
        //console.log("Back Command");
        var back = this.getUpcoming();
        Ext.Viewport.animateActiveItem(back, {type: 'slide', direction: 'right'});
    },
    onAddPeople:function(){
        var peoplePopup = Ext.create('EventReminder.view.People');
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
    },

    //Deleting the Event from Upcoming Events List
    onTrashEvent: function(){

    this.getUpComingEventList().getSelectionCount();

    //Deleting this record
    var back = this.getUpcoming();
    Ext.Viewport.animateActiveItem(back, {type: 'slide', direction: 'right'});
    }
});