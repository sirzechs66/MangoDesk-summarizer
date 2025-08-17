import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [customPrompt, setCustomPrompt] = useState(
    "Summarize in bullet points for executives",
  );
  const [summary, setSummary] = useState("");
  const [recipients, setRecipients] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary("");
    setNotification("");
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, customPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setNotification(`Error: ${data.message}`);
      }
    } catch (error) {
      setNotification("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    setNotification("Sending...");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, recipients }),
      });
      const data = await response.json();
      setNotification(response.ok ? data.message : `Error: ${data.message}`);
    } catch (error) {
      setNotification("Failed to send email.");
    }
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">AI Meeting Summarizer</h1>
        <p className="description">
          Paste your meeting notes or transcript below.
        </p>

        <div className="card">
          <h3>1. Input Transcript</h3>
          <textarea
            className="textarea"
            placeholder="Paste your full meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </div>

        <div className="card">
          <h3>2. Custom Instruction</h3>
          <input
            type="text"
            className="input"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerateSummary}
            disabled={isLoading || !transcript}
          >
            {isLoading ? "Generating..." : "Generate Summary"}
          </button>
        </div>

        {summary && (
          <div className="card">
            <h3>3. Edit & Share Summary</h3>
            <textarea
              className="textarea summary-box"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="share-section">
              <input
                type="email"
                className="input"
                placeholder="recipient1@example.com, recipient2@example.com"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <button onClick={handleShare} disabled={!recipients}>
                Share via Email
              </button>
            </div>
          </div>
        )}

        {notification && <p className="notification">{notification}</p>}
      </main>
    </div>
  );
}
