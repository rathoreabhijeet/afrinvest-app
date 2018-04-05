(function () {
    'use strict';
    angular.module('shareMarketAppModule')
        .controller('loginController', _loginController);
    _loginController.$inject = ['commonMethodService', '_', 'ERROR_MESSAGE', 'NODE_WEB_API', '$state', 'VALID_PATTERN'];

    function _loginController(commonMethodService, _, ERROR_MESSAGE, NODE_WEB_API, $state, VALID_PATTERN) {
        var loginCtrl = this;
        loginCtrl.VALID_PATTERN = VALID_PATTERN;
        loginCtrl.ERROR_MESSAGE = ERROR_MESSAGE;
        loginCtrl.login = _login;
        function _login() {
            commonMethodService.serverRequest(NODE_WEB_API.LOGIN, 'POST', loginCtrl.user)
                .then(_loginSuccess)
        }


        function _loginSuccess(success) {
            commonMethodService.showNotification(success.msg, 'success');
            $state.go('list_view');
        }
    }
})();