# GitHub Repository Analyzer

A web application that retrieves and displays information about GitHub repositories using the GitHub API.

Enter a repository in `owner/repository` format to view its details and statistics.

## Features

- **Repository Information:** Displays the repository name, owner, and description.
- **Repository Statistics:** Shows stars, forks, and open issues.
- **Programming Language:** Displays the repository's primary programming language.
- **Language API:** Retrieves programming language data from GitHub.
- **GitHub Link:** Provides a link to the original repository.
- **Error Handling:** Displays error messages for unsuccessful requests.
- **Dynamic Interface:** Uses JavaScript to display repository information without reloading the page.

## Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- GitHub REST API

## Project Structure

```text
Github-Repo-Analyzer/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

Replace `YOUR_REPOSITORY_URL` with the URL of your GitHub repository.

### 2. Navigate to the project directory

```bash
cd Github-Repo-Analyzer
```

### 3. Install the dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

### 5. Open the application

Visit the following address in your browser:

```text
http://127.0.0.1:5000
```

## How to Use

1. Open the application.
2. Enter a repository in `owner/repository` format.
3. Click **Analyze**.
4. View the repository information and statistics.
5. Click **View on GitHub** to visit the original repository.

For example:

```text
python/cpython
```

## How It Works

1. The frontend accepts a repository owner and repository name.
2. JavaScript sends a request to the Flask backend.
3. Flask requests repository information from the GitHub REST API.
4. The backend returns the relevant information as JSON.
5. JavaScript dynamically creates HTML elements to display the results.
6. CSS styles the repository information and statistics cards.

The application also has a separate backend endpoint for retrieving programming language data.

## Future Improvements

- Display programming language percentages.
- Add recent commit information.
- Improve loading indicators and error messages.
- Enhance responsive design for mobile devices.
- Add automated tests.

## License

This project is open source. Add a license file if you intend to distribute it under a specific open-source license.
