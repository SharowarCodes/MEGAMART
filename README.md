# MegaMart E-commerce Landing Page

A fully responsive, modern e-commerce landing page built with React.js and Tailwind CSS.

## Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 📱 **Fully Responsive** - Mobile-first approach with breakpoints for all devices
- ⚡ **Interactive Elements** - Hover effects, smooth scrolling, and micro-interactions
- 🎯 **Component-Based** - Modular, reusable React components
- 🛍️ **Product Showcase** - Dynamic product grid with discount badges
- 🏷️ **Category Navigation** - Pill-shaped category buttons with icons
- 🏢 **Brand Showcase** - Eye-catching brand cards with gradients
- 📦 **Daily Essentials** - Special offers section
- 📧 **Contact & Support** - Multi-column footer with all necessary links
- ⬆️ **Back to Top** - Smooth scroll-to-top button

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons
- **PostCSS** - CSS transformation tool

## Project Structure

```
megamart/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── Categories.jsx
│   │   ├── Brands.jsx
│   │   ├── DailyEssentials.jsx
│   │   ├── Footer.jsx
│   │   └── BackToTop.jsx
│   ├── constants/
│   │   └── products.js
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd megamart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Components Overview

### Header
- Responsive navigation with hamburger menu
- Search bar (desktop) and mobile search
- Shopping cart with item counter
- Smooth scroll navigation

### Hero Section
- Gradient background with decorative elements
- Animated content entrance
- Call-to-action button
- Scroll indicator

### ProductGrid
- Responsive grid layout (2-6 columns)
- Product cards with discount badges
- Add to cart functionality
- Hover effects and animations

### Categories
- Pill-shaped category buttons
- Icon-based navigation
- Responsive grid layout
- Color-coded categories

### Brands
- Gradient brand cards
- Interactive hover effects
- Discount highlights
- Shop now CTAs

### DailyEssentials
- Two-tier offer display (50% OFF, 80% OFF)
- Icon-based product representation
- Responsive grid layout

### Footer
- Multi-column layout
- Contact information
- Download app section
- Customer service links

### BackToTop
- Appears after scrolling 300px
- Smooth scroll animation
- Hover effects

## Responsive Breakpoints

- **Mobile**: < 640px (stacked layout, hamburger menu)
- **Tablet**: 640px - 1024px (2-3 columns)
- **Desktop**: > 1024px (full layout, 4+ columns)

## Customization

### Adding New Products
Edit `src/constants/products.js` to add or modify product data.

### Changing Colors
Update the color scheme in `tailwind.config.js` and component files.

### Adding New Sections
1. Create new component in `src/components/`
2. Import and add to `App.jsx`
3. Update constants if needed

## Performance Features

- Lazy loading ready structure
- Optimized animations
- Efficient re-renders
- Mobile-optimized touch targets

## Accessibility

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios
- Touch-friendly tap targets (44x44px minimum)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2023 All rights reserved. Madeon Tech Ltd
