#!/bin/bash

# Clear screen
clear

echo "========================================================"
echo "   NelioSoft GitHub Uploader"
echo "========================================================"
echo ""
echo "This script will help you upload your project to GitHub."
echo "Make sure you have created an empty repository on GitHub first."
echo ""
echo "1. Go to https://github.com/new"
echo "2. Create a repository named 'neliosoft'"
echo "3. Copy the URL (it looks like https://github.com/YourUsername/neliosoft.git)"
echo ""

# Ask for the URL
read -p "Paste your GitHub Repository URL here: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "Error: You must provide a repository URL."
    exit 1
fi

echo ""
echo "Configuration:"
echo "Remote URL: $REPO_URL"
echo ""

# Confirm
read -p "Are you sure you want to push to this URL? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Step 1: Setting up remote 'origin'..."
# Remove origin if it exists to avoid errors on retry
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

echo "Step 2: Renaming branch to 'main'..."
git branch -M main

echo "Step 3: Pushing code to GitHub..."
echo "You may be asked to log in or provide a token."
echo "If you use 2FA, you might need a Personal Access Token."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================================"
    echo "   SUCCESS! Project uploaded to GitHub."
    echo "========================================================"
    echo "Next Steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Import your new repository"
    echo "3. Click Deploy"
else
    echo ""
    echo "========================================================"
    echo "   ERROR: Push failed."
    echo "   Check your internet connection or GitHub credentials."
    echo "========================================================"
fi
