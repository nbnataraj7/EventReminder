Ext.define('EventReminder.store.Past', {
extend: 'Ext.data.Store',
requires: ['Ext.data.proxy.Sql'],
model: 'EventReminder.model.Event',
storeId: 'Past',
proxy: {
    type: 'sql'
},
data: [
    {
        category: 'Call',
        date: '15-08-2015',
        time: '5:00 AM',
        people: 'Blob',
        message: 'Bleh Bleh Bleh',
        priority: 'Medium',
        activities: 'Call'
    },
    {
        category: 'Meeting',
        date: '05-08-2015',
        time: '03:00 PM',
        people: ['Arthur'],
        message: "Prepare Presentation",
        priority: 'High',
        activities: 'Call'
    }
    ]
});