var player = null;

function initPlayer(p){
    p.onopened = function(info){
        document.getElementById('playMode').value = 'Normal Mode';
        var fi = document.getElementById('fileInfo');
        fi.innerHTML = 'Size: ' + hi5.tool.bytesToSize(info.size) + ', Video length: ' + (info.length / (1000 * 60)).toFixed(2) + ' minutes';
        document.getElementById('seekbar').style.width = info.width + 'px';
    };
    p.onprogress = function(played, total){
        document.getElementById('seekpos').style.width = (played / total * 100) + '%'; 
    };
}
window.addEventListener('load', function(){
    function handleFiles(files){
        if (files.length == 0) return;
        if (player){
            player.close();
        }
        player = new svGlobal.RdpPlayer();
        initPlayer(player);
        player.setSource(files[0]); 
        player.play();
        //player.speedup(true);
    }
    var c = document.getElementById('remotectrl');
    svGlobal.util.initMapDisk(c, handleFiles);
    
    function handleFileSelect(e){
        handleFiles(e.target.files);
    }
    document.getElementById('rdpv').addEventListener('change', handleFileSelect, false);
    document.getElementById('playserver').addEventListener('click', function(){
        broadcast('/temp/test.rdpv');
    }, false);
    
    document.getElementById('play').addEventListener('click', function(){
        player.play();
    }, false);
    
    document.getElementById('pause').addEventListener('click', function(){
        player.pause();
    }, false);

    document.getElementById('stop').addEventListener('click', function(){
        player.close();
    }, false);

    document.getElementById('playMode').addEventListener('click', function(){
        setMode();
    }, false);

    
}, false);

function setMode(){
    var mode = document.getElementById('playMode');
    var scanMode = mode.value == 'Normal Mode'; 
    player.scan(scanMode);
    
    if (scanMode){
        mode.value = 'Scan Mode';
    }else{
        mode.value = 'Normal Mode';
    }
}

function broadcast(file){
    var protocol = ('https:' == location.protocol) ? 'wss://' : 'ws://';
    var gateway = window.location.host;
    if (gateway.length < 1) gateway = 'localhost';
    var url = protocol + gateway + '/PLAY?f=' + file;
    if (player){
        player.close();
    }
    player = new Rdp(url);
    initPlayer(player);
    player.addSurface(new svGlobal.LocalInterface());
    player.run();
}

