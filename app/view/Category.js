Ext.define('EventReminder.view.Category', {
extend: 'Ext.Container',
xtype: 'category',
config: {
    items: [
    {
        xtype: 'toolbar',
        itemId: 'newCategory',
        title: 'New Category',
        docked: 'top',
        newEventCategory: 'newEvent #category',
        editEventCategory: 'editevent #category',
        items: [
            {
                xtype: 'button',
                itemId: 'back',
                iconCls: 'arrow_left',
                ui: 'back'
            },
            {
                xtype: 'spacer'
            },
             {
                 xtype: 'button',
                 itemId: 'addCategory',
                 iconCls: 'action',
                 ui: 'confirm'
             }
        ]
    },
    {
        xtype: 'fieldset',
        title: 'Category Name',
        instructions: 'Enter Details of the New Category',
        items: [
            {
                xtype: 'textfield',
                name: 'categoryName',
                itemId: 'categoryName',
                placeHolder: 'Enter New Category Name',
                layout: {
                    pack: 'center'
                }
            },
            {
                xtype: 'fieldset',
                title: 'Default Activity',
                items: [{

                    xtype: 'selectfield',
                    itemId: 'selectActivity',
                    options: [
                       {text: 'Select'},
                       {text: 'Call', value: 'call'},
                       {text: 'Text', value: 'sms'},
                       {text: 'Email', value: 'email'}
                    ],
                }]
              },
               {
                    xtype: 'sliderfield',
                    itemId: 'priority',
                    label: 'Default Priority',
                    minValue: 0,
                    maxValue: 100
               }
               ]
    }
    ],
    listeners: [
        {
            delegate: '#back',
            event: 'tap',
            fn: 'back'
        },
        {
            delegate: '#addCategory',
            event: 'tap',
            fn: 'createNewCategory'
        }
    ]
},

//Fire Back Command
back: function(){
    console.log("Back");
    this.fireEvent("backCommand", this);
},

createNewCategory: function(){
    this.fireEvent("createCommand", this);
},

//Code to be executed while launching the Controller
launch: function(){
    console.log("Category launched");
}
});