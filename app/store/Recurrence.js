Ext.define('EventReminder.store.Recurrence', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    model :'EventReminder.model.Recurrence',
    config: {
        autoLoad: true,
        storeId: 'Recurrence',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'Recurrence'
        }
    }
});