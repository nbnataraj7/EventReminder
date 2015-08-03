Ext.define('EventReminder.view.Upcoming', {
extend: 'Ext.Container',
xtype: 'upcoming',
config: {
layout: {
    type: 'vbox'
},
items: [
{
    xtype: 'titlebar',
    itemId: 'title',
items: [
{
    xtype: 'button',
    itemId: 'back',
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
    store: 'Upcoming'

}
],
listeners: [
{
    delegate: '#back',
    event: 'tap',
    fn: 'back'
}
]
},
back:function(){
this.fireEvent("backCommand", this);
}
});