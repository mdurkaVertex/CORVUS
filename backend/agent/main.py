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

@app.post("/testAgent")
async def test_agent(request: Request):
    data = await request.json()
    api_key = data.get("apiKey")
    prompt = data.get("prompt")
    tool = data.get("tool", "none")

    try:
        if api_key:
            os.environ["OPENAI_API_KEY"] = api_key

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        return {"output": response.choices[0].message.content}

    except Exception as e:
        return {"error": str(e)}
    

    
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



