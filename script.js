(() => {
  const header = document.querySelector("[data-header]");
  const nav = header?.querySelector(".nav");
  const toggle = header?.querySelector("[data-nav-toggle]");
  const panel = header?.querySelector("[data-nav-panel]");

  const setOpen = (open) => {
    if (!nav || !toggle || !panel) return;
    nav.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = nav?.dataset.open === "true";
      setOpen(!isOpen);
    });
  }

  document.addEventListener("click", (e) => {
    if (!nav || !panel || !toggle) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (panel.contains(target) || toggle.contains(target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  panel?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches("a")) setOpen(false);
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("enquiry-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!(form instanceof HTMLFormElement)) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const age = String(fd.get("age") ?? "").trim();
    const type = String(fd.get("type") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = `MN Coaching enquiry — ${type || "session"}`;
    const lines = [
      `Name: ${name || "-"}`,
      `Player age: ${age || "-"}`,
      `Session type: ${type || "-"}`,
      `Location: ${location || "-"}`,
      "",
      message || "-",
    ];

    // TODO: Replace with your real email address.
    const to = "hello@mncoaching.example";
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
  });
})();

