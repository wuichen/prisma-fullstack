import fs from 'fs'

const deleteFolderRecursive = (path: string) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive('src/pages/admin/models')
deleteFolderRecursive('src/api/graphql/models')
deleteFolderRecursive('src/graphql/generated')