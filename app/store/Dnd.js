Ext.define('EventReminder.store.Dnd', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.LocalStorage',
    config: {
        fields: ['status'],
        storeId: 'DND',
        proxy : {
             type: 'localstorage',
             id: 'dndmode'
        }
    }
});