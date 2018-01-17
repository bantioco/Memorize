let app = function(){

    let $d = $(document), login, email, remember = "0", datetime = moment().format("YYYY-MM-DD HH:mm:ss"), myIP;

    if( window.openDatabase ){
        var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);
    }
    else{
        import('./first_login.js').then(function(first_login) { first_login.default(); });
    }

    var order = "ASC";



    $('.icon-login').hide()
    $('.nav-btn').fadeIn(500)
    $('.nav-disconnect').fadeIn(500)


    /***********************************************************************
        FUNCTION
    ************************************************************************/

    let get_local_network_ip = ()=>{

        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};

        pc.createDataChannel("");

        pc.createOffer(pc.setLocalDescription.bind(pc), noop);

        pc.onicecandidate = function(ice){

            if(!ice || !ice.candidate || !ice.candidate.candidate)  return;

            myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

            pc.onicecandidate = noop;

            return myIP;

        };
    }

    get_local_network_ip();


    let nl2br = ( str, is_xhtml )=> {
        let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }

    let imageIsLoaded = ( e )=> {
        $('#add_img_loaded').html('<img src="'+e.target.result+'"/>');
    };

    let resize_img = ( file )=>{
    }

    let copyFile = ( fs, path, filesrc, dirupload )=>{

        let f       = path.basename(filesrc);
        let source  = fs.createReadStream(filesrc);
        let dest    = fs.createWriteStream(path.resolve(dirupload, f));

        source.pipe(dest);

        source.on('end', function() {

        });
        source.on('error', function(err) {
            console.log(err);
        });
    }

    let upload_img = ( img, $this )=>{

        let imgsend = "default.png";

        if( img.length >= 1 ){

            if ($this.files && $this.files[0]) {

                let $thisfile       = $this.files[0]
                let originalfile    = $thisfile.path

                let filename        = $thisfile.name
                let filetype        = $thisfile.type
                let filesize        = $thisfile.size

                if( filetype == "image/png" || filetype == "image/jpeg" ){

                    copyFile(fs, path, originalfile, './upload/');

                    imgsend = filename;
                }
            }

        }

        return imgsend;
    }


    let category_sortable = ()=>{

        $( "#view_data" ).sortable({
            items: ".view-category",
            handle: ".category-grip",
            opacity: 0.5,
            axis: "y",
            revert: true,
            stop: function(event, ui){

                if( window.openDatabase ){

                    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                    $('.view-category').each(function(i, v) {

                        console.log( v )

                        let position = i+1;

                        $(v).attr('data-position', i)
                        let rowid = $(v).attr('data-id')

                        //$(v).find('.item-position').text(position)

                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE category SET position=? WHERE rowid=?', [i, rowid]);
                        })
                    })
                }

            }
        })

    }


    let item_sortable = ()=>{

        $( "#view_data" ).sortable({
            items: ".sortable_element",
            handle: ".the_grip",
            /*connectWith: ".category-view-item",*/
            opacity: 0.5,
            axis: "y",
            revert: true,
            stop: function(event, ui){

                if( window.openDatabase ){

                    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                    $('.view-item').each(function(i, v) {

                        let position = i+1;

                        $(v).attr('data-position', i)
                        let rowid = $(v).attr('data-id')

                        //$(v).find('.item-position').text(position)

                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, rowid]);
                        })
                    })


                    $('.view-category').each(function(k, e) {

                        let position = k+1;

                        $(e).attr('data-position', k)
                        let rowid = $(e).attr('data-id')

                        //$(v).find('.item-position').text(position)

                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE category SET position=? WHERE rowid=?', [k, rowid]);
                        })
                    })
                }

            }
        })

        /*

        $( "#view_data" ).sortable({
            items: ".view-category",
            handle: ".category-grip",
            opacity: 0.5,
            axis: "y",
            revert: true,
            stop: function(event, ui){

                if( window.openDatabase ){

                    var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                    $('.view-category').each(function(i, v) {

                        console.log( v )

                        let position = i+1;

                        $(v).attr('data-position', i)
                        let rowid = $(v).attr('data-id')

                        //$(v).find('.item-position').text(position)

                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE category SET position=? WHERE rowid=?', [i, rowid]);
                        })
                    })
                }

            }
        })

        */
    }

    let targetID;

    let item_droppable = ()=>{

        $( ".category-view-item" ).droppable({
            accept: ".view-item",
            hoverClass: "drop-hover",
            over: function( event, ui ) {
                $(event.target).addClass('dropped');
                targetID    = $(event.target).attr('data-id')
            },
            drop: function( event, ui ){

                targetID    = $(event.target).attr('data-id')
                let clone       = $(ui.draggable[0]).clone()

                $(ui.draggable[0]).addClass("ToRemove")

                let itemID = $(ui.draggable[0]).attr('data-id')

                let check = $('.category-view-item[data-id="'+targetID+'"]').find('.ui-sortable-placeholder')

                if( check.length !=1 ){
                    $('.category-view-item[data-id="'+targetID+'"]').append(clone)
                }
                else{
                    $(clone).insertBefore('.ui-sortable-placeholder')
                    $('.ui-sortable-placeholder').hide()
                }

                $(clone).removeAttr('style')

                $('.ToRemove').remove()

                $('.category-view-item').removeClass('dropped')

                db.transaction(function(tx) {

                    tx.executeSql('UPDATE datas SET category=? WHERE rowid=?', [targetID, itemID])
                })
            },
            out: function( event, ui ) {

                let itemID = $(ui.draggable[0]).attr('data-id')

                db.transaction(function(tx) {
                    tx.executeSql('UPDATE datas SET category=? WHERE rowid=?', ["0", itemID]);
                })
            }
        });

    }

    let search_script = ()=>{
        /**************************************************
            FILTER SEARCH KEYWORDS
        **************************************************/
        jQuery.expr[':'].icontains = function(a, i, m) {
            var rExps=[
                {re: /[\xC0-\xC6]/g, ch: "A"},
                {re: /[\xE0-\xE6]/g, ch: "a"},
                {re: /[\xC8-\xCB]/g, ch: "E"},
                {re: /[\xE8-\xEB]/g, ch: "e"},
                {re: /[\xCC-\xCF]/g, ch: "I"},
                {re: /[\xEC-\xEF]/g, ch: "i"},
                {re: /[\xD2-\xD6]/g, ch: "O"},
                {re: /[\xF2-\xF6]/g, ch: "o"},
                {re: /[\xD9-\xDC]/g, ch: "U"},
                {re: /[\xF9-\xFC]/g, ch: "u"},
                {re: /[\xC7-\xE7]/g, ch: "c"},
                {re: /[\xD1]/g, ch: "N"},
                {re: /[\xF1]/g, ch: "n"}
            ];

            var element = $(a).text();
            var search = m[3];

            $.each(rExps, function() {
                element = element.replace(this.re, this.ch);
                search = search.replace(this.re, this.ch);
            });

            return element.toUpperCase().indexOf(search.toUpperCase()) >= 0;
        };
        /* ..SEARCH.. */
        $d.off('keyup', '#item_filter_keywords').on('keyup', '#item_filter_keywords', function(){

            var searchvalue = $(this).val()

            if( searchvalue.length >= 2 ){
                $('.keyword_data').hide()
                //$('.modal-title-content').hide()
                var keyword = $('.keyword_data:icontains("'+searchvalue+'")').show()
            }
            else{
                $('.keyword_data').show()
                //$('.modal-title-content').show()
            }
        });
        /**************************************************
            END -- FILTER SEARCH KEYWORDS
        **************************************************/
    }

    let load_category = ( order = "ASC" )=>{

        db.transaction(function(tx) {

            tx.executeSql('SELECT rowid, * FROM category ORDER BY position '+ order, [], function (tx, results) {

                if( results.rows ){

                    let data        = results.rows;

                    $(data).each(function(i, v) {

                        let category =
                            '<div data-id="'+v.rowid+'" data-position="'+v.position+'" class="view-category">'+
                                '<div class="title-block">'+
                                    '<div data-id="'+v.rowid+'" class="category-hide"><i class="fa fa-angle-down" aria-hidden="true"></i></div>'+
                                    '<div class="img-category"><img src="/upload/'+v.img+'"></div>'+
                                    '<div class="title-category">'+v.title+'</div>'+
                                    '<div class="category-btn"><i data-id="'+v.rowid+'" class="fa fa-trash category_item_delete" aria-hidden="true"></i></div>'+
                                    '<div class="category-btn"><i data-id="'+v.rowid+'" class="fa fa-pencil category_item_edit" aria-hidden="true"></i></div>'+
                                '</div>'+
                                '<div data-id="'+v.rowid+'" class="category-view-item"></div>'
                            '</div>';

                        $('#view_data').append(category)

                        $('.category-hide[data-id="'+v.rowid+'"]').children('i').css('transform','rotate(45deg)')

                    })

                    //category_sortable()

                }

            })

        })
    }


    let load_data = ( order="ASC" )=>{

        load_category(order)

        setTimeout(function(){

            if( window.openDatabase ){


                var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);

                db.transaction(function(tx) {

                    tx.executeSql('SELECT rowid, * FROM datas ORDER BY position '+ order, [], function (tx, results) {

                        if( results.rows ){

                            let data        = results.rows;

                            $(data).each(function(i, v) {

                                var description = v.description

                                if( v.encrypted === "1" ){

                                    tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {
                                        if( results.rows[0] ){

                                            let key = results.rows[0].key;

                                            description = CryptoJS.AES.decrypt(v.description, key);
                                            description = description.toString(CryptoJS.enc.Utf8);

                                            let item =
                                                '<div data-id="'+v.rowid+'" data-position="'+v.position+'" class="view-item keyword_data sortable_element">'+

                                                    '<div class="nav-item">'+
                                                        '<div data-id="'+v.rowid+'" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>'+
                                                        '<div class="title-item">'+v.title+'</div>'+
                                                        '<div data-id="'+v.rowid+'" class="grip-notice">Drag me..</div>'+
                                                        '<div data-id="'+v.rowid+'" class="grip the_grip"><i class="fa fa-paw" aria-hidden="true"></i></div>'+
                                                        '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>'+
                                                        '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>'+
                                                    '</div>'+

                                                    '<div data-id="'+v.rowid+'" class="item-delete-confirmation">'+
                                                        '<div class="item_confirm_delete">DELETE</div><div class="item_cancel_delete">CANCEL</div>'+
                                                    '</div>'+

                                                    '<div data-id="'+v.rowid+'" class="description-item">'+
                                                        '<div class="img"><img src="/upload/'+v.img+'" alt="" /></div>'+
                                                        '<div class="text">'+description+'</div>'+
                                                    '</div>'+
                                                    '<div class="date-item">'+
                                                        '<div class="item-encrypt">Encrypted..</div>'+
                                                        '<div class="item-position">'+position+'</div>'+
                                                        '<div class="date-up">Updated : '+v.dateupdate+'</div>'+
                                                    '</div>'+

                                                '</div>';

                                            if( v.category != "0"){

                                                if( $('.category-view-item[data-id="'+v.category+'"]').is(':visible') ){

                                                    $('.category-view-item[data-id="'+v.category+'"]').append(item)
                                                }
                                                else{

                                                   $('#view_data').append(item)
                                                }
                                            }
                                            else{
                                               $('#view_data').append(item)
                                            }
                                        }
                                    })
                                }
                                else{
                                    let item =
                                        '<div data-id="'+v.rowid+'" data-position="'+v.position+'" class="view-item keyword_data sortable_element">'+

                                            '<div class="nav-item">'+
                                                '<div data-id="'+v.rowid+'" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>'+
                                                '<div class="title-item">'+v.title+'</div>'+
                                                '<div data-id="'+v.rowid+'" class="grip-notice">Drag me..</div>'+
                                                '<div data-id="'+v.rowid+'" class="grip the_grip"><i class="fa fa-paw" aria-hidden="true"></i></div>'+
                                                '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>'+
                                                '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>'+
                                            '</div>'+

                                            '<div data-id="'+v.rowid+'" class="item-delete-confirmation">'+
                                                '<div class="item_confirm_delete">DELETE</div><div class="item_cancel_delete">CANCEL</div>'+
                                            '</div>'+

                                            '<div data-id="'+v.rowid+'" class="description-item">'+
                                                '<div class="img"><img src="/upload/'+v.img+'" alt="" /></div>'+
                                                '<div class="text">'+description+'</div>'+
                                            '</div>'+
                                            '<div class="date-item">'+
                                                '<div class="item-encrypt">Not encrypted..</div>'+
                                                '<div class="item-position">'+position+'</div>'+
                                                '<div class="date-up">Updated : '+v.dateupdate+'</div>'+
                                            '</div>'+

                                        '</div>';

                                    if( v.category != "0"){

                                        if( $('.category-view-item[data-id="'+v.category+'"]').is(':visible') ){

                                            $('.category-view-item[data-id="'+v.category+'"]').append(item)
                                        }
                                        else{
                                           $('#view_data').append(item)
                                        }
                                    }

                                    else{
                                       $('#view_data').append(item)
                                    }
                                }

                                let position = i+1;

                                tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, v.rowid]);
                            });

                            item_sortable();

                            search_script();

                            setTimeout(function(){
                                item_droppable();
                            },2000)
                        }
                    });
                });
            }
            else{
                import('./first_login.js').then(function(first_login) { first_login.default(); });
            }
        },500)
    }


    let backup_database = ( table )=> {

        let data = new Object();

        db.transaction(function(tx) {

            tx.executeSql("SELECT * FROM "+table, [], function( tx,results ) {

                if( results ){
                    $(results.rows).each(function(i,v){
                        data[i] = v
                    })
                    return data;
                }

                else{
                    return null;
                }
            });

        },null);
    }


    let backup = (table)=> {

        var def = new $.Deferred();

        db.readTransaction(function(tx) {

            tx.executeSql("SELECT * FROM "+table, [], function(tx,results) {

                var data = results.rows

                def.resolve(data);
            });
        }, null);

        return def;
    }


    let get_synchronise_table = ()=>{

        let thekey = new $.Deferred();

        db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM synchronize", [], function( tx,results ) {

                if( results ){
                    thekey.resolve(results.rows[0].key)
                }
                else{
                    thekey.resolve('null')
                }
            })

        }, function( err ){
            console.log( err )
            thekey.resolve('null')
        })

        return thekey;
    }

    let generate_key = ()=> {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    let create_synchronise_table = ()=>{

        db.transaction(function (tx) {

            let key = generate_key()

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize (key, active, datestart DATETIME)');

            tx.executeSql('INSERT INTO synchronize (key, active, datestart) VALUES ("'+key+'", "1", "'+datetime+'")');

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_autorized (key, ip, machine, dateadd DATETIME)');

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_log (ip, key, datelog DATETIME)');

            tx.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')");

        }, function( err ){

            console.log( err )
        })

        return
    }

    let delete_synchronise_table = ()=>{

        db.transaction(function (tx) {

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize",[],
                function(tx,results){ console.log("Successfully Dropped synchronize") },
                function(tx,error){ console.log("Could not delete synchronize") }
            );

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize_autorized",[],
                function(tx,results){ console.log("Successfully Dropped synchronize_autorized") },
                function(tx,error){ console.log("Could not delete synchronize_autorized") }
            );

            // FOR DEV...
            tx.executeSql("DROP TABLE synchronize_log",[],
                function(tx,results){ console.log("Successfully Dropped synchronize_log") },
                function(tx,error){ console.log("Could not delete synchronize_log") }
            );


        })
    }

    let get_server_sync_on_start = ()=>{

        let key = null;

        $.when( get_synchronise_table() ).then(function( thiskey ){

            if( thiskey != 'null' ){
                key = thiskey
                setTimeout(function(){ http_server_start(myIP, key) },1500)
            }

        });
    }
    get_server_sync_on_start()


    let sync_data_check = (str)=>{

        var def = new $.Deferred();

        db.readTransaction(function(tx) {

            tx.executeSql("SELECT * FROM datas WHERE title=?", [str], function(tx,results) {

                if( results ){
                    let item = results.rows
                     def.resolve(item);
                }
                else{
                    def = "no_data";
                }
            });
        }, function( err ){
            console.log( err )
        });

        return def;
    }

    let sync_data_insert = ( data )=>{

        let title           = data.title
        let description     = data.description
        let img             = "default.png"
        let position        = "0"
        let dateadd         = data.dateadd
        let dateupdate      = data.dateupdate
        let encrypted       = data.encrypted

        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')");
            tx.executeSql('INSERT INTO datas (title, description, img, position, dateadd, dateupdate, encrypted, category) VALUES ("'+title+'", "'+description+'", "'+img+'", "'+position+'", "'+dateadd+'", "'+dateupdate+'", "'+encrypted+'", "0")');
        })

        /*
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO datas (title, description, img, position, dateadd, dateupdate, encrypted) VALUES ("'+title+'", "'+description+'", "'+img+'", "'+position+'", "'+dateadd+'", "'+dateupdate+'", "'+encrypted+'")');
        })
        */
    }

    let get_encryption =()=>{

        let data = new $.Deferred();

        db.transaction(function(tx) {

            tx.executeSql("CREATE TABLE IF NOT EXISTS encryption (key, state VARCHAR NOT NULL DEFAULT '0')");

            tx.executeSql("SELECT rowid, * FROM encryption", [], function(tx,results) {

                if( results.rows[0]){
                    data.resolve(results.rows[0])
                }
                else{
                    data.resolve('null')
                }

            })

        },function( err ){
            console.log(err)
            data.resolve('null')
        })

        return data;
    }

    let add_key_encryption = (str)=>{

        db.transaction(function(tx) {

            tx.executeSql("SELECT * FROM encryption", [], function(tx,results) {

                if( results.rows[0] ){
                    tx.executeSql('UPDATE encryption SET key=? where rowid=?', [str, 1]);
                }
                else{

                    tx.executeSql('INSERT INTO encryption (key) VALUES ("'+str+'")');
                }
            })
        })
    }

    let encryption_state_value = (value)=>{

        db.transaction(function(tx) {

            if( value === "1"){
                tx.executeSql('UPDATE encryption SET state=? where rowid=?', ["1", 1]);

                tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {
                    if( results.rows[0] ){
                        let key = results.rows[0].key;

                        crypt_data(key)
                    }
                })
            }

            if( value === "0" ){
                tx.executeSql('UPDATE encryption SET state=? where rowid=?', ["0", 1]);

                tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {
                    if( results.rows[0] ){
                        let key = results.rows[0].key;
                        decrypt_data(key)
                    }
                })
            }
        })
    }

    let crypt_data = (key)=>{

        db.transaction(function(tx) {

            tx.executeSql("SELECT rowid, * FROM datas", [], function(tx,results) {

                if( results ){

                    $.each(results.rows, function(k,v){

                        let description_encrypt = CryptoJS.AES.encrypt(v.description, key);
                            description_encrypt = description_encrypt.toString()

                        let id = v.rowid

                        if( v.encrypted === "0"){
                            tx.executeSql('UPDATE datas SET description=? where rowid=?', [description_encrypt, id]);
                            tx.executeSql('UPDATE datas SET encrypted=? where rowid=?', ["1", id]);
                        }
                    })
                }
            })
        })
    }

    let decrypt_data = (key)=>{

        db.transaction(function(tx) {

            tx.executeSql("SELECT rowid, * FROM datas", [], function(tx,results) {

                if( results ){

                    $.each(results.rows, function(k,v){

                        let description_decrypt = CryptoJS.AES.decrypt(v.description, key);
                            description_decrypt = description_decrypt.toString(CryptoJS.enc.Utf8);

                        let id = v.rowid

                        if( v.encrypted === "1"){
                            tx.executeSql('UPDATE datas SET description=? where rowid=?', [description_decrypt, id]);
                            tx.executeSql('UPDATE datas SET encrypted=? where rowid=?', ["0", id]);
                        }
                    })
                }
            })

        })
    }

    let backup_download = ()=>{

        //GET BACKUP DATA BASE
        let file = path.basename('/data')+"/datas.json";
        fs.exists(file, (exists) => {

            if( exists ){

                $('#result_export_database_file').show()

                fs.readFile(file, 'utf8', function (err, data) {

                    if(!err){
                        var download = "text/json;charset=utf-8," + encodeURIComponent(data);
                        $('<a href="data:' + download + '" download="datas.json">Download JSON file</a>').appendTo('#result_export_database_file');
                    }

                })
            }
        });
    }

    /***********************************************
        **FOR DEV**
    ***********************************************/
        let add_column = ()=>{


            db.transaction(function(tx) {

                tx.executeSql("SELECT encrypted FROM datas", [], function( tx,results ) {})

            }, function(err){
                console.log( err )
                if( err.message === "could not prepare statement (1 no such column: encrypted)"){
                    db.transaction(function(tx) {
                        tx.executeSql("ALTER TABLE datas ADD encrypted VARCHAR NOT NULL DEFAULT '0' ")
                    })
                }
            })


            db.transaction(function(tx) {

                tx.executeSql("SELECT category FROM datas", [], function( tx,results ) {})

            }, function(err){
                console.log( err )
                if( err.message === "could not prepare statement (1 no such column: category)"){
                    db.transaction(function(tx) {
                        tx.executeSql("ALTER TABLE datas ADD category VARCHAR NOT NULL DEFAULT '0' ")
                    })
                }
            })



            db.transaction(function(tx) {

                tx.executeSql("SELECT state FROM encryption", [], function( tx,results ) {})

            }, function(err){
                console.log( err )
                if( err.message === "could not prepare statement (1 no such column: state)"){
                    db.transaction(function(tx) {
                        tx.executeSql("ALTER TABLE encryption ADD state VARCHAR NOT NULL DEFAULT '0' ")
                    })
                }
            })

        }
        add_column()
    /***********************************************
        END **FOR DEV**
    ***********************************************/


    /***********************************************************************
        START
    ************************************************************************/
    $('#app_nav').show()

    db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM user', [], function (tx, results) {

            if( results.rows[0] ){
                let user        = results.rows[0];

                login       = user.login;
                email       = user.email;
                remember    = user.remember;
            }
        });
    });

    // ** ON START LOAD VIEW.HTML **
    $.post('/templates/view.html', function( data ){

        $('#template_load').html( data );

        load_data(order);
    })


    /***********************************************************************
        NAVIGATION
    ************************************************************************/

    $d.off('click', '#return_home').on('click', '#return_home', function(){
        $.post('/templates/view.html', function( data ){

            $('#template_load').html( data );

            load_data(order);

        });
    })

    $d.off('click', '#show_params').on('click', '#show_params', function(){

        $.post('/templates/params.html', function( data ){

            $('#template_load').html( data );

            let key = null;

            //GET SYNCHRONIZE & ENCRYPTION..
            $.when( get_synchronise_table(), get_encryption() ).then(function( data, encryption ){

                // SYNCHRONISE DATA
                if( data != 'null' ){
                    key = data;

                    $('#open_browser_localhost').fadeIn(300)

                    $('#load_link_for_sync').html('http://'+myIP+':3000/'+key)

                    $('#a_link_share_sync').attr('href', 'mailto:?subject=The link for share my access. Remove this email after sync app...&&cc='+email+'&body=http://'+myIP+':3000/'+key)

                    $('input[name="http_server"]').prop('checked', true);

                    $('#params_encrypt_data_state').show()
                }
                else{
                    $('#params_encrypt_data_state').hide()
                }

                // ENCRYPTION DATA
                if( encryption != 'null' || encryption != null ){

                    $('#params_encryption').val(encryption.key)
                    $('#params_encrypt_data_state').show()

                    if( encryption.state === "1" ){
                        $('input#encrypt_data').prop('checked', true)
                        $('#params_encryption').prop('readonly', true)
                        $('#params_encryption').prop('disabled', true)
                    }
                    else{
                        $('input#encrypt_data').prop('checked', false)
                        $('#params_encryption').prop('readonly', false)
                        $('#params_encryption').prop('disabled', false)
                    }
                }

            });

            // GET REMEMBER
            if(remember === "1" ){
                $('input[name="params_remember"]').prop('checked', true);
            }
            else{
                $('input[name="params_remember"]').prop('checked', false);
            }

            backup_download();

            $('#get_api_for_synchronize_result_html').remove()
        });
    });

    $d.off('click', '#add_data').on('click', '#add_data', function(){
        $.post('/templates/add.html', function( data ){
            $('#template_load').html( data );
        });
    })

    $d.off('click', '#add_category').on('click', '#add_category', function(){
        $.post('/templates/add_category.html', function( data ){
            $('#template_load').html( data );
        });
    })

    $d.off('click', '#app_return').on('click', '#app_return', function(){
        $.post('/templates/view.html', function( data ){
            $('#template_load').html( data );
            add_navigation();
        });
    })

    $d.off('click', '#app_disconnect').on('click', '#app_disconnect', function(){

        db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                tx.executeSql('UPDATE user SET remember=? where rowid=?', ["0", 1], function(tx){
                    import('./login.js').then(function(login) { login.default(); });
                });

            });

        });
    });


    /***********************************************************************
        PARAMS
    ************************************************************************/

    $d.off('change', 'input[name="http_server"]').on('change', 'input[name="http_server"]', function(){

        let val = $(this).prop('checked')

        let key = null;

        if( val == true ){

            $.when( get_synchronise_table() ).then(function( thiskey ){

                if( thiskey != 'null' ){
                    key = thiskey
                    $('#open_browser_localhost').fadeIn(300)
                    $('#load_link_for_sync').html('http://'+myIP+':3000/'+key)
                    $('#a_link_share_sync').attr('href', 'mailto:?subject=The link for share my access app&&cc='+email+'&body=http://'+myIP+':3000/'+key)
                }
                else{

                    create_synchronise_table()

                    $.when( get_synchronise_table() ).then(function( newkey ){
                        key = newkey
                        $('#open_browser_localhost').fadeIn(300)
                        $('#load_link_for_sync').html('http://'+myIP+':3000/'+key)
                        $('#a_link_share_sync').attr('href', 'mailto:?subject=The link for share my access app&&cc='+email+'&body=http://'+myIP+':3000/'+key)
                    })
                }

            });

            setTimeout(function(){
                win_reload()
            },1500);
        }

        else{

            $('#open_browser_localhost').fadeOut(300)
            $('#sync_key_show').remove()

            delete_synchronise_table()

            setTimeout(function(){
                win_reload()
            },1000)
        }

    })

    $d.off('change', 'input[name="params_remember"]').on('change', 'input[name="params_remember"]', function(){

        let val = $(this).prop('checked')

        db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM user', [], function (tx, results) {

                if( val == true ){
                    tx.executeSql('UPDATE user SET remember=? where rowid=?', ["1", 1]);
                    remember    = "1";
                }
                else{
                    tx.executeSql('UPDATE user SET remember=? where rowid=?', ["0", 1]);

                    remember    = "0";
                }

            });

        });

    })

    $d.off('change', 'input[name="export_database"]').on('change', 'input[name="export_database"]', function(){

        let val = $(this).prop('checked')

        if( val == true ){

            //let datasdata   = backup_database("datas");

            $.when(
                backup("datas"),
                backup("user")
            ).then(function( datas, user ){

                if( datas.length >= 1 ){

                    $('input[name="export_database"]').hide()
                    $('#result_export_database').fadeIn(300).append('<small>Data succesfully exported</small>')

                    let datadatas = {datas:datas};
                    let serializedDataData = JSON.stringify(datadatas);

                    fs.writeFile("data/datas.json", serializedDataData, (err) => {

                        if (err) {
                            console.error(err);
                            return;
                        };

                        $('input[name="export_database"]').prop('checked', false)

                        if( $('#result_export_database_file').is(':hidden') ){
                            backup_download();
                        }
                    });
                }


                if( user.length >= 1 ){
                    $('input[name="export_database"]').hide()
                    $('#result_export_database').fadeIn(300).append('<small>User succesfully exported</small>')

                    let datauser = {user:user};
                    let serializedDataUser = JSON.stringify(datauser);

                }

                setTimeout(function(){
                    $('#result_export_database').fadeOut(300).html('')
                    $('input[name="export_database"]').show(300)
                },3000)
            })
        }

    })

    $d.off('click', '#get_api_for_synchronize').on('click', '#get_api_for_synchronize', function( e ){

        e.preventDefault()

        let apilink = $('#api_for_synchronize').val()

        $('#get_api_for_synchronize_result_html').remove()

        if( apilink.length >= 25 ){

            $.getJSON( apilink, function( data ){

                if( data ){

                    let items = data.datas

                    $.each(items, function(k, v) {

                        let title = v.title

                        $.when( sync_data_check( title ) ).then(function( items ){

                            if( items.length <= 0 ){
                                sync_data_insert(v)
                                $('#get_api_for_synchronize_result').html('<div id="get_api_for_synchronize_result_html">'+title+' insered..</div>')
                            }
                            else{
                                $('#get_api_for_synchronize_result').html('<div id="get_api_for_synchronize_result_html">All items are allready on database..</div>')
                            }

                        });
                    });
                }
            })
        }

        else if( apilink.length === 0 ){
            $('#api_for_synchronize').val("Enter link in field..")

            setTimeout(function(){ $('#api_for_synchronize').val(apilink); },2000)
        }

        else{
            $('#api_for_synchronize').val("Link is not valid...")

            setTimeout(function(){ $('#api_for_synchronize').val(apilink); },2000)
        }
    })


    $d.off('click', '#send_params_encryption').on('click', '#send_params_encryption', function( e ){
        e.preventDefault()

        let value = $('#params_encryption').val()

        if( value.length >= 8 ){
            add_key_encryption( value )

            $('#params_encryption_result').html('<div id="params_encryption_result_html">Added !</div>')
            setTimeout(function(){ $('#params_encryption_result_html').remove() },1500)
        }
        else{
            $('#params_encryption').val('8 print minimum required..')
            setTimeout(function(){ $('#params_encryption').val(value); },2000)
        }
    });


    $d.off('change', 'input[name="encrypt_data"]').on('change', 'input[name="encrypt_data"]', function(){

        let val = $(this).prop('checked')

        if( val == true ){
            encryption_state_value("1")
            $('#params_encryption').prop('readonly', true)
            $('#params_encryption').prop('disabled', true)

            $('#encrypt_data_result').html('<div id="encrypt_data_result_html">Crypted !</div>')
            setTimeout(function(){ $('#encrypt_data_result_html').remove() },1500)
        }
        else{
            encryption_state_value("0")
            $('#params_encryption').prop('readonly', false)
            $('#params_encryption').prop('disabled', false)

            $('#encrypt_data_result').html('<div id="encrypt_data_result_html">Decrypted !</div>')
            setTimeout(function(){
                $('#encrypt_data_result_html').remove()
            },1500)
        }
    })

    $d.off('change', 'input[name="import_database"]').on('change', 'input[name="import_database"]', function(){

        let file = $(this).val()

        fs.readFile(file, 'utf8', function (err, data) {
            if (err){
                console.log( err )
            }

            else{

                let json        = $.parseJSON( data )
                let jsondata    = json.datas

                $.each(jsondata, function( k, v){

                    let title = v.title

                    $.when( sync_data_check( title ) ).then(function( items ){

                        if( items.length <= 0 ){

                            sync_data_insert(v)
                            $('#result_import_database').text(v.title + ' insered in database..').show()
                        }
                        else{
                            $('#result_import_database').text('All items are allready on database..').show()
                        }
                    })
                })
            }
        })
    })

    $d.off('click', '.key_encription_show').on('click', '.key_encription_show', function(){

        $('.key_encription_show').hide()
        $('.key_encription_hide').show()

        $('input[name="params_encryption"]').attr('type', 'text')

    })


    $d.off('click', '.key_encription_hide').on('click', '.key_encription_hide', function(){

        $('.key_encription_hide').hide()
        $('.key_encription_show').show()

        $('input[name="params_encryption"]').attr('type', 'password')

    })


    /***********************************************************************
        ADD DATA
    ************************************************************************/
    $d.off('change', 'input[name="add_img"]').on('change', 'input[name="add_img"]', function(){

        if (this.files && this.files[0]) {

            let reader      = new FileReader();
            reader.onload   = imageIsLoaded;

            reader.readAsDataURL(this.files[0]);
        }

    })

    $d.off('submit', '#form_add_data').on('submit', '#form_add_data', function( e ){
        e.preventDefault()

        let title       = $('input[name="add_title"]').val()
        let description = nl2br( $('textarea[name="add_description"]').val() )

        if( title.length >= 1 && description.length >= 1 ){

            let img         = $('input[name="add_img"]').val()

            let $this = $('input[name="add_img"]')[0]

            let imgsend = upload_img(img, $this);

            db.transaction(function (tx) {

                tx.executeSql("CREATE TABLE IF NOT EXISTS datas (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME, encrypted VARCHAR NOT NULL DEFAULT '0', category VARCHAR NOT NULL DEFAULT '0')");

                tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {
                    if( results.rows[0] ){

                        let key = results.rows[0].key;

                        let description_encrypt = CryptoJS.AES.encrypt(description, key);
                        description_encrypt = description_encrypt.toString()

                        tx.executeSql('INSERT INTO datas (title, description, img, dateadd, dateupdate, encrypted, category) VALUES ("'+title+'", "'+description_encrypt+'", "'+imgsend+'", "'+datetime+'", "'+datetime+'", "1", "0")');
                    }
                    else{
                        tx.executeSql('INSERT INTO datas (title, description, img, dateadd, dateupdate, encrypted, category) VALUES ("'+title+'", "'+description+'", "'+imgsend+'", "'+datetime+'", "'+datetime+'", "0", "0")');
                    }
                })


                //tx.executeSql('INSERT INTO datas (title, description, img, dateadd, dateupdate) VALUES ("'+title+'", "'+description+'", "'+imgsend+'", "'+datetime+'", "'+datetime+'")');

                $('input[name="add_title"]').val('')
                $('textarea[name="add_description"]').val('')
                $('file[name="add_img"]').val('')


                $.post('/templates/view.html', function( data ){

                    $('#template_load').html( data );

                    load_data(order);
                })

            })

        }
        else{

            if(title.length <=0 ){

                $('input[name="add_title"]').val('this field is empty..')

                setTimeout(function(){
                    $('input[name="add_title"]').val(title)
                },2000)
            }

            if(description.length <=0 ){

                $('textarea[name="add_description"]').val('this field is empty..')

                setTimeout(function(){
                    $('textarea[name="add_description"]').val(description)
                },2000)
            }
        }
    })


    /***********************************************************************
        ADD CATEGORY
    ************************************************************************/
    $d.off('change', 'input[name="add_category_img"]').on('change', 'input[name="add_category_img"]', function(){

        if (this.files && this.files[0]) {

            let reader      = new FileReader();
            reader.onload   = imageIsLoaded;

            reader.readAsDataURL(this.files[0]);
        }

    })

    $d.off('submit', '#form_add_category').on('submit', '#form_add_category', function( e ){
        e.preventDefault()

        let title       = $('input[name="add_category_title"]').val()
        let description = nl2br( $('textarea[name="add_category_description"]').val() )

        if( title.length >= 1 && description.length >= 1 ){

            let img         = $('input[name="add_category_img"]').val()

            let $this = $('input[name="add_category_img"]')[0]

            let imgsend = upload_img(img, $this);

            db.transaction(function (tx) {

                tx.executeSql("CREATE TABLE IF NOT EXISTS category (title, description LONGTEXT, img, position, dateadd DATETIME, dateupdate DATETIME)");

                tx.executeSql('INSERT INTO category (title, description, img, dateadd, dateupdate) VALUES ("'+title+'", "'+description+'", "'+imgsend+'", "'+datetime+'", "'+datetime+'")');

                $('input[name="add_category_title"]').val('')
                $('textarea[name="add_category_description"]').val('')
                $('file[name="add_category_img"]').val('')


                $.post('/templates/view.html', function( data ){

                    $('#template_load').html( data );

                    load_data(order);
                })

            })

        }
        else{

            if(title.length <=0 ){

                $('input[name="add_category_title"]').val('this field is empty..')

                setTimeout(function(){
                    $('input[name="add_category_title"]').val(title)
                },2000)
            }

            if(description.length <=0 ){

                $('textarea[name="add_category_description"]').val('this field is empty..')

                setTimeout(function(){
                    $('textarea[name="add_category_description"]').val(description)
                },2000)
            }
        }
    })


    /***********************************************************************
        EDIT CATEGORY
    ************************************************************************/

    $d.off('click', '.category_item_edit').on('click', '.category_item_edit', function(){

        let rowid = $(this).attr('data-id')

        $.post('/templates/edit_category.html', function( data ){

            $('#template_load').html( data );

            db.transaction(function(tx) {

                tx.executeSql('SELECT * FROM category WHERE rowid=?', [rowid], function(tx, results){

                    if( results.rows ){

                        let data        = results.rows[0];

                        $('input[name="row_id"]').val(rowid)
                        $('input[name="edit_title"]').val(data.title)
                        $('#add_img_loaded').html('<img src="/upload/'+data.img+'"/>')

                        let description = data.description
                                description = description.replace(/<br\s*\/?>/gi, "")
                        $('textarea[name="edit_description"]').val(description)
                    }
                })
            })
        })
    })

    $d.off('submit', '#form_edit_category').on('submit', '#form_edit_category', function( e ){

        e.preventDefault()

        let rowid           = $('input[name="row_id"]').val();
        let title           = $('input[name="edit_title"]').val()
        let description     = nl2br( $('textarea[name="edit_description"]').val() )

        if( title.length >= 1 && description.length >= 1 ){

            let datetime    = moment().format("YYYY-MM-DD HH:mm:ss");
            let img         = $('input[name="edit_img"]').val()

            let $this       = $('input[name="edit_img"]')[0]
            let imgsend     = upload_img(img, $this);

            db.transaction(function (tx) {

                if( imgsend != "default.png" ){

                    tx.executeSql('UPDATE category SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?', [title, description, imgsend, datetime, rowid]);
                }
                else{
                    tx.executeSql('UPDATE category SET title=?, description=?, dateupdate=? WHERE rowid=?', [title, description, datetime, rowid]);
                }


                $.post('/templates/view.html', function( data ){

                    $('#template_load').html( data );

                    load_data(order);
                })

            })

        }
        else{

            if(title.length <=0 ){

                $('input[name="add_title"]').val('this field is empty..')

                setTimeout(function(){
                    $('input[name="add_title"]').val(title)
                },2000)
            }

            if(description.length <=0 ){

                $('textarea[name="add_description"]').val('this field is empty..')

                setTimeout(function(){
                    $('textarea[name="add_description"]').val(description)
                },2000)
            }
        }
    })


    /***********************************************************************
        EDIT DATA
    ************************************************************************/
    $d.off('change', 'input[name="edit_img"]').on('change', 'input[name="edit_img"]', function(){

        if (this.files && this.files[0]) {

            let reader      = new FileReader();
            reader.onload   = imageIsLoaded;

            reader.readAsDataURL(this.files[0]);
        }

    })

    $d.off('click', '.view_item_edit').on('click', '.view_item_edit', function(){

        let rowid = $(this).attr('data-id')

        $.post('/templates/edit.html', function( data ){

            $('#template_load').html( data );

            db.transaction(function(tx) {

                tx.executeSql('SELECT * FROM datas WHERE rowid=?', [rowid], function(tx, results){

                    if( results.rows ){

                        let data        = results.rows[0];

                        if( data.encrypted === "1"){

                            tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {

                                if( results.rows[0] ){

                                    let key = results.rows[0].key;

                                    let description = data.description
                                    let description_decrypt = CryptoJS.AES.decrypt(description, key);
                                        description_decrypt = description_decrypt.toString(CryptoJS.enc.Utf8);

                                        description = description_decrypt.replace(/<br\s*\/?>/gi, "")
                                    $('textarea[name="edit_description"]').val(description)

                                    $('input[name="encrypt_state"]').val("1")
                                }
                            })
                        }
                        else{

                            let description = data.description
                                description = description.replace(/<br\s*\/?>/gi, "")
                            $('textarea[name="edit_description"]').val(description)
                            $('input[name="encrypt_state"]').val("0")
                        }

                        $('input[name="row_id"]').val(rowid)
                        $('input[name="edit_title"]').val(data.title)
                        $('#add_img_loaded').html('<img src="/upload/'+data.img+'"/>')
                    }
                });
            })
        })
    })

    $d.off('submit', '#form_edit_data').on('submit', '#form_edit_data', function( e ){

        e.preventDefault()

        let rowid           = $('input[name="row_id"]').val();
        let title           = $('input[name="edit_title"]').val()
        let description     = nl2br( $('textarea[name="edit_description"]').val() )
        let encrypt_sate    = $('input[name="encrypt_state"]').val()

        if( title.length >= 1 && description.length >= 1 ){

            let datetime    = moment().format("YYYY-MM-DD HH:mm:ss");
            let img         = $('input[name="edit_img"]').val()

            let $this       = $('input[name="edit_img"]')[0]
            let imgsend     = upload_img(img, $this);

            db.transaction(function (tx) {

                if( encrypt_sate === "1" ){

                    tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {

                        if( results.rows[0] ){

                            let key = results.rows[0].key;

                            let description_encrypt = CryptoJS.AES.encrypt(description, key);
                                description_encrypt = description_encrypt.toString()

                            if( imgsend != "default.png" ){

                                tx.executeSql('UPDATE datas SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?', [title, description_encrypt, imgsend, datetime, rowid]);
                            }
                            else{
                                tx.executeSql('UPDATE datas SET title=?, description=?, dateupdate=? WHERE rowid=?', [title, description_encrypt, datetime, rowid]);
                            }
                        }
                    })
                }
                else{

                    if( imgsend != "default.png" ){

                        tx.executeSql('UPDATE datas SET title=?, description=?, img=?, dateupdate=? WHERE rowid=?', [title, description, imgsend, datetime, rowid]);
                    }
                    else{
                        tx.executeSql('UPDATE datas SET title=?, description=?, dateupdate=? WHERE rowid=?', [title, description, datetime, rowid]);
                    }
                }

                $.post('/templates/view.html', function( data ){

                    $('#template_load').html( data );

                    load_category(order)
                })

            })

        }
        else{

            if(title.length <=0 ){

                $('input[name="add_title"]').val('this field is empty..')

                setTimeout(function(){
                    $('input[name="add_title"]').val(title)
                },2000)
            }

            if(description.length <=0 ){

                $('textarea[name="add_description"]').val('this field is empty..')

                setTimeout(function(){
                    $('textarea[name="add_description"]').val(description)
                },2000)
            }
        }
    })


    /***********************************************************************
        VIEW DATA
    ************************************************************************/
    $d.off('click', '.view_item_delete').on('click', '.view_item_delete', function(){

        let rowid = $(this).attr('data-id')

        $('.item-delete-confirmation[data-id="'+rowid+'"]').fadeIn(300);

    })

    $d.off('click', '.item_confirm_delete').on('click', '.item_confirm_delete', function(){

        let rowid = $(this).parent('.item-delete-confirmation').attr('data-id')

        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM datas WHERE rowid=?', [rowid]);

            $('#view_data').html('')

            load_data(order);
        });

    })

    $d.off('click', '.item_cancel_delete').on('click', '.item_cancel_delete', function(){

        let rowid = $(this).parent('.item-delete-confirmation').attr('data-id')

        $('.item-delete-confirmation[data-id="'+rowid+'"]').fadeOut(300);

    })

    $d.off('click', '.category-hide').on('click', '.category-hide', function(){

        let rowid = $(this).attr('data-id');

        if( $('.category-view-item[data-id="'+rowid+'"]').is(':visible') ){
            $(this).children('i').css('transform','rotate(0deg)')
        }
        else{
            $(this).children('i').css('transform','rotate(45deg)')
        }

        $('.category-view-item[data-id="'+rowid+'"]').slideToggle(300)

    })

    $d.off('click', '.hide-item').on('click', '.hide-item', function(){

        let rowid = $(this).attr('data-id');

        if( $('.description-item[data-id="'+rowid+'"]').is(':visible') ){
            $(this).children('i').css('transform','rotate(0deg)')
        }
        else{
            $(this).children('i').css('transform','rotate(45deg)')
        }

        $('.description-item[data-id="'+rowid+'"]').slideToggle(300)

    })

    $d.off('click', '.view_show_all_description').on('click', '.view_show_all_description', function(){

        if( $('.view-item').is(':visible') ){
            $(this).hide()
            $('.view_hide_all_description').show()
            $('.description-item').slideDown(300)
        }
    })

    $d.off('click', '.view_hide_all_description').on('click', '.view_hide_all_description', function(){

        if( $('.view-item').is(':visible') ){
            $(this).hide()
            $('.view_show_all_description').show()
            $('.description-item').slideUp(300)
        }

    })

    $d.off('click', '.view_hide_all_item').on('click', '.view_hide_all_item', function(){

        if( $('.view-item').is(':visible') ){
            $(this).hide()
            $('.view_show_all_item').show()
            $('.view-item').css('opacity', '0')
            $('.secret-img').fadeIn(300)
        }

    })

    $d.off('click', '.view_show_all_item').on('click', '.view_show_all_item', function(){

        if( $('.view-item').is(':visible') ){
            $(this).hide()
            $('.view_hide_all_item').show()
            $('.view-item').css('opacity','1')
            $('.secret-img').fadeOut(300)
        }

    })

    $d.off('mouseenter', '.grip').on('mouseenter', '.grip', function(){
        let dataid = $(this).attr('data-id')
        $('.grip-notice[data-id="'+dataid+'"]').fadeIn(300)
    })
    $d.off('mouseleave', '.grip, .view-item').on('mouseleave', '.grip, .view-item', function(){
        let dataid = $(this).attr('data-id')
        $('.grip-notice[data-id="'+dataid+'"]').hide()
    })

    /*
    $d.off('mouseenter', '.category-grip').on('mouseenter', '.category-grip', function(){
        let dataid = $(this).attr('data-id')
        $('.category-grip-notice[data-id="'+dataid+'"]').fadeIn(300)
    })
    $d.off('mouseleave', '.category-grip, .view-category').on('mouseleave', '.category-grip, .view-category', function(){
        let dataid = $(this).attr('data-id')
        $('.category-grip-notice[data-id="'+dataid+'"]').hide()
    })
    */

    /*
    //Disabled
    $d.off('click', '.view_sort_item_asc').on('click', '.view_sort_item_asc', function(){

        if( $('.view-item').is(':visible') ){

            order = "DESC";

            $('.fa-sort-amount-asc').hide()
            $('.fa-sort-amount-desc').show()

            $('.view-item').remove()
            $('#view_data').html('')

            load_data(order);

            //setTimeout(function(){ load_data(order); },1000)
        }
    })

    $d.off('click', '.view_sort_item_desc').on('click', '.view_sort_item_desc', function(){

        if( $('.view-item').is(':visible') ){

            order = "ASC";

            $('.fa-sort-amount-desc').hide()
            $('.fa-sort-amount-asc').show()

            $('.view-item').remove()
            $('#view_data').html('')

            load_data(order);

            //setTimeout(function(){ load_data(order); },1000)
        }
    })
    */


}
export default app
