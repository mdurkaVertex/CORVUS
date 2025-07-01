from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import uvicorn
from openai import OpenAI
import smtplib
from email.mime.text import MIMEText

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

print(f"[SMTP] Connecting to {SMTP_HOST}:{SMTP_PORT} as {SMTP_USER}")

client = OpenAI()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/agentWithWeb")
async def agent_with_web(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")

    try:
        response = client.responses.create(
            model="gpt-4o",
            input=prompt,
            instructions="You are a helpful assistant. Provide the user with asked informations using the web.",
            tools=[
                {
                    "type": "web_search_preview",
                    "search_context_size": "medium"
                }
            ]
        )

        return { "output": response.output_text }

    except Exception as e:
        return { "error": f"Agent with web error: {str(e)}" }


@app.post("/agentBasic")
async def agent_basic(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    api_key = data.get("apiKey", None)

    try:
        if api_key:
            os.environ["OPENAI_API_KEY"] = api_key

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": prompt }
            ]
        )

        return { "output": response.choices[0].message.content }

    except Exception as e:
        return { "error": f"Basic agent error: {str(e)}" }


    
@app.post("/sendEmail")
async def send_email(request: Request):
    data = await request.json()
    to_address = data.get("to")
    content = data.get("content")

    if not to_address or not content:
        return {"status": "FAILED", "error": "Missing recipient or content"}

    try:
        msg = MIMEText(content)
        msg["Subject"] = "Automatyczna wiadomość z CORVUS"
        msg["From"] = SMTP_USER
        msg["To"] = to_address

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, to_address, msg.as_string())

        return {"status": "SENT"}
    except Exception as e:
        print("Email send error:", e)
        return {"status": "FAILED", "error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)



