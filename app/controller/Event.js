Ext.define('EventReminder.controller.Event', {
    extend: 'Ext.app.Controller',
    requires: 'Ext.MessageBox',
    config: {
        refs: {
            event: 'event',
            eventSnooze: 'event #snoozeTime'
        },
        control: {
            event: {
                snoozeCommand: 'onSnooze',
                dismissCommand: 'onDismiss'
            }
        }
    },
    onSnooze: function(){
        Ext.Msg.alert('Snoozed for '+this.getEventSnooze().getValue());
    },
    onDismiss: function(){
        this.getEvent().hide();
    }
});