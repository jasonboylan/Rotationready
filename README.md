# Rotation Ready

Volleyball rotations and lineups for iPhone and iPad. Works offline, with no accounts and no tracking.

- **The app:** `www/index.html` (one self-contained page)
- **iOS project:** `ios/` (Capacitor wraps the page in a native iPhone/iPad app)
- **Website, privacy policy, support page:** `docs/` (served by GitHub Pages)
- **App Store text and screenshots:** `store/`
- **Cloud build:** `.github/workflows/ios-release.yml` builds the app and uploads it to App Store Connect. No Mac needed.

Bundle ID: `com.jasonboylan.rotationready`

---

## Publishing to the App Store

### 1. Turn on the website (2 minutes)

The App Store requires a privacy policy URL and a support URL. They're in `docs/`.

1. In this repo, go to **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**, **Branch** to `main`, and folder to `/docs`. Click **Save**.
3. A minute later, these pages are live:
   - https://jasonboylan.github.io/rotation-ready/
   - https://jasonboylan.github.io/rotation-ready/privacy.html
   - https://jasonboylan.github.io/rotation-ready/support.html

### 2. Join the Apple Developer Program ($99/year)

Enroll at https://developer.apple.com/programs/enroll/ with your Apple Account. Approval for individuals usually takes 1–2 days.

### 3. Register the app

1. **Bundle ID:** at https://developer.apple.com/account/resources/identifiers/list, click **+**, choose **App IDs → App**. Description: `Rotation Ready`. Bundle ID: **Explicit**, `com.jasonboylan.rotationready`. Leave every capability unchecked. Click **Register**.
2. **App record:** at https://appstoreconnect.apple.com, go to **Apps → + → New App**. Platform **iOS**, name **Rotation Ready**, language English (U.S.), the bundle ID from step 1, and SKU `rotation-ready`. This also reserves the name.

### 4. Connect the cloud build

1. **API key:** in App Store Connect, go to **Users and Access → Integrations → App Store Connect API**. Generate a **Team key** with the **Admin** role, named `GitHub build`. Note the **Key ID** and the **Issuer ID**, then **download the .p8 file**. Apple only lets you download it once.
2. **Team ID:** find it at https://developer.apple.com/account under **Membership details**. It's 10 characters.
3. **Add four secrets** in this repo under **Settings → Secrets and variables → Actions → New repository secret**:

   | Secret name | Value |
   |---|---|
   | `APPLE_TEAM_ID` | Your Team ID |
   | `ASC_KEY_ID` | The API Key ID |
   | `ASC_ISSUER_ID` | The Issuer ID |
   | `ASC_PRIVATE_KEY` | The full text of the .p8 file, including the `BEGIN` and `END` lines |

   Never commit the .p8 file to the repo.

### 5. Build and upload

1. Go to **Actions → Build and upload to App Store → Run workflow**.
2. It takes about 10–20 minutes. When it's green, the build shows up in App Store Connect under **TestFlight** after Apple processes it (another 10–30 minutes).
3. Optional but recommended: in TestFlight, add yourself as an internal tester and install the app on your iPhone and iPad with the TestFlight app.

Run the workflow again whenever the app changes. Each run gets a new build number automatically.

### 6. Fill in the listing and submit

Use `store/listing.md` for the name, subtitle, description, keywords, URLs, privacy answers and age rating. Upload the screenshots in `store/screenshots/`. Select the build from step 5, then click **Add for Review → Submit**. Review usually takes 1–3 days.

---

## Making changes

- Edit `www/index.html`. Opening it in a browser is enough to test it.
- For a new App Store release, raise the version number (`MARKETING_VERSION` in `ios/App/App.xcodeproj/project.pbxproj`, for example `1.0` → `1.1`), then run the workflow again.
- If you also post the page as a web app, change `VERSION` in `www/sw.js` so phones pick up the update.

## On a Mac (optional)

```
npm install
npx cap sync ios
npx cap open ios
```

This opens the project in Xcode so you can run it in the simulator or on a connected device.
