# India Fitness - Project Handover Guide

This document outlines the steps to successfully transfer and maintain the India Fitness website and its custom CRM.

## 1. Project Overview
- **Technology Stack**: HTML5, CSS3, JavaScript (Vanilla), Leaflet.js (Maps), Web3Forms (Contacts).
- **CRM System**: Custom-built administrative panel located at `/admin`.
- **Infrastructure**: Hosted on Vercel with content managed via GitHub.

## 2. Transferring the Codebase (GitHub)
I have built this site to be 100% portable. To transfer ownership:
1.  **Repository Transfer**: Go to GitHub **Settings > General > Danger Zone > Transfer**. Move the repo to the buyer's account.
2.  **Access Revocation**: Once transferred, remove yourself as a collaborator. The buyer is now the "Master" and only their GitHub login will work for the CRM.

## 3. Transferring the Deployment (Vercel)
The buyer should create their own Vercel account and:
1.  **Import the Repository**: Connect their GitHub account and import the `INDIA-FITNESS` project.
2.  **Environment Variables**: They MUST add these to Vercel (Settings > Environment Variables):
    - `OAUTH_CLIENT_ID`: (From their new GitHub OAuth App)
    - `OAUTH_CLIENT_SECRET`: (From their new GitHub OAuth App)
3.  **Domain Setup**: Add the `indiafitness.in` (or their chosen domain) in Vercel **Settings > Domains**.

## 4. CRM & Bot Security
The buyer is inheriting a "Hardened" security system:
- **Honeypot Protection**: Invisible bot trap on the contact form.
- **Content Sanitizer**: Automatically cleans HTML/Scripts from the Admin panel before saving.
- **CSP & HSTS**: Strict browser security headers are already active in `vercel.json`.

## 5. Maintenance
- **Data Updates**: All site content (Trainers, Plans, Gallery) is stored in `/_data/*.json`. This can be edited via the `/admin` panel or directly in GitHub.
- **Lead Generation**: Leads from the Home and Pricing sections go directly to the owner's WhatsApp and Email (via Web3Forms).

---
**Prepared by KNOWNASPRATYUSH for INDIA FITNESS Handover**
