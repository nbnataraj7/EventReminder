Ext.define('EventReminder.view.Event', {
    extend: 'Ext.Panel',
    xtype: 'event',
    config: {
        height: '70%',
        width: '60%',
        layout: {
            type: 'vbox'
        },
        floating: true,
        centered: true,
        modal: true,
        styleHtmlContent: true,
        hidden: true,
        defaults: {
            xtype: 'panel'
        },
        items: [
            {
                itemId: 'EventCategory',
                html: 'Category'
            },
            {
                itemId: 'EventTime',
                html: 'Time'
            },
            {
                itemId: 'People',
                html: 'Category'
            },
            {
                itemId: 'EventMessage',
                html: 'Category'
            },
            {
                itemId: 'EventPriority',
                html: 'Priority'
            },
            {
                itemId: 'Activity',
                html: 'Activity'
            },
            {
                itemId: 'Snooze',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Snooze',
                        options: [
                            {text: 'Immediate', value: '10'},
                            {text: 'Next Hour', value: 'day'},
                            {text: 'Next Month', value: 'month'}
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
                    ui: 'normal',
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