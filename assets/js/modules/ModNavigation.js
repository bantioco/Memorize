let mod_navigation = ()=>{

    var $d = $(document)

    var remember    = "0";

    $d.off('click', '#return_home').on('click', '#return_home', function(){
        $.post('/templates/view.html', function( data ){

            $('#template_load').html( data );

            load_data();

        });
    })

    $d.off('click', '#show_params').on('click', '#show_params', function(){

        $.post('/templates/params.html', function( data ){

            $('#template_load').html( data );

            let key = null;

            $.when( get_synchronise_table(), get_encryption() ).then(function( data, encryption ){

                // SYNCHRONISE DATA
                if( data != 'null' ){
                    key = data;

                    $('#open_browser_localhost').fadeIn(300)

                    $('#load_link_for_sync').html('http://'+myIP+':3000/'+key)

                    $('#a_link_share_sync').attr('href', 'mailto:?subject=The link for share my access. Remove this email after sync app...&&cc='+email+'&body=http://'+myIP+':3000/'+key)

                    $('input[name="http_server"]').prop('checked', true);
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

            if(remember === "1" ){
                $('input[name="params_remember"]').prop('checked', true);
            }
            else{
                $('input[name="params_remember"]').prop('checked', false);
            }

            $('#get_api_for_synchronize_result_html').remove()
        });
    });

    $d.off('click', '#add_data').on('click', '#add_data', function(){
        $.post('/templates/add.html', function( data ){
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
                    import('../login.js').then(function(login) { login.default(); });
                });

            });

        });
    });

}
export default mod_navigation
