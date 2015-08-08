Ext.define('EventReminder.view.Past', {
extend: 'Ext.Container',
xtype: 'past',
config: {
layout: {
    type: 'vbox'
},
autoLoad: true,
items: [
{
    xtype: 'titlebar',
    itemId: 'title',
    items: [
    {
        xtype: 'button',
        itemId: 'back',
        ui:'back'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    itemId: 'pastEventList',
    itemTpl: document.getElementById('events').innerHTML,
    onItemDisclosure: true,
    store: 'Upcoming',
    cls: 'past-event-list',
    grouper: {
        sortProperty: 'date',
        direction: 'DESC',
        groupFn: function(record){
            if(record && record.data.date){
                return record.data.date.toDateString();
            }
            else{
                return '';
            }
        }
    }
}
],
listeners: [
{
    delegate: '#back',
    event: 'tap',
    fn: 'back'
},
{
    delegate: '#pastEventList',
    event: 'disclose',
    fn: 'editEvent'
}
]
},

back:function(){
    this.fireEvent("backCommand", this);
},
editEvent:function(list, record, target, index, e, eOpts){
    this.fireEvent("editEventCommand", record,  this);
}
});