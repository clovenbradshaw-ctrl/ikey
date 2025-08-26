# iKey Brand Brief - Accessibility-First Design

## Brand Overview
**Name:** iKey  
**Category:** Accessible personal information storage  
**Core Feature:** User-adjustable display sizes

## Mission
Create the most accessible personal data tool available, where every user can adjust text and button sizes to their needs.

## Critical Design Requirements

### Size Controls (MANDATORY)
- **3 Size Modes Minimum:**
  - Standard (16px base)
  - Large (20px base) 
  - Extra Large (24px base)
- **Size toggle in fixed top bar** - always visible
- **Settings persist** across sessions
- **Everything scales:** text, buttons, inputs, spacing

### Accessibility Standards
- **Touch targets:** 44x44px minimum, 60x60px in Large mode
- **Text contrast:** WCAG AAA (7:1 minimum)
- **Line spacing:** 1.5x minimum
- **Paragraph width:** 65 characters max
- **Error messages:** Never rely on color alone
- **Focus indicators:** Thick, high-contrast borders

## Primary Users
**Ages 55-85** with varying needs:
- Presbyopia (age-related vision changes)
- Arthritis (need large tap targets)
- Beginning cognitive decline (need simple flows)
- Tech-hesitant but willing
- Often set up by adult children

## Interface Principles

### ALWAYS:
- One task per screen
- Confirm buttons in same location
- Progress indicators for multi-step tasks
- "Back" button always top-left
- Auto-save everything
- Show what will happen before it happens

### NEVER:
- Tiny helper text
- Time-based actions
- Double-tap or swipe gestures
- Mystery icons without labels
- Dense information layouts
- Pop-ups that block content

## Sample Size Adjustments

**Standard Mode:**
```css
font-size: 16px;
button-height: 48px;
```

**Large Mode:**
```css
font-size: 20px;
button-height: 60px;
```

**Extra Large Mode:**
```css
font-size: 24px;
button-height: 72px;
```

## Language Simplification

**Instead of:** "Zero-knowledge encryption"  
**Say:** "Only you can read this"

**Instead of:** "Generate QR code"  
**Say:** "Create your code"

**Instead of:** "Decrypt private information"  
**Say:** "Unlock with password"

## Visual Requirements
- **Buttons:** Solid colors, not just outlines
- **Icons:** Always paired with text labels
- **Forms:** One field visible at a time if possible
- **Colors:** High contrast, colorblind-safe
- **Fonts:** System fonts only (no custom fonts)

## Testing Requirements
- Test with users 65+ before any major release
- Screen reader compatibility required
- Keyboard-only navigation must work
- Test on actual older devices (5+ year old phones)
- Pinch-to-zoom must not break layouts

## Brand Promise
iKey works for everyone. If your parent or grandparent can't use it easily with the sizing options, we've failed.

## Success Metrics
- 80%+ of users 65+ can complete setup alone
- Zero complaints about text size
- Average setup time under 5 minutes
- Support requests primarily feature questions, not usability

## Competitive Advantage
While others chase features, iKey chases clarity. The most sophisticated technology is the one anyone can use.

