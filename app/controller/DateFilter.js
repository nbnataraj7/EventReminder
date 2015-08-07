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
       store.filterBy(function(record){
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            if(now > recordDate)
                return true;
            else
                return false;
       });
    },

    //This function filters out all the Past events from the store
    onUpcoming: function(){
        console.log("Filtering out all the Past events");
        var store = Ext.getStore("Upcoming");

        //First clear any previously applied filters
        store.clearFilter();

           //Add A new Past Filter
       store.filterBy(function(record){
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            if(now > recordDate)
                return false;
            else
                return true;
           });
    }
})