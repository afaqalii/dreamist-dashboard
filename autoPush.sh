#!/bin/bash
# Prompt the user for a custom commit message
echo "Enter your commit message:"
read user_commit_message

# Combine the user's message with the dynamic date and time
commit_message="$user_commit_message"

# Add all changes to the staging area
git add .

# Commit changes with the combined commit message
git commit -m "$commit_message"

# Push changes to the default branch (e.g., main)
git push origin main

# make a build folder of latest code
# npm run build

echo "Changes committed and pushed to GitHub successfully!"