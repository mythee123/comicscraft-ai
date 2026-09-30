export default function Character({ type = "student", name }) {
  return (
    <div className={`character character-${type}`} aria-label={`${name || type} cartoon`}>
      <div className="spark spark-a">✦</div>
      <div className="spark spark-b">✧</div>
      <div className="character-head">
        <div className="hair" />
        <div className="face">
          <span className="eye left" />
          <span className="eye right" />
          <span className="smile" />
        </div>
      </div>
      <div className="character-body">
        <div className="arm left-arm" />
        <div className="robe" />
        <div className="arm right-arm" />
      </div>
      <div className="character-name">{name || "Student"}</div>
    </div>
  );
}