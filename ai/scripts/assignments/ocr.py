import time
import http.client
import requests
import secret
import os


def get_operation_id(file_url: str):
    headers = {
        # Request headers
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": secret.API_KEY,
    }

    URL = "{endpoint}vision/v3.1/read/analyze".format(endpoint=secret.ENDPOINT)

    body_schema = {"url": file_url}
    res = requests.post(URL, headers=headers, json=body_schema)
    loc_id = res.headers["Operation-Location"].split("/")[-1]

    return loc_id


def run_ocr(location_id: str):
    URL = "https://ocr-alpr.cognitiveservices.azure.com/vision/v3.1/read/analyzeResults/{loc_id}".format(
        loc_id=location_id
    )
    headers = {"Ocp-Apim-Subscription-Key": secret.API_KEY}
    s = ""
    res = requests.get(URL, headers=headers).json()

    for item in res["analyzeResult"]["readResults"]:
        for w in item["lines"]:
            for t in w["words"]:
                s += str(t["text"]) + " "

    return s


def save_file(filename: str, content: str):
    filename = filename[:-4]
    filename += ".txt"
    DIR_PATH = os.path.join(os.getcwd(), "DUMP")
    FILE_PATH = os.path.join(DIR_PATH, filename)
    with open(FILE_PATH, "a") as afile:
        afile.write(content)
