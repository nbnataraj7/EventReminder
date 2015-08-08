Ext.define('EventReminder.controller.DateFilter', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main'
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
       console.log("Filtering out all the Upcoming events");
       var store = Ext.getStore("Upcoming");

       //First clear any previously applied filters
       store.clearFilter();

       //Add A new Past Filter
       store.filterBy(function(record, id){
            console.log("Record : ");
            console.log(record);
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            return (now > recordDate);
       }, this);

        //Reloading the Store
        console.log("Reloading the Store");
        store.load();
    },

    //This function filters out all the Past events from the store
    onUpcoming: function(){
        console.log("Filtering out all the Past events");
        var store = Ext.getStore("Upcoming");

        //First clear any previously applied filters
        store.clearFilter();

           //Add A new Past Filter
       store.filterBy(function(record, id){
            console.log(record);
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            return (now <= recordDate);
       }, this);


       //Reloading the Store
       console.log("Reloading the Store");
       store.load();
    }
});