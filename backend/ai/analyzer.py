import re

REQUIRED_SECTIONS = [
    "введение",
    "заключение",
    "список литературы",
    "титульный лист"
]

def analyze_text(text: str):
    text_lower = text.lower()

    found = []
    missing = []

    for section in REQUIRED_SECTIONS:
        if re.search(section, text_lower):
            found.append(section)
        else:
            missing.append(section)

    return {
        "found_sections": found,
        "missing_sections": missing,
        "summary": (
            "Отчёт полностью соответствует структуре"
            if not missing
            else "Отчёт частично соответствует структуре"
        )
    }
