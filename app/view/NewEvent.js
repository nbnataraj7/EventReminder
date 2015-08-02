Ext.define('EventReminder.view.NewEvent', {
extend: 'Ext.Container',
xtype: 'newEvent',
config: {
layout: {
    type: 'vbox'
},
items: [
{
xtype: 'titlebar',
title: 'Past Reminders',
items: [
{
xtype: 'button',
text: 'Back',
itemId: 'back'
}
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