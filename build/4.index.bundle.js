webpackJsonp([4],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mod_functions = function mod_functions() {

    var $d = $(document);

    var datetime = moment().format("YYYY-MM-DD HH:mm:ss");

    if (window.openDatabase) {
        var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);
        console.log('Success to open database');
    } else {
        new Promise(function (resolve) {
            __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
                resolve(__webpack_require__(0));
            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        }).then(function (first_login) {
            first_login.default();
        });
    }

    //var myIP;
    window.get_local_network_ip = function () {

        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        var pc = new RTCPeerConnection({ iceServers: [] }),
            noop = function noop() {};

        pc.createDataChannel("");

        pc.createOffer(pc.setLocalDescription.bind(pc), noop);

        pc.onicecandidate = function (ice) {

            if (!ice || !ice.candidate || !ice.candidate.candidate) return;

            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

            pc.onicecandidate = noop;

            console.log(myIP);

            return myIP;
        };
    };
    //get_local_network_ip();

    window.nl2br = function (str, is_xhtml) {
        var breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };

    window.imageIsLoaded = function (e) {
        $('#add_img_loaded').html('<img src="' + e.target.result + '"/>');
    };

    window.resize_img = function (file) {};

    window.copyFile = function (fs, path, filesrc, dirupload) {

        var f = path.basename(filesrc);
        var source = fs.createReadStream(filesrc);
        var dest = fs.createWriteStream(path.resolve(dirupload, f));

        source.pipe(dest);

        source.on('end', function () {
            console.log('Succesfully copied');
        });
        source.on('error', function (err) {
            console.log(err);
        });
    };

    window.upload_img = function (img, $this) {

        var imgsend = "default.png";

        if (img.length >= 1) {

            if ($this.files && $this.files[0]) {

                var $thisfile = $this.files[0];
                var originalfile = $thisfile.path;

                var filename = $thisfile.name;
                var filetype = $thisfile.type;
                var filesize = $thisfile.size;

                if (filetype == "image/png" || filetype == "image/jpeg") {

                    copyFile(fs, path, originalfile, './upload/');

                    imgsend = filename;
                }
            }
        }

        return imgsend;
    };

    window.item_sortable = function () {

        $("#view_data").sortable({
            items: "> .view-item",
            handle: ".grip",
            containment: "parent",
            opacity: 0.5,
            axis: "y",
            revert: true,
            stop: function stop(event, ui) {

                if (window.openDatabase) {

                    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                    $('.view-item').each(function (i, v) {

                        var position = i + 1;

                        $(v).attr('data-position', i);
                        var rowid = $(v).attr('data-id');

                        $(v).find('.item-position').text(position);

                        db.transaction(function (tx) {
                            tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, rowid]);
                        });
                    });
                }
            }
        });
    };

    window.search_script = function () {
        /**************************************************
            FILTER SEARCH KEYWORDS
        **************************************************/
        jQuery.expr[':'].icontains = function (a, i, m) {
            var rExps = [{ re: /[\xC0-\xC6]/g, ch: "A" }, { re: /[\xE0-\xE6]/g, ch: "a" }, { re: /[\xC8-\xCB]/g, ch: "E" }, { re: /[\xE8-\xEB]/g, ch: "e" }, { re: /[\xCC-\xCF]/g, ch: "I" }, { re: /[\xEC-\xEF]/g, ch: "i" }, { re: /[\xD2-\xD6]/g, ch: "O" }, { re: /[\xF2-\xF6]/g, ch: "o" }, { re: /[\xD9-\xDC]/g, ch: "U" }, { re: /[\xF9-\xFC]/g, ch: "u" }, { re: /[\xC7-\xE7]/g, ch: "c" }, { re: /[\xD1]/g, ch: "N" }, { re: /[\xF1]/g, ch: "n" }];

            var element = $(a).text();
            var search = m[3];

            $.each(rExps, function () {
                element = element.replace(this.re, this.ch);
                search = search.replace(this.re, this.ch);
            });

            return element.toUpperCase().indexOf(search.toUpperCase()) >= 0;
        };
        /* ..SEARCH.. */
        $d.off('keyup', '#item_filter_keywords').on('keyup', '#item_filter_keywords', function () {

            var searchvalue = $(this).val();

            if (searchvalue.length >= 2) {
                $('.keyword_data').hide();
                //$('.modal-title-content').hide()
                var keyword = $('.keyword_data:icontains("' + searchvalue + '")').show();
            } else {
                $('.keyword_data').show();
                //$('.modal-title-content').show()
            }
        });
        /**************************************************
            END -- FILTER SEARCH KEYWORDS
        **************************************************/
    };

    window.load_data = function () {

        db.transaction(function (tx) {

            tx.executeSql('SELECT rowid, * FROM datas ORDER BY position ASC', [], function (tx, results) {

                if (results.rows) {

                    var data = results.rows;

                    $(data).each(function (i, v) {

                        var description = v.description;

                        if (v.encrypted === "1") {

                            console.log('data encrypted');

                            tx.executeSql("SELECT key FROM encryption", [], function (tx, results) {
                                if (results.rows[0]) {

                                    var key = results.rows[0].key;

                                    description = CryptoJS.AES.decrypt(v.description, key);
                                    description = description.toString(CryptoJS.enc.Utf8);

                                    var item = '<div data-id="' + v.rowid + '" data-position="' + v.position + '" class="view-item keyword_data">' + '<div class="nav-item">' + '<div data-id="' + v.rowid + '" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>' + '<div class="title-item">' + v.title + '</div>' + '<div class="grip"><i class="fa fa-paw" aria-hidden="true"></i></div>' + '<div class="btn-nav"><i data-id="' + v.rowid + '" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>' + '<div class="btn-nav"><i data-id="' + v.rowid + '" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>' + '</div>' + '<div data-id="' + v.rowid + '" class="item-delete-confirmation">' + '<div class="item_confirm_delete">CONFIRM</div><div class="item_cancel_delete">CANCEL</div>' + '</div>' + '<div data-id="' + v.rowid + '" class="description-item">' + '<div class="img"><img src="/upload/' + v.img + '" alt="" /></div>' + '<div class="text">' + description + '</div>' + '</div>' + '<div class="date-item">' + '<div class="item-encrypt">Encrypted..</div>' + '<div class="item-position">' + position + '</div>' + '<div class="date-up">Updated : ' + v.dateupdate + '</div>' + '</div>' + '</div>';

                                    $('#view_data').append(item);
                                }
                            });
                        } else {
                            var item = '<div data-id="' + v.rowid + '" data-position="' + v.position + '" class="view-item keyword_data">' + '<div class="nav-item">' + '<div data-id="' + v.rowid + '" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>' + '<div class="title-item">' + v.title + '</div>' + '<div class="grip"><i class="fa fa-paw" aria-hidden="true"></i></div>' + '<div class="btn-nav"><i data-id="' + v.rowid + '" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>' + '<div class="btn-nav"><i data-id="' + v.rowid + '" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>' + '</div>' + '<div data-id="' + v.rowid + '" class="item-delete-confirmation">' + '<div class="item_confirm_delete">CONFIRM</div><div class="item_cancel_delete">CANCEL</div>' + '</div>' + '<div data-id="' + v.rowid + '" class="description-item">' + '<div class="img"><img src="/upload/' + v.img + '" alt="" /></div>' + '<div class="text">' + description + '</div>' + '</div>' + '<div class="date-item">' + '<div class="item-encrypt">Not encrypted..</div>' + '<div class="item-position">' + position + '</div>' + '<div class="date-up">Updated : ' + v.dateupdate + '</div>' + '</div>' + '</div>';

                            $('#view_data').append(item);
                        }

                        var position = i + 1;

                        tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, v.rowid]);
                    });

                    item_sortable();
                    search_script();
                }
            });
        });
    };

    window.backup_database = function (table) {

        var data = new Object();

        db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM " + table, [], function (tx, results) {

                if (results) {
                    $(results.rows).each(function (i, v) {
                        data[i] = v;
                    });
                    return data;
                } else {
                    return null;
                }
            });
        }, null);
    };

    window.backup = function (table) {

        var def = new $.Deferred();

        db.readTransaction(function (tx) {

            tx.executeSql("SELECT * FROM " + table, [], function (tx, results) {

                var data = results.rows;

                def.resolve(data);
            });
        }, null);

        return def;
    };

    window.get_synchronise_table = function () {

        var thekey = new $.Deferred();

        db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM synchronize", [], function (tx, results) {

                if (results) {
                    thekey.resolve(results.rows[0].key);
                } else {
                    thekey.resolve('null');
                }
            });
        }, function (err) {
            console.log('no database');
            thekey.resolve('null');
        });

        return thekey;
    };

    window.generate_key = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 50; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }return text;
    };

    window.create_synchronise_table = function () {

        db.transaction(function (tx) {

            var key = generate_key();

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize (key, active, datestart DATETIME)');

            console.log('synchronize table created');

            tx.executeSql('INSERT INTO synchronize (key, active, datestart) VALUES ("' + key + '", "1", "' + datetime + '")');

            console.log('data insered in synchronize table');

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_autorized (key, ip, machine, dateadd DATETIME)');

            console.log('synchronize_autorized table created');

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_log (ip, key, datelog DATETIME)');

            console.log('synchronize_log table created');
        }, function (err) {

            console.log(err);
        });

        return;
    };

    window.delete_synchronise_table = function () {

        db.transaction(function (tx) {

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize", [], function (tx, results) {
                console.log("Successfully Dropped synchronize");
            }, function (tx, error) {
                console.log("Could not delete synchronize");
            });

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize_autorized", [], function (tx, results) {
                console.log("Successfully Dropped synchronize_autorized");
            }, function (tx, error) {
                console.log("Could not delete synchronize_autorized");
            });

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize_log", [], function (tx, results) {
                console.log("Successfully Dropped synchronize_log");
            }, function (tx, error) {
                console.log("Could not delete synchronize_log");
            });
        });
    };

    window.get_server_sync_on_start = function (myIP) {

        var key = null;

        $.when(get_synchronise_table()).then(function (thiskey) {

            if (thiskey != 'null') {
                key = thiskey;
                setTimeout(function () {
                    http_server_start(myIP, key);
                }, 1500);
            }
        });
    };

    window.sync_data_check = function (str) {

        var def = new $.Deferred();

        db.readTransaction(function (tx) {

            tx.executeSql("SELECT * FROM datas WHERE title=?", [str], function (tx, results) {

                if (results) {
                    var item = results.rows;
                    def.resolve(item);
                } else {
                    def = "no_data";
                }
            });
        }, function (err) {
            console.log(err);
        });

        return def;
    };

    window.sync_data_insert = function (data) {

        var title = data.title;
        var description = data.description;
        var img = "default.png";
        var position = "0";
        var dateadd = data.dateadd;
        var dateupdate = data.dateupdate;
        var encrypted = data.encrypted;

        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO datas (title, description, img, position, dateadd, dateupdate, encrypted) VALUES ("' + title + '", "' + description + '", "' + img + '", "' + position + '", "' + dateadd + '", "' + dateupdate + '", "' + encrypted + '")');
        });
    };

    window.get_encryption = function () {

        var data = new $.Deferred();

        db.transaction(function (tx) {

            tx.executeSql("CREATE TABLE IF NOT EXISTS encryption (key, state VARCHAR NOT NULL DEFAULT '0')");

            tx.executeSql("SELECT rowid, * FROM encryption", [], function (tx, results) {

                if (results.rows[0]) {
                    data.resolve(results.rows[0]);
                } else {
                    data.resolve('null');
                }
            });
        }, function (err) {
            console.log('no database');
            data.resolve('null');
        });

        return data;
    };

    window.add_key_encryption = function (str) {

        db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM encryption", [], function (tx, results) {

                console.log(results);

                if (results.rows[0]) {
                    console.log('update');
                    tx.executeSql('UPDATE encryption SET key=? where rowid=?', [str, 1]);
                } else {

                    tx.executeSql('INSERT INTO encryption (key) VALUES ("' + str + '")');
                }
                console.log(results);
            });
        });
    };

    window.encryption_state_value = function (value) {

        db.transaction(function (tx) {

            if (value === "1") {
                tx.executeSql('UPDATE encryption SET state=? where rowid=?', ["1", 1]);

                tx.executeSql("SELECT key FROM encryption", [], function (tx, results) {
                    if (results.rows[0]) {
                        var key = results.rows[0].key;

                        crypt_data(key);
                    }
                });
            }

            if (value === "0") {
                tx.executeSql('UPDATE encryption SET state=? where rowid=?', ["0", 1]);

                tx.executeSql("SELECT key FROM encryption", [], function (tx, results) {
                    if (results.rows[0]) {
                        var key = results.rows[0].key;
                        decrypt_data(key);
                    }
                });
            }
        });
    };

    window.crypt_data = function (key) {

        db.transaction(function (tx) {

            tx.executeSql("SELECT rowid, * FROM datas", [], function (tx, results) {

                if (results) {

                    $.each(results.rows, function (k, v) {

                        var description_encrypt = CryptoJS.AES.encrypt(v.description, key);
                        description_encrypt = description_encrypt.toString();

                        var id = v.rowid;

                        if (v.encrypted === "0") {
                            tx.executeSql('UPDATE datas SET description=? where rowid=?', [description_encrypt, id]);
                            tx.executeSql('UPDATE datas SET encrypted=? where rowid=?', ["1", id]);
                        }
                    });
                }
            });
        });
        console.log('crypt data');
    };

    window.decrypt_data = function (key) {

        db.transaction(function (tx) {

            tx.executeSql("SELECT rowid, * FROM datas", [], function (tx, results) {

                if (results) {

                    $.each(results.rows, function (k, v) {

                        var description_decrypt = CryptoJS.AES.decrypt(v.description, key);
                        description_decrypt = description_decrypt.toString(CryptoJS.enc.Utf8);

                        var id = v.rowid;

                        if (v.encrypted === "1") {
                            tx.executeSql('UPDATE datas SET description=? where rowid=?', [description_decrypt, id]);
                            tx.executeSql('UPDATE datas SET encrypted=? where rowid=?', ["0", id]);
                        }
                    });
                }
            });
        });

        console.log('decrypt data');
    };
};
exports.default = mod_functions;

/***/ })

});