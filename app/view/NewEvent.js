Ext.define('EventReminder.view.NewEvent', {
extend: 'Ext.Container',
xtype: 'newEvent',
requires: ['Ext.TitleBar', 'Ext.form.FieldSet', 'Ext.field.Hidden', 'Ext.field.Select', 'Ext.field.DatePicker'],
config: {
scrollable: true,
layout: {
    type: 'vbox'
},
items: [
{
    xtype: 'titlebar',
    itemId: 'NewEventTitle',
    title: 'New Event',
    docked: 'top',
    items: [
        {
            xtype: 'button',
            itemId: 'back',
            iconCls: 'arrow_left',
            ui: 'back'
        }
    ]
},
{
    xtype: 'toolbar',
    itemId: 'title',
    docked: 'top',
items: [
{
    xtype: 'button',
    itemId: 'saveEvent',
    iconCls: 'compose',
    ui:'confirm',
    itemId: 'addEvent'
},
{
    xtype: 'spacer'
},
{
    xtype: 'button',
    itemId: 'activityButton',
    iconCls: 'organize'
},
{
    xtype: 'button',
    iconCls: 'user',
    itemId: 'addPeople',
},
{
     xtype: 'button',
    iconCls: 'settings',
    itemId: 'addRecurrence'
},
]
},
{
//Form for Entering the Details of the Event
    xtype: 'fieldset',
    itemId: 'newEventForm',
    autoDestroy: false,
    instructions: 'Enter Details for The New Event',
        items: [
        {
            xtype: 'hiddenfield',
            itemId: 'ID'
        },
        {
            xtype: 'hiddenfield',
            itemId: 'recurrence',
            value: 'none'
        },
        {
            xtype: 'selectfield',
            itemId: 'selectCategory',
            label: 'Select Category',
            labelWidth: '50%',
            store: 'CategoryOptions'
        },
        {
            xtype: 'list',
            flex: 1,
            itemId: 'peopleList',
            cls: 'people-list',
            itemTpl: document.getElementById('people-list').innerHTML,
            //itemTpl: "<div>{name}</div><div>{contact}</div>",
            onItemDisclosure: true,
            store: 'EventPeople',
            autoDestroy: false,
            scrollable: 'null'
        },
        {
            itemId: 'selectDate',
            labelWidth: '50%',
            xtype: 'datepickerfield',
            value: new Date(),
            picker: {
                yearFrom: 2015,
                yearTo: 2030
            }
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


        //Selecting an Activity for the event
        //Comment the below config and unblock the previous block
        //in case multiple activities are needed for an event
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
    }
    ],
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
    /*
    //unblock this comment if event handling for multiple activities is required
    {
        delegate: '#addActivity',
        event: 'tap',
        fn: 'addActivity'
    }*/
    {
        delegate: '#addEvent',
        event: 'tap',
        fn: 'addEvent'
    },
    {
        delegate: '#peopleList',
        event: 'disclose',
        fn: 'removePerson'
    },
    {
        delegate: '#addRecurrence',
        event: 'tap',
        fn: 'addRecurrence'
    },
    {
        delegate: '#selectCategory',
        event: 'change',
        fn: 'setDefaults'
    },
    {
        delegate: '#activityButton',
        event: 'tap',
        fn: 'addActivity'
    },
    {
        delegate: '#activity',
        event: 'disclose',
        fn: 'removeActivity'
    }
    ]
},

//Adding back functionality
back:function(){
    this.fireEvent("backCommand", this);
},

//Adding Popup for people
addPeople:function(){
    this.fireEvent("addPeopleCommand", this);
    console.log("AddPeopleCommand from New Event");
},

//Adding Picker for selecting event time
eventTimeSelected:function(){
    this.fireEvent("eventTimeSelectCommand", this);
},

//Adding Picker for Selecting alert time
alertTimeSelected:function(){
    this.fireEvent("alertTimeSelectCommand", this);
},

//Fire the priority change event
priorityChanged:function(me, s1, thumb, newValue, oldValue, eOpts){
    this.fireEvent("priorityChangeCommand", newValue,  this);
},
addActivity: function(){
    this.fireEvent("activityChangeCommand", this);
},
addEvent: function(){
    this.fireEvent("addEventCommand", this);
},
removePerson:function(scope, list, record, index){
    this.fireEvent("removePersonCommand", index, this)
},
addRecurrence: function(){
    this.fireEvent('recurrenceCommand', this);
},
setDefaults: function(scope, newValue){
    this.fireEvent("setDefaultsCommand", newValue, this);
},

addActivity: function(){
    this.fireEvent("addActivityCommand", this);
},

removeActivity: function(list, record, target, index, e, eOpts ){
    this.fireEvent("removeActivityCommand", index,  this);
}
});