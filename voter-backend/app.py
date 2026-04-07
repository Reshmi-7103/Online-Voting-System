from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask_mail import Mail, Message
import random
from blockchain import Blockchain
blockchain = Blockchain()

app = Flask(__name__)
CORS(app)

# 🔥 MongoDB Connection
client = MongoClient("mongodb+srv://reshmic710_db_user:reshmi7103@evoting.dvnnzrt.mongodb.net/?appName=EVoting")
db = client["evoting"]

users = db["users"]
candidates = db["candidates"]   # 🔥 NEW COLLECTION

# 🔥 MAIL CONFIG
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'reshmi7103@gmail.com'
app.config['MAIL_PASSWORD'] = 'wohthjssfkuhwgxx'

mail = Mail(app)

otp_store = {}

# ================= SEND OTP =================
@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    email = data["email"]

    otp = str(random.randint(1000, 9999))
    otp_store[email] = otp

    try:
        msg = Message(
            "OTP Verification",
            sender=app.config['MAIL_USERNAME'],
            recipients=[email]
        )
        msg.body = f"Your OTP is {otp}"
        mail.send(msg)

        return jsonify({"msg": "OTP sent to email ✅"})
    except Exception as e:
        print(e)
        return jsonify({"msg": "Error sending OTP ❌"}), 500


# ================= REGISTER =================
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    email = data["email"]
    user_otp = data.get("otp")

    if email not in otp_store or otp_store[email] != user_otp:
        return jsonify({"msg": "Invalid OTP"}), 400

    if users.find_one({"email": email}):
        return jsonify({"msg": "User already exists"}), 400

    user = {
        "name": data["name"],
        "email": email,
        "gender": data["gender"],
        "phone": data["phone"],
        "aadhar": data["aadhar"],
        "voter_id": data["voter_id"],
        "age": data["age"],
        "occupation": data["occupation"],
        "password": data["password"],
        "is_verified": False,
        "is_rejected": False
    }

    users.insert_one(user)

    return jsonify({"msg": "User registered successfully 🎉"})


# ================= ADMIN DASHBOARD =================
@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    return jsonify({
        "totalUsers": users.count_documents({}),
        "verifiedUsers": users.count_documents({"is_verified": True}),
        "pendingUsers": users.count_documents({"is_verified": False})
    })


# ================= GET USERS =================
@app.route("/admin/users", methods=["GET"])
def get_users():
    return jsonify(list(users.find({}, {"_id": 0})))


# ================= VERIFY USER =================
@app.route("/admin/verify-user", methods=["POST"])
def verify_user():
    email = request.json["email"]

    users.update_one(
        {"email": email},
        {"$set": {"is_verified": True, "is_rejected": False}}
    )

    return jsonify({"msg": "User verified ✅"})


# ================= REJECT USER =================
@app.route("/admin/reject-user", methods=["POST"])
def reject_user():
    email = request.json["email"]

    users.update_one(
        {"email": email},
        {"$set": {"is_verified": False, "is_rejected": True}}
    )

    return jsonify({"msg": "User rejected ❌"})


# ================= VERIFY DETAILS =================
@app.route("/verify-details", methods=["POST"])
def verify_details():
    data = request.json

    user = users.find_one({
        "email": data["email"],
        "aadhar": data["aadhar"],
        "voter_id": data["voter_id"]
    })

    if not user:
        return jsonify({"msg": "Details do not match ❌"}), 401

    return jsonify({"msg": "Details verified ✅"})


# ================= LOGIN =================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users.find_one({
        "email": data["email"],
        "password": data["password"]
    })

    if user:
        return jsonify({
            "msg": "Login successful ✅",
            "user": {
                "name": user.get("name"),
                "email": user.get("email"),
                "gender": user.get("gender"),
                "phone": user.get("phone"),
                "aadhar": user.get("aadhar"),
                "voter_id": user.get("voter_id"),
                "age": user.get("age"),
                "occupation": user.get("occupation"),
                "is_verified": user.get("is_verified", False),
                "is_rejected": user.get("is_rejected", False)
            }
        })
    else:
        return jsonify({"msg": "Invalid credentials ❌"}), 401


# ================= ADD CANDIDATE =================
@app.route("/admin/add-candidate", methods=["POST"])
def add_candidate():
    data = request.json

    candidate = {
        "name": data["name"],
        "party": data["party"],
        "region": data["region"],
        "qualification": data["qualification"],
        "age": data["age"],
        "gender": data["gender"],

        # 🔥 IMAGES
        "photo": data["photo"],
        "symbol": data["symbol"]
    }

    candidates.insert_one(candidate)

    return jsonify({"msg": "Candidate added successfully ✅"})


# ================= GET CANDIDATES =================
@app.route("/admin/candidates", methods=["GET"])
def get_candidates():
    return jsonify(list(candidates.find({}, {"_id": 0})))


# ================= DELETE CANDIDATE =================
@app.route("/admin/delete-candidate", methods=["POST"])
def delete_candidate():
    name = request.json["name"]
    candidates.delete_one({"name": name})
    return jsonify({"msg": "Candidate deleted ❌"})



# ================= RESULTS =================
@app.route("/results", methods=["GET"])
def results():
    chain = blockchain.get_chain()

    result = {}

    for vote in chain[1:]:  # genesis skip
        c = vote["candidate"]
        result[c] = result.get(c, 0) + 1

    return jsonify(result)

# ================= VOTE (BLOCKCHAIN) =================
@app.route("/vote", methods=["POST"])
def vote():
    data = request.json

    voter = data["email"]
    candidate = data["candidate"]

    # 🔥 GET CHAIN
    existing_votes = blockchain.get_chain()

    # 🔥 SKIP GENESIS BLOCK
    for vote in existing_votes[1:]:
        if vote.get("voter") == voter:
            return jsonify({"msg": "You have already voted ❌"}), 400

    # ✅ ADD VOTE
    blockchain.add_vote(voter, candidate)

    return jsonify({"msg": "Vote stored on blockchain ✅"})


# ================= TEST =================
@app.route("/")
def home():
    return "MongoDB + Email OTP Connected 🚀"


if __name__ == "__main__":
    app.run(debug=True)