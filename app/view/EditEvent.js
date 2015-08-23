Ext.define('EventReminder.view.EditEvent', {
    extend: 'Ext.Container',
    requires: ['Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.field.Hidden', 'Ext.field.Select', 'Ext.field.DatePicker'],
    xtype: 'editevent',
    config: {
        layout: {
            type: 'vbox'
        },
        scrollable: true,
    items: [
    {
        xtype: 'toolbar',
        itemId: 'EditEventTitle',
        title: 'Edit Event',
        docked: 'top',
        cls: 'blue-tile',
        items: [
           {
               xtype: 'button',
               itemId: 'back',
               iconCls: 'arrow_left',
               cls: 'back-button'
           },
        ]
    },
    {
        xtype: 'toolbar',
        itemId: 'title',
        docked: 'top',
        cls: 'blue-tile',
        items: [
        {
            xtype: 'button',
            iconCls: 'compose',
            ui: 'confirm',
            itemId: 'saveEvent'
        },
        {
            xtype: 'spacer'
        },
        {
            delegate: 'button',
            iconCls: 'organize',
            itemId: 'activityButton',
            cls:'normal-button-style'
        },
        {
            xtype: 'button',
            iconCls: 'user',
            itemId: 'addPeople',
            cls:'normal-button-style'
        },
        {
            xtype: 'button',
            iconCls: 'settings',
            itemId: 'addRecurrence',
            cls:'normal-button-style'
        },
        {
            xtype: 'button',
            iconCls: 'trash',
            itemId: 'trashEvent',
            cls:'normal-button-style'
        },
        ]
    },
    //Form for Entering the Details of the Event
    {
        xtype: 'fieldset',
        itemId: 'eventForm',
        instructions: 'Edit Event Details',
            items: [
            {
                xtype: 'hiddenfield',
                itemId: 'ID'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'recurrence'
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
                labelWidth: '50%'
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
                scrollable: null,
                autoDestroy: false
            },
            {
                itemId: 'selectDate',
                xtype: 'datepickerfield',
                label: 'Select date',
                labelWidth: '50%',
                picker: {
                    yearFrom: 2015,
                    yearTo: 2030,
                },
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
                        labelWidth: '33%',
                        placeHolder: 'Tap to select event time'
                      },
                    //Select Alert Time
                      {
                          xtype: 'textfield',
                          itemId: 'alertTimeSelect',
                          label: 'Alert Time',
                          labelWidth: '33%',
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
                xtype: 'list',
                store: 'Activity',
                itemId: 'activity',
                onItemDisclosure: true,
                height: '150px',
                scrollable: 'null',
                autoDestroy: false,
                itemTpl: '<div>{text}</div>',
                cls: 'people-list'
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
       },
       {
            delegate: '#addRecurrence',
            event: 'tap',
            fn: 'editRecurrence'
       },
       {
            delegate: '#selectEditCategory',
            event: 'change',
            fn: 'setDefaults'
       },
       {
            delegate: '#activity',
            event: 'disclose',
            fn: 'editActivities'
       },
       {
            delegate: '#activityButton',
            event: 'tap',
            fn: 'addActivities'
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
    //console.log("Removing people");
    this.fireEvent('removePeopleCommand', index,  this);
   },
   editRecurrence: function(){
    this.fireEvent('editRecurrenceCommand', this);
   },
   editActivities: function( scope, record, target, index, e, eOpts ){
    this.fireEvent('editActivityCommand', index, this);
   },

   addActivities: function(){
    this.fireEvent("addActivitiesCommand", this);
   }

});