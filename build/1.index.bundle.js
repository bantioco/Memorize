webpackJsonp([1],{

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var login = function login() {

    var $d = $(document);

    $('#app_nav').hide();

    $.post('/templates/login.html', function (data) {
        $('#template_load').html(data);
        $('input').val('');
    });

    $d.off('submit', '#form_login').on('submit', '#form_login', function (e) {

        e.preventDefault();

        var login = $('input[name="user_login"]').val();
        var password = $('input[name="user_password"]').val();
        var remember = $('input[name="user_remember"]').prop('checked');

        if (window.openDatabase) {

            var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

            db.transaction(function (tx) {

                tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                    if (results.rows[0]) {

                        var datadb = results.rows[0];

                        var logindb = datadb.login;
                        var saltdb = datadb.salt;
                        var passdb = datadb.pass;

                        var decryptedData = CryptoJS.AES.decrypt(passdb, saltdb);
                        var decrypted = decryptedData.toString(CryptoJS.enc.Utf8);

                        if (logindb == login && decrypted == password) {

                            if (remember === true) {
                                tx.executeSql('UPDATE user SET remember=? where rowid=?', ["1", 1]);
                            } else {
                                tx.executeSql('UPDATE user SET remember=? where rowid=?', ["0", 1]);
                            }

                            new Promise(function (resolve) {
                                __webpack_require__.e/* require.ensure */(2/* duplicate */).then((function (require) {
                                    resolve(__webpack_require__(4));
                                }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                            }).then(function (app) {
                                app.default();
                            });
                        } else {
                            alert('not ok');
                        }
                    } else {
                        console.log("error");
                    }
                }, null);
            });
        } else {
            console.log('fail to open database');
        }
    });

    window.login_user = function () {

        if (window.openDatabase) {

            var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

            db.transaction(function (tx) {

                tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                    if (results.rows[0]) {

                        var datadb = results.rows[0];

                        return datadb;
                    } else {
                        return "error";
                    }
                }, null);
            });
        } else {
            console.log('fail to open database');
        }
    };
};
exports.default = login;

/***/ })

});