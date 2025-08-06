document.addEventListener("DOMContentLoaded", () => {
  fetch("updates.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("updates-container");

      data.updates.forEach((item) => {
        const card = document.createElement("div");
        card.className = "update-card";
        card.innerHTML = `
          <h3>[📅] ${item.date} — ${item.title}</h3>
          <p>${item.content}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Failed to load updates:", err);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  // Load updates from JSON (jika masih digunakan)
  fetch("updates.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("updates-container");

      data.updates.forEach((item) => {
        const card = document.createElement("div");
        card.className = "update-card";
        card.innerHTML = `
          <h3>[📅] ${item.date} — ${item.title}</h3>
          <p>${item.content}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Failed to load local updates:", err);
    });

  // Load latest updates from Twitter RSS
  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feeds/sEom3J3ARnF0PN8I.xml")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("updates-container");

      data.items.slice(0, 3).forEach(item => {
        const updateCard = document.createElement("div");
        updateCard.className = "update-card";

        const date = new Date(item.pubDate);
        const formattedDate = date.toISOString().split("T")[0];

        updateCard.innerHTML = `
          <h3>📰 ${formattedDate} — ${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank" style="color:#00ffff;">View Tweet</a>
        `;
        container.appendChild(updateCard);
      });
    })
    .catch(error => {
      console.error("Failed to load Twitter updates:", error);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const navHome = document.getElementById("nav-home");
  const navUpdates = document.getElementById("nav-updates");

  const heroSection = document.getElementById("hero-section");
  const introSection = document.getElementById("intro-section");
  const updatesSection = document.getElementById("latest-updates-section");
  const updatesContainer = document.getElementById("latest-updates");

  if (!navHome || !navUpdates || !heroSection || !introSection || !updatesSection || !updatesContainer) {
    console.error("One or more DOM elements not found.");
    return;
  }

  // Toggle view
  navUpdates.addEventListener("click", (e) => {
    e.preventDefault();
    heroSection.style.display = "none";
    introSection.style.display = "none";
    updatesSection.style.display = "block";
  });

  navHome.addEventListener("click", (e) => {
    e.preventDefault();
    heroSection.style.display = "block";
    introSection.style.display = "block";
    updatesSection.style.display = "none";
  });

  // Load updates from updates.json
  fetch("updates.json")
    .then((res) => res.json())
    .then((data) => {
      data.updates.forEach((item) => {
        const card = document.createElement("div");
        card.className = "update-card";
        card.innerHTML = `
          <h3>[📅] ${item.date} — ${item.title}</h3>
          <p>${item.content}</p>
        `;
        updatesContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Failed to load local updates:", err);
    });

  // Load latest updates from RSS
  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://rss.app/feeds/sEom3J3ARnF0PN8I.xml")
    .then((res) => res.json())
    .then((data) => {
      data.items.slice(0, 3).forEach((item) => {
        const updateCard = document.createElement("div");
        updateCard.className = "update-card";
        const date = new Date(item.pubDate).toISOString().split("T")[0];

        updateCard.innerHTML = `
          <h3>📰 ${date} — ${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank" style="color:#00ffff;">View Tweet</a>
        `;
        updatesContainer.appendChild(updateCard);
      });
    })
    .catch((err) => {
      console.error("Failed to load Twitter updates:", err);
    });
});

