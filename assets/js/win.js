let gui = require('nw.gui');
let win = gui.Window.get();

let os = require('os');
let osplatform = os.platform()

console.log( osplatform )

win.y = 0

win.showDevTools()

let tray = null;
    tray = new nw.Tray({
        title: '',
        icon: 'assets/icon/16/lock.png',
        iconsAreTemplates: false
    });

tray.on('click', function( event){
    console.log( win.window )
})

console.log( win )


window.win_reload = ()=>{
    tray.remove();
    win.reload()
}
