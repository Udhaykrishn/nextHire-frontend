# Navbar & Authentication System

## ✨ Features Implemented

### 1. **Dynamic Navbar Component** (`/components/navbar.tsx`)
- **Unauthenticated State**: Shows "Candidate Login" and "Employer Login" buttons
- **Authenticated State**: Shows user profile menu with logout option
- **Responsive Design**: Mobile-friendly with hamburger menu
- **Dark Mode Support**: Fully themed for light/dark mode
- **Animated Theme Toggle**: Integrated with smooth theme transitions

### 2. **Authentication Context** (`/providers/auth-provider.tsx`)
- Global authentication state management
- LocalStorage persistence (survives page refreshes)
- Login/logout functionality
- User role management (candidate/employer)

### 3. **App Layout** (`/components/app-layout.tsx`)
- Wrapper component that includes navbar
- Automatically handles auth state
- Easy to use across pages

## 🚀 Usage

### Using the Navbar in Pages

```tsx
import { AppLayout } from "@/components/app-layout";

export default function YourPage() {
  return (
    <AppLayout>
      <div>Your page content here</div>
    </AppLayout>
  );
}
```

### Login Flow

1. User clicks "Candidate Login" or "Employer Login"
2. Redirects to `/login?role=candidate` or `/login?role=employer`
3. After successful login, user is redirected to home page
4. Navbar automatically updates to show profile menu

### Logout Flow

1. Click on user profile button in navbar
2. Click "Logout" in dropdown
3. User is logged out and navbar updates to show login buttons

## 📋 Navbar States

### Not Authenticated
- **Desktop**: Two login buttons (Candidate, Employer)
- **Mobile**: Hamburger menu with login buttons

### Authenticated
- **Desktop**: User profile button with dropdown menu
  - My Profile
  - Dashboard
  - Logout
- **Mobile**: Hamburger menu with user info and options

## 🎨 Customization

### Change Logo
Edit the navbar component at line 37:
```tsx
<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-white font-bold">
  JH
</div>
```

### Add More Nav Links
Add to the navigation section (around line 48):
```tsx
<Link href="/your-link" className="...">
  Your Link
</Link>
```

### Change Theme Colors
The navbar uses Tailwind classes - modify the className props:
- Primary: `bg-cyan-400` → `bg-your-color`
- Borders: `border-gray-200` → `border-your-color`

## 🔧 API Integration

To connect with a real backend:

1. Update `/app/login/page.tsx` `handleLogin` function
2. Replace the mock user creation with an API call
3. Example:

```tsx
const handleLogin = async (payload: any) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    login({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role
    });
    
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (hamburger menu)
- **Desktop**: ≥ 768px (full navbar)

## 🎯 Current Features

✅ Role-based login (Candidate/Employer)
✅ Global auth state with context
✅ LocalStorage persistence
✅ Responsive mobile menu
✅ Dark mode support
✅ User profile dropdown
✅ Logout functionality
✅ Smooth animations
✅ Theme toggle integration

## 🔜 Future Enhancements

- Add protected routes middleware
- Implement JWT token management
- Add user avatar support
- Add notifications dropdown
- Add search functionality
- Add user settings page
