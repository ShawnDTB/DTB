
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const source = String(formData.get("source") || "website").trim();

    if (!email || !email.includes("@")) {
      return Response.redirect(new URL(`/blog/?error=${encodeURIComponent("Please enter a valid email address.")}`, request.url), 303);
    }

    // Optional D1 storage. Bind a D1 database as DB to enable this.
    if (env.DB) {
      await env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS newsletter_subscribers (email TEXT PRIMARY KEY, name TEXT, source TEXT, subscribed_at TEXT)"
      ).run();
      await env.DB.prepare(
        "INSERT OR REPLACE INTO newsletter_subscribers (email, name, source, subscribed_at) VALUES (?, ?, ?, ?)"
      ).bind(email, name, source, new Date().toISOString()).run();
    }

    if (env.RESEND_API_KEY) {
      const fromEmail = env.CONTACT_FROM_EMAIL || "DTB Insights <inquire@send.dtbsolutions.tech>";
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: "Welcome to DTB Insights",
          text: `Thanks for subscribing${name ? `, ${name}` : ""}. You’ll receive practical web design, automation, and growth insights from DTB.`,
        }),
      });
    }

    return Response.redirect(new URL("/blog/?subscribed=1", request.url), 303);
  } catch (error) {
    return Response.redirect(new URL(`/blog/?error=${encodeURIComponent("Subscription could not be completed.")}`, request.url), 303);
  }
}
