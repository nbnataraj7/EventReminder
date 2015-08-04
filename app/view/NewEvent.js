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
                {text: 'Choose One', value: 'none'},
                {text: 'Birthday', value: 'none'},
                {text: 'Meeting', value: 'none'},
                {text: 'Call', value: 'none'},
                {text: 'Email', value: 'none'},
                {text: 'Shopping', value: 'none'}
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
            ui: 'action',
            itemId: 'addPeople'
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
                            label: 'Select Event Time',
                            placeHolder: 'Tap to select alert time'
                          },
                        //Select Alert Time
                          {
                              xtype: 'textfield',
                              itemId: 'alertTimeSelect',
                              label: 'Select Alert Time',
                              placeHolder: 'Tap to select alert time'
                          }
                      ]
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
    }
    ]
},
//Adding back functionality
back:function(){
    console.log("Back");
    this.fireEvent("backCommand", this);
},
//Adding Popup for people
addPeople:function(){
    console.log("Add People");
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
        console.log(value);
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
        console.log(value);
        Ext.ComponentQuery.query('#alertTimeSelect')[0].setValue(value.Hours+":"+value.Minutes+" "+value.AMPM);
    });
},
initialize: function(){
    console.log("New Event Init");
    var util = Ext.create("EventReminder.utils.Utilities");
}
});