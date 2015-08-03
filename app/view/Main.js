Ext.define('EventReminder.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'button',
                itemId: 'upcoming',
                text: 'Upcoming Reminders',
                layout:{
                    pack: 'center'
                },
                ui: 'action',
                cls: 'launch-button'
            },
            {
                xtype: 'button',
                itemId: 'past',
                text: 'Past Reminders',
                    layout:{
                    pack: 'center'
                    },
             ui: 'action',
             cls: 'launch-button'
            },
            {
                xtype: 'button',
                itemId: 'new',
                text: 'Create New Reminder',
                  layout:{
                        pack: 'center'
                       },
                 ui: 'action',
                 cls: 'launch-button'
            },
            {
                xtype: 'togglefield',
                label: 'DND MODE',
                name: 'DND',
                itemId: 'dndmode',
                labelWidth: '50%'
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
        },
        {
            delegate: '#past',
            event:'tap',
            fn: 'past'
        }
        ]
    },
    initialize: function(){
        this.callParent();
        this.fireEvent('initMainCommand', this);
        console.log("Main Initialized");
    },
    upcoming: function(){
        console.log("Upcoming Events Command fired");
        this.fireEvent('upComingCommand', this);
    },
    newEvent: function(){
        console.log("New Events");
        this.fireEvent('newEventCommand', this);
    },
    past: function(){
          console.log("Past Events");
          this.fireEvent('pastCommand', this);
    }
});