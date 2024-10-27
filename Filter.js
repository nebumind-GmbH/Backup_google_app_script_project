function searchProperty(customName, processType) {
  var queryParts = [];
  if (customName) {
    queryParts.push('properties has { key="CustomerName" and value="' + customName + '" and visibility="PUBLIC" }');
  }
  if (processType) {
    queryParts.push('properties has { key="ProcessType" and value="' + processType + '" and visibility="PUBLIC" }');
  }
  if (queryParts.length === 0) {
    console.log("Error: At least one parameter (customName, processType) must be defined.");
    return [];
  }

  var query = queryParts.join(' and ');
  console.log(query);
  var files = DriveApp.searchFiles(query);
  var resultFiles = [];
  
  while (files.hasNext()) {
    var file = files.next();
    resultFiles.push(
      file.getName()
    );
  }
  return resultFiles;
}
