Ext.define('EventReminder.store.Recurrence', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    config: {
        model :'EventReminder.model.Recurrence',
        autoLoad: true,
        storeId: 'Recurrence',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'Recurrence'
        }
    }
});