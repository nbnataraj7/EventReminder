Ext.define('EventReminder.controller.DatabaseController', {
    extend: 'Ext.app.Controller',
    requires: ['EventReminder.utils.Dbutils', 'Ext.data.proxy.SQL'],

    //On launch of this controller the database and tables should be created if they are not present
    launch: function(){
        //console.log("Database Controller Launched!");
       //var dbutils = Ext.create('EventReminder.utils.Dbutils');
        //dbutils.createTables();
        console.log("Tables Created");
        //dbutils.insertEvent(1, 2, 3, 4, 5, 6, 7, 8, 9);

        //Getting the NewEvent controller reference
        var newEvent = EventReminder.app.getController('NewEvent');
        newEvent.on({
            insertEventCommand: this.onInsertEvent
        });
    },
    //Function to insert the Event into the Table
    onInsertEvent:function(event){

        //console.log("Inserting the Event");
        //console.log(event);
       // var dbutils = Ext.create('EventReminder.utils.Dbutils');

        //Generate a random id
        var id = new Date();
        id = id.getTime();
        //console.log(id);

        //Storing all the event field data into variables
        event = event.getData();
        var category = event.category;
        var date = event.date;
        var alertTime = event.alertTime;
        var eventTime = event.eventTime;
        var message = event.message;
        var priority = event.priority[0];
        var activities = event.activities;

        //People Data
        var people = (event.people[0]).getData().name;


        console.log("these should go inside a table...");
        console.log(id);
        console.log(category);
        console.log(date);
        console.log(alertTime);
        console.log(people);
        console.log(eventTime);
        console.log(message);
        console.log(priority);
        console.log(activities);


        //Create the Upcoming Event Store
        //and Sync it
        var upcomingEvents = Ext.create("EventReminder.store.Upcoming");
        upcomingEvents.add(event);
        upcomingEvents.sync();

        //dbutils.insertEvent(id, category, date, people, alertTime, eventTime, message, priority, activities);
    }
});