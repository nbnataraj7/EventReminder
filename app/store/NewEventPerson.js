Ext.define("EventReminder.store.NewEventPerson", {
extend: 'Ext.data.Store',
requires: 'Ext.data.proxy.SQL',
config: {
    model: 'EventReminder.model.Person',
    autoLoad: true,
    storeId: 'Person',
    proxy: {
        type: 'sql',
        database: 'Reminder',
        table: 'People'
    },
    sorters: [{property: 'name', direction: 'ASC'}],
    grouper: {
                sortProperty: "name",
                direction: "DESC",
                groupFn: function(record) {
                    return record.get('name').substr(0, 1);
                }
            }
}
});