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
    xtype: 'toolbar',
    title: 'Upcoming Events',
    docked: 'top',
    items: [
        {
            xtype: 'button',
            itemId: 'back',
            ui:'back',
            iconCls: 'arrow_left'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            itemId: 'viewSwitcher',
            iconCls: 'calendar'
        }
    ]
},
{
    xtype: 'toolbar',
    itemId: 'title',
    items: [
    {
        xtype: 'searchfield',
        placeHolder: 'Search',
        itemId: 'search',
        minWidth: '100%'
    }
    ]
},
{
    xtype: 'list',
    flex: 1,
    autoDestroy: false,
    itemId: 'upcomingEventList',
    store: 'Upcoming',
    grouped: true,
    itemTpl: new Ext.XTemplate(
                   '<tpl for=".">',
                        '   <tpl if="priority==\'High\'">',
                        '          <div class="event-category">{category}</div>',
                        '          <div><span class="pictos-icon">\\\\ </span><span class="event-date">{[(new Date(values.date)).toDateString()]}</span></div>',
                        '          <div><span class="pictos-icon">t</span><span>  {alertTime}</span></div>',
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
                        '          <div><span class="pictos-icon">t</span><span>  {alertTime}</span></div>',
                        '          <span class="pictos-icon">U</span><span class="event-people">  {people}</span>',
                        '          <p class="event-message"><span class="pictos-icon">q</span>  {message}</p>',
                        '          <div class="medium-priority">{priority} Priority</div>',
                        '           <div class="activity-icons">',
                        '                   <span class="pictos-icon">{[this.getAllIcons(values.activities)]}</span>',
                        '           </div>',
                        '   </tpl>',
                        '<tpl if="priority==\'Low\'">',
                        '          <div class="event-category">{category}</div>',
                        '          <div><span class="pictos-icon"></span><span class="event-date">{[(new Date(values.date)).toDateString()]}</span></div>',
                        '          <div><span class="pictos-icon">t</span><span>  {alertTime}</span></div>',
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
 },
 {
     delegate: '#viewSwitcher',
     event: 'tap',
     fn: 'toggleView'
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
},

//Toggle the view
toggleView: function(){
    this.fireEvent("toggleViewCommand", this);
}
});