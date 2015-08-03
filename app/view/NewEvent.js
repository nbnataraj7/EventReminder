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
                            xtype: 'selectfield',
                            itemId: 'eventTimeSelect',
                            label: 'Select Event Time'
                          },
                          {
                            xtype: 'picker',
                            itemId: 'eventTimePicker',
                            hidden : true,
                            slots :[
                                {
                                    name: 'Hours',
                                    title: 'Hours',
                                    data: [
                                        {text: '1', value: '1'},
                                        {text: '2', value: '2'},
                                        {text: '3', value: '3'},
                                        {text: '4', value: '4'},
                                        {text: '5', value: '5'},
                                        {text: '6', value: '6'},
                                        {text: '7', value: '7'},
                                        {text: '8', value: '8'},
                                        {text: '9', value: '9'},
                                        {text: '10', value: '10'},
                                        {text: '11', value: '11'},
                                        {text: '12', value: '12'}
                                      ]
                                },
                                {
                                    name: 'Minutes',
                                    title: 'Minutes',
                                    data: [
                                        {text: '5', value: '5'},
                                        {text: '10', value: '10'},
                                        {text: '15', value: '15'},
                                        {text: '20', value: '20'},
                                        {text: '25', value: '25'},
                                        {text: '30', value: '30'},
                                        {text: '35', value: '35'},
                                        {text: '40', value: '40'},
                                        {text: '45', value: '45'},
                                        {text: '50', value: '50'},
                                        {text: '55', value: '55'}
                                    ]
                                },
                                {
                                    name: 'AMPM',
                                    title: 'AM/PM',
                                    data: [
                                        {text: 'AM', value: 'AM'},
                                        {text: 'PM', value: 'PM'}
                                    ]
                                }
                            ]
                          },

                          //Select Alert Time
                          {
                                  xtype: 'selectfield',
                                  itemId: 'alertTimeSelect',
                                  label: 'Select Alert Time'
                                },
                                {
                                  xtype: 'picker',
                                  itemId: 'alertTimePicker',
                                  hidden : true,
                                  slots :[
                                      {
                                          name: 'Hours',
                                          title: 'Hours',
                                          data: [
                                              {text: '1', value: '1'},
                                              {text: '2', value: '2'},
                                              {text: '3', value: '3'},
                                              {text: '4', value: '4'},
                                              {text: '5', value: '5'},
                                              {text: '6', value: '6'},
                                              {text: '7', value: '7'},
                                              {text: '8', value: '8'},
                                              {text: '9', value: '9'},
                                              {text: '10', value: '10'},
                                              {text: '11', value: '11'},
                                              {text: '12', value: '12'}
                                            ]
                                      },
                                      {
                                          name: 'Minutes',
                                          title: 'Minutes',
                                          data: [
                                              {text: '5', value: '5'},
                                              {text: '10', value: '10'},
                                              {text: '15', value: '15'},
                                              {text: '20', value: '20'},
                                              {text: '25', value: '25'},
                                              {text: '30', value: '30'},
                                              {text: '35', value: '35'},
                                              {text: '40', value: '40'},
                                              {text: '45', value: '45'},
                                              {text: '50', value: '50'},
                                              {text: '55', value: '55'}
                                          ]
                                      },
                                      {
                                          name: 'AMPM',
                                          title: 'AM/PM',
                                          data: [
                                              {text: 'AM', value: 'AM'},
                                              {text: 'PM', value: 'PM'}
                                          ]
                                      }
                                  ]
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
back:function(){
    console.log("Back");
    this.fireEvent("backCommand", this);
},
addPeople:function(){
    console.log("Add People");
    this.fireEvent("addPeopleCommand", this);
},
eventTimeSelected:function(){
    console.log("Event Time Selected");
},
alertTimeSelected:function(){
console.log("Alert Time Selected");
},
initialize: function(){
    console.log("New Event Init");
    var util = Ext.create("EventReminder.utils.Utilities");
}
});