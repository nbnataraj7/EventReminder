Ext.define('EventReminder.model.Recurrence', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'RecurrenceId', type: 'int'},
            {name: 'Type', type: 'string'},
            {name: 'Interval', type: 'int'},
            {name: 'Count', type: 'int'},
        ],
        validations: [
            {type: 'presence', field: 'RecurrenceId'},
            {type: 'presence', field: 'Type'}
        ]
    }
});