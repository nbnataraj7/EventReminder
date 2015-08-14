Ext.define('EventReminder.store.Past', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL'],
    autoLoad: true,
    storeId: 'Past',
    proxy: {
        model: 'EventReminder.model.Event',
        type: 'sql',
        database: 'EventReminder',
        table: 'PastEvents'
    },
sorters: [{property: 'date', direction: 'ASC'}]
});