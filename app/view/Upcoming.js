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
        ui:'back',
        iconCls: 'arrow_left'
    },
    {
        xtype: 'searchfield',
        placeHolder: 'Search by People',
        itemId: 'search'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    autoDestroy: false,
    itemId: 'upcomingEventList',
    itemTpl: document.getElementById('events').innerHTML,
    onItemDisclosure: true,
    store: 'Upcoming',
    cls: 'event-list',
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
    delegate: '#upcomingEventList',
    event: 'disclose',
    fn: 'editEvent'
},
{
    delegate: '#search',
    event: 'keyup',
    fn: 'search'
}
]
},

//Tapping on Back button
back:function(){
    this.fireEvent("backCommand", this);
},

//Tapping on the disclose of an item
editEvent:function(list, record, target, index, e, eOpts){
    this.fireEvent("editEventCommand", record,  this);
},

//Search the list with the person
search: function( scope, e, eOpts ){
    this.fireEvent("searchByPersonCommand", scope.getValue(), this);
}
});