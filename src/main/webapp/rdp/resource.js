function getLibPath(f) {
      var tags = document.getElementsByTagName('script');
      var j, s, result = null, len = tags.length;
      for (var i = 0; i < len; i++) {
        s = tags[i].src;
        j = s.indexOf(f);
        if (j > -1) {
          result = s.substring(0, j);
          break;
        }
      }
      return result;
}

function svloadResource() {

    function createScript(name) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = name;
        return s;
    }

    var nl = navigator.language || navigator.userLanguage;

    console.log('User language:' + nl);

    var libPath = getLibPath('resource.js');

    var lan = 'en';

    if (nl == 'en' || (nl.indexOf('en-') == 0)) {
        lan = 'en';
    }else if (nl.indexOf('zh-CN') == 0) {
        lan = 'zh-CN';
    }else if (nl.indexOf('zh-TW') == 0) {
        lan = 'zh-TW';
    }else if (nl == 'de' || (nl.indexOf('de-') == 0)) {
        lan = 'de';
    }

    console.log('lan:' + lan);
    libPath += ('strings-' + lan + '.js');
    console.log('libPath resources:' + libPath);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = libPath;
    var p = document.body || document.getElementsByTagName('script')[0].parentNode; 
    p.appendChild(script);
    console.log('加载中文支持完毕');
}
svloadResource();
