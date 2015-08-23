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
    xtype: 'toolbar',
    docked: 'top',
    title: 'Past Events',
    cls: 'blue-tile',
    items: [
        {
            xtype: 'button',
            itemId: 'back',
            cls: 'back-button',
            iconCls: 'arrow_left'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            itemId: 'viewSwitcher',
            iconCls: 'calendar',
            cls: 'normal-button-style'
        }
    ]
},
{
    xtype: 'toolbar',
    itemId: 'title',
    cls: 'normal-blue-tile',
    items: [
    {
            xtype: 'searchfield',
            placeHolder: 'Search',
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
   itemTpl: new Ext.XTemplate(
                      '<tpl for=".">',
                           '   <tpl if="priority==\'High\'">',
                           '          <div class="event-category">{category}</div>',
                           '          <div><span class="pictos-icon">\\\\ </span><span class="event-date">{[(new Date(values.date)).toDateString()]}</span></div>',
                           '          <div><span class="pictos-icon">t</span><span>  {eventTime}</span></div>',
                           '          <div><span class="pictos-icon">m</span><span>  {alertTime}</span></div>',
                           '          <span class="pictos-icon">U</span><span class="event-people">  {people}</span>',
                           '          <p class="event-message"><span class="pictos-icon">q</span>  {message}</p>',
                           '          <div class="high-priority">{priority} Priority</div>',
                           '           <div class="activity-icons">',
                           '                   <span class="pictos-icon">{[this.getAllIcons(values.activities)]}</span>',
                           '           </div>',
                           '   </tpl>',
                           '<tpl if="priority==\'Medium\'">',
                           '          <div class="event-category">{category}</div>',
                           '          <div><span class="pictos-icon">\\\\ </span><span class="event-date">{[(new Date(values.date)).toDateString()]}</span></div>',
                           '          <div><span class="pictos-icon">t</span><span>  {eventTime}</span></div>',
                           '          <div><span class="pictos-icon">m</span><span>  {alertTime}</span></div>',
                           '          <span class="pictos-icon">U</span><span class="event-people">  {people}</span>',
                           '          <p class="event-message"><span class="pictos-icon">q</span>  {message}</p>',
                           '          <div class="medium-priority">{priority} Priority</div>',
                           '           <div class="activity-icons">',
                           '                   <span class="pictos-icon">{[this.getAllIcons(values.activities)]}</span>',
                           '           </div>',
                           '   </tpl>',
                           '<tpl if="priority==\'Low\'">',
                           '          <div class="event-category">{category}</div>',
                           '          <div><span class="pictos-icon">\\\\ </span><span class="event-date">{[(new Date(values.date)).toDateString()]}</span></div>',
                           '          <div><span class="pictos-icon">t</span><span>  {eventTime}</span></div>',
                           '          <div><span class="pictos-icon">m</span><span>  {alertTime}</span></div>',
                           '          <span class="pictos-icon">U</span><span class="event-people">  {people}</span>',
                           '          <p class="event-message"><span class="pictos-icon">q</span>  {message}</p>',
                           '          <div class="low-priority">{priority} Priority</div>',
                           '           <div class="activity-icons">',
                           '                   <span class="pictos-icon">{[this.getAllIcons(values.activities)]}</span>',
                           '           </div>',
                           '   </tpl>',
                           '</tpl>',
                           {
                               getAllIcons: function(activities){

                                   var icons = "";

                                   var allActivities = activities.split(", ");
                                   for(var i=0; i< allActivities.length; i++){
                                       if(allActivities[i] == "Email" || allActivities[i]== "email"){
                                           icons += "M  ";
                                       }
                                       else if(allActivities[i] == "Text" || allActivities[i]== "sms"){
                                           icons += "w  ";
                                       }
                                       else if(allActivities[i] == "Call" || allActivities[i]=="call"){
                                           icons += "f  ";
                                       }
                                   }
                                   return icons;
                               }
                           }
           ),
    onItemDisclosure: true,
    store: 'Upcoming',
    grouped: true,
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
},
{
    delegate: '#viewSwitcher',
    event: 'tap',
    fn: 'toggleView'
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
},

//Toggle event view
toggleView: function(){
    this.fireEvent("toggleViewCommand", this);
}
});