import { useState } from "react";
import ComicPanel from "./components/ComicPanel";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createStory() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/api/story/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "Midnight Magic School",
          audience: "students",
          style: "unique, enjoyable comic adventure",
          panels: 6
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Story generation failed.");
      }

      setStory(data.story);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="moon" aria-hidden="true">☾</div>
        <div className="hero-content">
          <p className="eyebrow">ANIMATED COMIC STORY STUDIO</p>
          <h1>Midnight Magic School</h1>
          <p className="hero-text">
            A mysterious school appears after midnight. Create a student-friendly
            comic with separate panels, dialogue, narration, and animated cartoon characters.
          </p>
          <button className="magic-button" onClick={createStory} disabled={loading}>
            {loading ? "Creating Story..." : "✨ Create Story"}
          </button>
          {message && <p className="error-message">{message}</p>}
        </div>
      </section>

      {!story && (
        <section className="empty-state">
          <div className="empty-book">📖</div>
          <h2>Your comic will appear here</h2>
          <p>Press “Create Story” to display the Midnight Magic School panels.</p>
        </section>
      )}

      {story && (
        <section className="comic-section">
          <div className="story-heading">
            <div>
              <p className="eyebrow">COMIC STORY</p>
              <h2>{story.title}</h2>
              <p>{story.introduction}</p>
            </div>
            <span className="panel-count">{story.panels.length} Panels</span>
          </div>

          <div className="comic-grid">
            {story.panels.map((panel, index) => (
              <ComicPanel key={panel.id || index} panel={panel} index={index} />
            ))}
          </div>

          <div className="ending-card">
            <span>🌙</span>
            <div>
              <h3>Conclusion</h3>
              <p>{story.conclusion}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}