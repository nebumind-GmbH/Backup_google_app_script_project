function searchProperty(customName, processType, dataReceiving, dataDeletion) {
  var queryParts = [];
  if (customName) {
    queryParts.push('properties has { key="CustomerName" and value="' + customName + '" and visibility="PUBLIC" }');
  }
  if (processType) {
    queryParts.push('properties has { key="ProcessType" and value="' + processType + '" and visibility="PUBLIC" }');
  }
  if (dataReceiving) {
    queryParts.push('properties has { key="DataReceiving" and value="' + dataReceiving + '" and visibility="PUBLIC" }');
  }
  if (dataDeletion) {
    queryParts.push('properties has { key="DataDeletion" and value="' + dataDeletion + '" and visibility="PUBLIC" }');
  }
  if (queryParts.length === 0) {
    console.log("Error: At least one parameter (customName, processType, dataReceiving, dataDeletion) must be defined.");
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
