Ext.define('EventReminder.view.NewEvent', {
extend: 'Ext.Container',
xtype: 'newEvent',
config: {
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
            xtype: 'button',
            ui: 'action',
            itemId: 'addPeople'
        },
        {
            itemId: 'selectDate',
            xtype: 'datepickerfield',
            value: new Date()
        },

        /*Add a Time picker component
        {
            //Event Time
            xtype: 'datetimepicker'
        },
        {
            //Alert Time
            xtype: 'datetimepicker'
        }
        */
        //Select Time
        {
            xtype: 'fieldset',
            itemId: 'selectEventTime',
            items: [
                {
                    xtype: 'selectfield',
                    itemId: 'Hours',
                    options: []
                },
                {
                    xtype: 'selectfield',
                    itemId: 'Minutes',
                    options: []
                },
                {
                    xtype: 'selectfield',
                    itemId: 'AMPM',
                    options: [
                        {text: 'AM', value: 'AM'},
                        {text: 'PM', value: 'PM'}
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
initialize: function(){
    console.log("New Event Init");
    var util = Ext.create("EventReminder.utils.Utilities");

    //Filling the Hours Option items
    util.enumerateOptions(12, '#Hours');

    //Filling the Minutes Option items
    util.enumerateOptions(59, '#Minutes')
}
});