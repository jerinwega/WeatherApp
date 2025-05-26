setup
--------
npm i
install expo go on testing device
npx expo start
scan QR from terminal

to see test coverage
--------------------
npm test 




1. Modular Architecture
The application follows a modular architecture by separating concerns across different directories (/redux, /navigation, /components, etc.), making the codebase scalable and maintainable.

2. State Management with Redux Toolkit
Redux Toolkit is used to manage global state (like weather data, user preferences).

It provides a predictable state container and simplifies Redux boilerplate.

Middleware like redux-thunk and redux-logger help with asynchronous actions and debugging.

3. Theme Management via Context
A custom ThemeContext is implemented to toggle between light and dark modes.

This allows UI consistency across the app and works in sync with the Gluestack UI system.

4. UI Framework Integration (Gluestack UI + Tailwind)
Gluestack UI is used for consistent, theme-aware UI components.

TailwindCSS (via nativewind) allows utility-first styling with responsive design and fast prototyping.

5. Navigation with React Navigation
React Navigation (@react-navigation/native and native-stack) is used to manage screen transitions and deep linking.

6. Code Quality and Testing
Jest and React Native Testing Library are integrated for unit testing.

Code coverage and clear transformation rules (transformIgnorePatterns, moduleNameMapper) ensure robust test configuration.

7. Environment Setup with Expo
The app uses Expo SDK 53, which simplifies builds, testing, and deployment across platforms (Android, iOS, web).

Platform-specific start scripts are defined in package.json with DARK_MODE=media.

8. API Integration
Axios is used for handling API requests (e.g., fetching data from the OpenWeather API).

This architecture is designed to support fast development, cross-platform compatibility, and easy future extension, such as adding new screens or services.