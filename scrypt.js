document.addEventListener("DOMContentLoaded", function () {
  // Seed data
  const seedTypes = {
    luckberry: {
      name: "🍀 Luckberry",
      color: "#80c975",
      sprite:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjODBjOTc1Ii8+PHBhdGggZD0iTTQgNEg4VjhINFY0WiIgZmlsbD0iI2E3Yzk1NyIvPjxwYXRoIGQ9Ik0xMiA0SDEyVjhIMTJWNloiIGZpbGw9IiNhN2M5NTciLz48cGF0aCBkPSJNOCA4SDEyVjEySDhWOFoiIGZpbGw9IiNhN2M5NTciLz48cGF0aCBkPSJNNCA4SDhWMTJINFY4WiIgZmlsbD0iI2E3Yzk1NyIvPjwvc3ZnPg==",
      desc: "Sprouts in random spots. Grows faster during chaos. You don't find it — it finds you.",
      personality: "Unpredictable, playful, contagious",
    },
    heartseed: {
      name: "❤️ Heartseed",
      color: "#cc4242",
      sprite:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjY2M0MjQyIi8+PHBhdGggZD0iTTQgNEgxMlYxMkg0VjRaIiBmaWxsPSIjYmM0NzQ5Ii8+PHBhdGggZD0iTTYgNkgxMFYxMEg2VjZaIiBmaWxsPSIjZTg2YzZkIi8+PC9zdmc+",
      desc: "Beats like a pulse. Bonds with nearby seeds and helps them grow stronger.",
      personality: "Warm, steady, protective",
    },
    fortuna: {
      name: "🌟 Fortuna Sprout",
      color: "#e8c900",
      sprite:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZThjOTAwIi8+PHBhdGggZD0iTTQgNEgxMlYxMkg0VjRaIiBmaWxsPSIjZmZkNzAwIi8+PHBhdGggZD0iTTYgNkgxMFYxMEg2VjZaIiBmaWxsPSIjZmZlYmNiIi8+PC9zdmc+",
      desc: "Born from pure chance. Sometimes doubles, sometimes vanishes.",
      personality: "Risky, playful, rare",
    },
    dreamroot: {
      name: "🔮 Dreamroot",
      color: "#6643a9",
      sprite:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjNjY0M2E5Ii8+PHBhdGggZD0iTTQgNEgxMlYxMkg0VjRaIiBmaWxsPSIjODg2NWZmIi8+PHBhdGggZD0iTTYgNkgxMFYxMEg2VjZaIiBmaWxsPSIjYWE4OGZmIi8+PC9zdmc+",
      desc: "Grows while you rest. Feeds on dreams, ideas, and moonlight.",
      personality: "Quiet, deep, mysterious",
    },
    sparkleaf: {
      name: "🔥 Sparkleaf",
      color: "#f4822a",
      sprite:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZjQ4MjJhIi8+PHBhdGggZD0iTTQgNEgxMlYxMkg0VjRaIiBmaWxsPSIjZjQ5MzM2Ii8+PHBhdGggZD0iTTYgNkgxMFYxMEg2VjZaIiBmaWxsPSIjZmJjMTg3Ii8+PC9zdmc+",
      desc: "Ignites others with inspiration. Burns fast, but leaves light behind.",
      personality: "Intense, creative, short-lived",
    },
  };

  // Fake usernames
  const fakeUsernames = [
    "plantlord.sol",
    "0xDEED",
    "root.eth",
    "seedling.x",
    "garden.dao",
    "0xGREEN",
    "soil.sol",
    "leaf.eth",
    "pixel.garden",
    "crypto.plant",
    "0xSEED",
    "grower.eth",
    "plantpunk.sol",
    "soilpunk.x",
    "herb.eth",
  ];

  // Generate random seeds on load
  const gardenGrid = document.getElementById("gardenGrid");
  const numInitialSeeds = Math.floor(Math.random() * 4) + 7; // 7-10 seeds

  for (let i = 0; i < numInitialSeeds; i++) {
    const seedType =
      Object.keys(seedTypes)[
        Math.floor(Math.random() * Object.keys(seedTypes).length)
      ];
    const username =
      fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];
    addSeedToGarden(seedType, username);
  }

  // Seed selection
  let selectedSeed = null;
  const seedOptions = document.querySelectorAll(".seed-option");

  seedOptions.forEach((option) => {
    option.addEventListener("click", function () {
      seedOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      selectedSeed = this.getAttribute("data-seed");
    });
  });

  // Plant button
  document.getElementById("plantButton").addEventListener("click", function () {
    if (!selectedSeed) {
      alert("Please select a seed type first!");
      return;
    }

    const username = document.getElementById("usernameInput").value.trim();
    const displayName =
      username ||
      fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];

    addSeedToGarden(selectedSeed, displayName);

    // Reset selection
    seedOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedSeed = null;
    document.getElementById("usernameInput").value = "";
  });

  // Add seed to garden
  function addSeedToGarden(seedType, username) {
    const seed = seedTypes[seedType];

    const seedElement = document.createElement("div");
    seedElement.className = "seed";

    // Используем соответствующий SVG для каждого типа семени
    let seedSVG = "";
    switch (seedType) {
      case "luckberry":
        seedSVG = `<svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 16C26 22 16 30 16 30S6 22 6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16Z" fill="#3a6c2a"/>
        <path d="M24 16C24 21 16 27 16 27S8 21 8 16A8 8 0 0 1 16 8A8 8 0 0 1 24 16Z" fill="#2a5c1a"/>
        <rect x="14" y="14" width="4" height="4" rx="2" fill="#0a2d0a"/>
        <rect x="10" y="10" width="1" height="1" fill="#5a8c3a"/>
        <rect x="21" y="10" width="1" height="1" fill="#5a8c3a"/>
        <rect x="10" y="21" width="1" height="1" fill="#5a8c3a"/>
        <rect x="21" y="21" width="1" height="1" fill="#5a8c3a"/>
      </svg>`;
        break;
      case "heartseed":
        seedSVG = `<svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26 16C26 22 16 30 16 30S6 22 6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16Z" fill="${seed.color}"/><path d="M24 16C24 21 16 27 16 27S8 21 8 16A8 8 0 0 1 16 8A8 8 0 0 1 24 16Z" fill="#e86c6d"/><path d="M20 16A4 4 0 1 1 16 12A4 4 0 0 1 20 16Z" fill="#ff9e9e"/></svg>`;
        break;
      case "fortuna":
        seedSVG = `<svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26 16C26 22 16 30 16 30S6 22 6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16Z" fill="${seed.color}"/><path d="M24 16C24 21 16 27 16 27S8 21 8 16A8 8 0 0 1 16 8A8 8 0 0 1 24 16Z" fill="#ffd700"/><path d="M20 16A4 4 0 1 1 16 12A4 4 0 0 1 20 16Z" fill="#fffacd"/></svg>`;
        break;
      case "dreamroot":
        seedSVG = `<svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26 16C26 22 16 30 16 30S6 22 6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16Z" fill="${seed.color}"/><path d="M24 16C24 21 16 27 16 27S8 21 8 16A8 8 0 0 1 16 8A8 8 0 0 1 24 16Z" fill="#8865ff"/><path d="M12 16L16 12L20 16L16 20Z" fill="#aa88ff"/></svg>`;
        break;
      case "sparkleaf":
        seedSVG = `<svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26 16C26 22 16 30 16 30S6 22 6 16A10 10 0 0 1 16 6A10 10 0 0 1 26 16Z" fill="${seed.color}"/><path d="M24 16C24 21 16 27 16 27S8 21 8 16A8 8 0 0 1 16 8A8 8 0 0 1 24 16Z" fill="#f49336"/><path d="M16 12L18 16L16 20L14 16Z" fill="#fbc187"/></svg>`;
        break;
    }

    seedElement.innerHTML = `
    <div class="seed-sprite">${seedSVG}</div>
    <div class="seed-name">${username}</div>
    <div class="tooltip">
      <div class="tooltip-title">${seed.name}</div>
      <div class="tooltip-desc">${seed.desc}</div>
      <div class="tooltip-personality">${seed.personality}</div>
    </div>
  `;

    gardenGrid.appendChild(seedElement);
  }
  // Audio control
  const bgMusic = document.getElementById("bgMusic");
  const audioControl = document.getElementById("audioControl");
  let audioEnabled = false;

  // Enable audio on first interaction
  function enableAudio() {
    if (!audioEnabled) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch((e) => console.log("Audio play failed:", e));
      audioEnabled = true;
      audioControl.textContent = "🔊";
      document.removeEventListener("click", enableAudio);
    }
  }

  document.addEventListener("click", enableAudio);

  // Toggle audio
  audioControl.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      this.textContent = "🔊";
    } else {
      bgMusic.pause();
      this.textContent = "🔇";
    }
  });
});
