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
itemTpl: document.getElementById('events').innerHTML,
    data: [
    {
        category: 'Birthday',
        date: '15-08-2015',
        time: '5:00 AM',
        people: ['Dracula', 'Arthur', 'Blob'],
        message: 'Bleh Bleh Bleh',
        priority: 'Medium',
        activities: ['Call', 'Text']
    },
    {
        category: 'Meeting',
        date: '05-08-2015',
        time: '03:00 PM',
        people: ['Arthur'],
        message: "Prepare Presentation",
        priority: 'High',
        activities: ['Call']
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
this.fireEvent("backCommand", this);
}
});