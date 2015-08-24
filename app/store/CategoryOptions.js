Ext.define('EventReminder.store.CategoryOptions', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    config: {
        storeId: 'CategoryOptions',
        autoLoad: true,
        model: 'EventReminder.model.CategoryOptions',
        proxy : {
            type: 'sql',
            database: 'Reminder',
            table: 'CategoryOptions'
        }
    }
});