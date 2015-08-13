Ext.define('EventReminder.store.CategoryOptions', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    model: 'EventReminder.model.CategoryOptions',
    config: {
        storeId: 'CategoryOptions',
        autoLoad: true,
        proxy : {
            type: 'sql',
            database: 'EventReminder',
            table: 'CategoryOptions'
        }
    }
});