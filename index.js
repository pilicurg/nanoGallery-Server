var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

/*  customize */
var port = 80;
var root = 'albums';
var filter = ['.jpg', 'png'];   //extension filter for image files
var thumbnailFolder = '_thumbnail';
var thumbnailPrefix = '';
var thumbnailSuffix = '';
/*  customize  */

function dirTree(dir, ext) {
    var Id = 0;
    var start = dir;

    function getTree(dir, ext, result, parentId) {
        var stat = fs.statSync(dir);
        var relpath = path.relative(start, dir);
        var basename = path.basename(dir);
        var item = {
            title: basename
        };
        if (parentId > 0) {
            item.albumID = parentId;
        }
        if (stat.isDirectory() && basename != thumbnailFolder) {

            item.kind = 'album';
            item.ID = Id++;

            if (relpath) {
                var content = fs.readdirSync(dir).filter(function (file) {
                    return fs.statSync(path.join(dir, file)).isFile() &&
                        ext.indexOf(path.extname(file).toLowerCase()) != -1;
                });
                if(content) {
                    item.src = path.join(relpath, content[0]);
                    result.push(item);
                }
            }
            result.concat(fs.readdirSync(dir).map(function (file) {
                return getTree(path.join(dir, file), ext, result, item.ID);
            }));

        } else if (
            stat.isFile() &&
            ext.indexOf(path.extname(dir).toLowerCase()) != -1
        ) {
            
            var srct;
            var thumbnailFilename =
                path.join(path.dirname(dir), thumbnailFolder,
                    (thumbnailPrefix + path.basename(dir, path.extname(dir)) + thumbnailSuffix + path.extname(dir)));
            try {
                fs.accessSync(thumbnailFilename);
                srct = thumbnailFilename;
            } catch(e){
                srct = dir;
            }
            if (fs.existsSync())


            item.kind = 'image';
            item.src = relpath;
            item.ID = Id++;
            item.srct = path.relative(start, srct);
            result.push(item);
        }

        return result;
    }

    return getTree(dir, ext, [], 0)
}


app.get('/list', function (req, res) {
    var tree = dirTree(root, filter);
    console.log(tree);
    var output = {error:null, data:tree};
    res.end(JSON.stringify(output));
});

app.use(express.static(__dirname));

app.listen(port);
