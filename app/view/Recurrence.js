Ext.define('EventReminder.view.Recurrence', {
    extend: 'Ext.Panel',
    xtype: 'recurrence',
    config: {
        height: '50%',
        width: '90%',
         layout: {
             type: 'vbox'
         },
        floating: true,
        centered: true,
        modal: true,
        styleHtmlContent: true,
        hidden: true,
         hideOnMaskTap: true,
        items: [
            {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        ui: 'decline',
                        iconCls: 'delete',
                        itemId: 'cancelButton',
                        width: '20%'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'Add',
                        itemId: 'addButton',
                        width: '20%'
                    }
                ]
            },
            {
                xtype: 'selectfield',
                itemId: 'selectType',
                label: 'Recurrence Type',
                labelWidth: '50%',
                options: [
                    {text: 'Daily', value: 'Daily'},
                    {text: 'Weekly', value: 'Weekly'},
                    {text: 'Monthly', value: 'Monthly'},
                ]
            },
            {
                xtype: 'spinnerfield',
                itemId: 'recurrenceInterval',
                label: 'Interval',
                minValue: 1,
                maxValue: 12,
                stepValue: 1,
                cycle: true
            },
            {
                xtype: 'spinnerfield',
                itemId: 'count',
                label: 'count',
                cycle: true,
                minValue: 1,
                maxValue: 10,
                stepValue: 1,

            }
        ],

        listeners: [
            {
                delegate: '#cancelButton',
                event: 'tap',
                fn: 'cancelRecurrence'
            },
            {
                delegate: '#addButton',
                event: 'tap',
                fn: 'addRecurrence'
            }
        ]
    },

    //Fire a Cancel command
    cancelRecurrence: function(){
        this.fireEvent('cancelCommand', this);
    },

    //Fire an Add Command
    addRecurrence: function(){
        this.fireEvent("addCommand", this);
    }

});