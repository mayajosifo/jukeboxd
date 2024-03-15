#!/bin/bash

# Define application directory
appDirectory="my-react-app"

echo "Starting setup and installation process..."

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install it before continuing."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install it before continuing."
    exit 1
fi

# Clone the app repository (skip if the folder already exists)
if [ ! -d "$appDirectory" ]; then
    echo "Cloning the application repository..."
    git clone git@github.com:mayajosifo/jukeboxd.git $appDirectory
else
    echo "Application directory already exists, skipping clone..."
fi

# Change directory to the application
cd $appDirectory

# Assuming the necessary code and package.json are inside 'jukeboxd app' directory
if [ -d "jukeboxd app" ]; then
    echo "Navigating to the jukeboxd app directory..."
    cd jukeboxd app
else
    echo "The jukeboxd directory does not exist. Please check your repository structure."
    exit 1
fi

# Install application dependencies
echo "Installing application dependencies..."
npm install

cd ..

# Prompt for Firebase configuration
echo "Please enter your Firebase configuration details:"
read -p "Firebase API Key: " firebaseApiKey
read -p "Firebase Auth Domain: " firebaseAuthDomain
read -p "Firebase Project ID: " firebaseProjectId
read -p "Firebase Storage Bucket: " firebaseStorageBucket
read -p "Firebase Messaging Sender ID: " firebaseMessagingSenderId
read -p "Firebase App ID: " firebaseAppId

# Create .env file with Firebase configuration
echo "Creating .env file with your Firebase configuration..."
cat <<EOF > .env
REACT_APP_FIREBASE_API_KEY=$firebaseApiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=$firebaseAuthDomain
REACT_APP_FIREBASE_PROJECT_ID=$firebaseProjectId
REACT_APP_FIREBASE_STORAGE_BUCKET=$firebaseStorageBucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$firebaseMessagingSenderId
REACT_APP_FIREBASE_APP_ID=$firebaseAppId
EOF

echo "Firebase configuration has been set."

cd 'jukeboxd app'

# Final message
echo "Setup and installation completed. You can now start the application by running 'npm start'."
npm start

