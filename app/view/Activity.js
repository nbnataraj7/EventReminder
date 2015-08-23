Ext.define('EventReminder.view.Activity', {
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar'],
    xtype: 'activity',
    config: {
        floating: true,
        height: '50%',
        width: '60%',
        layout: {
            type: 'vbox'
        },
        centered: true,
        modal: true,
        centered: true,
        modal: true,
        styleHtmlContent: true,
        hidden: true,
        styleHtmlContent: true,
        hideOnMaskTap: true,
        isComponent: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Add Activity',
                cls: 'blue-tile'
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        ui: 'decline',
                        itemId: 'close',
                        iconCls: 'delete'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text: 'Add Activity',
                        ui: 'confirm',
                        itemId: 'addActivity'
                    }
                ]
            },
            {
                xtype: 'list',
                itemId: 'ActivityList',
                flex: 1,
                data: [
                        {text: 'Call', value: 'Call'},
                        {text: 'Text', value: 'Text'},
                        {text: 'Email', value: 'Email'}
                ],
                scrollable: null
            }
        ],


        listeners: [
            {
                delegate: '#close',
                event: 'tap',
                fn: 'closeActivity'
            },
            {
                delegate: '#addActivity',
                event: 'tap',
                fn: 'addActivity'
            },

        ]
    },

    //Close this view
    closeActivity: function(){
        this.fireEvent("closeCommand", this);
    },

    //Add the selected activities
    addActivity: function(){
        this.fireEvent("addCommand", this);
    }
});