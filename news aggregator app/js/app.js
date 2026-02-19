// Main Application Logic

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

let articleStore = [...MOCK_ARTICLES];
let articleSource = 'mock';
let sourceOptions = new Set(SOURCES);
let topicOptions = new Set(TOPICS.map(t => t.name));
window.articleStore = articleStore;

async function initializeApp() {
    setupEventListeners();
    await ensureArticles();
    populateFilters();
    populatePreferences();
    populateTopics();
    showView('feed');
    loadFeed();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            showView(view);
        });
    });

    // Settings
    document.getElementById('settingsBtn').addEventListener('click', () => {
        openSettings();
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
        closeSettings();
    });

    document.getElementById('savePreferences').addEventListener('click', () => {
        savePreferences();
    });

    // Filters
    document.getElementById('filterBtn').addEventListener('click', () => {
        toggleFilterBar();
    });

    document.getElementById('clearFilters').addEventListener('click', () => {
        clearFilters();
    });

    document.getElementById('topicFilter').addEventListener('change', applyFilters);
    document.getElementById('sourceFilter').addEventListener('change', applyFilters);
    document.getElementById('dateFilter').addEventListener('change', applyFilters);
    document.getElementById('timeFilter').addEventListener('change', applyFilters);

    // Article Modal
    document.getElementById('closeArticle').addEventListener('click', () => {
        closeArticleModal();
    });

    // Close modals on background click
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettings();
        }
    });

    document.getElementById('articleModal').addEventListener('click', (e) => {
        if (e.target.id === 'articleModal') {
            closeArticleModal();
        }
    });
}

async function ensureArticles(force = false) {
    if (articleStore.length && !force && articleSource === 'live') {
        return { articles: articleStore, source: articleSource, error: null };
    }

    const result = await fetchLiveNews();
    const articles = result.articles || MOCK_ARTICLES;

    articleStore = articles;
    articleSource = result.source || 'mock';
    window.articleStore = articleStore;

    (result.sources || []).forEach(s => sourceOptions.add(s));
    (result.topics || articles.map(a => a.topic)).forEach(t => topicOptions.add(t));

    return { articles, source: articleSource, error: result.error || null };
}

function getTopicMeta(name) {
    const base = TOPICS.find(t => t.name === name);
    return base || { name, icon: '🏷️', description: 'Follow this topic' };
}

function getTopicOptionsArray() {
    return Array.from(topicOptions).sort();
}

function getSourceOptionsArray() {
    return Array.from(sourceOptions).sort();
}

// View Management
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });

    // Show selected view
    document.getElementById(`${viewName}View`).classList.remove('hidden');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });

    // Load view content
    if (viewName === 'feed') {
        loadFeed();
    } else if (viewName === 'topics') {
        loadTopics();
    } else if (viewName === 'history') {
        loadHistory();
    }
}

// Feed Management
async function loadFeed() {
    const feedContainer = document.getElementById('articleFeed');
    feedContainer.innerHTML = '';

    showLoading();

    const { articles, source, error } = await ensureArticles();
    const filters = getActiveFilters();
    const personalizedArticles = personalizationEngine.getPersonalizedFeed(articles, filters);
    const recommendations = personalizationEngine.getRecommendations(articles, 3);

    // Render recommendations first
    if (recommendations.length > 0 && filters.topic === '' && filters.source === '') {
        const recSection = createRecommendationsSection(recommendations);
        feedContainer.appendChild(recSection);
    }

    // Render articles
    personalizedArticles.forEach(article => {
        const card = createArticleCard(article, recommendations.includes(article));
        feedContainer.appendChild(card);
    });

    hideLoading();
    updateFilterBadge();

    if (error && source === 'mock') {
        showNotification('Using demo articles: ' + error);
    }
}

function createRecommendationsSection(recommendations) {
    const section = document.createElement('div');
    section.className = 'recommendations-section';
    section.innerHTML = `
        <div class="view-header">
            <h3>Recommended for You</h3>
            <p class="subtitle">Based on your reading history and preferences</p>
        </div>
    `;

    recommendations.forEach(article => {
        const card = createArticleCard(article, true);
        section.appendChild(card);
    });

    return section;
}

function createArticleCard(article, isRecommended = false) {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.dataset.articleId = article.id;

    const timeAgo = getTimeAgo(article.date);
    const isFollowed = personalizationEngine.getFollowedTopics().includes(article.topic);

    card.innerHTML = `
        <div class="article-header">
            <h3 class="article-title">${article.image} ${article.title}</h3>
            ${isRecommended ? '<span class="article-badge">Recommended</span>' : ''}
        </div>
        <div class="article-meta">
            <span class="meta-item">
                <span>📰</span>
                ${article.source}
            </span>
            <span class="meta-item">
                <span>🕒</span>
                ${timeAgo}
            </span>
            <span class="meta-item">
                <span>⏱️</span>
                ${article.readingTime} min read
            </span>
            ${article.isBreaking ? '<span class="meta-item"><span>🔥</span> Breaking</span>' : ''}
        </div>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-footer">
            <div class="article-tags">
                <span class="tag ${isFollowed ? 'followed' : ''}">${article.topic}</span>
                <span class="tag">${article.type}</span>
            </div>
            <span class="read-time">${article.readingTime} min</span>
        </div>
        ${isRecommended ? `<div class="recommendation-reason">💡 ${personalizationEngine.getRecommendationReason(article)}</div>` : ''}
    `;

    card.addEventListener('click', () => {
        openArticle(article);
    });

    return card;
}

// Article Modal
function openArticle(article) {
    personalizationEngine.trackRead(article);

    const modal = document.getElementById('articleModal');
    document.getElementById('articleTitle').textContent = article.title;
    
    const timeAgo = getTimeAgo(article.date);
    document.getElementById('articleMeta').innerHTML = `
        <div class="article-meta">
            <span class="meta-item"><span>📰</span> ${article.source}</span>
            <span class="meta-item"><span>🕒</span> ${timeAgo}</span>
            <span class="meta-item"><span>⏱️</span> ${article.readingTime} min read</span>
            <span class="meta-item"><span>🏷️</span> ${article.topic}</span>
        </div>
    `;

    let content = generateArticleContent(article);
    
    // Add "Read Full Article" button for real-time news with URLs
    if (article.url) {
        content += `
            <div style="margin-top: 2rem; padding: 1.5rem; background: #eff6ff; border-radius: 8px; text-align: center;">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" 
                   style="display: inline-block; padding: 0.75rem 2rem; background: var(--primary-color); 
                          color: white; text-decoration: none; border-radius: 8px; font-weight: 600;
                          transition: background 0.2s;">
                    📖 Read Full Article on ${article.source}
                </a>
            </div>
        `;
    }

    document.getElementById('articleContent').innerHTML = content;
    modal.classList.add('active');
}

function closeArticleModal() {
    document.getElementById('articleModal').classList.remove('active');
    // Reload feed to show updated recommendations
    if (!document.getElementById('feedView').classList.contains('hidden')) {
        loadFeed();
    }
}

// Filter Management
function toggleFilterBar() {
    const filterBar = document.getElementById('filterBar');
    filterBar.classList.toggle('active');
}

function getActiveFilters() {
    return {
        topic: document.getElementById('topicFilter').value,
        source: document.getElementById('sourceFilter').value,
        date: document.getElementById('dateFilter').value,
        time: document.getElementById('timeFilter').value
    };
}

function applyFilters() {
    loadFeed();
    updateFilterBadge();
}

function clearFilters() {
    document.getElementById('topicFilter').value = '';
    document.getElementById('sourceFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('timeFilter').value = '';
    applyFilters();
}

function updateFilterBadge() {
    const filters = getActiveFilters();
    const activeCount = Object.values(filters).filter(v => v !== '').length;
    const badge = document.getElementById('filterBadge');
    badge.textContent = activeCount;
    badge.style.display = activeCount > 0 ? 'flex' : 'none';
}

function populateFilters() {
    // Populate topic filter
    const topicFilter = document.getElementById('topicFilter');
    topicFilter.innerHTML = '<option value="">All Topics</option>';
    getTopicOptionsArray().forEach(topicName => {
        const option = document.createElement('option');
        option.value = topicName;
        option.textContent = topicName;
        topicFilter.appendChild(option);
    });

    // Populate source filter
    const sourceFilter = document.getElementById('sourceFilter');
    sourceFilter.innerHTML = '<option value="">All Sources</option>';
    getSourceOptionsArray().forEach(source => {
        const option = document.createElement('option');
        option.value = source;
        option.textContent = source;
        sourceFilter.appendChild(option);
    });
}

// Preferences Management
function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
    populatePreferences();
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function populatePreferences() {
    const prefs = personalizationEngine.userPreferences;

    // Populate topic checkboxes
    const topicContainer = document.getElementById('topicCheckboxes');
    topicContainer.innerHTML = '';
    getTopicOptionsArray().forEach(topicName => {
        const topic = getTopicMeta(topicName);
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${topic.name}" ${prefs.topics.includes(topic.name) ? 'checked' : ''}>
            <span>${topic.icon} ${topic.name}</span>
        `;
        topicContainer.appendChild(label);
    });

    // Populate source checkboxes
    const sourceContainer = document.getElementById('sourceCheckboxes');
    sourceContainer.innerHTML = '';
    getSourceOptionsArray().forEach(source => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${source}" ${prefs.sources.includes(source) ? 'checked' : ''}>
            <span>${source}</span>
        `;
        sourceContainer.appendChild(label);
    });

    // Set other preferences
    document.getElementById('prefBreakingNews').checked = prefs.showBreakingNews;
    document.getElementById('prefOpinions').checked = prefs.includeOpinions;
    document.getElementById('prefAnalysis').checked = prefs.includeAnalysis;
}

function savePreferences() {
    const topics = Array.from(document.querySelectorAll('#topicCheckboxes input:checked'))
        .map(cb => cb.value);
    
    const sources = Array.from(document.querySelectorAll('#sourceCheckboxes input:checked'))
        .map(cb => cb.value);

    personalizationEngine.updatePreferences({
        topics,
        sources,
        showBreakingNews: document.getElementById('prefBreakingNews').checked,
        includeOpinions: document.getElementById('prefOpinions').checked,
        includeAnalysis: document.getElementById('prefAnalysis').checked
    });

    closeSettings();
    loadFeed();
    loadTopics();
    showNotification('Preferences saved! Your feed will update shortly.');
}

// Topics Management
function loadTopics() {
    const container = document.getElementById('topicsGrid');
    container.innerHTML = '';

    const followedTopics = personalizationEngine.getFollowedTopics();

    getTopicOptionsArray().forEach(topicName => {
        const topic = getTopicMeta(topicName);
        const card = createTopicCard(topic, followedTopics.includes(topic.name));
        container.appendChild(card);
    });
}

function createTopicCard(topic, isFollowed) {
    const card = document.createElement('div');
    card.className = `topic-card ${isFollowed ? 'followed' : ''}`;

    // Count articles for this topic
    const topicArticles = articleStore.filter(a => a.topic === topic.name);
    const recentCount = topicArticles.filter(a => {
        const hoursAgo = (Date.now() - a.date.getTime()) / (1000 * 60 * 60);
        return hoursAgo < 24;
    }).length;

    card.innerHTML = `
        <div class="topic-header">
            <div>
                <div class="topic-name">${topic.icon} ${topic.name}</div>
                <p class="section-desc">${topic.description}</p>
            </div>
        </div>
        <div class="topic-stats">
            <span>${topicArticles.length} articles</span>
            <span>${recentCount} today</span>
        </div>
        <div class="topic-actions">
            <button class="btn-follow ${isFollowed ? 'following' : ''}" data-topic="${topic.name}">
                ${isFollowed ? '✓ Following' : '+ Follow'}
            </button>
        </div>
    `;

    const followBtn = card.querySelector('.btn-follow');
    followBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTopicFollow(topic.name);
    });

    card.addEventListener('click', () => {
        // Filter feed by this topic
        document.getElementById('topicFilter').value = topic.name;
        showView('feed');
        applyFilters();
    });

    return card;
}

function populateTopics() {
    // This is called during initialization
    // Topics are populated when topics view is loaded
}

function toggleTopicFollow(topic) {
    const followed = personalizationEngine.getFollowedTopics();
    if (followed.includes(topic)) {
        personalizationEngine.unfollowTopic(topic);
    } else {
        personalizationEngine.followTopic(topic);
    }
    loadTopics();
    loadFeed();
}

// History Management
function loadHistory() {
    const container = document.getElementById('historyFeed');
    container.innerHTML = '';

    const history = personalizationEngine.readingHistory;

    if (history.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No reading history yet. Start reading articles to see them here!</p>';
        return;
    }

    history.forEach(item => {
        const card = createArticleCard(item.article, false);
        card.style.opacity = '0.8';
        container.appendChild(card);
    });
}

// Utility Functions
function getTimeAgo(date) {
    const now = Date.now();
    const diff = now - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showNotification(message) {
    // Simple notification (could be enhanced with a toast library)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

