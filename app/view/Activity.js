Ext.define('EventReminder.view.Activity', {
    extend: 'Ext.Panel',
    config: {
        floating: true,
        height: '70%',
        width: '60%',
        layout: {
            type: 'vbox'
        },
        centered: true,
        modal: true,
        styleHtmlContent: true,
        items: [
            {
                xtype: 'titlebar',
                title: 'Add Activity',
                docked: true
            },
            {
                xtype: 'button',
                text: 'Add Activity',
                ui: 'confirm',
                itemId: 'addActivity'
            }
        ]
    }
});