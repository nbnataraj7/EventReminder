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
    docked: 'top',
    title: 'Past Events'
},
{
    xtype: 'toolbar',
    itemId: 'title',
    items: [
    {
        xtype: 'button',
        itemId: 'back',
        ui:'back',
        iconCls: 'arrow_left'
    },
    {
            xtype: 'searchfield',
            placeHolder: 'Search by People',
            itemId: 'search'
    },
    {
        xtype: 'button',
        itemId: 'clear',
        text: 'Clear',
        ui: 'confirm'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    autoDestroy: false,
    itemId: 'pastEventList',
    itemTpl: document.getElementById('events').innerHTML,
    onItemDisclosure: true,
    store: 'Upcoming',
    cls: 'past-event-list',
    scrollable: true,
    grouper: {
        sortProperty: 'date',
        direction: 'DESC',
        groupFn: function(record){
            if(record && record.data.date){
                return (new Date(record.data.date)).toDateString();
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
},
{
    delegate: '#clear',
    event: 'tap',
    fn: 'clearCommand'
},
{
    delegate: '#search',
    event: 'keyup',
    fn: 'search'
}
]
},

//Fire a Back Command
back:function(){
    this.fireEvent("backCommand", this);
},

//Fire an Edit Event Command
editEvent:function(list, record, target, index, e, eOpts){
    this.fireEvent("editEventCommand", record,  this);
},

//Fire a clear command
clearCommand: function(){
    this.fireEvent('clearCommand', this);
},

//Search the list with the person
search: function( scope, e, eOpts){
    this.fireEvent("searchByPersonCommand", scope.getValue(), this);
}
});