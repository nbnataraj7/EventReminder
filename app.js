/*

Author : Nataraj Boina

*/

Ext.application({
    name: 'EventReminder',

    views: [
        'Main', 'Upcoming', 'Past', 'NewEvent', 'People', 'EditEvent', 'Event', 'Recurrence'
    ],
    controllers: [
        'Main', 'Upcoming', 'Past', 'NewEvent', 'Strings', 'People', 'DatabaseController', 'EditEvent', 'DateFilter', 'Category', 'Event', 'Recurrence'
    ],
    models: [
        'Event', 'Person', 'Category', 'CategoryOptions', 'Recurrence'
    ],
    stores: [
        'Upcoming', 'Past', 'NewEventPerson', 'AdhocPeople', 'Category', 'CategoryOptions', 'Recurrence'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        var titleBar = {
            xtype: 'titlebar',
            title: 'Event Reminder',
            docked: 'top'
        };
        var bottomBar = {
            xtype: 'titlebar',
            docked: 'bottom'
        };

        //Creating objects for some views
        var EventReminderMain = Ext.create('EventReminder.view.Main');
        var Upcoming = Ext.create('EventReminder.view.Upcoming');
        var Past = Ext.create('EventReminder.view.Past');
        var newEvent = Ext.create('EventReminder.view.NewEvent');
        var EditEvent = Ext.create('EventReminder.view.EditEvent');
        var peoplePopup = Ext.create('EventReminder.view.People');
        var category = Ext.create('EventReminder.view.Category');
        var event = Ext.create('EventReminder.view.Event');
        var recurrence = Ext.create('EventReminder.view.Recurrence');
        // Initialize the main view
        Ext.Viewport.add(titleBar, EventReminderMain, Upcoming, Past, bottomBar, newEvent, EditEvent, peoplePopup, category, event, recurrence);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
