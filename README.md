# FOR FULL DOCUMENTATION DETAILS, PLEASE VISIT HERE

http://146.190.147.242:3000/docs

---

# API Endpoints Overview

This server provides two endpoints for image processing - one that describes an image and another endpoint that simply removes the background of an image.

---

## 1. `/describe` Endpoint

For full details on error codes and request body, visit http://146.190.147.242:3000/docs/describe

**URL:**  
`POST http://146.190.147.242:3000/api/describe`

**Purpose:**  
Analyzes an uploaded image and returns:
- A text description
- Associated descriptive words (tags)
- Image width and height
- The confidence threshold used
---



## 2. `/extract-words` Endpoint

For full details on error codes and request body, visit http://146.190.147.242:3000/docs/extract-words

**URL:**  
`POST http://146.190.147.242:3000/api/extract-words`

**Purpose:**  
Takes an image and extracts the words and sentences.
