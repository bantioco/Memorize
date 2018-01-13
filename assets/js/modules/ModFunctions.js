let mod_functions = ()=>{

    var $d = $(document)

    var datetime    = moment().format("YYYY-MM-DD HH:mm:ss");

    if( window.openDatabase ){
        var db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);
        console.log('Success to open database')
    }
    else{
        import('../first_login.js').then(function(first_login) { first_login.default(); });
    }


    //var myIP;
    window.get_local_network_ip = ()=>{

        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};

        pc.createDataChannel("");

        pc.createOffer(pc.setLocalDescription.bind(pc), noop);

        pc.onicecandidate = function(ice){

            if(!ice || !ice.candidate || !ice.candidate.candidate)  return;

            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];

            pc.onicecandidate = noop;

            console.log( myIP )

            return myIP;

        };
    }
    //get_local_network_ip();

    window.nl2br = ( str, is_xhtml )=> {
        let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }

    window.imageIsLoaded = ( e )=> {
        $('#add_img_loaded').html('<img src="'+e.target.result+'"/>');
    };

    window.resize_img = ( file )=>{
    }

    window.copyFile = ( fs, path, filesrc, dirupload )=>{

        let f       = path.basename(filesrc);
        let source  = fs.createReadStream(filesrc);
        let dest    = fs.createWriteStream(path.resolve(dirupload, f));

        source.pipe(dest);

        source.on('end', function() {
            console.log('Succesfully copied');
        });
        source.on('error', function(err) {
            console.log(err);
        });
    }

    window.upload_img = ( img, $this )=>{

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


    window.item_sortable = ()=>{

        $( "#view_data" ).sortable({
            items: "> .view-item",
            handle: ".grip",
            containment: "parent",
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

                        $(v).find('.item-position').text(position)

                        db.transaction(function(tx) {
                            tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, rowid]);
                        })
                    })
                }

            }
        });
    }


    window.search_script = ()=>{
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


    window.load_data = ()=>{

        db.transaction(function(tx) {

            tx.executeSql('SELECT rowid, * FROM datas ORDER BY position ASC', [], function (tx, results) {

                if( results.rows ){

                    let data        = results.rows;

                    $(data).each(function(i, v) {

                        var description = v.description

                        if( v.encrypted === "1" ){

                            console.log('data encrypted')

                            tx.executeSql("SELECT key FROM encryption", [], function(tx,results) {
                                if( results.rows[0] ){

                                    let key = results.rows[0].key;

                                    description = CryptoJS.AES.decrypt(v.description, key);
                                    description = description.toString(CryptoJS.enc.Utf8);

                                    let item =
                                        '<div data-id="'+v.rowid+'" data-position="'+v.position+'" class="view-item keyword_data">'+

                                            '<div class="nav-item">'+
                                                '<div data-id="'+v.rowid+'" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>'+
                                                '<div class="title-item">'+v.title+'</div>'+
                                                '<div class="grip"><i class="fa fa-paw" aria-hidden="true"></i></div>'+
                                                '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>'+
                                                '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>'+
                                            '</div>'+

                                            '<div data-id="'+v.rowid+'" class="item-delete-confirmation">'+
                                                '<div class="item_confirm_delete">CONFIRM</div><div class="item_cancel_delete">CANCEL</div>'+
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

                                    $('#view_data').append(item)
                                }
                            })
                        }
                        else{
                            let item =
                                '<div data-id="'+v.rowid+'" data-position="'+v.position+'" class="view-item keyword_data">'+

                                    '<div class="nav-item">'+
                                        '<div data-id="'+v.rowid+'" class="hide-item"><i class="fa fa-angle-down" aria-hidden="true"></i></div>'+
                                        '<div class="title-item">'+v.title+'</div>'+
                                        '<div class="grip"><i class="fa fa-paw" aria-hidden="true"></i></div>'+
                                        '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-trash view_item_delete" aria-hidden="true"></i></div>'+
                                        '<div class="btn-nav"><i data-id="'+v.rowid+'" class="fa fa-pencil view_item_edit" aria-hidden="true"></i></div>'+
                                    '</div>'+

                                    '<div data-id="'+v.rowid+'" class="item-delete-confirmation">'+
                                        '<div class="item_confirm_delete">CONFIRM</div><div class="item_cancel_delete">CANCEL</div>'+
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

                            $('#view_data').append(item)
                        }

                        let position = i+1;

                        tx.executeSql('UPDATE datas SET position=? WHERE rowid=?', [i, v.rowid]);
                    });

                    item_sortable();
                    search_script();
                }
            });
        });
    }


    window.backup_database = ( table )=> {

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


    window.backup = (table)=> {

        var def = new $.Deferred();

        db.readTransaction(function(tx) {

            tx.executeSql("SELECT * FROM "+table, [], function(tx,results) {

                var data = results.rows

                def.resolve(data);
            });
        }, null);

        return def;
    }


    window.get_synchronise_table = ()=>{

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
            console.log('no database')
            thekey.resolve('null')
        })

        return thekey;
    }

    window.generate_key = ()=> {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    window.create_synchronise_table = ()=>{

        db.transaction(function (tx) {

            let key = generate_key()

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize (key, active, datestart DATETIME)');

            console.log( 'synchronize table created')

            tx.executeSql('INSERT INTO synchronize (key, active, datestart) VALUES ("'+key+'", "1", "'+datetime+'")');

            console.log( 'data insered in synchronize table')

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_autorized (key, ip, machine, dateadd DATETIME)');

            console.log( 'synchronize_autorized table created')

            tx.executeSql('CREATE TABLE IF NOT EXISTS synchronize_log (ip, key, datelog DATETIME)');

            console.log( 'synchronize_log table created')

        }, function( err ){

            console.log( err )

        })

        return
    }

    window.delete_synchronise_table = ()=>{

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


    window.get_server_sync_on_start = (myIP)=>{

        let key = null;

        $.when( get_synchronise_table() ).then(function( thiskey ){

            if( thiskey != 'null' ){
                key = thiskey
                setTimeout(function(){ http_server_start(myIP, key) },1500)
            }

        });
    }


    window.sync_data_check = (str)=>{

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

    window.sync_data_insert = ( data )=>{

        let title           = data.title
        let description     = data.description
        let img             = "default.png"
        let position        = "0"
        let dateadd         = data.dateadd
        let dateupdate      = data.dateupdate
        let encrypted       = data.encrypted

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO datas (title, description, img, position, dateadd, dateupdate, encrypted) VALUES ("'+title+'", "'+description+'", "'+img+'", "'+position+'", "'+dateadd+'", "'+dateupdate+'", "'+encrypted+'")');
        })
    }

    window.get_encryption =()=>{

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
            console.log('no database')
            data.resolve('null')
        })

        return data;
    }

    window.add_key_encryption = (str)=>{

        db.transaction(function(tx) {

            tx.executeSql("SELECT * FROM encryption", [], function(tx,results) {

                console.log( results )

                if( results.rows[0] ){
                    console.log( 'update' )
                    tx.executeSql('UPDATE encryption SET key=? where rowid=?', [str, 1]);
                }
                else{

                    tx.executeSql('INSERT INTO encryption (key) VALUES ("'+str+'")');
                }
                console.log( results )
            })
        })
    }

    window.encryption_state_value = (value)=>{

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

    window.crypt_data = (key)=>{

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
        console.log( 'crypt data' )
    }

    window.decrypt_data = (key)=>{

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

        console.log( 'decrypt data' )
    }

}
export default mod_functions
