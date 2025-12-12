# QnA - Quality Assurance Platform

A high-fidelity, fully frontend-based prototype of a Quality Assurance application. This application manages projects with questions that need answers from a knowledge base, checks them against checklists, and provides status updates.

## Features

### 1. Project Catalog (Home Screen)
- **Card View** - Interactive cards displaying project details
- **Table View** - Sortable table layout
- **Search & Filter** - Filter by status, department, and search by ID or description
- **Actions** - Run, Configure, and view History for each project

### 2. Trigger QA Runs
- **Slide-in Panel** - Modern modal interface
- **Dynamic Form** - Reference ID, Environment selector, Date picker
- **Data Source Indicator** - Shows SharePoint integration status
- **Simulated Submission** - Loading state and redirect to history

### 3. Execution History
- **Active Run Dashboard** - Real-time progress indicators
- **History Table** - Result ID, Date, Status, Duration
- **Status Badges** - Pass, Fail, Partial, NR, NA with distinct colors

### 4. Detailed Results
- **Result Header** - Overall status badge with confidence score
- **Checkpoint Grid** - Expandable cards with AI reasoning
- **Insights Panel** - Collapsible AI analysis and recommendations
- **Knowledge Sources** - Tabbed logs and SharePoint references

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation (HashRouter for GitHub Pages)
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### GitHub Pages Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── layout/         # Header, navigation
│   ├── projects/       # Card, Table, Filters
│   ├── modals/         # TriggerRun, Configuration
│   ├── history/        # ActiveRun, HistoryTable
│   └── results/        # Header, Checkpoints, Insights
├── pages/
│   ├── ProjectCatalog.jsx
│   ├── ExecutionHistory.jsx
│   └── DetailedResults.jsx
└── data/
    ├── projects.js     # Mock project data
    ├── executions.js   # Mock execution history
    └── results.js      # Mock detailed results
```

## Design

- **Theme**: Dark mode with electric blue accents
- **Typography**: Outfit (headings), DM Sans (body)
- **Style**: Glassmorphism with subtle gradients
- **Animations**: Smooth transitions and micro-interactions

## Mock Data

All data is mocked for demonstration purposes. The prototype includes:
- 12 sample projects across different departments
- Execution histories with various statuses
- Detailed checkpoint results with AI reasoning

## License

MIT

