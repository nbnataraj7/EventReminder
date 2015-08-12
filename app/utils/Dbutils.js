Ext.define('EventReminder.utils.Dbutils', {

    //Common database Functions for Event Reminder Application
    createDatabase: function(){
        var db = openDatabase('EventReminder', '1.0', 'Database for Events', 2*1024*1024);
        return db;
    },
    createTables: function(){
         var db = openDatabase('EventReminder', '1.0', 'Database for Events', 2*1024*1024);
         db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (id unique, category, date, people, eventTime, alertTime, message, priority, activities)');
         });
    },
    insertEvent: function(id, category, date, people, eventTime, alertTime, message, priority, activities){
        var db = openDatabase('EventReminder', '1.0', 'Database for Events', 2*1024*1024);
         db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (id unique, category, date, people, eventTime, alertTime, message, priority, activities)');
            tx.executeSql('INSERT INTO EVENTS VALUES('+id+','+category+','+date+', '+people+', '+eventTime+', '+alertTime+', '+message+', '+priority+', '+activities+')');
         });
    },

    updateEvent: function(event){
            //Get the store
            var store = Ext.getStore("Upcoming");
            var index = store.findExact('EventID', parseInt(event.EventID));
            var record = store.getAt(index);
            record.set('category', event.category);
            record.set('date', event.date);
            record.set('eventTime', event.eventTime);
            record.set('alertTime', event.alertTime);
            record.set('people', event.people);
            record.set('message', event.message);
            record.set('priority', event.priority);
            record.set('activities', event.activities);
            store.sync();
        },


    deleteRecord: function(eventId){
        var db = openDatabase('EventReminder', '1.0', 'Database for Events', 2*1024*1024);
        db.transaction(function(tx){
                var query = 'DELETE FROM NewEvents WHERE EventID = '+eventId;
                tx.executeSql(query, [], function(tx, result){
                       console.log("Record Deleted");
                       console.log(result);
                });
            });

            //Sync the store
            Ext.getStore("Upcoming").sync();
        }
    });