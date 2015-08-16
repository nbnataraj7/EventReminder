Ext.define('EventReminder.view.Past', {
extend: 'Ext.Container',
requires: ['Ext.field.Search', 'Ext.dataview.List'],
xtype: 'past',
config: {
layout: {
    type: 'vbox'
},
autoLoad: true,
items: [
{
    xtype: 'titlebar',
    docked: 'top',
    title: 'Past Events',
    items: [
        {
            xtype: 'button',
            itemId: 'back',
            ui:'back',
            iconCls: 'arrow_left'
        },
    ]
},
{
    xtype: 'toolbar',
    itemId: 'title',
    items: [
    {
            xtype: 'searchfield',
            placeHolder: 'Search by People',
            itemId: 'search',
            minWidth: '80%'
    },
    {
        xtype: 'button',
        itemId: 'clear',
        text: 'Clear',
        ui: 'confirm'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    autoDestroy: false,
    itemId: 'pastEventList',
    itemTpl: [
           '<tpl for=".">',
                '   <tpl if="priority==\'High\'">',
                '       <div class="high">',
                '          <div class="event-category">{category}</div>',
                '          <div class="event-date">On : {date} </div>',
                '          <div>Alert at : {alertTime}</div>',
                '          <div class="event-people">People: {people}</div>',
                '           <p class="event-message">{message}</p>',
                '          <div class="event-priority">{priority} Priority</div>',
                '          <div class="event-activities">{activities}</div>',
                '      </div>',
                '   </tpl>',
                '<tpl if="priority==\'Medium\'">',
                '       <div class="medium">',
                '          <div class="event-category">{category}</div>',
                '          <div class="event-date">On : {date}</div>',
                '          <div>Alert at : {alertTime}</div>',
                '          <div class="event-people">People: {people}</div>',
                '           <p class="event-message">{message}</p>',
                '          <div class="event-priority">{priority} Priority</div>',
                '          <div class="event-activities">{activities}</div>',
                '      </div>',
                '   </tpl>',
                '<tpl if="priority==\'Low\'">',
                '       <div class="low">',
                '          <div class="event-category">{category}</div>',
                '          <div class="event-date">On : {date}</div>',
                '          <div>Alert at : {alertTime}</div>',
                '          <div class="event-people">People: {people}</div>',
                '           <p class="event-message">{message}</p>',
                '          <div class="event-priority">{priority} Priority</div>',
                '          <div class="event-activities">{activities}</div>',
                '      </div>',
                '   </tpl>',
                '</tpl>'
        ],
    onItemDisclosure: true,
    store: 'Upcoming',
    cls: 'past-event-list',
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
    delegate: '#pastEventList',
    event: 'disclose',
    fn: 'editEvent'
},
{
    delegate: '#clear',
    event: 'tap',
    fn: 'clearCommand'
},
{
    delegate: '#search',
    event: 'keyup',
    fn: 'search'
},
{
    delegate: '#pastEventList',
    event: 'itemdoubletap',
    fn: 'showEvent'
}
]
},

//Fire a Back Command
back:function(){
    this.fireEvent("backCommand", this);
},

//Fire an Edit Event Command
editEvent:function(list, record, target, index, e, eOpts){
    this.fireEvent("editEventCommand", record,  this);
},

//Fire a clear command
clearCommand: function(){
    this.fireEvent('clearCommand', this);
},

//Search the list with the person
search: function( scope, e, eOpts){
    this.fireEvent("searchByPersonCommand", scope.getValue(), this);
},

//Shows the event in a popup
showEvent: function(scope, index, target, record, e, eOpts){
    this.fireEvent("showCommand", record);
}
});