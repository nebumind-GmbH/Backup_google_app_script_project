function renameAndMoveFile(file, file_content, newFileName, customerName, processType, dataReceiving, dataDeletion) {
try{
  // Assuming file is a Blob, we need to create a Google Drive file from it
  const sharedFolder = DriveApp.getFolderById("0AI9Bbd6R-bwZUk9PVA");
  console.log("shared Folder founded");
  const uploadedFile = sharedFolder.createFile(file, file_content);
  console.log("save data passed");


  
  // Rename the file
  const newName = customerName + '_' + processType + '_' + newFileName;
  uploadedFile.setName(newName);
  console.log("rename data passed");

  const fileID = uploadedFile.getId();
  var resource = {
    properties: {
      CustomerName: customerName,
      ProcessType: processType,
      DataReceiving: dataReceiving,
      DataDeletion: dataDeletion,
    }
  };
  Drive_v3.Files.update(resource,fileID, null,{ supportsAllDrives: true },);
  console.log("add property passed");


  var subfolders = sharedFolder.getFoldersByName(customerName);
  var subfolder;
  if (subfolders.hasNext()) {
    subfolder = subfolders.next();
  } else {
    subfolder = sharedFolder.createFolder(customerName);
  }
  
  uploadedFile.moveTo(subfolder);

  return fileID;
} catch (error){
  console.log("Error in renameAndMoveFile:", error.message);
  return error.message;
  //throw Error;
}
}

function logImportedFile(file_id, original_name, file_path) {
  const sheet = SpreadsheetApp.openById('1O-75mCIJiFKpEf-yoNNDO65QF-8TKA5KXgpMQ5cM9FE').getSheetByName('Log');
  const timestamp = new Date();  
  sheet.appendRow([file_id, timestamp, original_name, file_path]);
}

function getPath(file_id){
    const filePath = [];
    const file = DriveApp.getFileById(file_id);
    let parent = file.getParents();

    while (parent.hasNext()){
      const folder = parent.next()
      const folderName = folder.getName();
      filePath.unshift(folderName);
      parent = folder.getParents();
    };

    const chainedFolderNames = filePath.join('/');
    return chainedFolderNames;
}



