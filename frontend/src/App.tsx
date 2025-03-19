import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

// Markdown type shit
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"


type Note = {
  name: string
  path: string
}

type Campaign = {
  name: string
  notes: Note[]
}

const API_URL = "http://localhost:3001"

const Sidebar = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns`)
      .then((res) => res.json())
      .then(setCampaigns)
      .catch(console.error)
  }, [])

  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 overflow-auto">
      {campaigns.map((campaign) => {
        const groupedNotes: Record<string, Note[]> = {}
  
        campaign.notes.forEach((note) => {
          const parts = note.path.split("/")
          const folder = parts.length > 1 ? parts[0] : "Misc"
  
          if (!groupedNotes[folder]) {
            groupedNotes[folder] = []
          }
          groupedNotes[folder].push(note)
        })
  
        return (
          <details key={campaign.name} className="mb-3">
            <summary className="text-lg font-semibold text-blue-300 cursor-pointer">
              {campaign.name}
            </summary>
            {Object.entries(groupedNotes).map(([folder, notes]) => (
              folder === "Misc" ? (
                notes.map((note) => (
                  <ul key={note.path}>
                    <li className="py-1">
                      <Link
                        to={`/campaigns/${campaign.name}/notes/${note.name}`}
                        className="text-blue-300 hover:underline"
                      >
                        {note.name.replace(".md", "")}
                      </Link>
                    </li>
                  </ul>
                ))
              ) : (
                <details key={folder}>
                  <summary className="font-semibold">{folder}</summary>
                  <ul className="ml-4">
                    {notes.map((note) => (
                      <li key={note.path}>
                        <Link
                          to={`/campaigns/${campaign.name}/notes/${note.path}`} // Keep full relative path
                          className="text-blue-300 hover:underline"
                        >
                          {note.name.replace(".md", "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )
            ))}
          </details>
        )
      })}
    </div>
  )
}

function NoteViewer() {
  const { campaign, "*": notePath } = useParams<{ campaign: string; "*": string }>();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (campaign && notePath) {
      fetch(`http://localhost:3001/api/campaigns/${campaign}/notes/${notePath}`)
        .then((res) => res.text())
        .then(setContent)
        .catch(console.error);
    }
  }, [campaign, notePath]);

  return (
    <div className="markdown">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content} 
      </ReactMarkdown>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-3/4 flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/campaigns/:campaign/notes/*" element={<NoteViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
