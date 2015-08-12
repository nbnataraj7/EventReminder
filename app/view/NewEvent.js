Ext.define('EventReminder.view.NewEvent', {
extend: 'Ext.Container',
xtype: 'newEvent',
config: {
    scrollable: true,
layout: {
    type: 'vbox'
},
items: [
{
    xtype: 'toolbar',
    itemId: 'title',
    docked: 'top',
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
    itemId: 'saveEvent',
    iconCls: 'action',
    ui:'confirm',
    itemId: 'addEvent'
},
{
    xtype: 'button',
    iconCls: 'add',
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
            store: 'CategoryOptions'
        },
        {
            xtype: 'list',
            flex: 1,
            itemId: 'peopleList',
            cls: 'people-list',
            itemTpl: document.getElementById('people-list').innerHTML,
            onItemDisclosure: true,
            store: 'EventPeople',
            autoDestroy: false,
            scrollable: false
        },
        {
            itemId: 'selectDate',
            xtype: 'datepickerfield',
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
        /*
        //Unblock this comment if we want multiple activites to be added to an event
        {
           xtype: 'list',
           height: '100px',
           label: 'Activity List',
           itemId: 'ActivityList',
           itemTpl: document.getElementById("activity-list").innerHTML,
           data: [
            {name: 'call'},
            {name: 'text'}
           ]
        },
        {
            xtype: 'button',
            label: 'Add Activity',
            itemId: 'addActivity',
            text: 'Add Activity',
            ui: 'confirm'
        }*/

        //Selecting an Activity for the event
        //Comment the below config and unblock the previous block
        //in case multiple activities are needed for an event
        {
            xtype: 'selectfield',
            label: 'Activity',
            options: [
                {text: 'Select', value: 'none'},
                {text: 'Call', value: 'call'},
                {text: 'Text', value: 'sms'},
                {text: 'Email', value: 'email'}
            ],
            itemId: 'activity'
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
}
});