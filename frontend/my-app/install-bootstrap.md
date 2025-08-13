# Bootstrap Migration Instructions

## 1. Install Bootstrap

Run this command in your frontend directory:

```bash
cd frontend/my-app
npm install bootstrap@5.3.0
npm uninstall tailwindcss autoprefixer postcss
```

## 2. Remove Tailwind Files

The following files have been automatically removed:

- `tailwind.config.js`
- `postcss.config.js`

## 3. Files Updated

The following files have been updated to use Bootstrap instead of Tailwind:

### Updated Files:

- ✅ `package.json` - Added Bootstrap, removed Tailwind dependencies
- ✅ `src/App.js` - Replaced all Tailwind classes with Bootstrap classes
- ✅ `src/components/PostCard.js` - Updated to use Bootstrap card component
- ✅ `src/components/DebugPanel.js` - Updated with Bootstrap utilities
- ✅ `src/styles/App.css` - Cleaned up and optimized for Bootstrap

### Key Changes:

- **Grid System**: Replaced Tailwind grid with Bootstrap's responsive grid (`row`, `col-*`)
- **Utilities**: Replaced Tailwind utilities with Bootstrap equivalents
- **Components**: Used Bootstrap's card component for posts
- **Spacing**: Used Bootstrap spacing utilities (`p-*`, `m-*`, `gap-*`)
- **Colors**: Used Bootstrap color system (`text-primary`, `bg-light`, etc.)
- **Flexbox**: Used Bootstrap flex utilities (`d-flex`, `align-items-center`, etc.)

## 4. Bootstrap Classes Used

### Layout:

- `container-fluid` - Full width container
- `row` - Bootstrap row
- `col-12 col-sm-6 col-lg-4 col-xl-3` - Responsive columns

### Components:

- `card` - Bootstrap card component
- `btn btn-primary` - Bootstrap buttons
- `spinner-border` - Bootstrap loading spinner

### Utilities:

- `d-flex` - Display flex
- `align-items-center` - Align items center
- `justify-content-center` - Justify content center
- `text-center` - Text align center
- `bg-light` - Light background
- `text-primary` - Primary text color
- `shadow` - Box shadow
- `rounded` - Border radius

## 5. Start the Application

After installing Bootstrap, start your application:

```bash
npm start
```

## 6. Features Maintained

All original features are maintained:

- ✅ Infinite scrolling
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Image lazy loading
- ✅ Debug panel (development only)

The app now uses Bootstrap 5.3.0 instead of Tailwind CSS while maintaining all functionality and improving performance.
