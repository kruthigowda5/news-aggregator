# Quick Start Guide

## Getting Started

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - No server or installation required!

2. **First Time Setup**
   - Click the ⚙️ (settings) icon in the top right
   - Select your topics of interest
   - Choose preferred news sources
   - Click "Save Preferences"

3. **Explore Your Feed**
   - View your personalized news feed on the "For You" tab
   - Articles are ranked by relevance to your interests
   - Look for "Recommended" badges on articles

4. **Use Filters**
   - Click the 🔍 (filter) icon to show filter options
   - Filter by topic, source, date, or reading time
   - Active filters are shown with a badge count

5. **Follow Topics**
   - Go to "My Topics" tab
   - Click "Follow" on topics you want to track
   - Followed topics appear highlighted

6. **Read Articles**
   - Click any article card to read the full content
   - Your reading history is automatically tracked
   - View your history in the "History" tab

## Features to Test

### Personalization
- Select different topics in preferences
- Notice how the feed changes
- Read some articles and see recommendations improve

### Recommendations
- Read 2-3 articles on the same topic
- Check the "Recommended for You" section
- See how recommendations adapt to your reading

### Filters
- Apply topic filter to see only specific topics
- Combine multiple filters (topic + date + reading time)
- Clear filters to return to full personalized feed

### Topic Tracking
- Follow a topic in "My Topics"
- Filter feed by that topic
- See topic statistics and recent articles

### Engagement Tracking
- Read several articles
- Check your reading history
- Notice how recommendations improve over time

## Testing the Personalization

1. **Initial State**: No preferences set
   - Feed shows articles with neutral scoring
   - All topics are equally likely

2. **After Setting Preferences**
   - Feed immediately updates
   - Preferred topics appear first
   - Preferred sources are prioritized

3. **After Reading Articles**
   - Engagement data is tracked
   - Recommendations become more accurate
   - Similar articles are suggested

4. **After Following Topics**
   - Topics appear highlighted
   - Topic-specific filtering is easier
   - Feed can be filtered by followed topics

## Data Persistence

All your data is stored locally in your browser:
- **Preferences**: Saved automatically when you click "Save Preferences"
- **Reading History**: Tracked automatically when you read articles
- **Engagement Data**: Collected to improve recommendations

To reset everything:
- Open browser developer tools (F12)
- Go to Application/Storage tab
- Clear LocalStorage

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Tips

- **Better Recommendations**: Read more articles to improve the algorithm
- **Quick Filtering**: Use the filter bar for fast content discovery
- **Topic Following**: Follow 3-5 topics for best results
- **Source Preferences**: Select 2-4 favorite sources
- **Breaking News**: Enable in preferences to see breaking news prominently

## Troubleshooting

**Feed not updating?**
- Make sure you saved your preferences
- Try refreshing the page
- Check browser console for errors

**Articles not showing?**
- Clear filters if any are active
- Check that you have topics selected
- Verify browser LocalStorage is enabled

**Recommendations not appearing?**
- Read at least 2-3 articles first
- Make sure you have topics selected in preferences
- Check that engagement tracking is working

