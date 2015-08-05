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
    xtype: 'titlebar',
    itemId: 'title',
items: [
{
    xtype: 'button',
    itemId: 'back'
}
]
},
{
//Form for Entering the Details of the Event
    xtype: 'fieldset',
    itemId: 'newEventForm',
        items: [
        {
            xtype: 'selectfield',
            itemId: 'selectCategory',
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
            ui: 'confirm'
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
            text: 'Create Event',
            itemId: 'addEvent',
            docked: 'bottom'
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
    }
    ]
},
//Adding back functionality
back:function(){
    //console.log("Back");
    this.fireEvent("backCommand", this);
},
//Adding Popup for people
addPeople:function(){
    //console.log("Add People");
    this.fireEvent("addPeopleCommand", this);
},
//Adding Picker for selecting event time
eventTimeSelected:function(){
    //console.log("Event Time Selected");
    var utils = Ext.create('EventReminder.utils.Utilities');
    var eventTimePicker = utils.createTimePicker();
    Ext.Viewport.add(eventTimePicker);
    eventTimePicker.show();
    eventTimePicker.addListener('change', function(scope, value, eOpts){
      //  console.log(value);
        Ext.ComponentQuery.query('#eventTimeSelect')[0].setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
    });
},
//Adding Picker for Selecting alert time
alertTimeSelected:function(){
    //console.log("Alert Time Selected");
    var utils = Ext.create('EventReminder.utils.Utilities');
    var alertTimePicker = utils.createTimePicker();
    Ext.Viewport.add(alertTimePicker);
    alertTimePicker.show();
    alertTimePicker.addListener('change', function(scope, value, eOpts){
      //  console.log(value);
        Ext.ComponentQuery.query('#alertTimeSelect')[0].setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
    });
},
initialize: function(){
    //console.log("New Event Init");
   //var util = Ext.create("EventReminder.utils.Utilities");
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
}
});