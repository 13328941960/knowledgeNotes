var Folder = function(name) {
  this.name = name;
  this.parent = null;
  this.files = [];
}

Folder.prototype.add = function(file) {
  file.parent = this;
  this.files.push(file)
};

Folder.prototype.scan = function() {
  console.log(`扫描文件夹【${this.name}】`)
  for(var i = 0, file; file = this.files[i++];) {
    file.scan()
  }
}

Folder.prototype.remove = function() {
  if(!this.parent) return;
  for(var files = this.parent.files, l = files.length; l > 0; l--) {
    var file = files[l];
    if (file === this) {
      files.splice(l,l)
    }
  }
}

var File = function(name) {
  this.name = name;
  this.parent = null;
}

File.prototype.add = () => {
  throw new Error('文件夹下不能在添加文件夹')
};

File.prototype.scan = function() {
  console.log('扫描文件' + this.name)
};

File.prototype.remove = function() {
  for(var files = this.parent.files, l = files.length; l > 0; l--) {
    files.splice(l,l)
  }
}

var folder = new Folder('学习资料')
var folder1 = new Folder('JS');
var folder2 = new Folder('JQ');

var file1 = new File('《JS设计模式与实践》');
var file2 = new File('《精通JQ》')
var file3 = new File('《重构与实践》');

folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)

folder.remove(folder2)
folder.scan();
