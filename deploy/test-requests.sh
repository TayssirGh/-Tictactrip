#!/bin/bash

API_URL="http://168.63.104.167:80/api"
EMAIL="test@example.com"
CONTENT_TYPE="Content-Type: application/json"

# Step 1: Request token
echo "Requesting token..."
TOKEN_RESPONSE=$(curl -s -X POST "$API_URL/token" -H "$CONTENT_TYPE" -d "{\"email\": \"$EMAIL\"}")

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ -z "$TOKEN" ]; then
  echo "Failed to retrieve token."
  exit 1
fi

echo "Token retrieved: $TOKEN"

# Step 2: Test the justify endpoint
echo "Testing justify endpoint..."
JUSTIFY_RESPONSE=$(curl -s -X POST "$API_URL/justify" \
-H "$CONTENT_TYPE" \
-H "Authorization: Bearer $TOKEN" \
-d '{"text": "Sample text to justify."}')

echo "Justify Response: $JUSTIFY_RESPONSE"
