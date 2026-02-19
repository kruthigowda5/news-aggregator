## Personalized News Aggregator
A smart client-side news aggregation web application that delivers a customized news feed based on user interests, reading history, and engagement patterns.
The application dynamically ranks articles using a relevance scoring algorithm and works with both mock data and live news from the GNews API, ensuring reliability even without external services.
##  Features
Personalized “For You” news feed
User preference selection (topics & sources)
Relevance-based article ranking
Reading history tracking
Engagement-based recommendations
Breaking news prioritization
Topic & source filtering
Reading time estimation
Explainable recommendations
Responsive UI
LocalStorage-based data persistence
Live news integration (optional) with API
Mock data fallback for offline/demo mode
## Tech Stack
HTML5 – Structure
CSS3 – Styling & responsive layout
Vanilla JavaScript (ES6) – Application logic
LocalStorage – Client-side persistence
GNews API – Live news (optional)
## How Personalization Works
Each article is assigned a relevance score based on:
Topic match with user preferences
Preferred news sources
User reading history
Engagement frequency
Article recency
Breaking news boost
Articles are then sorted by score to generate a personalized feed.
##  Project Flow
Load user preferences & reading history from LocalStorage
Fetch live news or use mock data
Normalize article data into a standard format
Calculate relevance score for each article
Render the personalized feed
Update engagement when an article is read
## Data Persistence
User data is stored in LocalStorage, including:
Preferences
Reading history
Engagement data
This allows the app to restore personalization on reload without a backend.
## Purpose of the Project
This project demonstrates:
Client-side recommendation logic
Personalization without backend
Data normalization from external APIs
Dynamic UI rendering using JavaScript
Modular and scalable frontend design
##  Future Improvements
Backend integration for user authentication
Cloud database for cross-device sync
AI/ML-based recommendation system
## Author
Kruthi P Gowda
https://github.com/kruthigowda5





