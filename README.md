# TravelHub - Modern Travel Booking Website

A modern, responsive travel booking website inspired by Almosafer's UX layout. Built with React, React Router, and TailwindCSS.

## Features

✈️ **Complete Travel Booking System**
- Flight booking with search functionality
- Hotel reservation system
- Travel packages and offers
- Responsive design for all devices

🔗 **WhatsApp Integration**
- Direct WhatsApp integration for booking requests
- Automatic message formatting with booking details
- Seamless user experience

📱 **Mobile-First Design**
- Fully responsive layout
- Mobile navigation drawer
- Touch-friendly interface

🎨 **Modern UI/UX**
- Clean, intuitive interface
- Smooth animations and transitions
- Professional color scheme
- Reusable components

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── SearchBox/
│   │   ├── FlightSearch.jsx
│   │   └── HotelSearch.jsx
│   └── Cards/
│       ├── DestinationCard.jsx
│       └── PackageCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Flights.jsx
│   ├── Hotels.jsx
│   ├── Offers.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── utils/
│   └── whatsappRedirect.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

## Tech Stack

- **React 19** - UI library
- **React Router 7** - Navigation
- **TailwindCSS 3.4** - Styling
- **Vite** - Build tool
- **Lucide Icons** - Icon library

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WhatsApp Number

Edit `src/utils/whatsappRedirect.js` and update the `WHATSAPP_NUMBER`:

```javascript
const WHATSAPP_NUMBER = 'YOUR_BUSINESS_NUMBER'; // Example: 966501234567
```

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Generated files will be in the `dist/` directory.

### 5. Hero Banner Image (Landing Page)

To show your custom hero banner on the Home page, place your image file at:

`public/images/landing-banner.jpg`

Recommended size: 1920×400–600px. WebP preferred (you can keep the name `.jpg` even if the file is WebP). After adding the file, the banner will automatically appear behind the hero text.

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, search, and featured destinations |
| `/flights` | Flight search and booking page |
| `/hotels` | Hotel search and booking page |
| `/offers` | All travel packages and special offers |
| `/about` | About company, team, and values |
| `/contact` | Contact form and information |

## Customization Guide

### Update Content

1. **Home Page**: Edit `src/pages/Home.jsx` to change featured destinations and special offers
2. **Images**: Replace `picsum.photos` URLs with your own images
3. **Text**: Update all placeholder text throughout components

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
extend: {
	colors: {
		primary: { /* your colors */ },
		teal: { /* your colors */ }
	}
}
```

### Update Business Information

1. **WhatsApp Number**: `src/utils/whatsappRedirect.js`
2. **Contact Details**: `src/components/Footer/Footer.jsx`
3. **Company Name**: Update "TravelHub" throughout the codebase

### Add New Pages

1. Create a new file in `src/pages/YourPage.jsx`
2. Add the route in `src/App.jsx`:

```javascript
<Route path="/your-page" element={<YourPage />} />
```

3. Add navigation link in `src/components/Header/Header.jsx`

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

**Option 1: Connect Git Repository (Recommended)**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Option 2: Drag & Drop**
```bash
npm run build
# Drag the 'dist' folder to https://app.netlify.com/drop
```

**Option 3: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

📖 **See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed deployment guide**

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
"homepage": "https://yourusername.github.io/TravelAgency",
"scripts": {
	"deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## WhatsApp Booking System

When users submit a booking form, they are redirected to WhatsApp with a pre-filled message containing:

**Flight Booking:**
```
🛫 FLIGHT BOOKING REQUEST

From: [city]
To: [city]
Departure: [date]
Return: [date]
Passengers: [number]
Class: [class]
```

**Hotel Booking:**
```
🏨 HOTEL BOOKING REQUEST

Destination: [city]
Check-in: [date]
Check-out: [date]
Rooms: [number]
Guests: [number]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Use modern image formats (WebP) with fallbacks
2. **Lazy Loading**: Implement image lazy loading for better performance
3. **Code Splitting**: React Router automatically handles code splitting
4. **Caching**: Configure proper cache headers on deployment

## Future Enhancements

- [ ] Payment gateway integration
- [ ] User authentication
- [ ] Booking history
- [ ] Real API integration
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Review and rating system
- [ ] Real-time availability updates

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please contact us through the contact page or WhatsApp.

---

**Made with ❤️ by TravelHub Team**
