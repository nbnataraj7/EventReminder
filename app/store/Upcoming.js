Ext.define('EventReminder.store.Upcoming', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL'],
    autoLoad: true,
    storeId: 'Upcoming',
    model: 'EventReminder.model.Event',
    proxy: {
        type: 'sql',
        database: 'EventReminder',
        table: 'NewEvents'
    },
sorters: [{property: 'date', direction: 'ASC'}]
});