Ext.define('EventReminder.store.Activity', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.LocalStorage',
    config: {
        autoLoad: true,
        model: 'EventReminder.model.Activity',
        storeId: 'Activity',
        proxy: {
            type: 'localstorage',
            id: 'activity'
        },
        fields: ['text', 'value']
    }
});