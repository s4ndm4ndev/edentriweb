# Edentri AS - Corporate Website

A modern, responsive corporate website built with Hugo static site generator, featuring automated data processing solutions and services.

## 🚀 Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) v0.116.0 or higher (Extended version required)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Edentri
```

2. Start the development server:
```bash
hugo server
```

3. Open your browser and visit [http://localhost:1313](http://localhost:1313)

## 📁 Project Structure

```
├── archetypes/          # Content templates
│   └── default.md
├── content/             # Website content (Markdown)
│   ├── _index.md       # Homepage content
│   ├── about.md        # About page
│   ├── contact.md      # Contact page
│   ├── privacy-policy.md
│   └── services/       # Service pages
├── data/               # Data files (YAML, JSON, TOML)
├── i18n/              # Internationalization
│   └── en.toml        # English translations
├── layouts/           # HTML templates (in theme)
├── static/            # Static assets
│   ├── images/        # Images and logos
│   └── videos/        # Video assets
├── themes/            # Hugo themes
│   └── edentri-custom/ # Custom Edentri theme
├── hugo.toml          # Site configuration
└── CLAUDE.md          # Development guidelines
```

## 🎨 Features

### Custom Theme: Edentri Custom
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Video Hero Section**: Full-screen video background with overlay content
- **Modern CSS**: CSS variables for theming, flexbox/grid layouts, smooth animations
- **Performance Optimized**: Lazy loading, reduced motion support, optimized animations
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML

### Color Scheme
- **Primary**: Orange (#FF6B35) - main brand color
- **Secondary**: White (#FFFFFF) and Black (#000000)
- **Light Mode**: White backgrounds with dark text
- **Dark Mode**: Dark gray backgrounds with light text
- **Automatic switching** based on system preferences

## 🛠️ Development

### Common Commands

#### Development Server
```bash
hugo server
```
Starts the Hugo development server with live reload at http://localhost:1313

#### Build Site
```bash
hugo
```
Builds the static site to the `public/` directory

#### Build with Drafts
```bash
hugo server -D
# or
hugo -D
```
Includes content marked as draft in the build

#### Create New Content
```bash
hugo new posts/my-post.md
```
Creates new content using the archetype template

#### Site Configuration
```bash
hugo config
```
Display current site configuration

### Content Management

Content is written in Markdown and stored in the `content/` directory:

- **Homepage**: `content/_index.md`
- **About Page**: `content/about.md`
- **Contact Page**: `content/contact.md`
- **Services**: `content/services/`
- **Privacy Policy**: `content/privacy-policy.md`

### Theme Customization

The custom theme is located in `themes/edentri-custom/` and includes:

#### Templates
- `layouts/_default/baseof.html` - Base template with theme toggle
- `layouts/index.html` - Homepage with hero video and sections
- `layouts/partials/header.html` - Navigation with mobile menu
- `layouts/partials/footer.html` - Footer with company information

#### Assets
- `static/css/main.css` - Complete responsive CSS with themes
- `static/js/main.js` - Interactive functionality and theme management

## 🌐 Deployment

### Build for Production
```bash
hugo --minify
```

The built site will be in the `public/` directory, ready for deployment to any static hosting service.

### Supported Hosting Platforms
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📄 Configuration

### Site Configuration (`hugo.toml`)
```toml
baseURL = 'http://localhost:1313'
languageCode = 'en-us'
title = 'Edentri AS - Streamline Your Data Flow'
theme = 'edentri-custom'

[params]
  description = "Streamline your data flow with us, save time and costs"
  author = "Edentri AS"
  
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

### Theme Configuration
The theme supports various configuration options through the front matter and site parameters.

## 🔧 Technical Details

- **Hugo Version**: v0.148.2+extended
- **Minimum Hugo Version**: v0.116.0
- **Theme**: Custom "edentri-custom" theme
- **CSS**: Modern CSS with variables, flexbox, and grid
- **JavaScript**: Vanilla JS for theme toggling and interactions
- **Icons**: Font-based icons and SVG graphics

## 📞 Support & Services

Edentri AS specializes in:
- **Data Extraction**: Automated data processing solutions
- **Document Processing**: Streamlined document workflows
- **Workflow Integration**: Custom integration solutions

For business inquiries, visit the contact page or reach out through the website.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is proprietary software owned by Edentri AS.

## 🏢 About Edentri AS

Edentri AS helps businesses streamline their data processing workflows through automated solutions and custom integrations. We save time and costs by optimizing data flow processes.

---

**Built with ❤️ using Hugo Static Site Generator**