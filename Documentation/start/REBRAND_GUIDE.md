# Rebrand Guide

This is to guide you through the rebranding process of the application from "Initia" to your product brand.
Please follow the steps below to ensure a smooth transition.

1. **Update Application Name**:

- Change all instances of "Initia" in the codebase, documentation, and UI to your new brand name.
  - index.html
  - README.md
  - CopyRight.AppName in localization file(s) in `src/assets/locales/en.json`
- Ensure that the new name is reflected in the title tags, headers, and any branding elements.

2. **Update Logos and Icons**:

- Replace the logo files located in `src/assets/images/brand/` && in `public` with your new logo files.
- Update favicon files in the `public/` directory to match your new branding.
- Ensure that all icons used in the application reflect the new brand identity.

3. **Update Color Scheme**:

- Modify the primary and secondary colors in `src/styles/index.scss` files to align with your brand colors.
- Check for any hardcoded colors in the components and update them accordingly.

4. **Test the Application**:

- Thoroughly test the application to ensure that all branding changes are correctly implemented.
- Check for any broken links, missing images, or inconsistencies in the UI.
