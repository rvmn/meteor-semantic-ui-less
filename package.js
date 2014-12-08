Package.describe({
  summary: "Semantic UI packaged for Meteor using less",
  version: "0.19.3",
  name: "nooitaf:semantic-ui-less",
  git: "https://github.com/nooitaf/meteor-semantic-ui-less.git"
});

// TODO: make this less ugly in future
function getFilesFromFolder(packageName, folder){
  // local imports
  var _ = Npm.require("underscore");
  var fs = Npm.require("fs");
  var path = Npm.require("path");
  // helper function, walks recursively inside nested folders and return absolute filenames
  function walk(folder){
    var filenames = [];
    // get relative filenames from folder
    var folderContent = fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent, function(filename) {
      // build absolute filename
      var absoluteFilename = path.join(folder, filename);
      // get file stats
      var stat = fs.statSync(absoluteFilename);
      if(stat.isDirectory()){
        // directory case => add filenames fetched from recursive call
        filenames = filenames.concat(walk(absoluteFilename));
      }
      else{
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  // save current working directory (something like "/home/user/projects/my-project")
  var cwd = process.cwd();

  var isRunningFromApp = fs.existsSync(path.resolve("packages"));
  var packagePath = isRunningFromApp ? path.resolve("packages", packageName) : "";

  packagePath = path.resolve(packagePath);
  // chdir to our package directory
  process.chdir(path.join(packagePath));
  // launch initial walk
  var result = walk(folder);
  // restore previous cwd
  process.chdir(cwd);
  return result;
}


Package.on_use(function (api) {

  api.versionsFrom('METEOR@0.9.1');
  api.use(['jquery','less'],'client');
  
  var path = Npm.require('path');
  
  var assetFiles = getFilesFromFolder("rvmn:meteor-semantic-less", "Semantic-UI/src/");
  api.add_files(assetFiles, 'client');

});