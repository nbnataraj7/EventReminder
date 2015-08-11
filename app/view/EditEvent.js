Ext.define('EventReminder.view.EditEvent', {
    extend: 'Ext.Container',
    xtype: 'editevent',
    config: {
        layout: {
            type: 'vbox'
        },
        scrollable: true,
    items: [
    {
        xtype: 'toolbar',
        itemId: 'title',
        title: 'Edit Event',
        docked: 'top',
        items: [
        {
            xtype: 'button',
            itemId: 'back',
            text: 'Back',
            ui: 'back'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            iconCls: 'trash',
            itemId: 'trashEvent'
        }
        ]
    },
    //Form for Entering the Details of the Event
    {
        xtype: 'fieldset',
        itemId: 'eventForm',
            items: [
            {
                xtype: 'hiddenfield',
                itemId: 'hiddenField'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'prev'
            },
            {
                xtype: 'selectfield',
                itemId: 'selectEditCategory',
                label: 'Select Category',
                store: 'CategoryOptions',
            },
            {
                xtype: 'list',
                flex: 1,
                height: '20',
                itemId: 'peopleList',
                cls: 'people-list',
                itemTpl: document.getElementById('people-list').innerHTML,
                onItemDisclosure: true,
                store: 'EventPeople',
                scrollable: false,
                autoDestroy: false
            },
            {
                xtype: 'button',
                itemId: 'addPeople',
                ui: 'confirm',
                text: 'Add People'
            },
            {
                itemId: 'selectDate',
                xtype: 'datepickerfield',
                label: 'Select date',
                yearFrom: 2015,
                yearTo: 2030,
                value: new Date()
            },
            {
                xtype: 'fieldset',
                itemId: 'time',
                items: [
                    //Select Event Time
                      {
                        xtype: 'textfield',
                        itemId: 'eventTimeSelect',
                        label: 'Event Time',
                        placeHolder: 'Tap to select event time'
                      },
                    //Select Alert Time
                      {
                          xtype: 'textfield',
                          itemId: 'alertTimeSelect',
                          label: 'Alert Time',
                          placeHolder: 'Tap to select alert time'
                      }
                  ]
            },
            {
                xtype: 'textareafield',
                placeHolder: 'Write your customized message here...',
                itemId: 'message',
                label: 'Message'
            },
            {
                xtype: 'sliderfield',
                label: 'Priority',
                itemId: 'priority',
                minValue: 0,
                maxValue: 100,
                value: 50
            },
            {
                xtype: 'selectfield',
                label: 'Activity',
                options: [
                    {text: 'Select', value: 'none'},
                    {text: 'Call', value: 'call'},
                    {text: 'Text', value: 'sms'},
                    {text: 'Email', value: 'email'}
                ],
                itemId: 'activity',
                autoSelect: true
            },
            {
                xtype: 'button',
                ui: 'confirm',
                itemId: 'saveEvent',
                docked: 'bottom',
                text: 'Save Changes',
                docked: 'bottom'
            }
   ]
   }],
   listeners: [
       {
           delegate: '#back',
           event: 'tap',
           fn: 'back'
       },
       {
           delegate: '#addPeople',
           event: 'tap',
           fn: 'addPeople'
       },
       {
           delegate: '#eventTimeSelect',
           event: 'focus',
           fn: 'eventTimeSelected'
       },
       {
           delegate: '#alertTimeSelect',
           event: 'focus',
           fn: 'alertTimeSelected'
       },
       {
           delegate: '#priority',
           event: 'change',
           fn: 'priorityChanged'
       },
       {
           delegate: '#saveEvent',
           event: 'tap',
           fn: 'saveEvent'
       },
       {
            delegate: '#trashEvent',
            event:'tap',
            fn: 'trashEvent'
       },
       {
            delegate: '#peopleList',
            event: 'disclose',
            fn: 'removePeople'
       }
   ]
   },
   back: function(){
    this.fireEvent("backCommand", this);
   },
   addPeople: function(){
    this.fireEvent("addPeopleCommand", this);
   },
   eventTimeSelected:function(){
    this.fireEvent("eventTimeCommand", this)
   },
   alertTimeSelected:function(){
    this.fireEvent("alertTimeCommand", this);
   },
   priorityChanged:function(me, s1, thumb, newValue, oldValue, eOpts){
    this.fireEvent("priorityChangeCommand", newValue, this);
   },
   saveEvent:function(){
    this.fireEvent("saveChangesCommand", this);
   },
   trashEvent: function(){
    this.fireEvent("trashEventCommand", this);
   },
   removePeople: function(scope, list, record, index){
    console.log("Removing people");
    this.fireEvent('removePeopleCommand', index,  this);
   }
});