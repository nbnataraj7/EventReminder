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
        itemId: 'back'
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
    /*
    data: [
    {
        id: '3245345',
        category: 'Call',
        date: '21/21/21',
        eventTime: '1:1 AM',
        alertTime: '1:1 AM',
        people: '8143621415',
        message: 'Hello',
        priority: 'High',
        activities: 'Text'
    }
    ],*/

    cls: 'event-list'
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