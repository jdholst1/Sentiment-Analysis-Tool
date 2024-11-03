#Imports
import re
from urllib.request import urlopen

#Constants
# URL = "http://olympus.realpython.org/profiles/aphrodite"
URL = "http://olympus.realpython.org/profiles/poseidon"


def main():
  # Get an HTTPResponse object from the hard-coded url
  page = urlopen(URL)
  html_bytes = page.read()
  html = html_bytes.decode("utf-8")

  # title_index = html.find("<title>")
  # print(f"title index: {title_index}\n")

  # start_index = title_index + len("<title>")
  # end_index = html.find("</title>")
  # print(f"start:{start_index}, end:{end_index}\n")

  # title = html[start_index:end_index]
  # print(f"title:{title}")

  pattern = "<title.*?>.*</title?.*?>"
  match_results = re.search(pattern, html, re.IGNORECASE)
  title = match_results.group()
  title = re.sub("<.*?>", "", title)  # Replaces html tags with "", so nothing

  print(title)

#Start the program
if __name__ == "__main__":
  main()
