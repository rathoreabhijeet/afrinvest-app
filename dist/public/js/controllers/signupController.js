(function () {
    'use strict';
    angular.module('shareMarketAppModule')
        .controller('signupController', _signupController);
    _signupController.$inject = ['commonMethodService', '_', 'NODE_WEB_API', 'ERROR_MESSAGE', 'VALID_PATTERN', '$state'];

    function _signupController(commonMethodService, _, NODE_WEB_API, ERROR_MESSAGE, VALID_PATTERN, $state) {
        var signupCtrl = this;
        signupCtrl.VALID_PATTERN = VALID_PATTERN;
        signupCtrl.ERROR_MESSAGE = ERROR_MESSAGE;
        signupCtrl.signup = _signup;
        
        function _signup() {
            commonMethodService.serverRequest(NODE_WEB_API.SIGN_UP, 'POST', signupCtrl.user)
                .then(_signupSuccess)
        }


        function _signupSuccess(success) {
            commonMethodService.showNotification(success.msg, 'success');
            $state.go('list_view');
        }
    }
})();