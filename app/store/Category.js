Ext.define('EventReminder.store.Category', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    model :'EventReminder.model.Category',
    autoLoad: true,
    config: {
        storeId: 'Category',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'Category'
        }
    }
});