Ext.define('EventReminder.model.Event', {
extend: 'Ext.data.Model',
config: {
    fields: ["category", "date", "eventTime", "alertTime", "people", "message", "priority", "activities"],
    validations: [
        {type: 'presence', field: 'category'},
        {type: 'presence', field: 'date'},
        {type: 'presence', field: 'people'},
        {type: 'presence', field: 'eventTime'},
        {type: 'presence', field: 'alertTime'},
        {type: 'presence', field: 'message'}
    ]
}
});