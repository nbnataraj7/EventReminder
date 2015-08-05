Ext.define('EventReminder.store.Upcoming', {
extend: 'Ext.data.Store',
requires: ['Ext.data.proxy.SQL'],
model: 'EventReminder.model.Event',
storeId: 'Upcoming',
proxy: {
    type: 'sql'
}
});