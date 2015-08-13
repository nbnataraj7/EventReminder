Ext.define('EventReminder.model.Event', {
extend: 'Ext.data.Model',
config: {
    fields: [
        {name: "category", type: 'string'},
        {name: "date", type: 'string'},
        {name: "eventTime", type: 'string'},
        {name: "alertTime", type: 'string'},
        {name: "message", type: 'string'},
        {name: "priority", type: 'string'},
        {name: "activities", type: 'string'},
        {name: "EventID", type: 'int'},
        {name: "Recur", type: 'string'},
        {name: 'people', type: 'string'}
    ],
    validations: [
        {type: 'presence', field: 'category'},
        {type: 'presence', field: 'date'},
        {type: 'presence', field: 'eventTime'},
        {type: 'presence', field: 'alertTime'},
        {type: 'presence', field: 'message'}
    ]
}
});