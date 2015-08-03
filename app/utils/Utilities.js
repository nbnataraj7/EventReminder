Ext.define('EventReminder.utils.Utilities', {

//Enumerates the Options of a selectfield with a limited numbers
enumerateOptions: function(limit, item){
    var optionList = Ext.ComponentQuery.query(item)[0];
    var optionItems = new Array();
    for(var i=1; i<=limit; i++){
        var optionItem = {
            text: i,
            value: i
        };
        optionItems.push(optionItem);
    }
    //console.log(optionList);
    //console.log(optionItems);
    optionList.setOptions(optionItems);

}
});