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
        //Create the Upcoming Event Store
        //and Sync it
        var upcomingEvents = Ext.create("EventReminder.store.Upcoming");
        upcomingEvents.add(event);
        upcomingEvents.sync();
        this.getUpcomingEventList().refresh();
    },

    //Function to Update the records in the database
    updateUpcomingTable:function(event, updateRecordId){
        var upcomingEvents = Ext.create("EventReminder.store.Upcoming");
        var dbobject = Ext.getStore("Upcoming").getProxy().getDatabaseObject();
        dbobject.transaction(function(tx){
            tx.executeSql('UPDATE NewEvents SET category='+event.category+' ');
        });
    }
});