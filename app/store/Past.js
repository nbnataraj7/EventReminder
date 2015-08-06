Ext.define('EventReminder.store.Past', {
extend: 'Ext.data.Store',
requires: ['Ext.data.proxy.SQL'],
model: 'EventReminder.model.Event',
autoLoad: true,
storeId: 'Past',
proxy: {
    type: 'sql',
    database: 'EventReminder',
    table: 'PastEvents'
},
sorters: [{property: 'date', direction: 'ASC'}]
});