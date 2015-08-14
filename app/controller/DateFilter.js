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
//       console.log("Filtering out all the Upcoming events");
       var store = Ext.getStore("Upcoming");

       //First clear any previously applied filters
       store.clearFilter();

       //Add A new Past Filter
       store.filterBy(function(record, id){
            //console.log("Record : ");
            //console.log(record);
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            return (now > recordDate);
       }, this);

        //Reloading the Store
  //      console.log("Reloading the Store");
        store.load();
        //store.sync();
    },

    //This function filters out all the Past events from the store
    onUpcoming: function(){
  //      console.log("Filtering out all the Past events");
        var store = Ext.getStore("Upcoming");

        //First clear any previously applied filters
        store.clearFilter();

           //Add A new Past Filter
       store.filterBy(function(record, id){
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            return (now <= recordDate);
       }, this);


       //Reloading the Store
  //     console.log("Reloading the Store");
       store.load();
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