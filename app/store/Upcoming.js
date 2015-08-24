Ext.define('EventReminder.store.Upcoming', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL'],
    config: {
        autoLoad: true,
        storeId: 'Upcoming',
        model: 'EventReminder.model.Event',
        proxy: {
            type: 'sql',
            database: 'Reminder',
            table: 'NewEvents'
        },
        sorters: [
            {
                property: 'date',
                direction: 'ASC',
                transform: function(o){
                    return new Date(o);
                }
            }
        ],
        grouper: {
            //root: 'data',
            //property: 'date',
            /*
            transform: function(o){
                return new Date(o);
            }
            */

            groupFn: function(record){
                return (new Date(record.get('date')).toDateString());
            }
        },

    }
});