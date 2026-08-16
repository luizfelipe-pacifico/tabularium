"use client";

import { StickyNote } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/app-shell/page-header";

const initialNotes = [
  { title: "Report template", text: "Draft an HTML template for the weekly status email." },
  { title: "Quick triage", text: "Turn a raw insight into a demand, note, or roadmap item before it's lost." },
];

export default function NotesPage() {
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;
    setNotes([{ title: "Quick note", text }, ...notes]);
    setDraft("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Quick capture"
        title="Notes"
        description="Lightweight capture for ideas, follow-ups, and anything worth turning into a demand later. Not persisted yet — see docs/SCREENS.md."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "0.9fr 1.1fr" }}>
        <article className="panel">
          <div className="panel-title">
            <StickyNote size={17} />
            <h3>New note</h3>
          </div>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write an insight, follow-up, or idea…"
            style={{
              marginTop: 14,
              minHeight: 180,
              width: "100%",
              resize: "none",
              borderRadius: 6,
              border: "1px solid var(--line)",
              background: "var(--parchment)",
              padding: 12,
              fontSize: 12,
              color: "var(--foreground)",
              fontFamily: "inherit",
            }}
          />
          <button className="refresh-button" style={{ marginTop: 12, width: "100%" }} onClick={addNote}>
            Save note
          </button>
        </article>

        <div className="distribution-grid" style={{ gridTemplateColumns: "1fr 1fr", alignContent: "start" }}>
          {notes.map((note, index) => (
            <article className="panel" key={`${note.title}-${index}`}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 14 }}>
                {note.title}
              </h3>
              <p style={{ margin: "8px 0 0", color: "var(--graphite)", fontSize: 12, lineHeight: 1.6 }}>
                {note.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
