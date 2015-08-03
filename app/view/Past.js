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
    itemTpl: document.getElementById('events').innerHTML,
    store : 'Past',
    onItemDisclosure: true
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