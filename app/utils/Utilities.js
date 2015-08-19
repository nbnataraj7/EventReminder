Ext.define('EventReminder.utils.Utilities', {

//Enumerates the Options of a selectfield with a limited numbers
enumerateOptions: function(limit){
    var optionItems = new Array();
    for(var i=1; i<=limit; i++){
        var optionItem = {
            text: i,
            value: i
        };
        optionItems.push(optionItem);
    }
    return optionItems;
},
createTimePicker: function(){
    var picker = Ext.create('Ext.Picker', {
        slots: [
         {
            name: 'Hours',
            title: 'Hours',
            data: this.enumerateOptions(12)
         },
         {
            name:'Minutes',
            title: 'Minutes',
            data: this.enumerateOptions(59)
         },
         {
            name: 'AMPM',
            title: 'AM/PM',
            data: [
                {text: 'AM', value: 'AM'},
                {text: 'PM', value: 'PM'}
            ]
         }
         ]
    });
    return picker;
},

//Can Filter event store given a string of people
filterEventsByPeople: function(person){
    //Get the store
    var store = Ext.getStore('Upcoming');
    console.log("Filtering");
    //Filter the event store by the people
    store.filterBy(function(record, id){
        var regex = new RegExp(person);
        //console.log(regex, person);
        return regex.test(record.get('people'));
    });

    //Load the store
    store.load();
},


//Can Filter event store given an Event Category
filterEventsByCategory: function(eventName){
    //Get the store
    var store = Ext.getStore('Upcoming');
    //Filter the event store by the people
    store.filterBy(function(record, id){
        var regex = new RegExp(eventName, "i");
        return regex.test(record.get('category')+record.get('people')+record.get('message')+record.get('alertTime')+record.get('eventTime')+record.get('priority')+record.get('date'));
    });


    //Load the store
    store.load();
},

//Filter the people in the people popup
filterPeople: function(person){
    //Get the store
    var peopleStore = Ext.getStore("Person");
    peopleStore.clearFilter();
    peopleStore.filterBy(function(record, id){
        var regex = new RegExp(person);
        return regex.test(record.get('name'));
    });

    //Load the store
    peopleStore.load();
},

//Filter the people in the people popup by contact number
filterContact: function(contact){
    //Get the Store
    var peopleStore = Ext.getStore("Person");
    peopleStore.clearFilter();
    peopleStore.filterBy(function(record, id){
        var regex = new RegExp(contact);
        return regex.test(record.get('contact'));
    });

    //Load the store
    peopleStore.load();

},

//Filter the Past events in the Upcoming event listview
filterUpcomingEvents: function(){
 //getting the handle of store
       var store = Ext.getStore("Upcoming");

       //First clear any previously applied filters
       store.clearFilter();

       //Add A new Past Filter
       store.filterBy(function(record, id){
            var recordDate = new Date(record.getData().date);
            var now = new Date();
            return (now > recordDate);
       }, this);

        //Reloading the Store
        store.load();
},


//Filter the Upcoming events in the Past event listview
filterPastEvents: function(){

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
       store.load();

}

});