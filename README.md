# Movie Tonight

Movie Tonight is a dynamic React Native Expo application designed to provide a seamless and interactive experience for movie enthusiasts. With features such as personalized movie exploration, saving favorites, searching for movies, and sharing recommendations, this app serves as your ultimate companion for movie discovery. 

## Features

### Welcome Screen
- A visually engaging landing page that greets the user with a warm welcome.

### Home Screen
- Displays a curated list of trending movies fetched in real-time using the TMDB API.
- Clicking on a movie navigates to the **Movie Details Screen** for an in-depth view.

### Movie Details Screen
- Shows detailed information about the selected movie, including:
  - Movie synopsis.
  - Cast details with images.
- A heart icon at the top allows users to save or unsave the movie, with vibration feedback for interaction.

### Saved Movies Screen
- Lists all the movies saved by the user for easy reference.

### Search Screen
- Allows users to search for movies using the TMDB API.

### Profile Screen
- Users can:
  - Set a profile image by tapping on the placeholder image.
  - Grant camera access to capture a new profile picture or upload one from the gallery.
  - View their region, fetched dynamically using device localization.

### Refer to Friends
- Users can recommend this app to friends via SMS or social media platforms by tapping the "Refer Now" button.

### Vibration Feedback
- The app uses device vibration to confirm user actions, such as saving or unsaving a movie.

## Tech Stack

### Frameworks and Libraries
- **React Native Expo**: For streamlined mobile app development.
- **Axios**: To handle real-time API calls from TMDB.
- **React Navigation (Bottom Tabs)**: For smooth navigation between screens.
- **React Native Async Storage**: For saving user data locally.
- **React Native Share**: For social media and message sharing.
- **Expo Contacts**: To enable user referrals.
- **Expo Localization**: For fetching the user’s region.
- **React Native Snap Carousel**: For creating a visually appealing movie carousel.

## Installation

1. Clone the repository:
   git clone https://github.com/MohammeddJaveed/MoviesApp.git
2. Install dependencies: npm i
3. Start expo: npm expo start

## Usage

**Run the App** 
Launch the app on your emulator or physical device using the Expo Go app.

**Explore Features**
- Browse movies on the Home Screen.
- Search for movies on the Search Screen.
- Save your favourite movies and view them on the Saved Movies Screen.
- Update your profile picture and view your region on the Profile Screen.
- Share the app with friends through the Refer Now feature.

## API Integration

- The app integrates with the TMDB API to fetch real-time movie data, including details and cast information.
- Axios is used for making efficient API requests.

## Key Packages

- react-native-snap-carousel: For a smooth movie carousel experience.
- react-native-share: To enable seamless sharing functionality.
- expo-contacts: To access the user’s contacts for referrals.
- React Native Async Storage: For persistent local storage of user data.
- expo-localization: To fetch and display the user’s region dynamically.
- @react-navigation/bottom-tabs: For intuitive tab-based navigation.

## Future Enhancements
- SSO Integration
- Push notification 

## Credits
- TMDB API: For providing movie data.
- Open-source community and libraries for powering the application.
