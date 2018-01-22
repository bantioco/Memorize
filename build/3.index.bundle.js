webpackJsonp([3],{5:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e,t=$(document),a=moment().format("YYYY-MM-DD HH:mm:ss"),n=null;window.openDatabase?(n=openDatabase("my_acess_db","1.0","My access db",5242880),console.log("Success to open database")):new Promise(function(e){i.e(0).then(function(t){e(i(0))}.bind(null,i)).catch(i.oe)}).then(function(e){e.default()}),window.loader_show=function(){$("#loader_block").show()},loader_show(),window.loader_hide=function(){$("#loader_block").fadeOut(300)},window.nl2br=function(e,t){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1"+(t||void 0===t?"<br />":"<br>")+"$2")},window.imageIsLoaded=function(e){$("#add_img_loaded").html('<img src="'+e.target.result+'"/>')},window.upload_img=function(e,t){var i="default.png";if(e.length>=1&&t.files&&t.files[0]){var a=t.files[0],n=a.path,o=a.name,d=a.type;a.size,"image/png"!=d&&"image/jpeg"!=d||(copyFile(fs,path,n,"./upload/"),i=o)}return i},window.copyFile=function(e,t,i,a){var n=t.basename(i),o=e.createReadStream(i),d=e.createWriteStream(t.resolve(a,n));o.pipe(d),o.on("end",function(){}),o.on("error",function(e){console.log(e)})},window.backup_database=function(e){var t=new Object;n.transaction(function(i){i.executeSql("SELECT * FROM "+e,[],function(e,i){return i?($(i.rows).each(function(e,i){t[e]=i}),t):null})},null)},window.backup=function(e){var t=new $.Deferred;return n.readTransaction(function(i){i.executeSql("SELECT * FROM "+e,[],function(e,i){var a=i.rows;t.resolve(a)})},null),t},window.add_key_encryption=function(e){n.transaction(function(t){t.executeSql("SELECT * FROM encryption",[],function(t,i){i.rows[0]?t.executeSql("UPDATE encryption SET key=? where rowid=?",[e,1]):t.executeSql('INSERT INTO encryption (key) VALUES ("'+e+'")')})})},window.encryption_state_value=function(e){n.transaction(function(t){"1"===e&&(t.executeSql("UPDATE encryption SET state=? where rowid=?",["1",1]),t.executeSql("SELECT key FROM encryption",[],function(e,t){if(t.rows[0]){var i=t.rows[0].key;crypt_data(i)}})),"0"===e&&(t.executeSql("UPDATE encryption SET state=? where rowid=?",["0",1]),t.executeSql("SELECT key FROM encryption",[],function(e,t){if(t.rows[0]){var i=t.rows[0].key;decrypt_data(i)}}))})},window.crypt_data=function(e){n.transaction(function(t){t.executeSql("SELECT rowid, * FROM datas",[],function(t,i){i&&$.each(i.rows,function(i,a){var n=CryptoJS.AES.encrypt(a.description,e);n=n.toString();var o=a.rowid;"0"===a.encrypted&&(t.executeSql("UPDATE datas SET description=? where rowid=?",[n,o]),t.executeSql("UPDATE datas SET encrypted=? where rowid=?",["1",o]))})})})},window.decrypt_data=function(e){n.transaction(function(t){t.executeSql("SELECT rowid, * FROM datas",[],function(t,i){i&&$.each(i.rows,function(i,a){var n=CryptoJS.AES.decrypt(a.description,e);n=n.toString(CryptoJS.enc.Utf8);var o=a.rowid;"1"===a.encrypted&&(t.executeSql("UPDATE datas SET description=? where rowid=?",[n,o]),t.executeSql("UPDATE datas SET encrypted=? where rowid=?",["0",o]))})})})},window.backup_download=function(){var e=path.basename("/data")+"/datas.json";fs.exists(e,function(t){t&&($("#result_export_database_file").show(),fs.readFile(e,"utf8",function(e,t){if(!e){var i="text/json;charset=utf-8,"+encodeURIComponent(t);$('<a href="data:'+i+'" download="datas.json">Download JSON file</a>').appendTo("#result_export_database_file")}}))})},window.sync_data_check=function(e){var t=new $.Deferred;return n.readTransaction(function(i){i.executeSql("SELECT * FROM datas WHERE title=?",[e],function(e,i){if(i){var a=i.rows;t.resolve(a)}else t="no_data"})},function(e){console.log(e)}),t},window.sync_data_insert=function(e){var t=e.title,i=e.description,a=e.dateadd,o=e.dateupdate,d=e.encrypted;n.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')"),e.executeSql('INSERT INTO datas (title, description, img, position, dateadd, dateupdate, encrypted, category) VALUES ("'+t+'", "'+i+'", "default.png", "0", "'+a+'", "'+o+'", "'+d+'", "0")')})},window.get_encryption=function(){var e=new $.Deferred;return n.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS encryption (key, state VARCHAR NOT NULL DEFAULT '0')"),t.executeSql("SELECT rowid, * FROM encryption",[],function(t,i){i.rows[0]?e.resolve(i.rows[0]):e.resolve("null")})},function(t){console.log(t),e.resolve("null")}),e},window.get_synchronise_table=function(){var e=new $.Deferred;return n.transaction(function(t){t.executeSql("SELECT * FROM synchronize",[],function(t,i){i?e.resolve(i.rows[0].key):e.resolve("null")})},function(t){console.log(t),e.resolve("null")}),e},window.generate_key=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<50;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},window.create_synchronise_table=function(){n.transaction(function(e){var t=generate_key();e.executeSql("CREATE TABLE IF NOT EXISTS synchronize (key, active, datestart DATETIME)"),e.executeSql('INSERT INTO synchronize (key, active, datestart) VALUES ("'+t+'", "1", "'+a+'")'),e.executeSql("CREATE TABLE IF NOT EXISTS synchronize_autorized (key, ip, machine, dateadd DATETIME)"),e.executeSql("CREATE TABLE IF NOT EXISTS synchronize_log (ip, key, datelog DATETIME)"),e.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')")},function(e){console.log(e)})},window.delete_synchronise_table=function(){n.transaction(function(e){e.executeSql("DROP TABLE synchronize",[],function(e,t){console.log("Successfully Dropped synchronize")},function(e,t){console.log("Could not delete synchronize")}),e.executeSql("DROP TABLE synchronize_autorized",[],function(e,t){console.log("Successfully Dropped synchronize_autorized")},function(e,t){console.log("Could not delete synchronize_autorized")}),e.executeSql("DROP TABLE synchronize_log",[],function(e,t){console.log("Successfully Dropped synchronize_log")},function(e,t){console.log("Could not delete synchronize_log")})})},window.get_server_sync_on_start=function(e){var t=null;$.when(get_synchronise_table()).then(function(i){"null"!=i&&(t=i,setTimeout(function(){http_server_start(e,t)},1500))})},window.item_sortable=function(){$("#view_data").sortable({items:".sortable_element",handle:".the_grip",opacity:.5,axis:"y",revert:!0,stop:function(e,t){$(".view-item").each(function(e,t){$(t).attr("data-position",e);var i=$(t).attr("data-id");n.transaction(function(t){t.executeSql("UPDATE datas SET position=? WHERE rowid=?",[e,i])})}),$(".view-category").each(function(e,t){$(t).attr("data-position",e);var i=$(t).attr("data-id");n.transaction(function(t){t.executeSql("UPDATE category SET position=? WHERE rowid=?",[e,i])})})}})},window.item_droppable=function(){$(".category-view-item").droppable({accept:".view-item",hoverClass:"drop-hover",over:function(t,i){$(t.target).addClass("dropped"),e=$(t.target).attr("data-id")},drop:function(t,i){e=$(t.target).attr("data-id");var a=$(i.draggable[0]).clone();$(i.draggable[0]).addClass("ToRemove");var o=$(i.draggable[0]).attr("data-id");1!=$('.category-view-item[data-id="'+e+'"]').find(".ui-sortable-placeholder").length?$('.category-view-item[data-id="'+e+'"]').append(a):($(a).insertBefore(".ui-sortable-placeholder"),$(".ui-sortable-placeholder").hide()),$(a).removeAttr("style"),$(".ToRemove").remove(),$(".category-view-item").removeClass("dropped"),n.transaction(function(t){t.executeSql("UPDATE datas SET category=? WHERE rowid=?",[e,o])}),get_item_in_category()},out:function(e,t){var i=$(t.draggable[0]).attr("data-id");n.transaction(function(e){e.executeSql("UPDATE datas SET category=? WHERE rowid=?",["0",i])})}})},window.search_script=function(){jQuery.expr[":"].icontains=function(e,t,i){var a=$(e).text(),n=i[3];return $.each([{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}],function(){a=a.replace(this.re,this.ch),n=n.replace(this.re,this.ch)}),a.toUpperCase().indexOf(n.toUpperCase())>=0},t.off("keyup","#item_filter_keywords").on("keyup","#item_filter_keywords",function(){$(".keyword_data").removeClass("result_contains");var e=$(this).val();e.length>=2?($(".keyword_data").hide(),$('.keyword_data:icontains("'+e+'")').show().addClass("result_contains"),$(".category-view-item").each(function(e,t){var i=$(t).attr("data-id");0==$(t).find(".result_contains").length&&$('.view-category[data-id="'+i+'"]').hide()})):($(".view-category").show(),$(".keyword_data").show().removeClass("result_contains"),$(".keyword_data").show())})},window.load_category=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ASC";$(".view_show_all_category").css("transform","rotate(45deg)"),n.transaction(function(t){t.executeSql("SELECT rowid, * FROM category ORDER BY position "+e,[],function(e,t){if(t.rows){var i=t.rows;$(i).each(function(e,t){var i='<div data-id="'+t.rowid+'" data-position="'+t.position+'" class="view-category"><div class="title-block"><div data-id="'+t.rowid+'" class="category-hide"><i class="fa fa-angle-down" aria-hidden="true"></i></div><div class="img-category"><img src="/upload/'+t.img+'"></div><div class="title-category">'+t.title+'</div><div class="category-btn"><i data-id="'+t.rowid+'" class="fa fa-trash category_item_delete" aria-hidden="true"></i></div><div class="category-btn"><i data-id="'+t.rowid+'" class="fa fa-pencil category_item_edit" aria-hidden="true"></i></div></div><div data-id="'+t.rowid+'" class="category-delete-confirmation"><div class="category_confirm_delete">DELETE</div><div class="category_cancel_delete">CANCEL</div></div><div data-id="'+t.rowid+'" class="category-view-item"></div>';$("#view_data").append(i),$('.category-hide[data-id="'+t.rowid+'"]').children("i").css("transform","rotate(45deg)")})}})})},window.load_data=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ASC";load_category(),setTimeout(function(){n.transaction(function(t){var i="";t.executeSql("SELECT key FROM encryption",[],function(e,t){t.rows[0]&&(i=t.rows[0].key)}),t.executeSql("SELECT rowid, * FROM datas ORDER BY position "+e,[],function(e,t){if(t.rows){var a=t.rows;$(a).each(function(t,a){var n=a.description;if("1"===a.encrypted){n=(n=CryptoJS.AES.decrypt(a.description,i)).toString(CryptoJS.enc.Utf8);var o='<div data-id="'+a.rowid+'" data-position="'+a.position+'" class="view-item keyword_data sortable_element"><div class="nav-item"><div data-id="'+a.rowid+'" class="hide-item"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div><div class="title-item">'+a.title+'</div><div data-id="'+a.rowid+'" class="grip-notice">Drag me..</div><div data-id="'+a.rowid+'" class="grip the_grip"><i class="fa fa-paw" aria-hidden="true"></i></div><div class="btn-nav"><i data-id="'+a.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div><div class="btn-nav"><i data-id="'+a.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div></div><div data-id="'+a.rowid+'" class="item-delete-confirmation"><div class="item_confirm_delete">DELETE</div><div class="item_cancel_delete">CANCEL</div></div><div data-id="'+a.rowid+'" class="description-item"><div class="img"><img src="/upload/'+a.img+'" alt="" /></div><div class="text">'+n+'</div></div><div class="date-item"><div class="item-encrypt">Encrypted..</div><div class="item-position">'+r+'</div><div class="date-up">Updated : '+a.dateupdate+"</div></div></div>";"0"!=a.category&&$('.category-view-item[data-id="'+a.category+'"]').is(":visible")?$('.category-view-item[data-id="'+a.category+'"]').append(o):$("#view_data").append(o)}else{var d='<div data-id="'+a.rowid+'" data-position="'+a.position+'" class="view-item keyword_data sortable_element"><div class="nav-item"><div data-id="'+a.rowid+'" class="hide-item"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div><div class="title-item">'+a.title+'</div><div data-id="'+a.rowid+'" class="grip-notice">Drag me..</div><div data-id="'+a.rowid+'" class="grip the_grip"><i class="fa fa-paw" aria-hidden="true"></i></div><div class="btn-nav"><i data-id="'+a.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div><div class="btn-nav"><i data-id="'+a.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div></div><div data-id="'+a.rowid+'" class="item-delete-confirmation"><div class="item_confirm_delete">DELETE</div><div class="item_cancel_delete">CANCEL</div></div><div data-id="'+a.rowid+'" class="description-item"><div class="img"><img src="/upload/'+a.img+'" alt="" /></div><div class="text">'+n+'</div></div><div class="date-item"><div class="item-encrypt">Not encrypted..</div><div class="item-position">'+r+'</div><div class="date-up">Updated : '+a.dateupdate+"</div></div></div>";"0"!=a.category&&$('.category-view-item[data-id="'+a.category+'"]').is(":visible")?$('.category-view-item[data-id="'+a.category+'"]').append(d):$("#view_data").append(d)}var r=t+1;e.executeSql("UPDATE datas SET position=? WHERE rowid=?",[t,a.rowid])}),item_sortable(),search_script(),setTimeout(function(){loader_hide()},500),setTimeout(function(){item_droppable(),get_item_in_category()},2e3)}})})},700)},window.get_item_in_category=function(){var e=void 0;$(".category-view-item").each(function(t,i){e=$(i).attr("data-id"),$(i).find(".view-item").length<=0?$('.category_item_delete[data-id="'+e+'"]').show():$('.category_item_delete[data-id="'+e+'"]').hide()})};n.transaction(function(e){e.executeSql("SELECT encrypted FROM datas",[],function(e,t){})},function(e){console.log(e),"could not prepare statement (1 no such column: encrypted)"===e.message&&n.transaction(function(e){e.executeSql("ALTER TABLE datas ADD encrypted VARCHAR NOT NULL DEFAULT '0' ")})}),n.transaction(function(e){e.executeSql("SELECT category FROM datas",[],function(e,t){})},function(e){console.log(e),"could not prepare statement (1 no such column: category)"===e.message&&n.transaction(function(e){e.executeSql("ALTER TABLE datas ADD category VARCHAR NOT NULL DEFAULT '0' ")})}),n.transaction(function(e){e.executeSql("SELECT state FROM encryption",[],function(e,t){})},function(e){console.log(e),"could not prepare statement (1 no such column: state)"===e.message&&n.transaction(function(e){e.executeSql("ALTER TABLE encryption ADD state VARCHAR NOT NULL DEFAULT '0' ")})})}}});