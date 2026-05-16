# Copilot Implementation Guide: Environment Reimplementation for e-ATN-MADDPG Project

This document is a natural-language instruction contract for Copilot/Cursor. Do not generate code until you have read every section. Follow the sections in order.

## 1. Core Principles - You Must Follow These
1. **Think Before Coding**: Don't assume. Don't hide confusion. Surface tradeoffs. State assumptions explicitly. Present multiple interpretations. Push back when warranted. Stop when confused and ask for clarification.
2. **Simplicity First**: Minimum code that solves the problem. Nothing speculative. No features beyond what was asked. No abstractions for single-use code. No error handling for impossible scenarios. If 200 lines could be 50, rewrite it.
3. **Surgical Changes**: Touch only what you must. Clean up only your own mess. Don't "improve" adjacent code, comments, or formatting. Match existing style. Remove unused imports/variables/functions created by your changes.
4. **Goal-Driven Execution**: Define success criteria. Loop until verified. Transform imperative tasks into verifiable goals (e.g., 1. [Step] -> verify: [check]).
5. **Clearity**: Your code shoudl follow the Google Python Style Guide. Variable name should clear and easily to read. You should explain what you have updated to user in the chat. Not only mentioned the file but also mention the function, it's function and how it would affect


Here is the English translation for Sections III and IV, maintaining the professional and structured tone of your project requirements:

III. Interface & Content Requirements (Phase 1: Frontend & Copywriting)

Technology: Utilize a pre-existing Bootstrap template (HTML/CSS/JS) to avoid designing from scratch. The output file must be a valid and static index.html structure.


Language & Tone: Write all content entirely in professional English. The tone must build absolute trust, highlighting the combination of a "reputable medical facility" and "luxury travel".

Page Element Structure:


Hero Section: Requires a powerful headline and subheadline that directly address the "pain points" (cost/time) of the Japanese market and introduce Hanoi as the optimal solution. It must include a Call-to-Action (CTA) button stating "Free Consultation".


How It Works: A brief, reassuring description through 3 fixed steps: 1. Free Online Consultation, 2. Travel & Treatment, 3. Recover & Explore.


Destination Highlight: A card or visual introduction to the Hanoi destination, focusing on safety, relaxation, highly skilled dentists, and unique culture.


Footer: Basic information such as About Us, Contact, Privacy, and a newsletter signup form.


STRICT CONSTRAINT: Absolutely do not write or insert any social proof, reviews, or testimonials, as the project currently does not have this actual data.

IV. System & Deployment Requirements (Phase 2: Backend & Deployment)

Backend Technology: Build a minimal backend using Python Flask (app.py file).


Directory Structure: Requires a standard Flask structure, including a static/ folder (containing Bootstrap CSS/JS files) and a templates/ folder (containing the index.html file). A requirements.txt file containing Flask is required.

Routing Requirements:


Route /: Render the index.html file as the default homepage.


Route /consultation (POST): Process the contact form to collect Name, Email, Phone Number, and Message. In the demo phase, this route only needs to print the data to the console and return a success message on the screen.

Deployment Environment:

Provide the command to run the local test (e.g., python app.py).

Prepare the directory to be pushed to free hosting platforms like Render.com or PythonAnywhere to get a direct live demo link to send to the Co-founder.