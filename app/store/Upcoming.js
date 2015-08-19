Ext.define('EventReminder.store.Upcoming', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL'],
    config: {
        autoLoad: true,
        storeId: 'Upcoming',
        model: 'EventReminder.model.Event',
        proxy: {
            type: 'sql',
            database: 'EventReminder',
            table: 'NewEvents'
        },
        sorters: [{property: 'date', direction: 'DESC'}],
        grouper: {
            groupFn: function(record){
                return (new Date(record.get('date')).toDateString());
            }
        }
    }
});