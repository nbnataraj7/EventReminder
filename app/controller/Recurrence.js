Ext.define('EventReminder.controller.Recurrence', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            recurrence: 'recurrence',
            recurrenceType: 'recurrence #selectType',
            recurrenceInterval: 'recurrence #recurrenceInterval',
            recurrenceCount: 'recurrence #count'
        },
        control: {
            recurrence: {
                cancelCommand: 'onCancel',
                addCommand: 'onAdd'
            }
        }
    },

    //Cancelation of popup
    onCancel:function(){
        this.getRecurrence().hide();
    },

    //Adding the recurrence to the Event
    onAdd:function(){
        this.getRecurrence().hide();

    }
});