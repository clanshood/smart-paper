'use strict';

angular.module('smartPaperApp')
  .service('$navbar', function () {
    // default settings for navbar
    var defaults = {
      scrollShrink: false,
      scrollShrinkSpeed: 0.5,
      isSidenavControll: true,
      isSearchBtn: true,
      brand: 'Smart Paper',
      size: '',
      theme: 'default',
      menu: {
        display: true,
        lists:[{
          label: 'Map',
          route: '/map'
        },{
          label: 'Books',
          route: '/books'
        },{
          label: 'Apps',
          route: '/apps'
        }]
      },
      buttons: []
    };

    return{
      set: function(settings){
        defaults = _.merge(defaults, settings);
        return defaults;
      },
      get: function(){
        return defaults;
      }
    };
  });
