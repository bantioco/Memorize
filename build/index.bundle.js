/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".index.bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _style = __webpack_require__(2);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get_data_user = function get_data_user() {

    if (window.openDatabase) {

        var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

        db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                if (results.rows[0]) {

                    var datadb = results.rows[0];

                    if (datadb.remember != "1") {
                        new Promise(function (resolve) {
                            __webpack_require__.e/* require.ensure */(1/* duplicate */).then((function (require) {
                                resolve(__webpack_require__(3));
                            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                        }).then(function (login) {
                            login.default();
                        });
                    } else {

                        /*
                        import('./modules/ModFunctions.js').then(function(ModFunctions) { ModFunctions.default(); });
                         setTimeout(function(){
                             import('./modules/ModNavigation.js').then(function(ModNavigation) { ModNavigation.default(); });
                             import('./app.js').then(function(app) { app.default(); });
                         },500);
                        */

                        new Promise(function (resolve) {
                            __webpack_require__.e/* require.ensure */(2/* duplicate */).then((function (require) {
                                resolve(__webpack_require__(4));
                            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                        }).then(function (app) {
                            app.default();
                        });
                    }
                } else {
                    new Promise(function (resolve) {
                        __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
                            resolve(__webpack_require__(0));
                        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                    }).then(function (first_login) {
                        first_login.default();
                    });
                }
            }, function (tx, err) {

                console.log(err);

                new Promise(function (resolve) {
                    __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
                        resolve(__webpack_require__(0));
                    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
                }).then(function (first_login) {
                    first_login.default();
                });
            });
        });
    } else {

        new Promise(function (resolve) {
            __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
                resolve(__webpack_require__(0));
            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        }).then(function (first_login) {
            first_login.default();
        });
    }
};

var delete_user_db = function delete_user_db() {

    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

    db.transaction(function (tx) {

        // FOR DEV...
        tx.executeSql("DROP TABLE user", [], function (tx, results) {
            console.log("Successfully Dropped");
        }, function (tx, error) {
            console.log("Could not delete");
        });
    });
};

var delete_data_db = function delete_data_db() {

    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

    db.transaction(function (tx) {

        // FOR DEV...

        tx.executeSql("DROP TABLE datas", [], function (tx, results) {
            console.log("Successfully Dropped");
        }, function (tx, error) {
            console.log("Could not delete");
        });
    });
};

jQuery(function ($) {

    var $d = $(document);

    $('#app_nav').hide();

    $d.ready(function () {

        get_data_user();
        //delete_user_db();
        //delete_data_db();
    });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);