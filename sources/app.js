/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            color : '#2C2C2C',
            name : "Maël Nison",
            job : "Frontend Developer"
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:color', this.onColorChange, this);
            this.model.on( 'change:name', this.onNameChange, this);
            this.model.on( 'change:job', this.onJobChange, this);
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onColorChange( );
            this.onLabelChange( );
            this.onJobChange( );

        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onLabelChange : function ( ) {
            this.$el.html( this.model.get( 'name' ));
        },

        onColorChange : function ( ) {
            this.$el.css( 'background', this.model.get( 'color' ));
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Card Color', 'Color', {
        model : card,
        name  : 'color'
    } );

    var information = editor.createWidget( 'Group', {
        label : 'Card Information'
    } );

    information.createWidget( 'Full Name', 'TextArea', {
        model : card,
        name  : 'name'
    } );

    information.createWidget( 'Profession', 'TextArea', {
        model : card,
        name  : 'job'
    } );

} );
