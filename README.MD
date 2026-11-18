# 💗 Coy Discover

**Discover people. Make connections. Find meaningful matches.**

Coy Discover is a Tinder-inspired profile discovery web application where users can explore profiles, swipe right to like someone, swipe left to pass, and discover mutual matches.

The project is built as a full-stack web application using React, Node.js, Express.js, and MongoDB. It focuses on providing a smooth, interactive, and responsive profile-swiping experience.

## ✨ Features

- **Profile Discovery:** Explore different profiles with photos, bios, ages, cities, and interests.
- **Swipe Functionality:** Swipe right to like and left to pass.
- **Responsive Design:** Supports mobile swipe gestures and desktop action buttons.
- **Mutual Matching:** A match is created only when both profiles have liked each other.
- **Match Popup:** Displays an attractive "It's a Match!" popup when a mutual match occurs.
- **Matches Section:** View all your mutual matches in one place.
- **Persistent Swipes:** Previously swiped profiles do not appear again after refreshing the page.
- **Persistent Matches:** Matches remain available after page reloads.
- **Empty State:** Displays a message when there are no more profiles to discover.
- **Privacy:** Incoming likes are not revealed unless a mutual match occurs.
- **Sample Dataset:** Includes 180 mock profiles for testing the application.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Tinder Card

### Backend
- Node.js
- Express.js
- JavaScript (ES Modules)
- MongoDB
- Mongoose

## 📂 Project Structure

```text
coy-discover/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── MatchPopup.jsx
│   │   │   └── Matches.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Discover.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Profile.js
│   │   └── Swipe.js
│   │
│   ├── controllers/
│   │   └── discoverController.js
│   │
│   ├── routes/
│   │   └── discoverRoutes.js
│   │
│   ├── scripts/
│   │   └── seed.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd coy-discover
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

Start the backend:

```bash
npm run dev
```

The backend will run at:

`http://localhost:5000`

### 3. Seed Sample Profiles

Open another terminal:

```bash
cd server
node scripts/seed.js
```

This will add the 180 sample profiles to your MongoDB database without deleting existing profiles or saved swipes.

### 4. Setup Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

`http://localhost:5173`

## 🔗 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch available profiles |
| POST | `/api/swipe` | Like or pass a profile |
| GET | `/api/matches` | Fetch mutual matches |

### Swipe API Example

**POST** `/api/swipe`

Request body:

```json
{
  "profileId": "PROFILE_OBJECT_ID",
  "action": "like"
}
```

Supported actions:
- `like`
- `pass`

The API checks whether the profile has also liked the logged-in user and returns a match result when both likes exist.

## 💡 How Matching Works

1. The user receives a list of available profiles.
2. The user swipes right to like or left to pass.
3. The swipe action is stored in MongoDB.
4. The backend checks whether the selected profile has already liked the user.
5. If both users have liked each other, a mutual match is created.
6. The match appears in the Matches section.

## 🔒 Privacy

Coy Discover follows a simple privacy rule:

**A user's incoming likes are never revealed unless a mutual match occurs.**

Only mutual matches are displayed in the Matches section.

## 🚀 Future Improvements

- User authentication and individual user accounts.
- Real-time chat between matched users.
- Advanced profile filtering.
- Location-based profile discovery.
- Profile editing and account settings.

## 👨‍💻 Author

**Vinay Saini**

B.Sc. Biotechnology Student | Aspiring Software Developer

## ⭐ Acknowledgement

This project was developed as part of a software development assignment to demonstrate full-stack development, REST API integration, database management, swipe interactions, and mutual matching logic.

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using React, Node.js, Express, and MongoDB.**
