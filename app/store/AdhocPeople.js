Ext.define('EventReminder.store.AdhocPeople', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.LocalStorage',
    config: {
        model: 'EventReminder.model.Person',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'adhocpeople'
        },
        storeId: 'EventPeople',
        fields: ["name", "contact"]
    }
});