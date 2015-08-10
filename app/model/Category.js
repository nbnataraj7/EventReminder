Ext.define('EventReminder.model.Category', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'Category', type: 'string'},
            {name: 'Priority', type: 'string'},
            {name: 'Activity', type: 'string'}
        ],
        validations: [
            {type: 'presence', field: 'Category'}
        ]
    }
});