Ext.define('EventReminder.view.Past', {
extend: 'Ext.Container',
xtype: 'past',
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
text: 'Back',
itemId: 'back'
}
]
},
{
xtype: 'list',
flex: 1,
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