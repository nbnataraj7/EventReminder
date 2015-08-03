Ext.define('EventReminder.model.Event', {
extend: 'Ext.data.Model',
config: {
    fields: ["category", "date", "time", "people", "message", "priority", "activities"]
}
});