# Google OAuth Configuration
# Get your Client ID from: https://console.cloud.google.com/apis/credentials
# 
# Steps to get Google Client ID:
# 1. Go to https://console.cloud.google.com/
# 2. Create a new project or select existing one
# 3. Go to "APIs & Services" > "Credentials"
# 4. Click "Create Credentials" > "OAuth client ID"
# 5. Select "Web application"
# 6. Add authorized JavaScript origins:
#    - http://localhost:3000
#    - http://localhost:3001  
# 7. Add authorized redirect URIs:
#    - http://localhost:3000
#    - http://localhost:3001
# 8. Copy the Client ID and paste it below

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com

# Your Backend API URL (for sending OAuth tokens)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
