function getFileList(folderId='10v20YIlyi3M_u-7bYu1YlyF4mrfbDk7u') {
    try{
      let folder = DriveApp.getFolderById(folderId);
      let files = folder.getFiles();
      let fileList = [];
  
      while (files.hasNext()) {
        let file = files.next();
        fileList.push({
          name: file.getName(),
          id: file.getId()
      });
      }
  
      return fileList;
    } catch (e) {
      return 'Error: ${e.message}';
    }
  }
  