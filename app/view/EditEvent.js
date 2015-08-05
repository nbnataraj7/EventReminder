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
        xtype: 'titlebar',
        itemId: 'title',
        title: 'Edit Event',
        docked: 'top',
        items: [
        {
            xtype: 'button',
            itemId: 'back',
            text: 'Back'
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
                xtype: 'selectfield',
                itemId: 'selectCategory',
                label: 'Select Category',
                options: [
                    {text: 'Choose One'},
                    {text: 'Birthday', value: 'Birthday'},
                    {text: 'Meeting', value: 'Meeting'},
                    {text: 'Call', value: 'Call'},
                    {text: 'Email', value: 'Email'},
                    {text: 'Shopping', value: 'Shopping'}
                ],
            },
            {
                xtype: 'list',
                itemId: 'peopleList',
                height: '100px',
                itemTpl: document.getElementById('people-list').innerHTML,
                store: 'Person',
                onItemDisclosure: true
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
                        placeHolder: 'Tap to select alert time'
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
                    {text: 'Select'},
                    {text: 'Call', value: 'call'},
                    {text: 'Text', value: 'sms'},
                    {text: 'Email', value: 'email'}
                ],
                itemId: 'activity'
            },
            {
                xtype: 'button',
                ui: 'confirm',
                itemId: 'save',
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
   }
});