Ext.define('EventReminder.view.Upcoming', {
extend: 'Ext.Container',
requires: ['Ext.field.Search', 'Ext.dataview.List'],
xtype: 'upcoming',
config: {
layout: {
    type: 'vbox'
},
autoLoad: true,
items: [
{
    xtype: 'titlebar',
    title: 'Upcoming Events',
    docked: 'top'
},
{
    xtype: 'toolbar',
    itemId: 'title',
    items: [
    {
        xtype: 'button',
        itemId: 'back',
        ui:'back',
        iconCls: 'arrow_left'
    },
    {
        xtype: 'searchfield',
        placeHolder: 'Search by People',
        itemId: 'search'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    autoDestroy: false,
    itemId: 'upcomingEventList',
    store: 'Upcoming',
    itemTpl: [
               '<tpl for=".">',
                    '   <tpl if="priority==\'High\'">',
                    '       <div class="high">',
                    '          <div class="event-category">{category}</div>',
                    '          <div class="event-date">On : {date} at: {eventTime}</div>',
                    '          <div>Alert at : {alertTime}</div>',
                    '          <div class="event-people">People: {people}</div>',
                    '           <div class="event-message">{message}</div>',
                    '          <div class="event-priority">{priority} Priority</div>',
                    '          <div class="event-activities">{activities}</div>',
                    '      </div>',
                    '   </tpl>',
                    '<tpl if="priority==\'Medium\'">',
                    '       <div class="medium">',
                    '          <div class="event-category">{category}</div>',
                    '          <div class="event-date">On : {date} at: {eventTime}</div>',
                    '          <div>Alert at : {alertTime}</div>',
                    '          <div class="event-people">People: {people}</div>',
                    '           <div class="event-message">{message}</div>',
                    '          <div class="event-priority">{priority} Priority</div>',
                    '          <div class="event-activities">{activities}</div>',
                    '      </div>',
                    '   </tpl>',
                    '<tpl if="priority==\'Low\'">',
                    '       <div class="low">',
                    '          <div class="event-category">{category}</div>',
                    '          <div class="event-date">On : {date} at: {eventTime}</div>',
                    '          <div>Alert at : {alertTime}</div>',
                    '          <div class="event-people">People: {people}</div>',
                    '           <div class="event-message">{message}</div>',
                    '          <div class="event-priority">{priority} Priority</div>',
                    '          <div class="event-activities">{activities}</div>',
                    '      </div>',
                    '   </tpl>',
                    '</tpl>'
    ],

    onItemDisclosure: true,
    cls: 'event-list',
    scrollable: true,
    grouper: {
        sortProperty: 'date',
        direction: 'DESC',
        groupFn: function(record){
            if(record && record.data.date){
                return (new Date(record.data.date)).toDateString();
            }
            else{
                return '';
            }
        }
        }

}
],
listeners: [
{
    delegate: '#back',
    event: 'tap',
    fn: 'back'
},
{
    delegate: '#upcomingEventList',
    event: 'disclose',
    fn: 'editEvent'
},
{
    delegate: '#search',
    event: 'keyup',
    fn: 'search'
},
{
     delegate: '#upcomingEventList',
     event: 'itemdoubletap',
     fn: 'showEvent'
 }
]
},

//Tapping on Back button
back:function(){
    this.fireEvent("backCommand", this);
},

//Tapping on the disclose of an item
editEvent:function(list, record, target, index, e, eOpts){
    this.fireEvent("editEventCommand", record,  this);
},

//Search the list with the person
search: function( scope, e, eOpts ){
    this.fireEvent("searchByPersonCommand", scope.getValue(), this);
},


//Shows the event in a popup
showEvent: function(scope, index, target, record, e, eOpts){
    this.fireEvent("showCommand", record, this);
}
});