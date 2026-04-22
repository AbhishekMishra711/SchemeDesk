from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os
import time
import re

# 🔥 LOAD ENV
load_dotenv()

# 🔥 MONGODB ATLAS CONNECTION
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)

# 🔥 USE YOUR EXISTING DATABASE
db = client["test"]  # ✅ your actual DB
collection = db["schemes"]  # ✅ your actual collection

print("✅ Connected to MongoDB Atlas (test -> schemes)\n")

# 🔥 SELENIUM SETUP
options = Options()
options.add_argument("--headless=new")
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=options)
driver.get("https://scholarships.gov.in/All-Scholarships")
time.sleep(5)

print("✅ Page Loaded\n")

# Scroll
for _ in range(10):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

print("Scrolled\n")

pdf_elements = driver.find_elements(By.XPATH, "//a[contains(text(),'Specification')]")
print(f"👉 Total PDFs found: {len(pdf_elements)}\n")

seen = set()
inserted = 0

def clean_name(pdf_link):
    """Extract and clean scheme name from PDF filename"""
    filename = pdf_link.split("/")[-1]
    name = filename.replace(".pdf", "")
    name = name.replace("_", " ").replace("%20", " ").replace("-", " ")
    name = re.sub(r'\b\d{4}\b', '', name)
    name = re.sub(r'\b\d{2,3}\b', '', name)
    name = re.sub(r'\bG\b', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    name = re.sub(r'([a-z])([A-Z])', r'\1 \2', name)
    name = name.title()
    
    # Fix abbreviations
    name = name.replace("Aicte", "AICTE")
    name = name.replace("Ugc", "UGC")
    name = name.replace("Nec", "NEC")
    name = name.replace("Icar", "ICAR")
    name = name.replace("Pmss", "PMSS")
    name = name.replace("Nmmss", "NMMSS")
    name = name.replace("Depd", "DEPD")
    name = name.replace("Csss", "CSSS")
    name = name.replace("Pm Uspy", "PM USPY")
    
    return name if len(name) > 3 else "Scholarship Scheme"

for pdf in pdf_elements:
    try:
        pdf_link = pdf.get_attribute("href")

        if not pdf_link or "null" in pdf_link or pdf_link in seen:
            continue
        
        seen.add(pdf_link)

        name = clean_name(pdf_link)

        # 🔥 MONGODB DOCUMENT
        scheme = {
            "name": name,
            "description": f"Complete details available in the official PDF guideline {pdf_link}",
            "ministry": "Government of India",
            
            "eligibility": {
                "businessType": ["Student"]  ,
                "note": f"Complete eligibility criteria available in the PDF document  {pdf_link}"
            },
            
            "benefits": "Refer to PDF for detailed benefit information",
            "howToApply": "Apply through NSP portal. Complete guidelines available in PDF.",
            
            "documentsRequired": [
                f"Refer to PDF for complete document list  {pdf_link}"
            ],
            
            "websiteLink": "https://scholarships.gov.in/All-Scholarships",
            "pdfLink": pdf_link,
            
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }

        # 🔥 INSERT
        collection.insert_one(scheme)
        inserted += 1
        
        print(f"✅ Inserted: {name}")

    except Exception as e:
        print(f"❌ Error: {e}")

driver.quit()
client.close()

print(f"\n🔥 TOTAL SCHEMES INSERTED: {inserted}")
print("✅ Data inserted into: test -> schemes")