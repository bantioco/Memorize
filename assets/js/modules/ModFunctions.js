let mod_functions = ()=>{

    var $d = $(document)
    var datetime    = moment().format("YYYY-MM-DD HH:mm:ss");

    var db = null;

    if( window.openDatabase ){

        db = openDatabase('my_acess_db', '1.0', 'My access db', 5 * 1024 * 1024);
        console.log('Success to open database')
    }
    else{
        import('../first_login.js').then(function(first_login) { first_login.default(); });
    }

}
export default mod_functions
