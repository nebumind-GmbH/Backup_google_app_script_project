function doGet() {
  return HtmlService.createTemplateFromFile('index')
  .evaluate()
  .setTitle('File Manager')
  .addMetaTag('viewport','width=device-width, initial-scale=1')
  .setFaviconUrl('https://www.nebumind.com/wp-content/uploads/2019/11/cropped-nebumind_appicon_w-192x192.png');
}

function includeExternalFile(file_name) {
  return HtmlService.createHtmlOutputFromFile(file_name).getContent();
}

function getProperties() {
  let result = [];
  const sheet = SpreadsheetApp.openById('1O-75mCIJiFKpEf-yoNNDO65QF-8TKA5KXgpMQ5cM9FE').getSheetByName("Settings");
  const data = sheet.getDataRange().getValues();
  const header = data[0];
  let customerName_index = header.indexOf("Customer");
  let processtype_index = header.indexOf("Processtype");

  let customer_array = [];
  let processType_array = [];

  for (let i = 1; i < data.length; i++){
    customer_array.push(data[i][customerName_index]);
    processType_array.push(data[i][processtype_index]);
  }

  result.push(customer_array);
  result.push(processType_array);
  return result;
}
