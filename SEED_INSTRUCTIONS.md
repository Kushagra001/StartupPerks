# How to Seed the Production Database

Since your new production database is empty, the "Deals" page has no data to show.
I created a secure helper route to fix this instantly.

## Steps:

1.  Wait for the latest deployment to finish on Render.
2.  Open this link in your browser:
    
    **https://startup-perks-api.onrender.com/api/seed**

3.  You should see a message: `{"message": "Database seeded successfully", ...}`
4.  Go back to your app and **Refresh the Deals Page**.

The deals will appear immediately! 🚀
