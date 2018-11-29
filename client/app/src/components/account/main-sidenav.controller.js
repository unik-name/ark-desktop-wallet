;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('arkclient.components')
    .component('mainSidenav', {
      templateUrl: 'src/components/account/templates/main-sidenav.html',
      bindings: {
        accountCtrl: '=',
        addressBookCtrl: '='
      },
      controller: ['$scope', 'storageService', MainSidenavController]
    })


  function MainSidenavController ($scope, storageService) {
    this.$onInit = () => {
      this.ul = this.accountCtrl;
      this.ab = this.addressBookCtrl;
      let unikNameFromStorage = storageService.get('from-unik-name');
      this.myUnikname = unikNameFromStorage ? `@${unikNameFromStorage}` : '';
    }

    this.updateUnikName = () => {
      storageService.set('from-unik-name', this.myUnikname.replace('@', ''));
    }

  }
})()
