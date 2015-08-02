Ext.define('EventReminder.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'titlebar',
                title: 'Event Reminder',
                docked: 'top'
            },
            {
                xtype: 'button',
                text: 'Upoming Reminders',
                itemId: 'upcoming',
                layout:{
                    pack: 'center'
                },
                ui: 'action',
                cls: 'launch-button'
            },
            {
                xtype: 'button',
                text: 'Past Reminders',
                itemId: 'past',
                    layout:{
                    pack: 'center'
                    },
             ui: 'action',
             cls: 'launch-button'
            },
            {
                xtype: 'togglefield',
                name: 'DND',
                label: 'DND MODE',
                labelWidth: '50%'
            },
            {
                xtype: 'button',
                text: 'Create New Reminder',
                itemId: 'new',
                  layout:{
                        pack: 'center'
                       },
                 ui: 'action',
                 cls: 'launch-button'
            }
        ],
        listeners: [
        {
            delegate: '#upcoming',
            event: 'tap',
            fn: 'upcoming'
        },
        {
            delegate: '#new',
            event: 'tap',
            fn: 'newEvent'
        }
        ]
    },
    upcoming: function(){
        console.log("Upcoming Events Command fired");
        this.fireEvent('upComingCommand', this);
    },
    newEvent: function(){
        console.log("New Events");
        this.fireEvent('newEventCommand', this);
    }
});