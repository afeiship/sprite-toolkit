var Spritesmith = require('spritesmith');
var fs = require('fs');
var ejs = require('ejs');
var pd = require('pretty-data').pd;



// https://github.com/Ensighten/spritesmith

Spritesmith.run({
  src: [
    './assets/icons/icon_douban.png',
    './assets/icons/icon_qq.png'
  ],
  // algorithm: 'top-down',
  padding: 5
}, function handleResult(err, result) {
  if (err) {
    throw err;
  }
  // Output the image
  fs.writeFileSync(__dirname + '/dist/sprite.png', result.image);

  var fileEjs = fs.readFileSync(__dirname + '/assets/template/sprite.ejs');
  console.log(fileEjs.toString());
  var mySpriteData = {
    prefix: 'ico',
    items: [
      {
        name: 'github',
        x: 0,
        y: 0,
        width: 54,
        height: 54
      },
      {
        name: 'qq',
        x: 54,
        y: 0,
        width: 54,
        height: 54
      }
    ]
  };

  ejs.root = __dirname + '/assets/template/';

  var myFileLoad = function (filePath) {
    return 'myFileLoad: ' + fs.readFileSync(filePath);
  };

  ejs.fileLoader = myFileLoad;
  console.log(ejs)

  var rs = ejs.render(
    fileEjs.toString(),
    mySpriteData
  );

  fs.writeFileSync(__dirname + '/dist/sprite.css', pd.css(rs));

  console.log('render!', rs);
});
