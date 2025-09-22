# ♟️ Lichess Explorer

A modern React web application that interacts with the Lichess.org API to display user profiles, leaderboards, and tournaments. Built with React, React Router, and styled with Tailwind CSS.

## 🚀 Features

### 👤 User Profiles
- Search for any Lichess player by username
- View detailed profile information including:
  - Account creation date and online status
  - Total games played
  - Ratings across different game variants (Bullet, Blitz, Rapid, etc.)
  - User bio and personal information

### 🏆 Leaderboards
- Browse top 10 players across multiple game variants:
  - **Bullet** - Fast-paced 1+0 games
  - **Blitz** - Quick 3+0 and 5+0 games
  - **Rapid** - Standard 10+0 and 15+10 games
  - **Classical** - Longer time control games
  - **Correspondence** - Turn-based games
  - **Chess960** - Fischer Random Chess
  - **King of the Hill** - Alternative win condition variant
  - **Three-check** - Checkmate or give check 3 times to win
- Real-time ratings and game statistics
- Player titles and achievements

### ⚔️ Tournaments
- View ongoing and upcoming tournaments
- Tournament information includes:
  - Status (Created, Started, Finished)
  - Game variant and time control
  - Duration and participant count
  - Start and end times
  - Winner information (for completed tournaments)
- Direct links to view tournaments on Lichess.org

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lichess API** - Official Lichess.org REST API

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Landing page with feature overview
│   ├── Navigation.jsx    # Main navigation component
│   ├── Profile.jsx       # User profile search and display
│   ├── Leaderboards.jsx  # Top players leaderboards
│   └── Tournaments.jsx   # Tournament listings
├── services/
│   └── lichessAPI.js     # API service layer for Lichess endpoints
├── App.jsx              # Main app component with routing
├── main.jsx             # React app entry point
└── index.css            # Tailwind CSS imports and global styles
```

## 🚦 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lichess-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

This application uses the official [Lichess API](https://lichess.org/api) which is:
- **Free to use** - No API key required
- **Rate limited** - Respectful usage recommended
- **CORS enabled** - Can be called directly from the browser

### API Endpoints Used

- `GET /api/user/{username}` - User profile data
- `GET /api/player/top/{nb}/{variant}` - Leaderboards
- `GET /api/tournament` - Tournament listings (NDJSON stream)

## 🎨 Styling

The application is fully styled with **Tailwind CSS** featuring:
- **Responsive design** - Mobile-first approach
- **Modern UI components** - Cards, buttons, and navigation
- **Loading states** - Spinners and skeleton screens
- **Error handling** - User-friendly error messages
- **Hover effects** - Interactive elements

### Color Scheme
- Primary: Blue (`bg-blue-500`, `text-blue-600`)
- Success: Green (`bg-green-100`, `text-green-800`)
- Warning: Yellow (`bg-yellow-100`, `text-yellow-800`)
- Error: Red (`bg-red-100`, `text-red-700`)
- Neutral: Gray tones for backgrounds and text

## 🔗 Routes

- `/` - Home page with feature overview
- `/profile` - User profile search
- `/leaderboards` - Player leaderboards
- `/tournaments` - Tournament listings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Lichess.org](https://lichess.org/) - For providing the excellent free chess platform and API
- [Tailwind CSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [React](https://reactjs.org/) - For the powerful UI library
- [Vite](https://vitejs.dev/) - For the fast and modern build tool

## 📞 Support

If you have any questions or run into issues:
1. Check the [Lichess API documentation](https://lichess.org/api)
2. Open an issue in this repository
3. Visit the [Lichess community](https://lichess.org/team/lichess-feedback)

---

**Made with ♟️ and ❤️ for the chess community**
