Ext.define('EventReminder.view.People', {
    extend: 'Ext.Panel',
    xtype: 'people',
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
        items: [
            {
                xtype: 'titlebar',
                title: 'Add People',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'close',
                        ui: 'decline',
                        iconCls: 'delete'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                {
                    xtype: 'searchfield',
                    placeHolder: 'Search by Name',
                    itemId: 'personName'
                }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Contact',
                        itemId: 'personContact'
                    },
                ]
            },
            {
                xtype: 'list',
                flex: 1,
                itemTpl: document.getElementById('people-list').innerHTML,
                autoDestroy: false,
                itemId: 'PeopleList',
                store: 'Person'
            },
            {
                xtype: 'button',
                docked: 'bottom',
                text: 'Add',
                ui: 'confirm',
                itemId: 'addPeople'
            }
        ],
        listeners: [
            {
                delegate: '#close',
                event: 'tap',
                fn: 'closePopup'
            },
            {
                delegate: '#addPeople',
                event: 'tap',
                fn: 'addPeople'
            },
            {
                delegate: '#personName',
                event: 'keyup',
                fn: 'searchPeople'
            },
            {
                delegate: '#personContact',
                event: 'keyup',
                fn: 'searchContact'
            }
        ]
    },
    closePopup: function(){
        this.fireEvent('closeCommand', this);
    },
    addPeople: function(){
        //console.log("Add Person Command");
        this.fireEvent('addPersonCommand', this);
    },
    searchPeople: function(scope, e, eOpts){
        this.fireEvent("searchPeopleCommand", scope.getValue(), this);
    },
    searchContact: function(scope, e, eOpts){
        this.fireEvent("searchContactCommand", scope.getValue(), this);
    }
});