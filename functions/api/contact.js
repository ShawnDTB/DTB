
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      return Response.redirect(new URL(`/contact/?error=${encodeURIComponent("Name, email, and message are required.")}`, request.url), 303);
    }

    if (!env.RESEND_API_KEY) {
      return Response.redirect(new URL(`/contact/?error=${encodeURIComponent("Email service is not configured yet. Add RESEND_API_KEY in Cloudflare Pages settings.")}`, request.url), 303);
    }

    const toEmail = env.CONTACT_TO_EMAIL || "inquire@dtbsolutions.tech";
    const fromEmail = env.CONTACT_FROM_EMAIL || "Website Contact <inquire@send.dtbsolutions.tech>";

    const emailText = [
      `New DTB contact form submission`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      `Service: ${service || "N/A"}`,
      `Budget: ${budget || "N/A"}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New DTB inquiry from ${name}`,
        reply_to: email,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      return Response.redirect(new URL(`/contact/?error=${encodeURIComponent("Message could not be sent. Please try again.")}`, request.url), 303);
    }

    return Response.redirect(new URL("/contact/?sent=1", request.url), 303);
  } catch (error) {
    return Response.redirect(new URL(`/contact/?error=${encodeURIComponent("Invalid form submission.")}`, request.url), 303);
  }
}
