# Kalyan Manda Portfolio

A cinematic, 3D-inspired personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a privacy-conscious analytics layer. The experience is intentionally designed around scene transitions rather than a traditional resume page, while preserving a professional, readable resume layout.

## Features

- Cinematic hero and section-based storytelling
- Responsive portfolio layout for mobile, tablet, and desktop
- Resume download button and email CTA tracking
- Section-view analytics with once-per-session recording
- Optional protected analytics dashboard
- Metadata and SEO configuration
- Reduced-motion support and graceful WebGL fallback behavior

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber and Drei
- Lucide React

## Local setup

1. Install dependencies:
   npm install
2. Start the development server:
   npm run dev
3. Open the app in the browser at http://localhost:3000

## Production build

- Build: npm run build
- Start: npm run start

## Replace the resume PDF

Place your resume file in the public folder as:

- public/resume.pdf

Then update the title and filename if needed in the resume download action in the UI.

## Environment variables

Copy the example file and configure your values:

cp .env.example .env.local

Example:

PORTFOLIO_ANALYTICS_TOKEN=your-secret-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000

## Analytics

This project includes a lightweight analytics layer that tracks:

- page_view
- section_view
- resume_download
- email_click
- linkedin_click
- github_click
- project_click

The implementation uses a local JSON store for demo purposes and records only anonymous usage metadata. It intentionally avoids collecting email addresses, keystrokes, personal identifiers, or sensitive device data.

### Accessing the protected analytics dashboard

Set a secret token in the environment:

PORTFOLIO_ANALYTICS_TOKEN=your-secret-token

Then open:

/analytics

The dashboard is not public when the token is absent.

## Event tracking behavior

- Resume downloads fire the resume_download event with source metadata.
- Email clicks fire email_click with hero, contact, or navigation source.
- LinkedIn/GitHub links record platform-specific interaction events.
- Project cards record project_click events.
- Section view events are only recorded once per session for each section.

## Reduced motion and 3D

The site respects prefers-reduced-motion and swaps animation-heavy transitions for smoother fades and simpler movement when reduced motion is enabled.

To reduce or disable 3D effects further, keep the app on the 2D fallback path by avoiding heavy Three.js usage in the scene layer or by disabling the scene wrappers in the future.

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables from .env.example.
4. Set the framework to Next.js.
5. Deploy.

## Privacy notes

- No visitor email addresses are collected.
- No keystrokes or personal information are tracked.
- Analytics events are anonymized and minimized to meaningful portfolio actions.

## Testing reduced motion

On macOS or Windows, enable reduced motion in system accessibility settings or use the browser DevTools emulation mode to test the reduced-motion path.

## Funding / no paid tools

This project uses only open-source libraries and standard Vercel/Next.js functionality. No paid design or analytics tools are required for the default setup.
