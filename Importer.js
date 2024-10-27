function renameAndMoveFile(data, newFileName, customerName, processType, dataReceiving, dataDeletion) {
  try{
    console.log("renameAndMoveFile called");
  
    const myFile = Utilities.newBlob(Utilities.base64Decode(data.data),data.mimeType,data.fileName);
    // Assuming file is a Blob, we need to create a Google Drive file from it
    const sharedFolder = DriveApp.getFolderById("0AI9Bbd6R-bwZUk9PVA");
    const fileAdded = sharedFolder.createFile(myFile);
  
    //const uploadedFile = sharedFolder.createFile(file, file_content);  
    // Rename the file
    const newName = customerName + '_' + processType + '_' + newFileName;
    fileAdded.setName(newName);
  
    const fileID = fileAdded.getId();
    var resource = {
      properties: {
        CustomerName: customerName,
        ProcessType: processType,
        DataReceiving: dataReceiving,
        DataDeletion: dataDeletion,
      }
    };
    Drive_v3.Files.update(resource,fileID, null,{ supportsAllDrives: true },);
  
    var subfolders = sharedFolder.getFoldersByName(customerName);
    var subfolder;
    if (subfolders.hasNext()) {
      subfolder = subfolders.next();
    } else {
      subfolder = sharedFolder.createFolder(customerName);
    }
    
    fileAdded.moveTo(subfolder);
    console.log("file moved");
  
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
  
  
  
  