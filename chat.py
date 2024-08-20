import sys
import openai

api_key = "Your API Key"
openai.api_key = api_key


if __name__ == "__main__":
    user_message = sys.argv[1]
    
    # Call the ChatGPT API to get a response
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=user_message,
        max_tokens=100
    )
    
    message_from_chatgpt = response["choices"][0]["text"].strip()
    print(message_from_chatgpt)