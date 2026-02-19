// Personalization Engine

class PersonalizationEngine {
    constructor() {
        this.userPreferences = this.loadPreferences();
        this.readingHistory = this.loadHistory();
        this.engagementData = this.loadEngagement();
    }

    // Load user preferences from localStorage
    loadPreferences() {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            topics: [],
            sources: [],
            showBreakingNews: true,
            includeOpinions: true,
            includeAnalysis: true
        };
    }

    // Save user preferences to localStorage
    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }

    // Load reading history
    loadHistory() {
        const saved = localStorage.getItem('readingHistory');
        return saved ? JSON.parse(saved) : [];
    }

    // Save reading history
    saveHistory() {
        localStorage.setItem('readingHistory', JSON.stringify(this.readingHistory));
    }

    // Load engagement data
    loadEngagement() {
        const saved = localStorage.getItem('engagementData');
        return saved ? JSON.parse(saved) : {};
    }

    // Save engagement data
    saveEngagement() {
        localStorage.setItem('engagementData', JSON.stringify(this.engagementData));
    }

    // Track article read
    trackRead(articleOrId) {
        const pool = (typeof window !== 'undefined' && window.articleStore) ? window.articleStore : MOCK_ARTICLES;
        const article = typeof articleOrId === 'object'
            ? articleOrId
            : pool.find(a => a.id === articleOrId);
        if (!article) return;

        const articleId = article.id || article.url || `article-${Date.now()}`;

        // Add to reading history if not already there
        if (!this.readingHistory.find(h => h.id === articleId)) {
            this.readingHistory.unshift({
                id: articleId,
                timestamp: Date.now(),
                article: article
            });
            // Keep only last 50 articles
            if (this.readingHistory.length > 50) {
                this.readingHistory = this.readingHistory.slice(0, 50);
            }
            this.saveHistory();
        }

        // Update engagement data
        if (!this.engagementData[articleId]) {
            this.engagementData[articleId] = {
                reads: 0,
                timeSpent: 0,
                topic: article.topic,
                source: article.source
            };
        }
        this.engagementData[articleId].reads++;
        this.saveEngagement();
    }

    // Calculate relevance score for an article
    calculateRelevanceScore(article) {
        let score = 0;

        // Topic match (40% weight)
        const topicWeight = 0.4;
        if (this.userPreferences.topics.includes(article.topic)) {
            score += 100 * topicWeight;
        } else if (this.userPreferences.topics.length === 0) {
            // If no preferences set, give neutral score
            score += 50 * topicWeight;
        }

        // Source preference (20% weight)
        const sourceWeight = 0.2;
        if (this.userPreferences.sources.includes(article.source)) {
            score += 100 * sourceWeight;
        } else if (this.userPreferences.sources.length === 0) {
            score += 50 * sourceWeight;
        }

        // Engagement history (25% weight)
        const engagementWeight = 0.25;
        const topicEngagement = this.getTopicEngagement(article.topic);
        const sourceEngagement = this.getSourceEngagement(article.source);
        const avgEngagement = (topicEngagement + sourceEngagement) / 2;
        score += avgEngagement * engagementWeight;

        // Recency (10% weight)
        const recencyWeight = 0.1;
        const hoursAgo = (Date.now() - article.date.getTime()) / (1000 * 60 * 60);
        const recencyScore = Math.max(0, 100 - (hoursAgo / 24) * 50); // Decay over 48 hours
        score += recencyScore * recencyWeight;

        // Breaking news boost (5% weight)
        const breakingWeight = 0.05;
        if (article.isBreaking && this.userPreferences.showBreakingNews) {
            score += 100 * breakingWeight;
        } else {
            score += 50 * breakingWeight;
        }

        return Math.min(100, Math.max(0, score));
    }

    // Get engagement score for a topic
    getTopicEngagement(topic) {
        const topicArticles = Object.keys(this.engagementData)
            .filter(id => {
                const data = this.engagementData[id];
                return data.topic === topic;
            });

        if (topicArticles.length === 0) return 50; // Neutral

        const totalReads = topicArticles.reduce((sum, id) => {
            return sum + (this.engagementData[id].reads || 0);
        }, 0);

        // Normalize to 0-100 scale
        return Math.min(100, (totalReads / topicArticles.length) * 20);
    }

    // Get engagement score for a source
    getSourceEngagement(source) {
        const sourceArticles = Object.keys(this.engagementData)
            .filter(id => {
                const data = this.engagementData[id];
                return data.source === source;
            });

        if (sourceArticles.length === 0) return 50; // Neutral

        const totalReads = sourceArticles.reduce((sum, id) => {
            return sum + (this.engagementData[id].reads || 0);
        }, 0);

        // Normalize to 0-100 scale
        return Math.min(100, (totalReads / sourceArticles.length) * 20);
    }

    // Get personalized feed
    getPersonalizedFeed(articles, filters = {}) {
        // Apply filters
        let filtered = articles.filter(article => {
            // Topic filter
            if (filters.topic && article.topic !== filters.topic) {
                return false;
            }

            // Source filter
            if (filters.source && article.source !== filters.source) {
                return false;
            }

            // Date filter
            if (filters.date) {
                const now = Date.now();
                const articleTime = article.date.getTime();
                const hoursAgo = (now - articleTime) / (1000 * 60 * 60);
                
                if (filters.date === 'today' && hoursAgo > 24) return false;
                if (filters.date === 'week' && hoursAgo > 168) return false;
                if (filters.date === 'month' && hoursAgo > 720) return false;
            }

            // Reading time filter
            if (filters.time) {
                if (filters.time === 'quick' && article.readingTime >= 5) return false;
                if (filters.time === 'medium' && (article.readingTime < 5 || article.readingTime > 10)) return false;
                if (filters.time === 'long' && article.readingTime <= 10) return false;
            }

            // Content type filters
            if (!this.userPreferences.includeOpinions && article.type === 'opinion') return false;
            if (!this.userPreferences.includeAnalysis && article.type === 'analysis') return false;

            return true;
        });

        // Calculate relevance scores
        const scored = filtered.map(article => ({
            article,
            score: this.calculateRelevanceScore(article)
        }));

        // Sort by relevance score (descending)
        scored.sort((a, b) => b.score - a.score);

        return scored.map(item => item.article);
    }

    // Get recommendations based on reading history
    getRecommendations(articles, limit = 3) {
        if (this.readingHistory.length === 0) {
            // If no history, return high-scoring articles
            return this.getPersonalizedFeed(articles).slice(0, limit);
        }

        // Find similar articles based on topics and sources from history
        const recentTopics = this.readingHistory
            .slice(0, 5)
            .map(h => h.article.topic);

        const recentSources = this.readingHistory
            .slice(0, 5)
            .map(h => h.article.source);

        const readIds = new Set(this.readingHistory.map(h => h.id));

        const recommendations = articles
            .filter(article => !readIds.has(article.id))
            .map(article => {
                let score = 0;
                
                // Boost if topic matches recent reading
                if (recentTopics.includes(article.topic)) {
                    score += 30;
                }

                // Boost if source matches recent reading
                if (recentSources.includes(article.source)) {
                    score += 20;
                }

                // Add base relevance score
                score += this.calculateRelevanceScore(article) * 0.5;

                return { article, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.article);

        return recommendations;
    }

    // Get recommendation reason
    getRecommendationReason(article) {
        const reasons = [];

        if (this.userPreferences.topics.includes(article.topic)) {
            reasons.push(`You follow ${article.topic}`);
        }

        const topicEngagement = this.getTopicEngagement(article.topic);
        if (topicEngagement > 70) {
            reasons.push(`You've read many ${article.topic} articles`);
        }

        if (this.readingHistory.length > 0) {
            const recentTopic = this.readingHistory[0].article.topic;
            if (recentTopic === article.topic) {
                reasons.push(`Similar to recent reading`);
            }
        }

        if (article.isBreaking) {
            reasons.push(`Breaking news`);
        }

        if (reasons.length === 0) {
            reasons.push(`Trending in your interests`);
        }

        return reasons.join(' • ');
    }

    // Update preferences
    updatePreferences(newPreferences) {
        this.userPreferences = { ...this.userPreferences, ...newPreferences };
        this.savePreferences();
    }

    // Get followed topics
    getFollowedTopics() {
        return this.userPreferences.topics || [];
    }

    // Follow a topic
    followTopic(topic) {
        if (!this.userPreferences.topics.includes(topic)) {
            this.userPreferences.topics.push(topic);
            this.savePreferences();
        }
    }

    // Unfollow a topic
    unfollowTopic(topic) {
        this.userPreferences.topics = this.userPreferences.topics.filter(t => t !== topic);
        this.savePreferences();
    }

    // Get statistics
    getStats() {
        return {
            articlesRead: this.readingHistory.length,
            topicsFollowed: this.userPreferences.topics.length,
            sourcesPreferred: this.userPreferences.sources.length,
            totalEngagement: Object.keys(this.engagementData).length
        };
    }
}

// Create global instance
const personalizationEngine = new PersonalizationEngine();

