let gui = require('nw.gui');
let win = gui.Window.get();

let os = require('os');
let osplatform = os.platform()

console.log( '*** OS PLATFORM : '+osplatform+' ***' )

win.y = 0

//win.showDevTools()

if( osplatform === "darwin" ){

    let tray = null;
        tray = new nw.Tray({
            title: '',
            icon: 'assets/icon/16/lock.png',
            iconsAreTemplates: false
        });

    tray.on('click', function( event){
        console.log( win.window )
        win.show()
    })
}

else{

}


window.win_reload = ()=>{
    if( osplatform === "darwin" ){ tray.remove(); }
    win.reload()
}
