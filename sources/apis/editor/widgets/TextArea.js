define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget label-widget">',
            '          <INPUT class="text" type="text" value="Type your text.." name="text">',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .text:input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'text',

                content: undefined,
                className: '',

                escape: true

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( this.options.content );

            if ( this.options.className ) {
                this.$( '.text' ).addClass( this.options.className );
            }
        },

        changeEvent: function () {
            this.set( this.$( '.text' ).val() );
        },

        render: function () {
            // this.$( '.text' ).val(this.get());
            this.$( '.text' )[ this.options.escape ? 'text' : 'html' ]( this.get() );

        }

    } );

} );
