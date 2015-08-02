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
text: 'Back'
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
]
}
});