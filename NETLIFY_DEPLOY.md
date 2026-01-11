# Netlify Deployment Guide

This guide will help you deploy your Travel Agency website to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://www.netlify.com))
- Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Methods

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Login to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign in with your account

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository

3. **Configure Build Settings**
   - Netlify will automatically detect the settings from `netlify.toml`:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - If not auto-detected, enter manually:
     - Build command: `npm run build`
     - Publish directory: `dist`

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-3 minutes)

5. **Site is Live!**
   - Your site will be available at: `https://random-name-123.netlify.app`
   - You can customize the domain name in Site settings → Domain management

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Follow the prompts to link your site

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 3: Drag & Drop (Quick Test)

1. **Build the project locally**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder to the drop zone
   - Your site will be live in seconds!

## Configuration Files

### netlify.toml
This file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects for React Router
- Security headers
- Cache headers for static assets

### public/_redirects
This file ensures all routes redirect to `index.html` for React Router to handle client-side routing.

## Environment Variables (if needed)

If you need to set environment variables:

1. Go to Site settings → Environment variables
2. Add variables like:
   - `NODE_VERSION=18`
   - Any API keys or configuration values

## Custom Domain Setup

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

## Post-Deployment Checklist

- [ ] Test all pages and routes
- [ ] Verify images are loading correctly
- [ ] Check mobile responsiveness
- [ ] Test WhatsApp integration
- [ ] Verify language switching (EN/AR)
- [ ] Check all navigation links
- [ ] Test search functionality
- [ ] Verify booking forms redirect to WhatsApp

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version (should be 18+)

### 404 Errors on Routes
- Ensure `netlify.toml` has redirects configured
- Check that `public/_redirects` file exists
- Verify React Router is working correctly

### Images Not Loading
- Check image paths (should be relative to `public` folder)
- Verify images are included in the build
- Check browser console for errors

### Performance Issues
- Enable Netlify's CDN (automatic)
- Check image sizes and optimize if needed
- Review build output size

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:
- Push to `main` or `master` → Auto-deploy
- Create a pull request → Preview deployment
- Merge PR → Production deployment

## Support

For Netlify-specific issues:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)

---

**Your site is now live! 🚀**


