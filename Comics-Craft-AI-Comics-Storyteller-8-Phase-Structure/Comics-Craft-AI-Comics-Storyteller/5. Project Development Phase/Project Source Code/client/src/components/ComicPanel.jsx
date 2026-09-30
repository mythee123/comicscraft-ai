import Character from "./Character";

export default function ComicPanel({ panel, index }) {
  return (
    <article className={`comic-panel panel-${index % 3}`}>
      <div className="panel-number">PANEL {index + 1}</div>

      <div className="scene">
        <div className="stars">✦ · ✧ · ✦ · ✧</div>
        <div className="school-silhouette">
          <div className="tower"></div>
          <div className="roof"></div>
          <div className="building">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div className="character-row">
          {(panel.characters || ["Aria"]).slice(0, 3).map((name, i) => (
            <Character
              key={name}
              name={name}
              type={i === 0 ? "student" : i === 1 ? "friend" : "professor"}
            />
          ))}
        </div>
      </div>

      <div className="panel-copy">
        <h3>{panel.title}</h3>
        <p className="narration">{panel.narration}</p>

        <div className="dialogue-box">
          <strong>{panel.speaker}:</strong> “{panel.dialogue}”
        </div>

        <p className="action">{panel.action}</p>
      </div>
    </article>
  );
}