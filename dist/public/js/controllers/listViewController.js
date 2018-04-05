(function () {
    'use strict';
    angular.module('shareMarketAppModule')
        .controller('listViewController', _listViewController);
    _listViewController.$inject = ['commonMethodService', '_', 'NODE_WEB_API', 'ERROR_MESSAGE', '$stateParams', '$state', '$uibModal', '$timeout', 'WARNING_MESSAGE'];

    function _listViewController(commonMethodService, _, NODE_WEB_API, ERROR_MESSAGE, $stateParams, $state, $uibModal, $timeout, WARNING_MESSAGE) {
        var listViewCtrl = this;
        listViewCtrl.currentUser = commonMethodService.currentUser;
        listViewCtrl.getSharesList = _getSharesList;
        listViewCtrl.logout = _logout;
        listViewCtrl.openCreateUpdateModal = _openCreateUpdateModal;
        listViewCtrl.deleteShare = _deleteShare;
        listViewCtrl.sharesList = [];
        listViewCtrl.sharesListTotal = 0;
        listViewCtrl.currentPage = 1;
        function _getSharesList(page) {
            commonMethodService.serverRequest(NODE_WEB_API.GET_SHARES + '?page=' + page, 'GET')
                .then(_getSharesListSuccess)
        }

        function _getSharesListSuccess(success) {
            if (success && success.shares && success.shares.docs && success.shares.docs.length) {
                Array.prototype.push.apply(listViewCtrl.sharesList, success.shares.docs);
                listViewCtrl.currentPage++;
            } else {
                Array.prototype.push.apply(listViewCtrl.sharesList, []);
            }
        }

        function _logout() {
            commonMethodService.serverRequest(NODE_WEB_API.LOGOUT, 'GET')
                .then(_logoutSuccess)

        }

        function _logoutSuccess() {
            $state.go('login')
        }


        function _openCreateUpdateModal(share_info, info_key) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'createUpdateShares.html',
                size: 'lg',
                controller: ['$uibModalInstance', function ($uibModalInstance) {
                    var modalCtrl = this;
                    modalCtrl.ERROR_MESSAGE = ERROR_MESSAGE;
                    modalCtrl.share_info = angular.copy(share_info);
                    modalCtrl.dismiss = _dismiss;
                    modalCtrl.submitDetail = _submitDetail;
                    modalCtrl.buttonTitle = modalCtrl.share_info && modalCtrl.share_info._id ? 'Update' : 'Create';
                    modalCtrl.modalTitle = modalCtrl.share_info && modalCtrl.share_info._id ? 'Update' : 'Create';
                    function _dismiss() {
                        $uibModalInstance.dismiss();
                    };

                    function _submitDetail() {
                        if (modalCtrl.share_info._id) {
                            commonMethodService.serverRequest(NODE_WEB_API.UPDATE_SHARES + modalCtrl.share_info._id, 'PUT', modalCtrl.share_info)
                                .then(_successOfCreateUpdate);
                        } else {
                            commonMethodService.serverRequest(NODE_WEB_API.POST_SHARES, 'POST', modalCtrl.share_info)
                                .then(_successOfCreateUpdate);
                        }

                    }

                    function _successOfCreateUpdate(success) {
                        swal({
                            allowOutsideClick: false,
                            title: "Thanks!",
                            text: success.msg,
                            type: "success",
                            confirmButtonText: "Ok",
                        }).then(function () {
                            $uibModalInstance.close({ $value: success.shares });
                        }).catch(swal.noop);
                    }
                }],
                controllerAs: 'modalCtrl',
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function (share) {
                if (angular.isNumber(info_key))
                    listViewCtrl.sharesList[info_key] = share.$value;
                else
                    listViewCtrl.sharesList.unshift(share.$value);

            });
        }

        function _deleteShare(id, index) {
            swal({
                allowOutsideClick: false,
                title: 'Confirm Delete',
                text: WARNING_MESSAGE.SHARE_DELETE_WARNING,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete'
            }).then(function (result) {
                if (result.value) {
                    commonMethodService.serverRequest(NODE_WEB_API.DELETE_SHARES + id, 'DELETE')
                        .then(function (success) {
                            swal({
                                allowOutsideClick: false,
                                title: "Thanks!",
                                text: success.msg,
                                type: "success",
                                confirmButtonText: "Ok",
                            }).then(function () {
                                $timeout(function () {
                                    listViewCtrl.sharesList.splice(index, 1);
                                }, 100)
                            }).catch(swal.noop);
                        });
                }
            }).catch(swal.noop);
        }



        _getSharesList(listViewCtrl.currentPage);
    }
})();