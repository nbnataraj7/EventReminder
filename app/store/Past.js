Ext.define('EventReminder.store.Past', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL'],
    config: {
        autoLoad: true,
        storeId: 'Past',
        proxy: {
            model: 'EventReminder.model.Event',
            type: 'sql',
            database: 'Reminder',
            table: 'PastEvents'
        },
        sorters: [{property: 'date', direction: 'ASC'}]
    }
});