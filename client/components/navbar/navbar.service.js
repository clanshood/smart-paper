'use strict';

angular.module('smartPaperApp')
  .service('$navbar', function () {
    // default settings for navbar
    var defaults = {
      isSidenavControll: true,
      isSearchBtn: true,
      brand: "Smart Paper",
      size: "",
      theme: "default",
      menu: {
        display: true,
        lists: []
      },
      buttons: [
        /* sample obj
        {
          label: "Signup",
          needAuth: false,
          link: "/signup",
          action: ""
        }
        */
      ],
    };

    return{
      set: function(settings){
        defaults = angular.extend(defaults, settings);
        return defaults;
      },
      get: function(){
        return defaults;
      }
    };
  });
