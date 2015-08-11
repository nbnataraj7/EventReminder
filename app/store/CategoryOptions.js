Ext.define('EventReminder.store.CategoryOptions', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.proxy.SQL',
    model: 'EventReminder.model.CategoryOptions',
    config: {
        storeId: 'CategoryOptions',
        autoLoad: true,
        proxy : {
            type: 'sql',
            database: 'EventReminder',
            table: 'CategoryOptions'
        },
        data: [
            {text: 'Birthday', value: 'Birthday'},
            {text: 'Meeting', value: 'Meeting'},
            {text: 'Shopping', value: 'Shopping'},
            {text: 'Call', value: 'Call'},
            {text: 'Email', value: 'Email'},
            {text: 'Send Card', value: 'Send Card'}
        ]
    }
});