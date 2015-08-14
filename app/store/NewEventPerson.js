Ext.define("EventReminder.store.NewEventPerson", {
extend: 'Ext.data.Store',
requires: 'Ext.data.proxy.SQL',
config: {
    model: 'EventReminder.model.Person',
    autoLoad: true,
    storeId: 'Person',
    proxy: {
        type: 'sql',
        database: 'EventReminder',
        table: 'People'
    },
    sorters: [{property: 'name', direction: 'ASC'}]
}
});