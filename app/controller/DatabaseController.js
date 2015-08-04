Ext.define('EventReminder.controller.DatabaseController', {
    extend: 'Ext.app.Controller',
    requires: 'EventReminder.utils.Dbutils',
    config: {
        refs: {
            neweventctr: 'neweventctr'
        },
        control: {
            neweventctr: {
                insertEventCommand: 'onInsertEvent'
            }
        }
    },
    launch: function(){
        //console.log("Database Controller Launched!");
        var dbutils = Ext.create('EventReminder.utils.Dbutils');
        dbutils.createTables();
        console.log("Tables Created");
        //dbutils.insertEvent(1, 2, 3, 4, 5, 6, 7, 8, 9);
    },
    onInsertEvent:function(event){
        console.log("Inserting the Event");
    }
});