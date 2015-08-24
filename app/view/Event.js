Ext.define('EventReminder.view.Event', {
    extend: 'Ext.Panel',
    xtype: 'event',
    requires: 'Ext.TitleBar',
    config: {
        height: '70%',
        width: '90%',
        layout: {
            type: 'vbox'
        },
        floating: true,
        centered: true,
        modal: true,
        styleHtmlContent: true,
        hidden: true,
        scrollable: true,
        defaults: {
            xtype: 'panel'
        },
        items: [
            {
                xtype: 'hiddenfield',
                itemId: 'ID'
            },
            {
                xtype: 'titlebar',
                itemId: 'date',
                docked: 'top'
            },
            {
                itemId: 'EventCategory',
                //html: 'Category',
                cls: 'category'
            },
            {
                itemId: 'EventTime',
                //html: 'Time',
                cls: 'eventTime'
            },
            {
                itemId: 'AlertTime',
                //html: 'Time',
                cls: 'eventTime'
            },
            {
                itemId: 'People',
                //html: 'Category',
                cls: 'people'
            },
            {
                itemId: 'EventMessage',
                //html: 'Category',
                cls: 'message'
            },
            {
                itemId: 'EventPriority',
                //html: 'Priority',
                cls: 'priority'
            },
            {
                itemId: 'Activity',
                //html: 'Activity',
                cls: 'activity'
            },
            {
                itemId: 'Recurrence',
                cls: 'recurrence'
            },
            {
                itemId: 'Snooze',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Snooze',
                        itemId: 'snoozeTime',
                        options: [
                            {text: 'Immediate', value: '10 Minutes'},
                            {text: 'Next Hour', value: '1 hour'},
                            {text: 'Next Day', value: '1 Day'}
                        ]
                    }]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Snooze',
                    ui: 'confirm',
                    itemId: 'snooze'
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    text: 'Dismiss',
                    ui: 'decline',
                    itemId: 'dismiss'
                }]
            }
        ],
        listeners: [
            {
                delegate: '#snooze',
                event: 'tap',
                fn: 'snooze'
            },
            {
                delegate: '#dismiss',
                event: 'tap',
                fn: 'dismiss'
            }
        ]
    },
    snooze: function(){
        this.fireEvent('snoozeCommand', this);
    },
    dismiss: function(){
        this.fireEvent('dismissCommand', this);
    }
});