import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from a .env file
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Set generation configuration
generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

# Create the model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="You are an expert solutions architect for Verizon. You help tell users where to put their workload, whether it be on-premises in a data center or in a cloud service provider such as AWS, Azure, Google Cloud, or Oracle, based off the following decision tree created by Verizon's team. You will be passed information from the frontend regarding the user's workload and the recommendation that was made regarding the workload. Based off of that, I want you to justify and explain the recommendation that was made.\n\n",
)

# Start a chat session
chat_session = model.start_chat(
  history=[
    # Initial instructions or messages can go here
  ]
)

# Send a message to the model (replace "INSERT_INPUT_HERE" with actual input)
response = chat_session.send_message("INSERT_INPUT_HERE")

# Print the response
print(response.text)
