# Exam Prep

This project is a simple static site that can be published to GitHub Pages.

## GitHub Pages deployment

1. Open your repository on GitHub.
2. Go to Settings → Pages.
3. Under "Build and deployment", set Source to "GitHub Actions".
4. Push to the main or master branch and the workflow will deploy automatically.

The workflow file is at .github/workflows/deploy-pages.yml.

 # CKA CKS LFCS Progress Tracker
 
 A lightweight web app to track your 8-week beginner study plan with persistent task completion and quiz-based knowledge testing.
 
 ## Features
 
 - Concrete week-by-week plan with daily and weekend tasks.
 - Selectable completion checkboxes for every task.
 - Progress persistence in browser localStorage.
 - Knowledge test mode with randomized 10-question quizzes.
 - Weak-topic radar that surfaces repeated misses.
 - Free external training references.
 
 ## Run
 
 1. Open `index.html` in your browser.
 2. Or serve with a simple static server:
    - `python3 -m http.server 8080`
    - Visit `http://localhost:8080`
 
 ## Data persistence
 
 Progress and quiz history are saved in localStorage key:
 
 `lf-cka-cks-tracker-v1`
 
 ## Notes
 
 - This app is fully client-side and requires no backend.
 - External links point to free resources. Availability may vary by region or over time.
