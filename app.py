"""Flask backend for the Implant Vacations Travel dental tourism website.

Folder structure:
    app.py              - This file (Flask entry point)
    templates/
        index.html      - Main website template (Jinja2)
    frontend/
        assets/         - Bootstrap static files (CSS, JS, images, vendor)
            css/
            img/
            js/
            vendor/
"""

from flask import Flask, render_template, request, jsonify

# Serve static assets from the existing frontend/assets directory
# so all relative "assets/..." paths in the HTML resolve correctly.
app = Flask(
    __name__,
    static_folder="frontend/assets",
    static_url_path="/assets",
    template_folder="templates",
)


@app.route("/")
def homepage():
    """Render the Implant Vacations Travel homepage."""
    return render_template("index.html")


@app.route("/consultation", methods=["POST"])
def consultation():
    """Handle free consultation form submissions.

    Accepts POST data with fields: name, email, phone, message.
    Prints the submission to the console (for demo purposes) and
    returns a JSON success response so the front-end can confirm receipt.
    """
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    message = request.form.get("message", "").strip()

    print("=== New Consultation Request ===")
    print(f"  Name   : {name}")
    print(f"  Email  : {email}")
    print(f"  Phone  : {phone}")
    print(f"  Message: {message}")
    print("================================")

    return jsonify({"status": "success", "message": "Thank you! We will be in touch shortly."})


if __name__ == "__main__":
    app.run(debug=False)
