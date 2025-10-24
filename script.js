// --- Background Music Setup ---
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.4;
document.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
}, { once: true });

// --- Thoughts Wall ---
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const thoughtsWall = document.getElementById("thoughtsWall");

// Load saved messages or create empty array
let thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];

// Display all thoughts
function displayThoughts() {
  thoughtsWall.innerHTML = "";
  thoughts.forEach((thought) => {
    const bubble = document.createElement("div");
    bubble.className = "thought-bubble";
    bubble.textContent = thought.text;

    // Click to delete
    bubble.addEventListener("click", () => {
      if (confirm("Do you want to delete this thought?")) {
        bubble.style.opacity = 0;
        setTimeout(() => {
          deleteThought(thought.id);
        }, 500);
      }
    });

    thoughtsWall.prepend(bubble);
  });
}

displayThoughts();

// Add new thought
sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (text === "") return;

  const newThought = {
    id: Date.now(), // unique ID
    text: text
  };

  thoughts.push(newThought);
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
  messageInput.value = "";
  displayThoughts();
});

// Delete thought by ID
function deleteThought(id) {
  thoughts = thoughts.filter(thought => thought.id !== id);
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
  displayThoughts();
}

// --- Dark Mode Toggle ---
const toggleTheme = document.getElementById("toggleTheme");
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent =
    document.body.classList.contains("dark") ? "🌙 Light Mode" : "🌞 Dark Mode";
});

// --- Random Motivation ---
const motivationBtn = document.getElementById("motivationBtn");
const motivationBox = document.getElementById("motivationBox");

const motivationalQuotes = [
  "You are stronger than you think 💪",
  "Overthinking is the art of creating problems that don’t exist 🌤️",
  "Breathe. You’re doing better than you think 🌿",
  "Every storm passes, even the one in your mind ⛈️",
  "You deserve peace, not perfection 🌙",
  "Let go of what you can’t control 🌼",
  "It’s okay to rest — even flowers need time to bloom 🌸",
  "You are not your thoughts 🫶",
  "The sun always returns after the dark ☀️",
  "Your mind is powerful, but so is your heart 💖"
];

motivationBtn.addEventListener("click", () => {
  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  motivationBox.textContent = randomQuote;
  motivationBox.classList.remove("hidden");
});
