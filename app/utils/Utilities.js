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
}
});