Ext.define('EventReminder.store.Category', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    autoLoad: true,
    clearOnPageLoad: false,
    config: {
        model :'EventReminder.model.Category',
        storeId: 'Category',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'Category'
        }
    }
});