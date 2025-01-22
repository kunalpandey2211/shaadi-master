function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Check if this is visitor tracking data or RSVP data
    if (data.type === 'visitor_tracking') {
      // Handle visitor tracking data
      let visitorSheet = ss.getSheetByName('visitors');
      
      // Create visitors sheet if it doesn't exist
      if (!visitorSheet) {
        visitorSheet = ss.insertSheet('visitors');
        visitorSheet.appendRow([
          'Timestamp',
          'Side Selected',
          'IP Address',
          'Browser',
          'Device',
          'Operating System',
          'Screen Resolution',
          'Language',
          'Time Spent (seconds)'
        ]);
      }
      
      // Append the visitor data
      visitorSheet.appendRow([
        new Date(data.timestamp),
        data.sideSelected,
        data.ipAddress,
        data.browser,
        data.device,
        data.os,
        data.screenResolution,
        data.language,
        data.timeSpent
      ]);
    } else {
      // Handle RSVP data (existing functionality)
      const rsvpSheet = ss.getSheetByName('RSVP') || ss.getActiveSheet();
      rsvpSheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone,
        data.guests,
        data.events.join(", "),
        data.message,
        data.side
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'data': data }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Service is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doOptions(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
} 