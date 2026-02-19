// Mock data for the news aggregator app

// Optional: add your News API key here (e.g., NewsAPI.org)
// Leave empty to keep using mock data. You can also set this via
// localStorage by running in the browser console:
// localStorage.setItem('NEWS_API_KEY', 'your-key-here');
// Note: GNews endpoint (https://gnews.io) uses ?apikey=
// Required params for top-headlines: lang, country, topic or q
const NEWS_API_KEY = 'ad4241e40652679721d1f4a98e1e99c8';
const NEWS_API_URL = 'https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=ad4241e40652679721d1f4a98e1e99c8';

const MOCK_ARTICLES = [
    {
        id: 1,
        title: "Revolutionary AI Breakthrough Changes Everything",
        excerpt: "Scientists have developed a new AI system that can understand context better than ever before, potentially transforming how we interact with technology.",
        source: "TechNews",
        topic: "Technology",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        readingTime: 5,
        image: "🤖",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 2,
        title: "Global Climate Summit Reaches Historic Agreement",
        excerpt: "World leaders have agreed on unprecedented measures to combat climate change, setting ambitious targets for carbon reduction by 2030.",
        source: "World News",
        topic: "Environment",
        date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        readingTime: 8,
        image: "🌍",
        isBreaking: true,
        type: "news"
    },
    {
        id: 3,
        title: "New Study Reveals Benefits of Remote Work",
        excerpt: "Research shows that remote workers report higher job satisfaction and productivity, challenging traditional office-based work models.",
        source: "Business Daily",
        topic: "Business",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        readingTime: 6,
        image: "💼",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 4,
        title: "Space Mission Discovers Water on Mars",
        excerpt: "Latest Mars rover mission has confirmed the presence of significant water deposits, opening new possibilities for future colonization.",
        source: "Science Today",
        topic: "Science",
        date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        readingTime: 7,
        image: "🚀",
        isBreaking: false,
        type: "news"
    },
    {
        id: 5,
        title: "Stock Market Reaches All-Time High",
        excerpt: "Major indices surge as investors respond positively to economic indicators and corporate earnings reports.",
        source: "Finance Weekly",
        topic: "Finance",
        date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        readingTime: 4,
        image: "📈",
        isBreaking: true,
        type: "news"
    },
    {
        id: 6,
        title: "New Cancer Treatment Shows Promising Results",
        excerpt: "Clinical trials reveal a breakthrough therapy that could significantly improve survival rates for certain types of cancer.",
        source: "Health News",
        topic: "Health",
        date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        readingTime: 9,
        image: "🏥",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 7,
        title: "Electric Vehicles Surpass Gas Cars in Sales",
        excerpt: "For the first time, electric vehicles have outsold traditional gasoline cars in several major markets, signaling a shift in consumer preferences.",
        source: "Auto World",
        topic: "Technology",
        date: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        readingTime: 5,
        image: "🚗",
        isBreaking: false,
        type: "news"
    },
    {
        id: 8,
        title: "Major Sports League Announces Rule Changes",
        excerpt: "The league has introduced new rules aimed at improving player safety and making the game more exciting for fans.",
        source: "Sports Central",
        topic: "Sports",
        date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        readingTime: 4,
        image: "⚽",
        isBreaking: false,
        type: "news"
    },
    {
        id: 9,
        title: "Renewable Energy Reaches 50% of Global Production",
        excerpt: "A milestone achievement as renewable sources now account for half of the world's energy production, marking a turning point in the energy transition.",
        source: "Energy Report",
        topic: "Environment",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        readingTime: 7,
        image: "⚡",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 10,
        title: "New Smartphone Features Revolutionary Camera",
        excerpt: "The latest flagship phone introduces camera technology that rivals professional equipment, changing mobile photography forever.",
        source: "TechNews",
        topic: "Technology",
        date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        readingTime: 6,
        image: "📱",
        isBreaking: true,
        type: "news"
    },
    {
        id: 11,
        title: "Education System Embraces Digital Learning",
        excerpt: "Schools worldwide are adopting new digital platforms that personalize learning experiences for each student.",
        source: "Education Today",
        topic: "Education",
        date: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
        readingTime: 8,
        image: "📚",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 12,
        title: "Cryptocurrency Regulation Framework Announced",
        excerpt: "Government officials have unveiled comprehensive regulations for cryptocurrency trading and blockchain technology.",
        source: "Finance Weekly",
        topic: "Finance",
        date: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
        readingTime: 10,
        image: "₿",
        isBreaking: false,
        type: "news"
    },
    {
        id: 13,
        title: "Mental Health Awareness Campaign Launched",
        excerpt: "A new nationwide initiative aims to reduce stigma around mental health and improve access to support services.",
        source: "Health News",
        topic: "Health",
        date: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
        readingTime: 5,
        image: "🧠",
        isBreaking: false,
        type: "news"
    },
    {
        id: 14,
        title: "Quantum Computing Breakthrough Achieved",
        excerpt: "Researchers have successfully demonstrated quantum supremacy in solving complex problems, opening new computational possibilities.",
        source: "Science Today",
        topic: "Science",
        date: new Date(Date.now() - 15 * 60 * 60 * 1000), // 15 hours ago
        readingTime: 12,
        image: "⚛️",
        isBreaking: false,
        type: "analysis"
    },
    {
        id: 15,
        title: "Sustainable Fashion Takes Center Stage",
        excerpt: "Major fashion brands commit to sustainable practices as consumers demand more environmentally responsible clothing options.",
        source: "Lifestyle Magazine",
        topic: "Lifestyle",
        date: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
        readingTime: 6,
        image: "👗",
        isBreaking: false,
        type: "news"
    }
];

const TOPICS = [
    { id: "technology", name: "Technology", icon: "💻", description: "Tech news and innovations" },
    { id: "science", name: "Science", icon: "🔬", description: "Scientific discoveries and research" },
    { id: "business", name: "Business", icon: "💼", description: "Business and economy news" },
    { id: "health", name: "Health", icon: "🏥", description: "Health and wellness" },
    { id: "environment", name: "Environment", icon: "🌍", description: "Climate and environment" },
    { id: "finance", name: "Finance", icon: "💰", description: "Financial markets and money" },
{ id: "sports", name: "Sports", icon: "🏏", description: "Sports news and updates" },
    { id: "education", name: "Education", icon: "📚", description: "Education and learning" },
    { id: "lifestyle", name: "Lifestyle", icon: "🌟", description: "Lifestyle and culture" },
    { id: "politics", name: "Politics", icon: "🏛️", description: "Political news and analysis" }
];

const SOURCES = [
    "TechNews",
    "World News",
    "Business Daily",
    "Science Today",
    "Finance Weekly",
    "Health News",
    "Auto World",
    "Sports Central",
    "Energy Report",
    "Education Today",
    "Lifestyle Magazine"
];

const keywordTopicMap = [
    { topic: "Technology", keywords: ["ai", "tech", "software", "app", "cloud", "robot", "device", "gadget", "smartphone", "electric vehicle", "ev"] },
    { topic: "Science", keywords: ["science", "research", "lab", "experiment", "quantum", "space", "nasa", "mars", "astronomy"] },
    { topic: "Business", keywords: ["business", "startup", "market", "earnings", "company", "corporate", "industry"] },
    { topic: "Health", keywords: ["health", "medical", "medicine", "hospital", "cancer", "virus", "vaccine", "mental"] },
    { topic: "Environment", keywords: ["climate", "environment", "sustainability", "emissions", "renewable", "solar", "wind", "water"] },
    { topic: "Finance", keywords: ["finance", "bank", "crypto", "stocks", "market", "invest", "economy"] },
    { topic: "Sports", keywords: ["sports", "match", "game", "league", "tournament", "player"] },
    { topic: "Education", keywords: ["education", "school", "university", "student", "learning"] },
    { topic: "Lifestyle", keywords: ["lifestyle", "fashion", "travel", "culture", "food", "design"] },
    { topic: "Politics", keywords: ["election", "policy", "government", "congress", "senate", "minister"] }
];

function inferTopicFromText(text = "") {
    const lowered = text.toLowerCase();
    for (const entry of keywordTopicMap) {
        if (entry.keywords.some(k => lowered.includes(k))) {
            return entry.topic;
        }
    }
    return "General";
}

function estimateReadingTime(text = "") {
    const words = text.split(/\s+/).filter(Boolean).length || 200;
    return Math.max(2, Math.round(words / 200));
}

function normalizeApiArticle(raw, idx = 0) {
    const content = raw.content || raw.description || raw.title || "";
    const combinedText = `${raw.title || ""} ${raw.description || ""} ${content}`;
    const topic = raw.category
        ? capitalizeFirst(raw.category)
        : inferTopicFromText(combinedText);
    const readingTime = raw.readingTime || estimateReadingTime(content);
    
    // Generate unique ID - use URL hash if available, otherwise create hash from title+source
    let articleId = raw.url || raw.title || `live-${idx}`;
    if (raw.url) {
        // Create a simple hash from URL for consistent ID
        articleId = 'live-' + btoa(raw.url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20) + '-' + idx;
    } else if (raw.title) {
        articleId = 'live-' + btoa(raw.title + (raw.source?.name || raw.source || '')).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20) + '-' + idx;
    }

    return {
        id: articleId,
        title: raw.title || "Untitled story",
        excerpt: raw.description || content.slice(0, 140) || raw.title || "",
        source: (raw.source && raw.source.name) || raw.source || "Live Source",
        topic,
        date: raw.publishedAt ? new Date(raw.publishedAt) : new Date(),
        readingTime,
        image: raw.urlToImage ? "🖼️" : "📰",
        isBreaking: Boolean(raw.isBreaking) || (raw.publishedAt && (Date.now() - new Date(raw.publishedAt).getTime()) < 3 * 60 * 60 * 1000),
        type: "news",
        url: raw.url,
        content
    };
}

function capitalizeFirst(value = "") {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
}

async function fetchLiveNews() {
    const keyFromStorage = localStorage.getItem('NEWS_API_KEY');
    const apiKey = keyFromStorage || NEWS_API_KEY;
    if (!apiKey) {
        return { articles: MOCK_ARTICLES, source: "mock", error: "No API key set; using mock articles." };
    }

    try {
        // GNews expects "apikey" (lowercase)
        // Cache-buster to avoid browser/network caching
        const response = await fetch(`${NEWS_API_URL}&apikey=${apiKey}&_=${Date.now()}`);
        if (!response.ok) {
            throw new Error(`News API error ${response.status}`);
        }
        const data = await response.json();
        if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
            return { articles: MOCK_ARTICLES, source: "mock", error: "No live articles returned; using mock data." };
        }

        const normalized = data.articles.map((a, idx) => normalizeApiArticle(a, idx)).filter(a => a.title && a.topic);

        const sources = Array.from(new Set(normalized.map(a => a.source)));
        const topics = Array.from(new Set(normalized.map(a => a.topic)));

        return {
            articles: normalized,
            source: "live",
            sources,
            topics,
            error: null
        };
    } catch (err) {
        return { articles: MOCK_ARTICLES, source: "mock", error: err.message };
    }
}

// Generate full article content
function generateArticleContent(article) {
    // If article has content from API, use it
    if (article.content && article.content.length > 200) {
        return `
            <p><strong>${article.excerpt}</strong></p>
            <p>${article.content}</p>
        `;
    }
    
    // Otherwise use excerpt with placeholder content
    return `
        <p><strong>${article.excerpt}</strong></p>
        <p>This is a summary of the article. Click the button below to read the full article on the original source website.</p>
        ${article.url ? '' : `
            <p>This is a detailed article about ${article.title.toLowerCase()}. The content would normally be fetched from a news API or content management system. In a real application, this would include full paragraphs, images, quotes, and other rich media content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `}
    `;
}

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOCK_ARTICLES, TOPICS, SOURCES, generateArticleContent, fetchLiveNews };
}

