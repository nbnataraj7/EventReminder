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
}

});