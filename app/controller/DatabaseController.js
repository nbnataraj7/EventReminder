Ext.define('EventReminder.controller.DatabaseController', {
    extend: 'Ext.app.Controller',
    requires: ['EventReminder.utils.Dbutils', 'Ext.data.proxy.SQL'],
    config: {
        refs: {
           upcomingEventList: 'upcoming #upcomingEventList'
        }
    },
    //On launch of this controller the database and tables should be created if they are not present
    launch: function(){
        //Getting the NewEvent controller reference
        var newEvent = EventReminder.app.getController('NewEvent');
        newEvent.on({
            insertEventCommand: this.onInsertEvent.bind(this)
        });

    },
    //Function to insert the Event into the Table
    onInsertEvent:function(event){
        //get the Upcoming event store
        //and Sync it
        console.log(event);
        var upcomingEvents = Ext.getStore("Upcoming");
        upcomingEvents.add(event);
        upcomingEvents.sync();
    }
});