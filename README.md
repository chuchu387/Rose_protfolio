### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_email}}` - Recipient email (rozee123maharjan@gmail.com)
4. Copy your Service ID, Template ID, and User ID to the `.env.local` file

### Cloudinary Setup

1. Create an account at [Cloudinary](https://cloudinary.com/)
2. From your Cloudinary dashboard, get your Cloud Name
3. Go to Settings > Upload and create a new unsigned upload preset (or use signed presets if preferred)
4. Add your Cloud Name and Upload Preset to your `.env.local` file as described in the Environment Variables section below
5. The image upload functionality in the Admin Dashboard will now use Cloudinary to store your portfolio images

#### Using Unsigned Upload Presets (Recommended for frontend uploads)

Unsigned presets allow direct uploads from the frontend without exposing your API secret. To create an unsigned preset:

1. Go to Settings > Upload in your Cloudinary dashboard
2. Click on "Add upload preset"
3. Choose "Unsigned" as the signing mode
4. Configure any desired upload restrictions or transformations
5. Note the "Preset name" for your .env file

#### Important Security Note

While unsigned presets simplify frontend integration, ensure you configure appropriate restrictions:
- Limit file types to images only
- Set maximum file size limits
- Consider setting transformation restrictions to prevent abuse

### Admin Dashboard

#### Features
- **View All Projects**: See all portfolio items with thumbnails
- **Add Project**: Upload new projects with image, title, category, and description
- **Edit Project**: Modify existing project details
- **Delete Project**: Remove projects from the portfolio
- **Image Upload**: Direct image upload to Cloudinary with preview

#### Setting Up Admin Credentials

For security reasons, hardcoded credentials have been removed. To set up your admin access:

1. Create a `.env.local` file in the root directory
2. Add your custom admin email and password as shown in the environment variables section
3. Restart the development server

## Project Structure

```
├── public/
│   └── images/           # Static images
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       └── AdminDashboard.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolio.ts  # Initial data
│   ├── types/
│   │   └── index.ts      # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json