from flask import Flask , render_template, jsonify, request
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/repository', methods=['GET'])
def get_repository():
    owner = request.args.get('owner')
    repo = request.args.get('repo')
    if not owner or not repo:
        return jsonify({'error': 'Missing owner or repo parameter'}), 400
    
    api_url = f"https://api.github.com/repos/{owner}/{repo}"

    try:
        response = requests.get(api_url, timeout=10)

        if response.status_code == 404:
            return jsonify({
                "error": "Repository not found"
            }), 404

        response.raise_for_status()

        data = response.json()

        return jsonify({
            "name": data["name"],
            "owner": data["owner"]["login"],
            "description": data["description"],
            "stars": data["stargazers_count"],
            "forks": data["forks_count"],
            "language": data["language"],
            "open_issues": data["open_issues_count"],
            "url": data["html_url"]
        })

    except requests.exceptions.Timeout:
        return jsonify({
            "error": "GitHub took too long to respond. Try again."
        }), 504

    except requests.exceptions.RequestException:
        return jsonify({
            "error": "Could not connect to GitHub. Try again later."
        }), 502
@app.route("/api/languages", methods=["GET"])
def get_languages():
    owner = request.args.get("owner")
    repo = request.args.get("repo")

    if not owner or not repo:
        return jsonify({"error": "Owner and repository are required"}), 400

    api_url = f"https://api.github.com/repos/{owner}/{repo}/languages"

    try:
        response = requests.get(api_url, timeout=10)

        if response.status_code == 404:
            return jsonify({"error": "Repository not found"}), 404

        response.raise_for_status()

        return jsonify(response.json())

    except requests.exceptions.Timeout:
        return jsonify({"error": "GitHub took too long to respond"}), 504

    except requests.exceptions.RequestException:
        return jsonify({"error": "Could not connect to GitHub"}), 502

if __name__ == '__main__':
    app.run(debug=True)
