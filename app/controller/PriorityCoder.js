Ext.define("EventReminder.controller.PriorityCoder", {
extend: 'Ext.app.Controller',
config: {
    refs: {
        past: 'past',
        upcoming: 'upcoming',
        pastList: 'past #pastEventList',
        upcomingEventList: 'upcoming #upcomingEventList'
    },
    control: {
        past: {
            pastListCommand: 'colorPastList'
        },
        upcoming: {
            upcomingListCommand: 'colorUpcomingList'
        }
    }
}
});