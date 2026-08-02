def admin_notification_html(name: str, email: str, subject: str, message: str) -> str:
    return f"""
    <div style="font-family: Georgia, serif; background:#F4E9D8; padding:24px; color:#1B1B1B;">
      <div style="max-width:560px; margin:0 auto; background:#FFFDF8; border:1px solid #D7C6AA; padding:24px;">
        <h2 style="color:#9E3B2E; margin-top:0;">New portfolio message</h2>
        <p><strong>From:</strong> {name} &lt;{email}&gt;</p>
        <p><strong>Subject:</strong> {subject}</p>
        <hr style="border:none; border-top:1px solid #D7C6AA;" />
        <p style="white-space:pre-wrap;">{message}</p>
      </div>
    </div>
    """


def visitor_confirmation_html(name: str) -> str:
    return f"""
    <div style="font-family: Georgia, serif; background:#F4E9D8; padding:24px; color:#1B1B1B;">
      <div style="max-width:560px; margin:0 auto; background:#FFFDF8; border:1px solid #D7C6AA; padding:24px;">
        <h2 style="color:#9E3B2E; margin-top:0;">Thanks for writing, {name}!</h2>
        <p>Your message has been received. I read every note and will get back to you soon.</p>
        <p style="margin-top:24px;">— Sahil Khan</p>
      </div>
    </div>
    """
