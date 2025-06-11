import fitz

def extract_text_from_pdf(file_bytes: bytes):
    document = fitz.open("pdf", file_bytes)
    return " ".join(page.get_text()for page in document)


