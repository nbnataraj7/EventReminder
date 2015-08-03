Ext.define("EventReminder.store.NewEventPerson", {
extend: 'Ext.data.Store',
requires: 'Ext.data.proxy.Sql',
model: 'EventReminder.model.Person',
config: {
    storeId: 'Person',
    proxy: {
        type: 'sql'
    }
}
});