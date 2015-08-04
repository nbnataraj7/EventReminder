Ext.define('EventReminder.view.People', {
    extend: 'Ext.Panel',
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
        items: [
            {
                xtype: 'titlebar',
                title: 'Add People',
                docked: 'top',
                items: [
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    text: 'close',
                    itemId: 'close'
                }]
            },
            {
                xtype: 'list',
                flex: 1,
                itemTpl: document.getElementById('people-list').innerHTML,
                data: [
                    {name: 'Nataraj', contact: '9943051988'},
                    {name: 'Raju', contact: '8143621415'}
                ]
            },
            {
                xtype: 'button',
                docked: 'bottom',
                text: 'Add',
                ui: 'confirm'
            }
        ],
        listeners: [
            {
                delegate: '#close',
                event: 'tap',
                fn: 'closePopup'
            }
        ]
    },
    closePopup: function(){
        this.hide();
    }
});