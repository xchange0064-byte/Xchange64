# Madhugiri — deployment guide

A working OLX-style marketplace: browse listings, post items with photos, phone-OTP login, buyer↔seller chat.

## 1. Set up Supabase (database + login)

1. Go to supabase.com → open the `starky` project you created.
2. Go to **SQL Editor** → New query → paste everything from `supabase/schema.sql` in this folder → click **Run**.
   - If the storage bucket lines fail, go to **Storage** in the sidebar → New bucket → name it `listing-photos` → toggle **Public bucket** on.
3. Go to **Project Settings → API**. Copy:
   - `Project URL`
   - `anon public` key

## 2. Set up Twilio (for phone OTP texts)

1. Go to your Twilio console → Account → copy your **Account SID** and **Auth Token**.
2. Buy/use a Twilio phone number (the trial gives you one free number to send from).
3. In Supabase: **Authentication → Providers → Phone** → toggle it on → choose **Twilio** → paste your Account SID, Auth Token, and Twilio phone number → Save.

## 3. Add your keys to the project

In this folder, rename `.env.local.example` to `.env.local` and paste in the Supabase URL and anon key from step 1.

## 4. Push the code to GitHub

```
cd starky-app
git init
git add .
git commit -m "Starky marketplace"
```
Then go to github.com → New repository → name it `madhugiri` → follow the "push an existing repository" instructions it shows you.

## 5. Deploy on Vercel

1. Go to vercel.com → New Project → Import the `starky` GitHub repo.
2. Before deploying, expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → your Supabase anon key
3. Click **Deploy**. In about a minute you'll get a live URL like `starky.vercel.app` — that's your public site, live for everyone.

## 6. (Optional) Custom domain

In Vercel: Project → Settings → Domains → add `starky.com` (or whatever you buy) and follow the DNS instructions.

---

### Local testing (optional, before deploying)
```
npm install
npm run dev
```
Then open http://localhost:3000
