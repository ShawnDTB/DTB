
(function () {
  const params = new URLSearchParams(window.location.search);
  const sent = params.get("sent");
  const subscribed = params.get("subscribed");
  const error = params.get("error");

  function showMessage(text, type) {
    const form = document.querySelector("form");
    if (!form || document.querySelector(".cf-status-message")) return;
    const div = document.createElement("div");
    div.className = "cf-status-message mb-6 p-4 rounded-md " + (type === "error"
      ? "bg-red-900/20 border border-red-500 text-red-300"
      : "bg-green-900/20 border border-green-500 text-green-300");
    div.textContent = text;
    form.parentNode.insertBefore(div, form);
  }

  if (sent === "1") showMessage("Thank you for your message. We’ll be in touch soon.", "success");
  if (subscribed === "1") showMessage("You’re subscribed. Check your email for confirmation.", "success");
  if (error) showMessage(decodeURIComponent(error), "error");
})();
