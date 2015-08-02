Ext.define('EventReminder.view.Upcoming', {
extend: 'Ext.Container',
xtype: 'upcoming',
config: {
items: [
{
xtype: 'titlebar',
title: 'Upcoming Reminders',
items: [
{
xtype: 'button',
text: 'Back',
itemId: 'back'
}
]
},
{
xtype: 'list',
itemTpl: '<div>{event}</div>',
    data: [
    {event: 'Birthday'},
    {event: 'Meeting'},
    {event: 'Call'},
    {event: 'Mail'},
    ]
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
console.log("Back");
this.fireEvent("backCommand", this);
}
});