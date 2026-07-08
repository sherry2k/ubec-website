/**
 * Google Sheets as Free CMS
 * 
 * Setup:
 * 1. Create a Google Sheet with your content
 * 2. File → Share → Publish to web → CSV
 * 3. Copy the CSV link and paste below
 * 
 * Sheet columns for Projects:
 * title | location | type | status | services | image | featured
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
// For private sheets, add API key to fetch URL: &key=YOUR_API_KEY

// Public sheet URLs (replace with your own)
const SHEETS = {
  projects: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Projects`,
  tenders: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Tenders`,
  services: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Services`,
  testimonials: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Testimonials`,
  settings: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Settings`,
};

interface SheetRow {
  [key: string]: string;
}

/**
 * Parse Google Sheets JSON response
 */
function parseSheetData(jsonString: string): SheetRow[] {
  // Google Sheets returns JSONP, extract the JSON
  const json = JSON.parse(jsonString.substring(47).slice(0, -2));
  
  const headers = json.table.cols.map((col: { label: string }) => col.label);
  const rows = json.table.rows.map((row: { c: Array<{ v: string } | null> }) => {
    const obj: SheetRow = {};
    row.c.forEach((cell, index) => {
      obj[headers[index]] = cell?.v || '';
    });
    return obj;
  });
  
  return rows;
}

/**
 * Fetch data from a sheet
 */
async function fetchSheet(sheetUrl: string): Promise<SheetRow[]> {
  try {
    const response = await fetch(sheetUrl);
    const text = await response.text();
    return parseSheetData(text);
  } catch (error) {
    console.error('Error fetching sheet:', error);
    return [];
  }
}

/**
 * Get all projects
 */
export async function getProjects() {
  const rows = await fetchSheet(SHEETS.projects);
  return rows.map(row => ({
    title: row.title,
    location: row.location,
    type: row.type,
    status: row.status,
    services: row.services?.split(',').map(s => s.trim()) || [],
    image: row.image,
    featured: row.featured?.toLowerCase() === 'true',
  }));
}

/**
 * Get all tenders
 */
export async function getTenders() {
  const rows = await fetchSheet(SHEETS.tenders);
  return rows.map(row => ({
    title: row.title,
    location: row.location,
    description: row.description,
    submissionDate: row.submissionDate,
    drawingsLink: row.drawingsLink,
    image: row.image,
  }));
}

/**
 * Get all services
 */
export async function getServices() {
  const rows = await fetchSheet(SHEETS.services);
  return rows.map(row => ({
    title: row.title,
    description: row.description,
    icon: row.icon,
  }));
}

/**
 * Get all testimonials
 */
export async function getTestimonials() {
  const rows = await fetchSheet(SHEETS.testimonials);
  return rows.map(row => ({
    name: row.name,
    company: row.company,
    role: row.role,
    text: row.text,
  }));
}

/**
 * Get site settings
 */
export async function getSettings() {
  const rows = await fetchSheet(SHEETS.settings);
  const settings: Record<string, string> = {};
  rows.forEach(row => {
    settings[row.key] = row.value;
  });
  return settings;
}
