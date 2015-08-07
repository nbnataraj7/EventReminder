Ext.define('EventReminder.store.AdhocPeople', {
    extend: 'Ext.data.Store',
    model: 'EventReminder.model.Person',
    require: 'Ext.data.proxy.LocalStorage',
    autoLoad: true,
    config: {
        proxy: {
            type: 'localstorage',
            id: 'adhocpeople'
        },
        storeId: 'EventPeople',
        fields: ["name", "contact"]
    }
});