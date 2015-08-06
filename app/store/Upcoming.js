Ext.define('EventReminder.store.Upcoming', {
extend: 'Ext.data.Store',
requires: ['Ext.data.proxy.SQL'],
model: 'EventReminder.model.Event',
autoLoad: true,
//uniqueIdStrategy: true,
storeId: 'Upcoming',
proxy: {
    type: 'sql',
    database: 'EventReminder',
    table: 'NewEvents'
},
sorters: [{property: 'date', direction: 'ASC'}]
});