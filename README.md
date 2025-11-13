# Food Cycle - Frontend

A sustainable food donation platform that connects food donors with recipients to reduce food waste and promote community support.

## 🌱 Project Overview

Food Cycle is an innovative web application that helps combat food waste by creating a platform where individuals and businesses can donate excess food to people in need. The platform streamlines the donation process, making it easier to redistribute food that would otherwise go to waste.

**The application will be available at [https://food-cycle.netlify.app/](https://food-cycle.netlify.app/)**

## 🚀 Features

- **User Authentication**: Secure registration and login with email/password or Google OAuth
- **Food Donation**: Users can add available food items with detailed information
- **Browse Available Foods**: View all available food donations in one place
- **Food Management**: Donors can manage their donated food items
- **Request Tracking**: Users can track their food requests
- **Detailed Food Information**: View comprehensive details about each food item
- **Responsive Design**: Works seamlessly across all device sizes

## 🛠️ Technologies Used

- **Frontend Framework**: [React](https://reactjs.org/) 19.1.1
- **Build Tool**: [Vite](https://vitejs.dev/) 7.1.7
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)
- **State Management**: React Context API
- **Routing**: [React Router](https://reactrouter.com/) 7.9.5
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth/)
- **Data Management**: [Firebase](https://firebase.google.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI Components**: [React Icons](https://react-icons.github.io/react-icons/), [Swiper](https://swiperjs.com/)
- **HTTP Requests**: [Axios](https://axios-http.com/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Styling**: [Styled Components](https://styled-components.com/)

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Firebase account for authentication and database

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Food-Cycle-Frontend.git
cd Food-Cycle-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> Note: You need to create a Firebase project and configure it to get these values.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)


## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production-ready application |



## 🎯 Usage

1. **Register**: Create an account using email/password or Google OAuth
2. **Donate Food**: Navigate to "Add Food" to donate available food items
3. **Browse Foods**: Visit "Available Foods" to see all available donations
4. **Manage Donations**: Use "Manage My Foods" to update or remove your donated items
5. **Track Requests**: Check "My Food Requests" to see your food request status

## 🔐 Authentication System

The application uses Firebase Authentication with:
- Email/password authentication
- Google OAuth integration
- Protected routes for authenticated users only
- Secure session management

## 💾 Data Management

Food items and user data are managed through Firebase with:
- User authentication and authorization
- Food item creation, retrieval, updating, and deletion
- Request tracking system



### Code Style Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all tests pass before submitting



## 📞 Support

For support, please open an issue in the repository or contact the maintainers.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the React and Firebase communities for their excellent documentation and tools
- Special thanks to all contributors who help maintain and improve this project
- Designed to make a positive impact on food waste reduction and community support

## 🌍 Impact

By using Food Cycle, you're contributing to:
- Reducing food waste in your community
- Supporting people in need
- Building stronger community connections
- Promoting sustainable practices