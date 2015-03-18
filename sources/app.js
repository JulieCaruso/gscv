/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            color : {r: 44, g: 44, b: 44},
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
            this.onNameChange( );
            this.onJobChange( );

        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onColorChange : function ( ) {
            var rgb = this.model.get( 'color' );
            var rounded = {
    					r: rgb.r * 255,
    					g: rgb.g * 255,
    					b: rgb.b * 255
    				};
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
    				this.$el.css( 'background',  hex);
        },

        onNameChange : function ( ) {

            this.$el.find('.name').text(this.model.get('name').text);

            //this.$el.css('name', this.model.get('name'));
            // this.$( '.text' ).val( this.model.get('name') );
            // this.$( '.text' ).val(this.get());
            //var name = this.model.get( 'name' );
            //this.$el.html( $('.name').val() ,  this.model.get( 'name' ));
            //this.$el.html( $('.name').val(), this.model.get( 'FullName' ));
        },

        onJobChange : function ( ) {
          var job = this.model.get( 'job' );
          this.$el.html( $('.job').val() ,  this.model.get( 'job' ));
            //this.$el.html( $('.name').val(), this.model.get( 'FullName' ));
        },

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

    information.createWidget( 'Job', 'TextArea', {
        model : card,
        name  : 'job'
    } );

} );
