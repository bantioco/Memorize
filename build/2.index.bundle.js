webpackJsonp([2],{4:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=$(document),t=void 0,a="0",n=moment().format("YYYY-MM-DD HH:mm:ss"),o=void 0,r="ASC";if(window.openDatabase)var c=openDatabase("my_acess_db","1.0","My access db",5242880);else new Promise(function(e){i.e(0).then(function(t){e(i(0))}.bind(null,i)).catch(i.oe)}).then(function(e){e.default()});$(".icon-login").hide(),$(".nav-btn").fadeIn(500),$(".nav-disconnect").fadeIn(500);!function(){window.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var e=new RTCPeerConnection({iceServers:[]}),t=function(){};e.createDataChannel(""),e.createOffer(e.setLocalDescription.bind(e),t),e.onicecandidate=function(i){if(i&&i.candidate&&i.candidate.candidate)return o=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(i.candidate.candidate)[1],e.onicecandidate=t,o}}(),get_server_sync_on_start(o),$("#app_nav").show(),c.transaction(function(e){e.executeSql("SELECT * FROM user",[],function(e,i){if(i.rows[0]){var n=i.rows[0];n.login,t=n.email,a=n.remember}})}),$.post("/templates/view.html",function(e){$("#template_load").html(e),load_data(r)}),e.off("click","#return_home").on("click","#return_home",function(){loader_show(),$.post("/templates/view.html",function(e){$("#template_load").html(e),load_data(r)})}),e.off("click","#show_params").on("click","#show_params",function(){$.post("/templates/params.html",function(e){$("#template_load").html(e);var i=null;$.when(get_synchronise_table(),get_encryption()).then(function(e,a){"null"!=e?(i=e,$("#open_browser_localhost").fadeIn(300),$("#load_link_for_sync").html("http://"+o+":3000/"+i),$("#a_link_share_sync").attr("href","mailto:?subject=The link for share my access. Remove this email after sync app...&&cc="+t+"&body=http://"+o+":3000/"+i),$('input[name="http_server"]').prop("checked",!0),$("#params_encrypt_data_state").show()):$("#params_encrypt_data_state").hide(),"null"==a&&null==a||($("#params_encryption").val(a.key),$("#params_encrypt_data_state").show(),"1"===a.state?($("input#encrypt_data").prop("checked",!0),$("#params_encryption").prop("readonly",!0),$("#params_encryption").prop("disabled",!0)):($("input#encrypt_data").prop("checked",!1),$("#params_encryption").prop("readonly",!1),$("#params_encryption").prop("disabled",!1)))}),"1"===a?$('input[name="params_remember"]').prop("checked",!0):$('input[name="params_remember"]').prop("checked",!1),backup_download(),$("#get_api_for_synchronize_result_html").remove()})}),e.off("click","#add_data").on("click","#add_data",function(){$.post("/templates/add.html",function(e){$("#template_load").html(e)})}),e.off("click","#add_category").on("click","#add_category",function(){$.post("/templates/add_category.html",function(e){$("#template_load").html(e)})}),e.off("click","#app_return").on("click","#app_return",function(){$.post("/templates/view.html",function(e){$("#template_load").html(e),add_navigation()})}),e.off("click","#app_disconnect").on("click","#app_disconnect",function(){c.transaction(function(e){e.executeSql("SELECT * FROM user",[],function(e,t){e.executeSql("UPDATE user SET remember=? where rowid=?",["0",1],function(e){new Promise(function(e){i.e(1).then(function(t){e(i(3))}.bind(null,i)).catch(i.oe)}).then(function(e){e.default()})})})})}),e.off("change",'input[name="http_server"]').on("change",'input[name="http_server"]',function(){var e=null;1==$(this).prop("checked")?($.when(get_synchronise_table()).then(function(i){"null"!=i?(e=i,$("#open_browser_localhost").fadeIn(300),$("#load_link_for_sync").html("http://"+o+":3000/"+e),$("#a_link_share_sync").attr("href","mailto:?subject=The link for share my access app&&cc="+t+"&body=http://"+o+":3000/"+e)):(create_synchronise_table(),$.when(get_synchronise_table()).then(function(i){e=i,$("#open_browser_localhost").fadeIn(300),$("#load_link_for_sync").html("http://"+o+":3000/"+e),$("#a_link_share_sync").attr("href","mailto:?subject=The link for share my access app&&cc="+t+"&body=http://"+o+":3000/"+e)}))}),setTimeout(function(){win_reload()},1500)):($("#open_browser_localhost").fadeOut(300),$("#sync_key_show").remove(),delete_synchronise_table(),setTimeout(function(){win_reload()},1e3))}),e.off("change",'input[name="params_remember"]').on("change",'input[name="params_remember"]',function(){var e=$(this).prop("checked");c.transaction(function(t){t.executeSql("SELECT * FROM user",[],function(t,i){1==e?(t.executeSql("UPDATE user SET remember=? where rowid=?",["1",1]),a="1"):(t.executeSql("UPDATE user SET remember=? where rowid=?",["0",1]),a="0")})})}),e.off("change",'input[name="export_database"]').on("change",'input[name="export_database"]',function(){1==$(this).prop("checked")&&$.when(backup("datas"),backup("user")).then(function(e,t){if(e.length>=1){$('input[name="export_database"]').hide(),$("#result_export_database").fadeIn(300).append("<small>Data succesfully exported</small>");var i={datas:e},a=JSON.stringify(i);fs.writeFile("data/datas.json",a,function(e){e?console.error(e):($('input[name="export_database"]').prop("checked",!1),$("#result_export_database_file").is(":hidden")&&backup_download())})}if(t.length>=1){$('input[name="export_database"]').hide(),$("#result_export_database").fadeIn(300).append("<small>User succesfully exported</small>");var n={user:t};JSON.stringify(n)}setTimeout(function(){$("#result_export_database").fadeOut(300).html(""),$('input[name="export_database"]').show(300)},3e3)})}),e.off("click","#get_api_for_synchronize").on("click","#get_api_for_synchronize",function(e){e.preventDefault();var t=$("#api_for_synchronize").val();$("#get_api_for_synchronize_result_html").remove(),t.length>=25?$.getJSON(t,function(e){if(e){var t=e.datas;$.each(t,function(e,t){var i=t.title;$.when(sync_data_check(i)).then(function(e){e.length<=0?(sync_data_insert(t),$("#get_api_for_synchronize_result").html('<div id="get_api_for_synchronize_result_html">'+i+" insered..</div>")):$("#get_api_for_synchronize_result").html('<div id="get_api_for_synchronize_result_html">All items are allready on database..</div>')})})}}):0===t.length?($("#api_for_synchronize").val("Enter link in field.."),setTimeout(function(){$("#api_for_synchronize").val(t)},2e3)):($("#api_for_synchronize").val("Link is not valid..."),setTimeout(function(){$("#api_for_synchronize").val(t)},2e3))}),e.off("click","#send_params_encryption").on("click","#send_params_encryption",function(e){e.preventDefault();var t=$("#params_encryption").val();t.length>=8?(add_key_encryption(t),$("#params_encryption_result").html('<div id="params_encryption_result_html">Added !</div>'),setTimeout(function(){$("#params_encryption_result_html").remove()},1500)):($("#params_encryption").val("8 print minimum required.."),setTimeout(function(){$("#params_encryption").val(t)},2e3))}),e.off("change",'input[name="encrypt_data"]').on("change",'input[name="encrypt_data"]',function(){1==$(this).prop("checked")?(encryption_state_value("1"),$("#params_encryption").prop("readonly",!0),$("#params_encryption").prop("disabled",!0),$("#encrypt_data_result").html('<div id="encrypt_data_result_html">Crypted !</div>'),setTimeout(function(){$("#encrypt_data_result_html").remove()},1500)):(encryption_state_value("0"),$("#params_encryption").prop("readonly",!1),$("#params_encryption").prop("disabled",!1),$("#encrypt_data_result").html('<div id="encrypt_data_result_html">Decrypted !</div>'),setTimeout(function(){$("#encrypt_data_result_html").remove()},1500))}),e.off("change",'input[name="import_database"]').on("change",'input[name="import_database"]',function(){var e=$(this).val();fs.readFile(e,"utf8",function(e,t){if(e)console.log(e);else{var i=$.parseJSON(t).datas;$.each(i,function(e,t){var i=t.title;$.when(sync_data_check(i)).then(function(e){e.length<=0?(sync_data_insert(t),$("#result_import_database").text(t.title+" insered in database..").show()):$("#result_import_database").text("All items are allready on database..").show()})})}})}),e.off("click",".key_encription_show").on("click",".key_encription_show",function(){$(".key_encription_show").hide(),$(".key_encription_hide").show(),$('input[name="params_encryption"]').attr("type","text")}),e.off("click",".key_encription_hide").on("click",".key_encription_hide",function(){$(".key_encription_hide").hide(),$(".key_encription_show").show(),$('input[name="params_encryption"]').attr("type","password")}),e.off("change",'input[name="add_img"]').on("change",'input[name="add_img"]',function(){if(this.files&&this.files[0]){var e=new FileReader;e.onload=imageIsLoaded,e.readAsDataURL(this.files[0])}}),e.off("submit","#form_add_data").on("submit","#form_add_data",function(e){e.preventDefault();var t=$('input[name="add_title"]').val(),i=nl2br($('textarea[name="add_description"]').val());if(t.length>=1&&i.length>=1){var a=$('input[name="add_img"]').val(),o=$('input[name="add_img"]')[0],d=upload_img(a,o);c.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')"),e.executeSql("SELECT key FROM encryption",[],function(e,a){if(a.rows[0]){var o=a.rows[0].key,r=CryptoJS.AES.encrypt(i,o);r=r.toString(),e.executeSql('INSERT INTO datas (title, description, img, dateadd, dateupdate, encrypted, category) VALUES ("'+t+'", "'+r+'", "'+d+'", "'+n+'", "'+n+'", "1", "0")')}else e.executeSql('INSERT INTO datas (title, description, img, dateadd, dateupdate, encrypted, category) VALUES ("'+t+'", "'+i+'", "'+d+'", "'+n+'", "'+n+'", "0", "0")')}),$('input[name="add_title"]').val(""),$('textarea[name="add_description"]').val(""),$('file[name="add_img"]').val(""),$.post("/templates/view.html",function(e){$("#template_load").html(e),load_data(r)})})}else t.length<=0&&($('input[name="add_title"]').val("this field is empty.."),setTimeout(function(){$('input[name="add_title"]').val(t)},2e3)),i.length<=0&&($('textarea[name="add_description"]').val("this field is empty.."),setTimeout(function(){$('textarea[name="add_description"]').val(i)},2e3))}),e.off("change",'input[name="add_category_img"]').on("change",'input[name="add_category_img"]',function(){if(this.files&&this.files[0]){var e=new FileReader;e.onload=imageIsLoaded,e.readAsDataURL(this.files[0])}}),e.off("submit","#form_add_category").on("submit","#form_add_category",function(e){e.preventDefault();var t=$('input[name="add_category_title"]').val(),i=nl2br($('textarea[name="add_category_description"]').val());if(t.length>=1&&i.length>=1){var a=$('input[name="add_category_img"]').val(),o=$('input[name="add_category_img"]')[0],r=upload_img(a,o);c.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS category (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME)"),e.executeSql('INSERT INTO category (title, description, img, dateadd, dateupdate) VALUES ("'+t+'", "'+i+'", "'+r+'", "'+n+'", "'+n+'")'),$('input[name="add_category_title"]').val(""),$('textarea[name="add_category_description"]').val(""),$('file[name="add_category_img"]').val(""),setTimeout(function(){$("#return_home").click()},500)})}else t.length<=0&&($('input[name="add_category_title"]').val("this field is empty.."),setTimeout(function(){$('input[name="add_category_title"]').val(t)},2e3)),i.length<=0&&($('textarea[name="add_category_description"]').val("this field is empty.."),setTimeout(function(){$('textarea[name="add_category_description"]').val(i)},2e3))}),e.off("click",".category_item_edit").on("click",".category_item_edit",function(){var e=$(this).attr("data-id");$.post("/templates/edit_category.html",function(t){$("#template_load").html(t),c.transaction(function(t){t.executeSql("SELECT * FROM category WHERE rowid=?",[e],function(t,i){if(i.rows){var a=i.rows[0];$('input[name="row_id"]').val(e),$('input[name="edit_title"]').val(a.title),$("#add_img_loaded").html('<img src="/upload/'+a.img+'"/>');var n=a.description;n=n.replace(/<br\s*\/?>/gi,""),$('textarea[name="edit_description"]').val(n)}})})})}),e.off("submit","#form_edit_category").on("submit","#form_edit_category",function(e){e.preventDefault();var t=$('input[name="row_id"]').val(),i=$('input[name="edit_title"]').val(),a=nl2br($('textarea[name="edit_description"]').val());if(i.length>=1&&a.length>=1){var n=moment().format("YYYY-MM-DD HH:mm:ss"),o=$('input[name="edit_img"]').val(),r=$('input[name="edit_img"]')[0],d=upload_img(o,r);c.transaction(function(e){"default.png"!=d?e.executeSql("UPDATE category SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?",[i,a,d,n,t]):e.executeSql("UPDATE category SET title=?, description=?, dateupdate=? WHERE rowid=?",[i,a,n,t]),setTimeout(function(){$("#return_home").click()},500)})}else i.length<=0&&($('input[name="add_title"]').val("this field is empty.."),setTimeout(function(){$('input[name="add_title"]').val(i)},2e3)),a.length<=0&&($('textarea[name="add_description"]').val("this field is empty.."),setTimeout(function(){$('textarea[name="add_description"]').val(a)},2e3))}),e.off("change",'input[name="edit_img"]').on("change",'input[name="edit_img"]',function(){if(this.files&&this.files[0]){var e=new FileReader;e.onload=imageIsLoaded,e.readAsDataURL(this.files[0])}}),e.off("click",".view_item_edit").on("click",".view_item_edit",function(){var e=$(this).attr("data-id");$.post("/templates/edit.html",function(t){$("#template_load").html(t),c.transaction(function(t){t.executeSql("SELECT * FROM datas WHERE rowid=?",[e],function(t,i){if(i.rows){var a=i.rows[0];if("1"===a.encrypted)t.executeSql("SELECT key FROM encryption",[],function(e,t){if(t.rows[0]){var i=t.rows[0].key,n=a.description,o=CryptoJS.AES.decrypt(n,i);n=(o=o.toString(CryptoJS.enc.Utf8)).replace(/<br\s*\/?>/gi,""),$('textarea[name="edit_description"]').val(n),$('input[name="encrypt_state"]').val("1")}});else{var n=a.description;n=n.replace(/<br\s*\/?>/gi,""),$('textarea[name="edit_description"]').val(n),$('input[name="encrypt_state"]').val("0")}$('input[name="row_id"]').val(e),$('input[name="edit_title"]').val(a.title),$("#add_img_loaded").html('<img src="/upload/'+a.img+'"/>')}})})})}),e.off("submit","#form_edit_data").on("submit","#form_edit_data",function(e){e.preventDefault();var t=$('input[name="row_id"]').val(),i=$('input[name="edit_title"]').val(),a=nl2br($('textarea[name="edit_description"]').val()),n=$('input[name="encrypt_state"]').val();if(i.length>=1&&a.length>=1){var o=moment().format("YYYY-MM-DD HH:mm:ss"),r=$('input[name="edit_img"]').val(),d=$('input[name="edit_img"]')[0],l=upload_img(r,d);c.transaction(function(e){"1"===n?e.executeSql("SELECT key FROM encryption",[],function(e,n){if(n.rows[0]){var r=n.rows[0].key,c=CryptoJS.AES.encrypt(a,r);c=c.toString(),"default.png"!=l?e.executeSql("UPDATE datas SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?",[i,c,l,o,t]):e.executeSql("UPDATE datas SET title=?, description=?, dateupdate=? WHERE rowid=?",[i,c,o,t])}}):"default.png"!=l?e.executeSql("UPDATE datas SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?",[i,a,l,o,t]):e.executeSql("UPDATE datas SET title=?, description=?, dateupdate=? WHERE rowid=?",[i,a,o,t]),setTimeout(function(){$("#return_home").click()},500)})}else i.length<=0&&($('input[name="add_title"]').val("this field is empty.."),setTimeout(function(){$('input[name="add_title"]').val(i)},2e3)),a.length<=0&&($('textarea[name="add_description"]').val("this field is empty.."),setTimeout(function(){$('textarea[name="add_description"]').val(a)},2e3))}),e.off("click",".view_item_delete").on("click",".view_item_delete",function(){var e=$(this).attr("data-id");$('.item-delete-confirmation[data-id="'+e+'"]').fadeIn(300)}),e.off("click",".item_confirm_delete").on("click",".item_confirm_delete",function(){var e=$(this).parent(".item-delete-confirmation").attr("data-id");c.transaction(function(t){t.executeSql("DELETE FROM datas WHERE rowid=?",[e]),$("#view_data").html(""),load_data(r)})}),e.off("click",".item_cancel_delete").on("click",".item_cancel_delete",function(){var e=$(this).parent(".item-delete-confirmation").attr("data-id");$('.item-delete-confirmation[data-id="'+e+'"]').fadeOut(300)}),e.off("click",".category_item_delete").on("click",".category_item_delete",function(){var e=$(this).attr("data-id");$('.category-delete-confirmation[data-id="'+e+'"]').fadeIn(300)}),e.off("click",".category_confirm_delete").on("click",".category_confirm_delete",function(){var e=$(this).parent(".category-delete-confirmation").attr("data-id");c.transaction(function(t){t.executeSql("DELETE FROM category WHERE rowid=?",[e]),$("#view_data").html(""),load_data(r)})}),e.off("click",".category_cancel_delete").on("click",".category_cancel_delete",function(){var e=$(this).parent(".category-delete-confirmation").attr("data-id");$('.category-delete-confirmation[data-id="'+e+'"]').fadeOut(300)}),e.off("click",".category-hide").on("click",".category-hide",function(){var e=$(this).attr("data-id");$('.category-view-item[data-id="'+e+'"]').is(":visible")?$(this).children("i").css("transform","rotate(0deg)"):$(this).children("i").css("transform","rotate(45deg)"),$('.category-view-item[data-id="'+e+'"]').slideToggle(300)}),e.off("click",".hide-item").on("click",".hide-item",function(){var e=$(this),t=e.attr("data-id");$('.description-item[data-id="'+t+'"]').is(":visible")?e.children("i").css("transform","rotate(0deg)"):e.children("i").css("transform","rotate(90deg)"),$('.description-item[data-id="'+t+'"]').slideToggle(300)}),e.off("click",".view_show_all_description").on("click",".view_show_all_description",function(){$(".view-item").is(":visible")&&($(this).hide(),$(".view_hide_all_description").show(),$(".description-item").slideDown(300),$(".hide-item").children("i").css("transform","rotate(90deg)"))}),e.off("click",".view_hide_all_description").on("click",".view_hide_all_description",function(){$(".view-item").is(":visible")&&($(this).hide(),$(".view_show_all_description").show(),$(".description-item").slideUp(300),$(".hide-item").children("i").css("transform","rotate(0deg)"))}),e.off("click",".view_hide_all_item").on("click",".view_hide_all_item",function(){var e=$(this);$(".view-item").is(":visible")&&(e.hide(),$(".view_show_all_item").show(),$(".view-item").css("opacity","0"),$(".secret-img").fadeIn(300))}),e.off("click",".view_show_all_item").on("click",".view_show_all_item",function(){var e=$(this);$(".view-item").is(":visible")&&(e.hide(),$(".view_hide_all_item").show(),$(".view-item").css("opacity","1"),$(".secret-img").fadeOut(300))}),e.off("click",".view_show_all_category").on("click",".view_show_all_category",function(){var e=$(this);$(".category-view-item").is(":visible")?(e.css("transform","rotate(0deg)"),$(".category-view-item").hide(300),$(".category-hide").children("i").css("transform","rotate(0deg)")):(e.css("transform","rotate(45deg)"),$(".category-view-item").show(300),$(".category-hide").children("i").css("transform","rotate(45deg)"))}),e.off("mouseenter",".grip").on("mouseenter",".grip",function(){var e=$(this).attr("data-id");$('.grip-notice[data-id="'+e+'"]').fadeIn(300)}),e.off("mouseleave",".grip, .view-item").on("mouseleave",".grip, .view-item",function(){var e=$(this).attr("data-id");$('.grip-notice[data-id="'+e+'"]').hide()})}}});