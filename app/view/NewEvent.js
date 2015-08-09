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
    docked: 'top',
items: [
{
    xtype: 'button',
    itemId: 'back',
    ui: 'back'
}
]
},
{
//Form for Entering the Details of the Event
    xtype: 'fieldset',
    itemId: 'newEventForm',
        items: [
        {
            xtype: 'hiddenfield',
            itemId: 'ID'
        },
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
            flex: 1,
            itemId: 'peopleList',
            itemTpl: document.getElementById('people-list').innerHTML,
            onItemDisclosure: true,
            store: 'EventPeople',
            autoDestroy: true
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
    },
    {
        delegate: '#peopleList',
        event: 'disclose',
        fn: 'removePerson'
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
}
});