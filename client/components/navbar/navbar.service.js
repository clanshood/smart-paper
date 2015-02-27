'use strict';

angular.module('smartPaperApp')
  .service('$navbar', function () {
    var options = {
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
      set: function(opt){
        options = angular.extend(options, opt);
        return options;
      },
      get: function(){
        return options;
      }
    };
  });
