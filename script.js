console.log("JavaScript connected");

(function () {
  "use strict";

  const P = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);

  /* ---------- Fill page from portfolio-data.js ---------- */
  function fillPage() {
    document.title = P.name + " | Portfolio";
    $("logoName").textContent = P.name;
    $("heroName").textContent = P.name;
    $("heroTagline").textContent = P.tagline;
    $("heroIntro").textContent = P.intro;
    $("aboutText").textContent = P.about;
    $("footerName").textContent = P.name;
    $("year").textContent = new Date().getFullYear();
    $("heroGithub").href = P.contact.github;

    const photo = $("profilePhoto");
    photo.src = P.photo;
    photo.alt = "Profile photograph of " + P.name;

    P.education.forEach(function (e) {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = e.title;
      const span = document.createElement("span");
      span.textContent = e.place + " (" + e.years + ")";
      li.append(strong, span);
      $("eduList").appendChild(li);
    });

    Object.keys(P.skills).forEach(function (group) {
      const card = document.createElement("div");
      card.className = "skill-card";
      const h3 = document.createElement("h3");
      h3.textContent = group;
      const ul = document.createElement("ul");
      P.skills[group].forEach(function (s) {
        const li = document.createElement("li");
        li.textContent = s;
        ul.appendChild(li);
      });
      card.append(h3, ul);
      $("skillGroups").appendChild(card);
    });

    const c = P.contact;
    const rows = [
      ["Email", c.email, c.email.indexOf("@") > -1 ? "mailto:" + c.email : ""],
      ["GitHub", c.github, c.github],
      ["LinkedIn", c.linkedin, c.linkedin],
      ["Location", c.location, ""],
    ];
    rows.forEach(function (r) {
      const li = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = r[0] + ":";
      li.appendChild(label);
      li.appendChild(document.createTextNode(" "));
      if (r[2]) {
        const a = document.createElement("a");
        a.href = r[2];
        a.textContent = r[1];
        if (r[2].indexOf("http") === 0) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        li.appendChild(a);
      } else {
        li.appendChild(document.createTextNode(r[1]));
      }
      $("contactList").appendChild(li);
    });
  }

  /* ---------- Mobile navigation ---------- */
  function setupNav() {
    const toggle = $("navToggle");
    const nav = $("mainNav");
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Light / dark mode ---------- */
  function setupTheme() {
    const themeButton = $("themeToggle");

    function apply(dark) {
      document.body.classList.toggle("dark-mode", dark);
      themeButton.textContent = dark ? "Switch to Light Mode" : "Switch to Dark Mode";
    }

    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* storage blocked */ }
    apply(saved === "dark");

    themeButton.addEventListener("click", function () {
      const dark = !document.body.classList.contains("dark-mode");
      apply(dark);
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Projects: render + search + filter ---------- */
  let activeChip = "";

  function renderProjects(list) {
    const grid = $("projectGrid");
    grid.innerHTML = "";

    list.forEach(function (p) {
      const card = document.createElement("article");
      card.className = "card";

      const h3 = document.createElement("h3");
      h3.textContent = p.title;
      const desc = document.createElement("p");
      desc.textContent = p.description;

      const techs = document.createElement("ul");
      techs.className = "tech-list";
      techs.setAttribute("aria-label", "Technologies used");
      p.technologies.forEach(function (t) {
        const li = document.createElement("li");
        li.textContent = t;
        techs.appendChild(li);
      });

      const links = document.createElement("div");
      links.className = "card-links";
      const gh = document.createElement("a");
      gh.className = "btn btn-gold";
      gh.href = p.github;
      gh.target = "_blank";
      gh.rel = "noopener";
      gh.textContent = "GitHub Repo";
      links.appendChild(gh);
      if (p.live) {
        const live = document.createElement("a");
        live.className = "btn btn-outline";
        live.href = p.live;
        live.target = "_blank";
        live.rel = "noopener";
        live.textContent = "Live App";
        links.appendChild(live);
      }

      card.append(h3, desc, techs, links);
      grid.appendChild(card);
    });

    $("noResults").hidden = list.length !== 0;
    $("resultCount").textContent =
      "Showing " + list.length + " of " + P.projects.length + " projects";
  }

  function applyFilters() {
    const term = $("projectSearch").value.trim().toLowerCase();
    const results = P.projects.filter(function (p) {
      const haystack = (p.title + " " + p.description + " " + p.technologies.join(" ")).toLowerCase();
      const matchesTerm = term === "" || haystack.indexOf(term) > -1;
      const matchesChip =
        activeChip === "" ||
        p.technologies.some(function (t) { return t.toLowerCase() === activeChip.toLowerCase(); });
      return matchesTerm && matchesChip;
    });
    renderProjects(results);
  }

  function setupProjects() {
    const chipBox = $("filterChips");
    const techs = [];
    P.projects.forEach(function (p) {
      p.technologies.forEach(function (t) {
        if (techs.indexOf(t) === -1) techs.push(t);
      });
    });

    function makeChip(label, value) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (value === "" ? " active" : "");
      b.textContent = label;
      b.dataset.value = value;
      chipBox.appendChild(b);
    }
    makeChip("All", "");
    techs.forEach(function (t) { makeChip(t, t); });

    chipBox.addEventListener("click", function (e) {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeChip = btn.dataset.value;
      chipBox.querySelectorAll(".chip").forEach(function (c) {
        c.classList.toggle("active", c === btn);
      });
      applyFilters();
    });

    $("projectSearch").addEventListener("input", applyFilters);
    $("clearSearch").addEventListener("click", function () {
      $("projectSearch").value = "";
      activeChip = "";
      chipBox.querySelectorAll(".chip").forEach(function (c) {
        c.classList.toggle("active", c.dataset.value === "");
      });
      applyFilters();
    });

    renderProjects(P.projects);
  }

  /* ---------- AI chatbot ---------- */
  const history = [];

  function addMessage(text, cls) {
    const div = document.createElement("div");
    div.className = "msg " + cls;
    div.textContent = text;
    const log = $("chatLog");
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  async function sendMessage(text) {
    const sendBtn = $("chatSend");
    const input = $("chatInput");
    addMessage(text, "user");
    input.value = "";
    sendBtn.disabled = true;
    const typing = addMessage("Thinking...", "bot typing");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-6) }),
      });

      let data = {};
      try { data = await res.json(); } catch (e) { /* non-JSON response */ }

      if (!res.ok || !data.reply) {
        throw new Error(data.error || "Server returned status " + res.status);
      }

      typing.remove();
      addMessage(data.reply, "bot");
      history.push({ role: "user", text: text });
      history.push({ role: "bot", text: data.reply });
    } catch (err) {
      typing.remove();
      addMessage(
        "Sorry, the chatbot could not get a response right now. Please check your connection and try again in a moment. (" +
          err.message + ")",
        "error"
      );
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  function setupChat() {
    $("chatForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const text = $("chatInput").value.trim();
      if (text) sendMessage(text);
    });

    [
      "Who are you?",
      "What are your skills?",
      "What projects have you completed?",
      "Explain your Python programs",
      "What was corrected in the buggy code project?",
      "How does the reading list work?",
      "Where is your GitHub?",
    ].forEach(function (q) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = q;
      b.addEventListener("click", function () {
        if (!$("chatSend").disabled) sendMessage(q);
      });
      $("chatSuggestions").appendChild(b);
    });
  }

  fillPage();
  setupNav();
  setupTheme();
  setupProjects();
  setupChat();
})();
