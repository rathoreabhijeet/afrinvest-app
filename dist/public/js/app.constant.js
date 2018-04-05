(function () {
    'use strict';
    angular.module('shareMarketAppModule')
        .constant('_', window._)
        .constant('NOTIFICATION_CONSTANT', {
            delay: 2000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        })
        .constant('VALID_PATTERN', {
            'EMAIL_REGEX': /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'PHONE_REGEX': /^(\d{10}|\d{10})$/,
            'ALPHA_NUMERIC_REGEX': /^[a-zA-Z0-9_]*$/,
            'PINCODE_REGEX': /^[1-9][0-9]{5}$/,
            'ALPHA_REGEX': /^[a-zA-Z. ]*$/,
            'NUMBER_REGEX': /^(0|[1-9][0-9]*)$/,
            'PHONE_REGEX_WITH_COUNTRY_CODE': /^(\d{12}|\d{12})$/,
        })
        .constant('NODE_WEB_API', {
            'GET_LOGIN': 'user/login',
            'LOGIN': 'user/login',
            'SIGN_UP': 'user/signup',
            'GET_SHARES': 'shares/',
            'POST_SHARES': 'shares/',
            'UPDATE_SHARES': 'shares/',
            'DELETE_SHARES': 'shares/',
            'LOGOUT': 'user/logout'
        })
        .constant('ERROR_MESSAGE', {
            'NO_INTERNET_CONNECTIVITY': 'No internet connectivity here please check your internet connection !',
            'UNKNOWN_ERROR': 'Unknown Error',
            'NO_DATA_EXIST': 'no data exist',
            'MISMATCH_PASSWORD': 'Both password are mismatch',
            'INVALID_EMAIL': 'Please enter valid email',
            'INVALID_NAME': 'Name should be alphabetic characters',
            'INVALID_PASSWORD': 'Password should be minimum 6 length',
        })
        .constant('WARNING_MESSAGE', {
            'SHARE_DELETE_WARNING': 'Are you sure you want to delete'
        });
})();