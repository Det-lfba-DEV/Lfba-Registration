// # Sending an email for the instruction invite code
// Form submissions and store the data
function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        
        // Create an array to hold the row data
        var rowData = [];
        
        // Push the values from the form to the rowData array
        rowData.push(new Date()); // Timestamp
        rowData.push(e.parameter.name || ""); // Full Name
        rowData.push(e.parameter.email || ""); // Email
        rowData.push(e.parameter.phone || ""); // Phone Number
        rowData.push(e.parameter.year || ""); // Class
        rowData.push(e.parameter.question || ""); // Question
        
        // Append the data to the spreadsheet
        sheet.appendRow(rowData);
        
        // Return success response
        return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON)
            .setStatusCode(200);
    } catch (error) {
        // Log the error for debugging
        Logger.log('Error: ' + error.toString());
        
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON)
            .setStatusCode(500);
    }
}

// Send emails to all registered members on a specific date
function sendEmailsOnChosenDate() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    var scheduledDate = new Date('2024-09-08'); // Set the desired email send date here

    var today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for date-only comparison
    scheduledDate.setHours(0, 0, 0, 0); // Reset time for date-only comparison
    
    if (today.toDateString() !== scheduledDate.toDateString()) {
        Logger.log("Today is not the scheduled date. No emails sent.");
        return;
    }

    var emailsSent = [];

    // Iterate over the sheet data and send emails
    for (var i = 1; i < data.length; i++) {
        var email = data[i][2];  // Email (Column C)
        var name = data[i][1];   // Name (Column B)

        // HTML email content for the club invitation
        var htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px; background-color: #f4f4f9;">
            <h2 style="color: #2c3e50; text-align: center;">🎉 You're Invited to Our <b>INTRODUCTION</b>!</h2>
            <p style="color: #2c3e50; font-size: 16px;">
                Hellooo ${name},
            </p>
            <p style="color: #34495e; font-size: 16px; line-height: 1.6;">
                We're excited to invite you're intrested to join our club! As a valued member, you'll have access to exclusive resources, workshops, and more. Don't miss out on the fun! our premium club have anybody in it ☠️ you will be hand picked
            </p>
            <div style="background-color: #ecf0f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #16a085;">🗓 Event Invitation:</h3>
                <p style="color: #34495e; font-size: 16px;">📍 Location: ClubOffice</p>
                <p style="color: #34495e; font-size: 16px;">⏰ Time: 3:30 PM, Friday</p>
                <p style="color: #34495e; font-size: 16px;">🎟️ Keep it a <u>Secret</u></p>
            </div>
            <div style="text-align: center;">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7fcQLY4j4QYQKzjh7UVFx3?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
            <p style="color: #95a5a6; font-size: 14px; text-align: center; margin-top: 20px;">
                Follow us on <a href="https://instagram.com/det._lfba" style="color: #3498db; text-decoration: none;">Instagram</a>
            </p>
            <p style="color: #95a5a6; font-size: 14px; text-align: center;">
                Contact us at <a href="mailto:club@example.com" style="color: #3498db;">DETlfba@gmail.com</a>
            </p>
        </div>
        `;

        // Send the email
        MailApp.sendEmail({
            to: email,
            subject: "🎉 DET Club Invitation!",
            htmlBody: htmlBody
        });

        emailsSent.push(email); // Log the sent emails
    }
    
    // Log the emails that were sent for debugging
    Logger.log("Emails sent to: " + emailsSent.join(", "));
}

