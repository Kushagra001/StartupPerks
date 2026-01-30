# Startup Benefits & Partnerships Platform

A premium SaaS platform connecting startups with exclusive deals and tools. Built with a modern dark-mode aesthetic, secure authentication, and a scalable architecture.

## 🔄 End-to-End Application Flow

1.  **Landing & Discovery**: 
    -   Users arrive at the Landing Page featuring a high-performance, glassmorphism UI.
    -   They can browse "Public" deals immediately but cannot claim them without an account.
2.  **Authentication**:
    -   Users **Register** (`/register`) with name, email, password, and company name.
    -   Upon success, they are automatically logged in and redirected to the **Dashboard**.
    -   Existing users **Login** (`/login`) to receive a JWT token.
3.  **Dashboard & User State**:
    -   The Dashboard fetches user profile and current claims.
    -   Displays "Total Savings" (calculated from claimed deals) and a list of active benefits.
4.  **Claiming a Deal**:
    -   User navigates to "Browse Deals".
    -   Clicks "Claim Now" on a deal.
    -   **If Locked**: System checks `isVerified` status. If false, claim is denied.
    -   **If Unlocked**: Claim is processed, saved to DB, and user is redirected to Dashboard to see the new tool.

## 🔐 Authentication & Authorization Strategy

-   **JWT (JSON Web Tokens)**: Used for stateless authentication.
    -   **Frontend**: Stores token in `localStorage` (for this MVP phase) and attaches it to `x-auth-token` header for every protected API call.
    -   **Backend**: `middleware/auth.js` verifies the token signature using `JWT_SECRET`.
-   **Password Security**: using `bcryptjs` to hash passwords before saving to MongoDB. Passwords are never stored in plain text.
-   **RBAC (Role-Based Access Control)**:
    -   **Standard Users**: Can claim public deals.
    -   **Verified Users**: Can unlock "Premium/Locked" deals (controlled by `isVerified` flag in DB).

## ⚡ Internal Flow of Claiming a Deal

1.  **Frontend Action**: User clicks `Claim` -> `handleClaim()` in `deals/page.tsx` is triggered.
2.  **API Request**: `POST /api/claims/:dealId` sent with Auth Header.
3.  **Backend Validation**:
    -   Verifies Token.
    -   Checks if Deal exists.
    -   Checks if User has *already* claimed this deal (idempotency/duplicate prevention).
    -   Checks if Deal is `isLocked` and if User is `!isVerified`.
4.  **Database Transaction**: 
    -   Creates a new `Claim` document linking `UserId` and `DealId`.
5.  **Response**: Returns the created Claim object. Frontend shows success alert and redirects.

## 🔗 Frontend-Backend Interaction

-   **Architecture**: Decoupled Monorepo (Client and Server in same repo but distinctive folders).
-   **Communication**: REST API.
-   **Endpoints**:
    -   `GET /api/deals/public`: Fetches all deals (Public access).
    -   `POST /api/auth/register`: Creates user.
    -   `POST /api/auth/login`: Issues token.
    -   `POST /api/claims/:id`: Protected action.
-   **CORS**: Configured in `server.js` to allow the Next.js frontend to communicate with the Express backend.

## ⚠️ Known Limitations & Weak Points

1.  **Token Storage**: Currently using `localStorage` for JWTs. This is susceptible to XSS attacks (if an attacker can run JS on the page, they can steal the token).
    -   *Mitigation*: Move to HttpOnly Cookies for production.
2.  **Email Verification**: The `isVerified` flag is currently manual. There is no actual email loop (sending a magic link/code) to verify ownership of the email.
3.  **Scalability**: The "Total Savings" is currently a mock calculation or based on a fixed value. It needs to parse actual currency values from deal documents.
4.  **Error Handling**: Basic alerts (`window.alert`) are used on the frontend. A toast notification system (like `sonner` or `react-hot-toast`) would provide a better UX.

## 🚀 Improvements Required for Production Readiness

1.  **Security Hardening**:
    -   Implement **HttpOnly Cookies** for Auth.
    -   Add **Rate Limiting** (prevent brute force on Login).
    -   Use **Zod** for strict backend input validation.
2.  **Features**:
    -   **Admin Panel**: UI to add/edit deals and verify users.
    -   **Email Service**: Integrate SendGrid/Resend for welcome emails and password resets.
3.  **Infrastructure**:
    -   Dockerize the application for easier deployment.
    -   Set up CI/CD pipelines (GitHub Actions).

## 🎨 UI & Performance Considerations

-   **Glassmorphism**: Heavy use of `backdrop-filter: blur()`. While beautiful, this can be performance-intensive on mobile devices.
    -   *Optimization*: Use simple transparency fallbacks for low-power mode if needed.
-   **Images**: Currently using standard `<img>` tags.
    -   *Upgrade*: Switch to `next/image` for automatic resizing, lazy loading, and WebP conversion to improve LCP (Largest Contentful Paint).
-   **Tailwind CSS**: Using **v3** for stability. The dark mode color palette is defined in `globals.css` variable tokens for easy theming updates.
