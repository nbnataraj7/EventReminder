Ext.define('EventReminder.controller.DateFilter', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
        },
        control: {
            main: {
               filterPastCommand: 'onPast',
               filterUpcomingCommand: 'onUpcoming'
            }
        }
    },

    //This function filters out all the Upcoming events from the store
    onPast: function(){

    //Create a utils object
    var utils = Ext.create('EventReminder.utils.Utilities');

    //Apply Upcoming Event filter
    utils.filterUpcomingEvents();

    },

    //This function filters out all the Past events from the store
    onUpcoming: function(){

    //Create a utils object
    var utils = Ext.create('EventReminder.utils.Utilities');

    //Apply the Past Filter
    utils.filterPastEvents();

    },

    //Bind the filter commands from various controllers
    launch: function(){
    this.callParent();
//    console.log("Filters Installed");

    var editEvent = EventReminder.app.getController('EditEvent');
        editEvent.on({
            filterPastCommand: this.onUpcoming.bind(this),
            filterUpcomingCommand: this.onPast.bind(this)
        });
    }
});