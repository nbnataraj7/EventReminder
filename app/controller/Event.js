Ext.define('EventReminder.controller.Event', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            event: 'event'
        },
        control: {
            event: {
                snoozeCommand: 'onSnooze',
                dismissCommand: 'onDismiss'
            }
        }
    },
    onSnooze: function(){
        this.getEvent().hide();
    },
    onDismiss: function(){
        this.getEvent().hide();
    }
});