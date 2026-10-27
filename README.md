# FairShift: Decent Work Platform

Prompt Wars 2026 × SRM ACM Student Chapter · **SDG 8: Decent Work and Economic Growth**

**Live demo:** https://fairshift-app-vibr.vercel.app/

Workers in construction, colleges, hospitals and factories often depend on paper registers and WhatsApp groups. Pay is unclear, overtime goes uncounted, hazards go unreported and employers can't see who is overworked. FairShift gives workers clarity and a voice, and gives employers early, actionable signals.

## Features
| Feature | Worker | Employer |
|---|---|---|
| Shift tracking | Clock in/out or add shifts | Attendance trend for the last 7 days |
| Transparent payslip | Regular pay and overtime shown with the formula, with read-aloud | Per-worker pay and editable hourly rate |
| Safety reporting | Text or voice, optional anonymity, tracking code | Review reports and set Open / In review / Resolved |
| Anonymous feedback | Rate managers and working conditions | Averages shown only after 3 or more responses |
| Skill Passport | Add skills and training | Verify skills |
| Fatigue alerts | Warning on own dashboard | Flags over 48 h in 7 days, or any shift over 10 h |
| Attrition risk | | Transparent rule-based indicator, not a prediction |

## Two interfaces, four industries
- **Worker UI** and **Employer UI**, chosen by role at sign-up, with separate permissions.
- Industries: **construction, college, hospital, factory**. Each has its own hazard categories, and the employer dashboard can filter by industry.

## Inclusivity
- English, **Hindi** and **Tamil** interface.
- Voice input for reports in all three languages (browser speech recognition).
- Read-aloud of the pay breakdown.
- Large buttons and icons. Plain HTML/CSS/JS with no framework, so it loads on low-end phones.

## Security and privacy
- Supabase Auth with **Row Level Security**: workers see only their own shifts and skills, and only employers can read reports and all profiles. The database enforces this, not the page.
- Anonymous reports store no reporter ID. Workers check status with a tracking code through a limited database function.
- Feedback has no worker ID column at all.
- All user text