# CompanionAI Research Programme

CompanionAI is a static front-end website for a research initiative exploring loneliness detection using a textual dataset with behavioral descriptions, leveraging XLM-RoBERTa and SVM baseline models, with embedded conversational interventions.

## Open the project

1. Download and extract `CompanionAI-project.zip`.
2. Open the extracted `CompanionAI` folder in Visual Studio Code, PyCharm, or any code editor.
3. Open `index.html` in a web browser to view the website.

The project has no installation step and no required dependencies. It includes all project assets in the `assets/` folder.

## Recommended preview methods

### Visual Studio Code

Open the folder, then either:

- install the recommended **Live Server** extension and choose **Open with Live Server** on `index.html`; or
- open `index.html` directly in a browser.

### PyCharm

Open the extracted folder as a project. Right-click `index.html` and select **Open in Browser**, or run a local static server from PyCharm's terminal:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Project structure

```text
CompanionAI/
├── index.html                 Main website page
├── css/style.css              Custom styling and theme colors
├── js/script.js               Website interactions and animations
├── assets/                    Dataset, poster, and technical guide
├── README.md                  Project instructions
└── extensions.json            Recommended VS Code extension reference
```

## Notes

- The site uses Tailwind CSS, Google Fonts, and Lucide icons from public CDNs, so an internet connection is recommended for the full visual experience.
- The contact form is a demonstration only; it displays a success message and does not send email.
- The dataset used is just a sample and not the actual cleaned dataset
