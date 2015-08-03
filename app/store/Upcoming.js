Ext.define('EventReminder.store.Upcoming', {
extend: 'Ext.data.Store',
requires: ['Ext.data.proxy.Sql'],
model: 'EventReminder.model.Event',
storeId: 'Upcoming',
proxy: {
    type: 'sql'
},
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
});