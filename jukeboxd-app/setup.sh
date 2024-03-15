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
if [ -d "jukeboxd-app" ]; then
    echo "Navigating to the jukeboxd-app directory..."
    cd jukeboxd-app
else
    echo "The jukeboxd-app directory does not exist. Please check your repository structure."
    exit 1
fi

# Install application dependencies
echo "Installing application dependencies..."
npm install

# Final message
echo "Setup and installation completed. You can now start the application by running 'npm start'."
npm start


