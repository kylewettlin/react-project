# Valorant Comps - React Website

This project is a React-based implementation of the Valorant Comps website, focusing on creating and sharing Valorant team compositions.

## Features

- Responsive design that works on all screen sizes
- Navigation menu with mobile-friendly hamburger menu
- Home page with feature highlights
- My Comps page to view saved compositions
- Build Comps page to create new compositions
- Recommended Comps page showing pro strategies
- Agent List page with detailed agent information
- Contact page

## Project Structure

```
src/
├── assets/             # Images and other static assets
├── components/         # Reusable UI components
│   ├── AgentCard/
│   ├── Carousel/
│   ├── CompItem/
│   ├── FeatureCard/
│   ├── Footer/
│   └── Header/
├── pages/              # Page components
│   ├── AgentList/
│   ├── BuildComps/
│   ├── Contact/
│   ├── Home/
│   ├── MyComps/
│   └── Recommended/
├── App.js              # Main app component with routing
└── index.js            # Entry point
```

## Getting Started

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Improvements

- Add functionality to save and load compositions from a backend
- Implement user authentication for saving personal compositions
- Develop an API to retrieve agent data and recommended compositions
- Add search and filtering capabilities
- Implement drag-and-drop for building compositions

## Technologies Used

- React
- React Router
- CSS3 with responsive design
- JavaScript ES6+

## License

This project is for educational purposes. Valorant is a trademark of Riot Games, Inc.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
