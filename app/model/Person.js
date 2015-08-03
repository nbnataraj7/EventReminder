Ext.define('EventReminder.model.Person', {
extend: 'Ext.data.Model',
config: {
    fields: [
        {name: 'name', type: 'string'},
        {name: 'contact', type: 'int'}
    ],
    validations: [
        {type: 'presence', field: 'name'}
    ]
}
});