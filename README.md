# Pangea Shores | Business Consulting Website

A five-page static website for Pangea Shores, built with plain HTML, CSS and JavaScript.
No build tools, frameworks, databases or servers are required. It runs anywhere static
files can be served, including GitHub Pages.

Website design and development by SAP Development Solutions, LLC.

## Project structure

Flat layout: every file sits in one folder, with no subfolders. This makes it easy to
upload through GitHub's website one file at a time.

```text
pangea-shores/
├── index.html
├── about.html
├── services.html
├── insights.html
├── contact.html
├── style.css                          All styles (brand colors are the :root variables at the top)
├── script.js                          Mobile menu, animations, form validation, footer year
├── pangea-shores-logo.jpg
├── sap-development-solutions-logo.jpg
└── README.md
```

Keep new images in this same folder (for example mike-henderson.jpg) and refer to them by
file name only.

## 1. Run the site locally (Python 3.11)

From inside the `pangea-shores` folder:

```bash
python -m http.server 8000
```

On some Macs and Linux machines the command is `python3`:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser. Press `Ctrl + C` in the terminal to stop the server.

## 2. Create a GitHub repository

1. Sign in at https://github.com.
2. Click **New repository**.
3. Name it (for example `pangea-shores`), set it to **Public**, and do **not** add a README,
   .gitignore or license (this project already has them).
4. Click **Create repository** and copy the repository URL.

## 3. Upload / push the files

From inside the `pangea-shores` folder:

```bash
git init
git add .
git commit -m "Initial Pangea Shores website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

For later updates:

```bash
git add .
git commit -m "Describe what changed"
git push
```

No Git installed? On the new repository page, click **uploading an existing file** and drag
in every file and folder (keep the `css`, `js` and `images` folders intact).

## 4. Enable GitHub Pages

1. In the repository, go to **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then click **Save**.
4. After a minute or two the site is live at
   `https://YOUR-USERNAME.github.io/pangea-shores/`.

All links in the site are relative, so it works at that address without changes.

## 5. Connect a custom domain later

1. Buy the domain from any registrar.
2. In **Settings > Pages > Custom domain**, enter it (for example `www.yourdomain.com`) and save.
   GitHub adds a `CNAME` file to the repository.
3. At the registrar, add DNS records:
   - `www` as a **CNAME** pointing to `YOUR-USERNAME.github.io`
   - For the bare domain, **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Once DNS finishes (can take up to 24 hours), tick **Enforce HTTPS**.
5. Replace `https://www.example.com/` in the `<head>` of all five pages with the real domain
   (canonical, `og:url`, `og:image`, `twitter:image`). Search each file for `example.com`.

GitHub's current instructions: https://docs.github.com/pages

## 6. Replace placeholder information

Every editable area is marked with an HTML comment starting with `EDIT:`.
Search the project for `EDIT:` and for square brackets `[`.

| What | Where |
| --- | --- |
| Email, phone, location | `contact.html` (Contact details) and the footer of **all five pages** (`[Email Address]`, `[Phone Number]`, `[Business Location]`) |
| Company description | Home intro section, About "Who we are", footer blurb on all pages |
| Mike Henderson biography | `about.html`, Leadership section. Current text is general placeholder copy; replace with verified details |
| Services | `services.html` (each service is one `<li class="service">` block) and the four cards in the Home "What we do" section |
| Sample articles | `insights.html`, Perspectives section (clearly tagged "Placeholder article") |
| Page titles and descriptions | `<title>` and `<meta name="description">` at the top of each page |
| Domain | `example.com` in the `<head>` of every page |
| Testimonials, case studies, social links | Not included yet, by design. Add only verified content |

The footer, header and navigation are repeated on every page. When changing them,
update all five files.

## 7. Connect the contact form

GitHub Pages cannot send email, so the form needs a form service. Until one is connected,
the form validates entries and then shows a clear "not connected yet" notice. It never
pretends a message was sent.

Open `contact.html` and find the comment block marked **FORM ENDPOINT**.

**Formspree (recommended for GitHub Pages)**

1. Create a free account and form at https://formspree.io and copy your form ID.
2. Change the form tag to:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```

That is the only change needed. Field names are already set, and a hidden `_gotcha`
spam trap is included.

**Netlify Forms** works only if the site is hosted on Netlify instead of GitHub Pages.
The exact tag is in the same comment block.

## 8. Replace images

| Image | How to replace |
| --- | --- |
| Pangea Shores logo | Overwrite `pangea-shores-logo.jpg` with a file of the same name. A **transparent PNG or SVG** version of the logo would look sharper in the header; if one becomes available, save it in `` and update the `src` in the header of each page |
| SAP Development Solutions logo | Overwrite `sap-development-solutions-logo.jpg` |
| Mike Henderson photo | Add `mike-henderson.jpg` (portrait, 4:5 ratio). Instructions are in the Leadership comment in `about.html` |
| Article images | Add an `<img>` inside the `.article-media` block of each card in `insights.html`. Images are cropped to 16:9 automatically |

Only use images you own or have a license to use.

## Customizing the look

Brand colors, fonts and spacing are CSS variables at the top of `style.css`.
Change a value there and it updates across the whole site.

Fonts load from Google Fonts: Newsreader (headings), Manrope (body), and Poppins
(the "Pangea Shores" name in the header, matching the logo's lettering).

## Checked before delivery

- All navigation links, image, CSS and JavaScript paths resolve from the project root
- Layout tested at 1920, 1440, 1024, 768, 480 and 375 px wide with no horizontal scrolling
- Keyboard navigation, visible focus, skip link, labeled form fields, reduced-motion support
- Works without JavaScript (menu links wrap instead of collapsing; content stays visible)
