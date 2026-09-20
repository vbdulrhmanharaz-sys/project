import { useState } from "react";
import { FiCheck, FiEdit3, FiX } from "react-icons/fi";

const noteKey = "noura-quick-note";

export default function QuickNote() {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(() => localStorage.getItem(noteKey) || "");
  const [saved, setSaved] = useState(false);

  const saveNote = (event) => {
    event.preventDefault();
    localStorage.setItem(noteKey, note.trim());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className={`quick-note ${isOpen ? "is-open" : ""}`}>
      {isOpen && (
        <form className="quick-note-panel surface" onSubmit={saveNote}>
          <div className="quick-note-heading"><div><p className="eyebrow">Personal space</p><h2>Keep a thought close.</h2></div><button type="button" className="icon-button" onClick={() => setIsOpen(false)} aria-label="Close note"><FiX /></button></div>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="A task, an idea, a question..." aria-label="Quick note" maxLength={280} />
          <div className="quick-note-footer"><span>{note.length}/280</span><button className="primary-action" type="submit">{saved ? <><FiCheck /> Saved</> : "Save note"}</button></div>
        </form>
      )}
      <button className="quick-note-trigger" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close quick note" : "Open quick note"}><FiEdit3 /><span>{isOpen ? "Close" : "Quick note"}</span></button>
    </div>
  );
}
