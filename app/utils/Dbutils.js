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
    }
});