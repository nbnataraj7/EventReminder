Ext.define('EventReminder.controller.Event', {
    extend: 'Ext.app.Controller',
    requires: 'Ext.MessageBox',
    config: {
        refs: {
            event: 'event',
            eventSnooze: 'event #snoozeTime',
            eventID: 'event #ID'
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

        //Calculate the snoze time
        var snoozeTime = 10*60*1000; //10 Minutes by default

        if(this.getEventSnooze().getValue() == "1 hour")
            snoozeTime = 1*60*60*1000 // 1 hour
        else if(this.getEventSnooze().getValue() == "1 Day")
            snoozeTime = 24*60*60*1000 // 1 day


        //Remove this line
        console.log(snoozeTime);


        //Snooze the event
        cordova.plugins.notification.local.schedule({
               id: this.getEventID().getValue(),
               at: snoozeTime
            });
    },
    onDismiss: function(){
        this.getEvent().hide();
    }
});