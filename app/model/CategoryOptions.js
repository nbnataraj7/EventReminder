Ext.define('EventReminder.model.CategoryOptions', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'value', type: 'string'}
        ],
        validations: [
            {type: 'exclusion', field: 'text', list: ['Birthday', 'Meeting', 'Shopping', 'Call', 'Email', 'Send Card', 'Outing', 'Groceries', 'Supplies']}
        ]
    }
});