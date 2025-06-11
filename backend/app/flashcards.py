from openai import OpenAI
from dotenv import load_dotenv
import os
from extract import extract_text_from_pdf 

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_flashcards(text, num_cards=5):
    prompt = f"Generate {num_cards} flashcards from the following lecture notes. " \
             f"Use the format: Q: ... A: ...\n\n{text[:3000]}"  

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates flashcards."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7,
        )
        initial_flashcards =  response.choices[0].message.content.strip()
        return parse_flashcards(initial_flashcards)
    except Exception as e:
        print("OpenAI error:", e)
        return []
    
def parse_flashcards(initial_flashcards):
    flashcards = []
    entry = initial_flashcards.strip().split("Q: ")
    for i in entry[1:]:
        q_a = i.strip().split("A:", 1)
        if len(q_a) == 2:
            flashcards.append({
                "Question": q_a[0].strip(),
                "Answer": q_a[1].strip()
            })
    return flashcards
