var fs = require('fs');
var path = require('path');
var filePath = path.resolve(process.cwd(), 'src/components');
console.log(filePath, 'filePath');
//调用文件遍历方法
fileDisplay(filePath);
 
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    fs.readdir(filePath, function(err,files){ // 根据文件路径读取文件，返回文件列表
      console.log(files, 'files');
        if(err){
            console.warn(err)
        }else{
            files.forEach(function(filename) { // 遍历读取到的文件列表
                var filedir = path.join(filePath,filename); // 获取当前文件的绝对路径
                fs.stat(filedir,function(eror,stats) {  //根据文件路径获取文件信息，返回一个fs.Stats对象
                    if(eror) {
                        console.warn('获取文件stats失败');
                    }else {
                        var isFile = stats.isFile(); // 文件
                        var isDir = stats.isDirectory(); // 文件夹
                        if(isFile){
                            if(filedir.includes('.js')){
                              const content = fs.readFileSync(filedir) // 读取内容
                              if (/import React/.test(content)) {
                                rename(filedir, filedir.replace('.js', '.jsx')) //这里请根据需要替换后缀名，是要把.js替换成.jsx
                              }
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir);// 递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

// 修改文件名称
function rename (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}