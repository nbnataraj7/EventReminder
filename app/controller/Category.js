Ext.define('EventReminder.controller.Category', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            category: 'category',
            main : 'main',
            categoryName: 'category #categoryName',
            categoryActivity: 'category #selectActivity',
            categoryPriority: 'category #priority',
            editEventCategory: 'editevent #selectCategory',
            newEventCategory: 'newEvent #selectCategory'
        },
        control: {
            category: {
                backCommand: 'back',
                createCommand: 'create'
            }
        }
    },
    back: function(){
        //code for navogating to the main view
        Ext.Viewport.animateActiveItem(this.getMain(), {type: 'slide', direction: 'right'});
    },

    //Function for creating a new event
    create: function(){

        //Creating a new Category model
        var category = Ext.create('EventReminder.model.Category', {
            Category: this.getCategoryName().getValue(),
            Priority: this.getCategoryPriority().getValue(),
            Activity: this.getCategoryActivity().getValue()
        });

        //Validate the Category
        var errors = category.validate();

        if(!errors.isValid()){
           Ext.Msg("Invalid Category Details");
        }
        else{
            var store = Ext.getStore('Category');
            store.add(category);
            store.sync();
            var options = new Array();
            options = this.getNewEventCategory().getOptions();
            var option = {text: this.getCategoryName().getValue(), value: this.getCategoryName().getValue()};
            options.push(option);
        }

        console.log(options);
    },

    //Launch function that will load all the New Categories
    launch: function(){
   /* var options = this.getNewEventCategory().getOptions();
    var store = Ext.getStore('Category');
    store.each(function(item, index, id){
        var option = {text: item.getData().Category, value: item.getData().Category};
        options.push(option);
        });

       options.push(this.getNewEventCategory().getOptions());

       console.log(options);

       */
    }
    });