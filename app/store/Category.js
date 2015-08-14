Ext.define('EventReminder.store.Category', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    config: {
        autoLoad: true,
        clearOnPageLoad: false,
        model :'EventReminder.model.Category',
        storeId: 'Category',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'Category'
        }
    }
});