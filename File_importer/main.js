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
  const sheetOT = SpreadsheetApp.openById('1O-75mCIJiFKpEf-yoNNDO65QF-8TKA5KXgpMQ5cM9FE').getSheetByName("OT");

  const data = sheet.getDataRange().getValues();
  const dataOT = sheetOT.getDataRange().getValues();

  const header = data[0];
  const headerOT = dataOT[0];

  let customerName_index = header.indexOf("Customer");
  let processtype_index = header.indexOf("Processtype");
  let machinesupplier_index = header.indexOf("Machinesupplier");
  let sensor_index = header.indexOf("Sensor");

  let inputname_index = headerOT.indexOf('Inputname');
  let printerID_index = headerOT.indexOf('PrinterID');
  let material_index = headerOT.indexOf("Material");
  let layerthickness_index = headerOT.indexOf("LayerThickness");

  let customer_array = [];
  let processType_array = [];
  let machinesupplier_array = [];
  let sensor_array = [];

  let inputname_array = [];
  let printer_array = [];
  let material_arrary = [];
  let layerthickness_array = [];

  for (let i = 1; i < data.length; i++){
    customer_array.push(data[i][customerName_index]);
    processType_array.push(data[i][processtype_index]);
    machinesupplier_array.push(data[i][machinesupplier_index]);
    sensor_array.push(data[i][sensor_index]);
  }

  for (let i = 1; i < dataOT.length; i++) {
    inputname_array.push(dataOT[i][inputname_index]);
    printer_array.push(dataOT[i][printerID_index]);
    material_arrary.push(dataOT[i][material_index]);
    layerthickness_array.push(dataOT[i][layerthickness_index]);
  }

  result.push(customer_array);
  result.push(processType_array);
  result.push(machinesupplier_array);
  result.push(sensor_array);
  result.push(inputname_array);
  result.push(printer_array);
  result.push(material_arrary);
  result.push(layerthickness_array);
  
  return result;
}
