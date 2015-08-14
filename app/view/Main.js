Ext.define('EventReminder.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: {
            type: 'vbox'
        },
        scrollable: true,
        items: [
            {
                xtype: 'titlebar',
                itemId: 'MainTitle',
                title: 'Event Reminder'
            },
            {
                xtype: 'button',
                itemId: 'upcoming',
                layout:{
                    pack: 'center'
                },
                ui: 'action',
                cls: 'launch-button'
            },
            {
                xtype: 'button',
                itemId: 'past',
                    layout:{
                    pack: 'center'
                    },
             ui: 'action',
             cls: 'launch-button'
            },
            {
                xtype: 'button',
                itemId: 'new',
                  layout:{
                        pack: 'center'
                       },
                 ui: 'action',
                 cls: 'launch-button'
            },
            {
                xtype: 'button',
                itemId: 'addCategory',
                layout: {
                    pack: 'center'
                },
                ui: 'action',
                cls: 'launch-button'
            },
            {
                xtype: 'togglefield',
                name: 'DND',
                itemId: 'dndmode',
                labelWidth: '50%',
                cls: 'dnd'
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
        },
        {
            delegate: '#dndmode',
            event: 'change',
            fn: 'dndswitch'
        },
        {
            delegate: '#addCategory',
            event: 'tap',
            fn: 'addCategory'
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
        this.fireEvent('filterUpcomingCommand', this);
        this.fireEvent('upComingCommand', this);
    },
    newEvent: function(){
        console.log("New Events");
        this.fireEvent('newEventCommand', this);
    },
    past: function(){
      console.log("Past Events");
      this.fireEvent('filterPastCommand', this);
      this.fireEvent('pastCommand', this);
    },
    dndswitch: function(field, newvalue, oldvalue){
        this.fireEvent('dndcommand', newvalue,  this);
    },
    addCategory: function(){
        this.fireEvent("newCategoryCommand", this);
    }
});