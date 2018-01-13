webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var first_login = function first_login() {

    var $d = $(document);

    $.post('/templates/first_login.html', function (data) {
        $('#template_load').html(data);
    });

    $d.off('submit', '#form_first_login').on('submit', '#form_first_login', function (e) {

        e.preventDefault();

        var login = $('input[name="new_login"]').val(),
            email = $('input[name="new_email"]').val(),
            password = $('input[name="new_password"]').val(),
            confim_password = $('input[name="new_confirm_password"]').val();

        if (login.length >= 1 && email.length >= 1 && password.length >= 1 && confim_password.length >= 1) {

            if (password == confim_password) {

                var salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                var encrypted = CryptoJS.AES.encrypt(password, salt);
                encrypted = encrypted.toString();

                if (window.openDatabase) {

                    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                    db.transaction(function (tx) {

                        tx.executeSql('CREATE TABLE IF NOT EXISTS user (login, email, salt, pass, token, remember)');

                        tx.executeSql('INSERT INTO user (login, email, salt, pass, token, remember) VALUES ("' + login + '", "' + email + '", "' + salt + '", "' + encrypted + '", "' + token + '", "0")');

                        db.transaction(function (tx) {

                            tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                                if (results) {
                                    new Promise(function (resolve) {
                                        __webpack_require__.e/* require.ensure */(1/* duplicate */).then((function (require) {
                                            resolve(__webpack_require__(3));
                                        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                                    }).then(function (login) {
                                        login.default();
                                    });
                                } else {
                                    new Promise(function (resolve) {
                                        new Promise(function(resolve) { resolve(); }).then((function (require) {
                                            resolve(__webpack_require__(0));
                                        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                                    }).then(function (first_login) {
                                        first_login.default();
                                    });
                                }
                            }, function (tx, err) {
                                new Promise(function (resolve) {
                                    new Promise(function(resolve) { resolve(); }).then((function (require) {
                                        resolve(__webpack_require__(0));
                                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                                }).then(function (first_login) {
                                    first_login.default();
                                });
                            });
                        });
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    console.log('no data base');
                }
            } else {
                console.log('pass not good');
            }
        } else {
            console.log('error length form data');
        }
    });
};
exports.default = first_login;

/***/ })
]);