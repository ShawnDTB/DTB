function redirectTo(request, path, params = {}) {
  const url = new URL(path, request.url);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  }
  return Response.redirect(url.toString(), 303);
}

async function readForm(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function clean(value) {
  return String(value || "").trim();
}

async function handleContact(request, env) {
  try {
    const body = await readForm(request);

    const name = clean(body.name);
    const email = clean(body.email);
    const company = clean(body.company);
    const phone = clean(body.phone);
    const service = clean(body.service);
    const budget = clean(body.budget);
    const timeline = clean(body.timeline);
    const message = clean(body.message);

    if (!name || !email || !message) {
      return redirectTo(request, "/contact/", {
        error: "Name, email, and message are required."
      });
    }

    if (!env.RESEND_API_KEY) {
      return redirectTo(request, "/contact/", {
        error: "Email service is not configured yet. Add RESEND_API_KEY in Cloudflare settings."
      });
    }

    const toEmail = env.CONTACT_TO_EMAIL || "inquire@dtbsolutions.tech";
    const fromEmail = env.CONTACT_FROM_EMAIL || "Website Contact <inquire@send.dtbsolutions.tech>";

    const emailText = [
      "New DTB contact form submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      `Company: ${company || "N/A"}`,
      `Service: ${service || "N/A"}`,
      `Budget: ${budget || "N/A"}`,
      `Timeline: ${timeline || "N/A"}`,
      "",
      "Message:",
      message
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New DTB inquiry from ${name}`,
        reply_to: email,
        text: emailText
      })
    });

    if (!resendResponse.ok) {
      return redirectTo(request, "/contact/", {
        error: "Message could not be sent. Please try again."
      });
    }

    return redirectTo(request, "/contact/", { sent: "1" });
  } catch (error) {
    return redirectTo(request, "/contact/", { error: "Invalid form submission." });
  }
}

async function handleNewsletter(request, env) {
  try {
    const body = await readForm(request);
    const email = clean(body.email);

    if (!email) {
      return redirectTo(request, "/blog/", { error: "Email is required." });
    }

    if (!env.RESEND_API_KEY) {
      return redirectTo(request, "/blog/", {
        error: "Newsletter service is not configured yet. Add RESEND_API_KEY in Cloudflare settings."
      });
    }

    const toEmail = env.CONTACT_TO_EMAIL || "inquire@dtbsolutions.tech";
    const fromEmail = env.CONTACT_FROM_EMAIL || "Website Contact <inquire@send.dtbsolutions.tech>";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "New DTB newsletter signup",
        text: `New newsletter signup: ${email}`
      })
    });

    if (!resendResponse.ok) {
      return redirectTo(request, "/blog/", {
        error: "Newsletter signup could not be sent. Please try again."
      });
    }

    return redirectTo(request, "/blog/", { subscribed: "1" });
  } catch (error) {
    return redirectTo(request, "/blog/", { error: "Invalid newsletter submission." });
  }
}

async function serveAsset(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Pretty URL support for routes like /contact, /services, /works, etc.
  if ((request.method === "GET" || request.method === "HEAD") && pathname !== "/" && !pathname.includes(".")) {
    const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const indexUrl = new URL(request.url);
    indexUrl.pathname = `${normalized}index.html`;

    const indexResponse = await env.ASSETS.fetch(new Request(indexUrl, request));
    if (indexResponse.status !== 404) {
      return indexResponse;
    }
  }

  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/newsletter") {
      return handleNewsletter(request, env);
    }

    return serveAsset(request, env);
  }
};
