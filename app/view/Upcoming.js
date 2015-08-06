Ext.define('EventReminder.view.Upcoming', {
extend: 'Ext.Container',
xtype: 'upcoming',
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
    itemId: 'upcomingEventList',
    itemTpl: document.getElementById('events').innerHTML,
    onItemDisclosure: true,
    store: 'Upcoming',
    cls: 'event-list',
    grouper: {
        groupFn: function(record){
            return record.get('category');
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
    delegate: '#upcomingEventList',
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