import nodemailer from "nodemailer";

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP configuration is incomplete. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your .env file."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, 
    auth: { user, pass },
  });
};

/**
 * Sends a branded OTP email to the specified address.
 * @param {string} toEmail - Recipient email address
 * @param {string} otp     - 6-digit OTP string
 */
export const sendOtpEmail = async (toEmail, otp) => {
  const from = process.env.MAIL_FROM || "Gen-D Technologies <info@gendtechnologies.in>";
  const transporter = createTransporter();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification – Gen-D Technologies</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #222;border-radius:16px;overflow:hidden;max-width:520px;">
          <tr>
            <td style="background:#ff4a22;padding:28px 36px;">
              <p style="margin:0;color:#fff;font-size:11px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">↳ GEN-D TECHNOLOGIES</p>
              <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">Email Verification</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
                You requested an OTP to verify your email address for the Gen-D Technologies contact form. Use the code below:
              </p>
              <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="margin:0 0 8px;color:#71717a;font-size:10px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">Your OTP Code</p>
                <p style="margin:0;color:#ff4a22;font-size:42px;font-weight:900;letter-spacing:12px;font-family:'Courier New',monospace;">${otp}</p>
              </div>
              <p style="color:#71717a;font-size:12px;line-height:1.6;margin:0 0 12px;">
                This code is valid for <strong style="color:#a1a1aa;">10 minutes</strong>. Do not share it with anyone.
              </p>
              <p style="color:#52525b;font-size:11px;line-height:1.5;margin:0;">
                If you did not request this verification, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;color:#3f3f46;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Gen-D Technologies · info@gendtechnologies.in</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from,
    to: toEmail,
    subject: "Your Gen-D Verification Code",
    html,
    text: `Your Gen-D email verification OTP is: ${otp}\n\nThis code expires in 10 minutes. Do not share it with anyone.`,
  });
};

/**
 * Sends a confirmation email to the user after their form submission.
 * @param {{ name: string, email: string, service: string, message: string }} lead
 */
export const sendConfirmationEmail = async ({ name, email, service, message }) => {
  const from = process.env.MAIL_FROM || "Gen-D Technologies <info@gendtechnologies.in>";
  const transporter = createTransporter();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Request Received – Gen-D Technologies</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #222;border-radius:16px;overflow:hidden;max-width:520px;">
          <tr>
            <td style="background:#ff4a22;padding:28px 36px;">
              <p style="margin:0;color:#fff;font-size:11px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">↳ GEN-D TECHNOLOGIES</p>
              <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">Request Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Hi <strong style="color:#fff;">${name}</strong>, thank you for reaching out! We have received your request and our team will get back to you within <strong style="color:#ff4a22;">2 hours</strong>.
              </p>
              <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:24px;margin:0 0 24px;">
                <p style="margin:0 0 16px;color:#71717a;font-size:10px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">Your Submission Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #222;width:35%;">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Name</p>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;color:#e4e4e7;font-size:13px;font-weight:600;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Email</p>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;color:#e4e4e7;font-size:13px;font-weight:600;">${email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;${message ? 'border-bottom:1px solid #222;' : ''}">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Service</p>
                    </td>
                    <td style="padding:8px 0;${message ? 'border-bottom:1px solid #222;' : ''}">
                      <p style="margin:0;color:#ff4a22;font-size:13px;font-weight:700;">${service}</p>
                    </td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding:8px 0;" colspan="2">
                      <p style="margin:0 0 6px;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Message</p>
                      <p style="margin:0;color:#a1a1aa;font-size:13px;line-height:1.6;">${message}</p>
                    </td>
                  </tr>` : ""}
                </table>
              </div>
              <p style="color:#52525b;font-size:12px;line-height:1.6;margin:0;">
                For urgent queries, email us at <a href="mailto:info@gendtechnologies.in" style="color:#ff4a22;text-decoration:none;">info@gendtechnologies.in</a> or call <strong style="color:#a1a1aa;">991-095-2431</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;color:#3f3f46;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Gen-D Technologies · info@gendtechnologies.in</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from,
    to: email,
    subject: `We received your request, ${name} — Gen-D Technologies`,
    html,
    text: `Hi ${name},\n\nThank you for reaching out to Gen-D Technologies! We have received your request and will get back to you within 24 hours.\n\nYour submission:\n- Service: ${service}\n- Message: ${message || "N/A"}\n\nFor urgent queries: info@gendtechnologies.in | 991-095-2431\n\n— Gen-D Technologies Team`,
  });
};

/**
 * Sends a new lead notification to the GEN-D internal email.
 * @param {{ name: string, email: string, service: string, message: string }} lead
 */
export const sendNewLeadNotification = async ({ name, email, service, message }) => {
  const from = process.env.MAIL_FROM || "Gen-D Technologies <info@gendtechnologies.in>";
  const NOTIFY_EMAIL = "info@gendtechnologies.in";
  const transporter = createTransporter();

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Lead – Gen-D Technologies</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #222;border-radius:16px;overflow:hidden;max-width:520px;">
          <tr>
            <td style="background:#ff4a22;padding:28px 36px;">
              <p style="margin:0;color:#fff;font-size:11px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">↳ GEN-D INTERNAL ALERT</p>
              <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">New Client Lead!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
                A new inquiry was submitted via the website contact form on <strong style="color:#e4e4e7;">${submittedAt} IST</strong>.
              </p>
              <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:24px;margin:0 0 24px;">
                <p style="margin:0 0 16px;color:#71717a;font-size:10px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">Client Information</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #222;width:30%;">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Name</p>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;color:#fff;font-size:14px;font-weight:700;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Email</p>
                    </td>
                    <td style="padding:8px 0;border-bottom:1px solid #222;">
                      <p style="margin:0;"><a href="mailto:${email}" style="color:#ff4a22;font-size:14px;font-weight:600;text-decoration:none;">${email}</a></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;${message ? 'border-bottom:1px solid #222;' : ''}">
                      <p style="margin:0;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Service</p>
                    </td>
                    <td style="padding:8px 0;${message ? 'border-bottom:1px solid #222;' : ''}">
                      <p style="margin:0;color:#c3ff2e;font-size:14px;font-weight:700;">${service}</p>
                    </td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding:8px 0;" colspan="2">
                      <p style="margin:0 0 6px;color:#52525b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Message / Requirements</p>
                      <p style="margin:0;color:#a1a1aa;font-size:13px;line-height:1.6;background:#111;border-left:3px solid #ff4a22;padding:12px 14px;border-radius:0 8px 8px 0;">${message}</p>
                    </td>
                  </tr>` : ""}
                </table>
              </div>
              <p style="color:#52525b;font-size:12px;line-height:1.6;margin:0;">
                Reply directly to <a href="mailto:${email}" style="color:#ff4a22;text-decoration:none;">${email}</a> to connect with this client.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;color:#3f3f46;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Gen-D Technologies Internal · ${submittedAt} IST</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from,
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: `New Lead: ${name} is interested in ${service}`,
    html,
    text: `NEW LEAD ALERT\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message || "N/A"}\nSubmitted: ${submittedAt} IST\n\nReply to: ${email}`,
  });
};
