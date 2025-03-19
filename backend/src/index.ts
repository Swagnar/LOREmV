import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import * as marked from 'marked';

const PORT = 3001
const API_URL = "http://localhost:3001";

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}))

app.use('/public', express.static(path.join(__dirname, '../public')))

const campaignsDir = 'campaigns';

interface Note {
  name: string;
  path: string; 
}

interface Campaign {
  name: string;
  notes: Note[];
}

const getFilesRecursively = (dir: string, basePath: string, seen = new Set()): Note[] => {
  let results: Note[] = [];

  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');

    if (seen.has(relativePath)) continue; // Skip duplicates
    seen.add(relativePath);

    if (stat.isDirectory()) {
      results.push(...getFilesRecursively(filePath, basePath, seen)); 
    } else if (file.endsWith('.md')) {
      results.push({
        name: path.basename(filePath), 
        path: relativePath, 
      });
    }
  }

  return results;
};


const getCampaigns = (): Campaign[] => {
  const campaigns: Campaign[] = [];
  if (!fs.existsSync(campaignsDir)) return campaigns;

  const campaignDirs = fs.readdirSync(campaignsDir).filter((dir) =>
    fs.statSync(path.join(campaignsDir, dir)).isDirectory()
  );

  for (const campaign of campaignDirs) {
    const basePath = path.join(campaignsDir, campaign);
    let notes = getFilesRecursively(basePath, basePath);

    // Sort: Put notes with folders first, loose files at the bottom
    notes.sort((a, b) => {
      const aHasFolder = a.path.includes("/");
      const bHasFolder = b.path.includes("/");
      return aHasFolder === bHasFolder ? 0 : aHasFolder ? -1 : 1;
    });

    campaigns.push({
      name: campaign,
      notes,
    });
  }

  return campaigns;
};

app.get('/api/campaigns', (req: Request, res: Response) => {
  const campaigns = getCampaigns();
  res.json(campaigns);
});


app.get('/api/campaigns/:campaign/notes/*', (req: Request, res: Response) => {
  const { campaign } = req.params;
  const note = req.params[0];
  const filePath = path.join(campaignsDir, campaign, note);

  if (!fs.existsSync(filePath) || !filePath.endsWith('.md')) {
    return res.status(404).json({ error: 'Note not found' });
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Rewrite image URLs
  content = content.replace(/!\[\]\((\/public\/[^)]+)\)/g, (match, p1) => {
    return `![](${API_URL}${p1})`;
  });

  const htmlContent = marked.parse(content);

  res.send(htmlContent);
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)); 
