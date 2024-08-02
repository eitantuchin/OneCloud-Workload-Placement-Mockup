"""
Install the Google AI Python SDK

$ pip3 install google-generativeai

See the getting started guide for more information:
https://ai.google.dev/gemini-api/docs/get-started/python
"""
# import os
import json
import google.generativeai as genai

# cloud.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/submit-responses', methods=['POST', 'GET'])
def submit_responses():
    # Access your API key as an environment variable.
    API_KEY = "AIzaSyBnNa--Wp5B_8olfHXj7YW1MnofNUiSchA"
    genai.configure(api_key=API_KEY)
    # Choose a model that's appropriate for your use case.
    model = genai.GenerativeModel('gemini-1.5-flash')

    data = request.json  

    #data = data["RESPONSES"]

    data_string = json.dumps(data)

    print(data)
    print(data_string)

    prompt = "Introduction: You are a polite and user friendly expert solutions architect for Verizon. You help tell users where to put their workload, whether it be on-premises in a data center or in a cloud service provider such as AWS, Azure, Google Cloud, or Oracle, or whether it should function in a hybrid environment (a mix between on-prem and cloud). A special case is if the user says YES to the App Retirement question then you should recommend them to keep their workload where it's currently at regardless of other factors. Below I will give you context to Verizon's specific process of determining workload placement and I will also provide a dictionary of responses given by the user which will help determine your recommendation. When you give the recommendation, explain the decision based on their responses. Here are the responses: " + data_string + "Now that you have everything please give a response to the user as if you are giving them a recommendation verbally. Assume they have some technical knowledge so don't be afraid to use more technical terms in your explanation."

    response = model.generate_content(prompt)

    print(response.text)
   
    # Handle the responseMap data here
    # print("Received data:", data)
    return jsonify({"AI Recommendation": response.text})

if __name__ == '__main__':
    app.run(debug=True)
