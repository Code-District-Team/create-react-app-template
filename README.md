# My App Redux

This project is a React application bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template. It is designed to provide a robust starting point for building scalable web applications with React and Redux.

## Major Features

- **React and Redux Integration**: Utilizes Redux for state management, with Redux Toolkit for efficient Redux development.
- **Ant Design**: Incorporates Ant Design components for a modern UI.
- **Routing**: Implements client-side routing with `react-router-dom`.
- **Service Worker**: Configured for offline capabilities and faster load times in production.
- **Code Splitting**: Supports code splitting to optimize bundle size.
- **Customizable**: Uses CRACO for easy configuration overrides without ejecting from Create React App.

## Folder Structure

- **public/**: Contains static files like `index.html`, `manifest.json`, and icons.
- **src/**: Main source directory.
  - **assets/**: Contains fonts and global styles.
  - **features/**: Contains feature-specific components and styles.
    - **dashboard/**: Dashboard feature components.
    - **login/**: Login feature components.
    - **projects/**: Projects feature components.
    - **reports/**: Reports feature components.
  - **layout/**: Layout components for the application.
  - **models/**: Redux ORM models and related files.
  - **utilities/**: Utility functions and constants.
  - **app/**: Main application components and store configuration.
  - **routes/**: Application routing configuration.
  - **styles/**: Global styles and theme configurations.
- **craco.config.js**: Configuration file for CRACO to customize Create React App settings.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js installation includes npm, which is required to install dependencies.
- **Git**: Ensure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).

### Installing Git

1. **Download and Install Git**:
   - Go to [git-scm.com](https://git-scm.com/) and download the installer for your operating system.
   - Run the installer and follow the setup instructions. Use the default settings unless you have specific requirements.

2. **Verify Git Installation**:
   - Open your terminal or command prompt and run:
     ```bash
     git --version
     ```
   - You should see the version number of Git.

3. **Configure Git**:
   - Set your username and email address. These will be used for your commits.
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your-email@example.com"
     ```

### Installing Node.js via NVM

1. **Download and Install NVM**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```
   Or using `wget`:
   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

2. **Load NVM**:
   Add the following lines to your shell's startup file (`~/.bashrc`, `~/.zshrc`, or `~/.profile`):
   ```bash
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
   ```
   Then, apply the changes:
   ```bash
   source ~/.bashrc
   ```

3. **Verify NVM Installation**:
   ```bash
   nvm --version
   ```

4. **Install Node.js**:
   ```bash
   nvm install 16.13.1
   ```

5. **Set Default Node.js Version**:
   ```bash
   nvm alias default 16.13.1
   ```

6. **Verify Node.js Installation**:
   ```bash
   node -v
   ```

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/my-app-redux.git
   cd my-app-redux
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

   This will create a production-ready build in the `build` folder.

5. **Run Tests**:
   ```bash
   npm test
   ```

   Launches the test runner in interactive watch mode.

### Running the Production Build Locally

To run the production build locally, you can use a simple HTTP server. Here are the steps:

1. **Install `serve` globally**:
   ```bash
   npm install -g serve
   ```

2. **Serve the build folder**:
   ```bash
   serve -s build
   ```

   This will start a local server and serve the production build. You can access it at [http://localhost:5000](http://localhost:5000) by default.

### Additional Information

- **CRACO**: This project uses CRACO to override Create React App configurations without ejecting. You can modify the `craco.config.js` file to customize the build and development settings.
- **Service Worker**: The service worker is configured to be used in production for offline capabilities. You can learn more about service workers in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Redux Documentation](https://redux.js.org/)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
