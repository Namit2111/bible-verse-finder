import requests

# Define the API endpoint
url = 'https://bible-verse-finder-1.onrender.com//api/similarity'  # Adjust if your Flask app is hosted elsewhere

# The input data you want to send
data = {
    "user_input": "Your verse or text here"
}

# Send the POST request to the API
response = requests.post(url, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Print the response JSON data
    print("API Response:")
    print(response.json())
else:
    print(f"Error: {response.status_code}")
    print(response.json())
