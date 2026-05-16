import os
from datetime import datetime

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html", year=datetime.now().year)


@app.route("/consultation", methods=["POST"])
def submit_consultation():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    message = request.form.get("message", "").strip()

    errors = []
    if not name:
        errors.append("Name is required.")
    if not email or "@" not in email:
        errors.append("A valid email is required.")
    if not phone:
        errors.append("Phone number is required.")
    if not message:
        errors.append("Message is required.")

    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    print("=== New Consultation Request ===")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Phone: {phone}")
    print(f"Message: {message}")
    print("================================")

    return jsonify({
        "success": True,
        "message": "Thank you! We will contact you within 24 hours.",
    })


@app.route("/newsletter", methods=["POST"])
def subscribe_newsletter():
    email = request.form.get("newsletter_email", "").strip()

    if not email or "@" not in email:
        return jsonify({"success": False, "errors": ["A valid email is required."]}), 400

    print(f"=== Newsletter Signup: {email} ===")

    return jsonify({
        "success": True,
        "message": "You have been subscribed successfully!",
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 4999))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
