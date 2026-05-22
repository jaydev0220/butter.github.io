# `/join` Page Markdown Design Plan for AI Agent

## Objective

Create a `/join` page that appears after the user clicks the CTA labeled **Start Learning**. The page must guide visitors through the required onboarding flow to become a learner in the community.

The page is not a standalone marketing website. It must be implemented as a route-level page under the existing site pathname:

```text
/join
```

Do not add a custom global navbar, logo, footer, or separate site shell unless the existing app layout already provides them.

## Source Content

Use the uploaded joining instructions as the source of truth for copy and sequence.

The page must communicate:

- Welcome message for joining the community
- Four required joining steps
- Other learning/community resources
- FAQ items
- Required links as placeholders until real URLs are supplied

## Page Type

- Route: `/join`
- Language: Traditional Chinese
- Intended user action: complete a sequential onboarding checklist
- Tone: clear, instructional, low-friction
- Layout style: warm editorial checklist with cards
- Design system: use existing workspace color tokens only

## Color Token Policy

Do not hardcode literal color values.

Use only existing tokens from the workspace. Do not use hex, RGB, HSL, named browser colors, or ad hoc opacity colors unless the app design system already exposes them as semantic tokens.

### Token Usage Map

| UI Element                               | Token                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| Page background                          | `--color-bg-page`                                                                |
| Primary surface cards                    | `--color-bg-surface`                                                             |
| Card borders                             | `--color-border`                                                                 |
| Emphasized borders                       | `--color-border-strong`                                                          |
| Header surface gradient start            | `--color-bg-surface`                                                             |
| Header surface gradient end              | `--color-gold-tint`                                                              |
| Primary headings                         | `--color-indigo-darkest`                                                         |
| Body text                                | `--color-text-primary`                                                           |
| Secondary text                           | `--color-text-secondary`                                                         |
| Muted helper text                        | `--color-text-muted`                                                             |
| Primary action background                | `--color-indigo`                                                                 |
| Primary action hover background          | `--color-indigo-accent`                                                          |
| Primary action text                      | semantic inverse text token, or the existing app token for text on dark surfaces |
| Step number background                   | `--color-gold-tint`                                                              |
| Step number border                       | `--color-gold-light`                                                             |
| Step number text                         | `--color-gold-text`                                                              |
| Invite code pill background              | `--color-gold-tint`                                                              |
| Invite code pill border                  | `--color-gold`                                                                   |
| Invite code pill text                    | `--color-gold-text`                                                              |
| Resource label background                | `--color-indigo-tint`                                                            |
| Resource label text                      | `--color-indigo`                                                                 |
| Checkbox checked state                   | `--color-gain-text`                                                              |
| Checkbox unchecked background            | `--color-bg-page`                                                                |
| Checkbox disabled background             | `--color-bg-surface`                                                             |
| Progress bar track                       | `--color-bg-page`                                                                |
| Progress bar fill                        | gradient from `--color-gold` to `--color-indigo-accent`                          |
| FAQ plus icon                            | `--color-gold-text`                                                              |
| Toast background                         | `--color-indigo-darkest`                                                         |
| Toast text                               | semantic inverse text token, or the existing app token for text on dark surfaces |
| Error or warning message, if added later | `--color-rose` or `--color-loss-text`                                            |
| Success message, if added later          | `--color-gain-text`                                                              |

## Layout Structure

The page should be implemented as a scoped page container:

```text
main.join-page[data-route="/join"]
```

All page-specific classes should be prefixed with `join-` to reduce CSS conflicts inside the existing app.

### Top-Level Sections

1. Page header
2. Joining steps
3. Other resources
4. FAQ

No hero section.  
No final CTA section.  
No standalone navigation.

## Section 1: Page Header

### Purpose

Introduce the page and show checklist progress.

### Content

Heading:

```text
成為學員
```

Intro copy:

```text
歡迎加入笨錢社群。請依照以下步驟完成註冊與驗證。完成後即可開始使用社群、課程與相關學習資源。
```

### Visual Treatment

Use a compact header card, not a marketing hero.

Recommended structure:

```text
header.join-page-header
  h1
  p
  progress component
```

### Styling

- Background: gradient from `--color-bg-surface` to `--color-gold-tint`
- Border: `--color-border`
- Heading: `--color-indigo-darkest`
- Body copy: `--color-text-secondary`
- Rounded corners: large page-card radius
- Shadow: subtle warm card shadow using existing app elevation token if available

## Section 2: Joining Steps

### Purpose

Provide a sequential checklist. The visitor should complete steps in order.

### Section Heading

```text
加入流程
```

Helper copy:

```text
請按照順序完成。後續步驟會在前一步勾選後解鎖。
```

### Required Interaction

The checklist must enforce sequence.

Behavior:

1. Step 1 checkbox is enabled on page load.
2. Step 2 checkbox is disabled until Step 1 is checked.
3. Step 3 checkbox is disabled until Step 2 is checked.
4. Step 4 checkbox is disabled until Step 3 is checked.
5. If a previous step is unchecked, all later steps must become unchecked and disabled.
6. When a step is checked, the page auto-scrolls to the next step.
7. When Step 4 is checked, the page auto-scrolls to the Other Resources section.

### Progress Component

Display a progress indicator in the header.

Required text:

```text
0 / 4 完成
0%
```

The values must update dynamically as checkboxes are completed.

Progress calculation:

```text
completedSteps / totalSteps
```

Progress fill width:

```text
completedSteps divided by totalSteps, expressed as percentage
```

### Step Card Component

Each step should be a card.

Recommended structure:

```text
article.join-card
  div.join-step-index
  div.join-step-content
    h3
    p
    optional actions
    optional note block
  label.join-check
    input[type="checkbox"]
    text: 已完成
```

### Step Card Styling

| Element               | Token                                            |
| --------------------- | ------------------------------------------------ |
| Card background       | `--color-bg-surface`                             |
| Card border           | `--color-border`                                 |
| Locked card opacity   | use existing disabled opacity token if available |
| Step index background | `--color-gold-tint`                              |
| Step index border     | `--color-gold-light`                             |
| Step index text       | `--color-gold-text`                              |
| Step heading          | `--color-text-primary`                           |
| Step body copy        | `--color-text-secondary`                         |
| Note block background | `--color-bg-page`                                |
| Note block border     | `--color-border`                                 |
| Note block text       | `--color-text-secondary`                         |

### Step 1: Register New Bybit Account

Title:

```text
註冊新的 Bybit 帳戶
```

Description:

```text
請使用指定邀請連結註冊新的 Bybit 帳戶，並確認註冊時綁定邀請碼。
```

Actions:

- Primary button: `開啟註冊連結`
- Invite code pill: `邀請碼：8TER`
- Copy button: `複製邀請碼`

Links:

```text
<affiliate_link>
```

Note block title:

```text
注意事項
```

Note items:

- 請確認註冊時綁定邀請碼：8TER。
- 建議使用尚未註冊過 Bybit 的 Email 或手機號碼。
- 若您已經有 Bybit 帳戶，請先確認是否需要進行身分轉移。

### Step 2: Complete KYC and Deposit

Title:

```text
完成 KYC 與入金
```

Description:

```text
註冊完成後，請在 Bybit 帳戶內完成必要的資格與安全設定。
```

Note block title:

```text
需完成項目
```

Ordered list:

1. KYC 身分驗證
2. 帳戶安全設定
3. 入金流程

### Step 3: Find Bybit UID

Title:

```text
查詢您的 Bybit UID
```

Description:

```text
完成註冊、KYC 與入金後，請登入 Bybit 查詢您的 UID。請確認 UID 正確，避免影響資格審核。
```

Note block title:

```text
UID 查詢方式
```

Ordered list:

1. 登入 Bybit 帳戶
2. 進入個人帳戶頁面
3. 找到 UID / User ID
4. 複製完整 UID

### Step 4: Join Discord and Leave UID

Title:

```text
加入 Discord 並留言 UID
```

Description:

```text
加入 Discord 後，到指定 UID 專區完成留言驗證。若填錯或留言錯 UID，請在 Discord UID 專區重新留言並註明。
```

Action:

- Primary button: `加入 Discord`

Link:

```text
<discord_link>
```

## Section 3: Other Resources

### Scroll Behavior

After Step 4 is checked, auto-scroll to this section.

Target section ID:

```text
join-resources-section
```

### Section Heading

```text
其他資源
```

Helper copy:

```text
完成加入流程後，可繼續使用以下公開學習資源。
```

### Layout

Use a responsive grid.

- Desktop: three equal resource cards
- Mobile: one column

### Resource Card Styling

| Element                    | Token                    |
| -------------------------- | ------------------------ |
| Section card background    | `--color-bg-surface`     |
| Resource card background   | `--color-bg-page`        |
| Card border                | `--color-border`         |
| Label background           | `--color-indigo-tint`    |
| Label text                 | `--color-indigo`         |
| Resource title             | `--color-text-primary`   |
| Resource body              | `--color-text-secondary` |
| Resource button background | `--color-bg-page`        |
| Resource button border     | `--color-border-strong`  |
| Resource button text       | `--color-text-primary`   |

### Resource 1: LINE Group

Label:

```text
Community
```

Title:

```text
笨錢社群 LINE 群
```

Description:

```text
用於接收社群通知與補充交流資訊。
```

Button:

```text
加入 LINE 群
```

Link:

```text
<line_link>
```

### Resource 2: In-Person Course

Label:

```text
Course
```

Title:

```text
實體課程報名
```

Description:

```text
查看可報名的實體課程與相關活動。
```

Button:

```text
查看報名連結
```

Link:

```text
<course_link>
```

### Resource 3: Online Course Video

Label:

```text
Video
```

Title:

```text
線上課程影片
```

Description:

```text
課程影片皆為免費且公開，可先開始學習。
```

Button:

```text
觀看課程影片
```

Link:

```text
<tut_video_link>
```

## Section 4: FAQ

### Requirement

All FAQ items must be collapsed by default.

### Section Heading

```text
常見問題
```

Helper copy:

```text
加入資格、UID 留言與 KYC / 入金狀態，是最常造成審核延遲的項目。
```

### Component Behavior

Use an accordion.

Behavior:

- Each FAQ item is collapsed on initial render.
- Clicking a question toggles only that item.
- Multiple FAQ items may remain open at the same time unless the existing design system requires single-open accordion behavior.
- `aria-expanded` must reflect open or closed state.
- The answer panel should be hidden from screen readers when closed if the framework supports it.

### FAQ Item 1

Question:

```text
我已經有 Bybit 帳戶，還可以加入嗎？
```

Answer:

```text
可以，但請先確認原帳戶是否已綁定其他邀請人。若需要轉移身分，請參考身分轉移教學影片。
```

Button:

```text
觀看身分轉移教學
```

Link:

```text
<transfer_video_link>
```

### FAQ Item 2

Question:

```text
我填錯或留言錯 UID 怎麼辦？
```

Answer:

```text
請在 Discord UID 專區重新留言並註明。建議重新複製完整 UID，避免缺漏或多輸入空格。
```

### FAQ Item 3

Question:

```text
沒有完成 KYC 或入金可以加入嗎？
```

Answer:

```text
課程影片皆為免費且公開。若您想與其他學員交流討論，您必須完成 KYC 與入金才能加入社群。
```

## Buttons and Links

### Primary Button

Use for the main external actions:

- `開啟註冊連結`
- `加入 Discord`

Token usage:

| Button Part      | Token                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| Background       | `--color-indigo`                                                           |
| Hover background | `--color-indigo-accent`                                                    |
| Text             | semantic inverse text token                                                |
| Focus ring       | use existing focus-ring token, preferably based on `--color-indigo-accent` |

### Secondary Button

Use for supporting resource links and copy actions.

Token usage:

| Button Part  | Token                                    |
| ------------ | ---------------------------------------- |
| Background   | `--color-bg-page`                        |
| Border       | `--color-border-strong`                  |
| Text         | `--color-text-primary`                   |
| Hover border | `--color-gold` or `--color-indigo-light` |

### Copy Invite Code

The `複製邀請碼` button must copy:

```text
8TER
```

After successful copy, show a toast:

```text
已複製：8TER
```

If copy fails, show:

```text
複製失敗，請手動複製
```

Toast token usage:

| Toast Part | Token                       |
| ---------- | --------------------------- |
| Background | `--color-indigo-darkest`    |
| Text       | semantic inverse text token |

## Checkbox Logic

### State Model

Each step needs:

```text
id
label
completed
enabled
```

Initial state:

```text
Step 1: enabled, not completed
Step 2: disabled, not completed
Step 3: disabled, not completed
Step 4: disabled, not completed
```

### Update Logic

When a checkbox changes:

1. Store whether the current checkbox became checked.
2. Recalculate enabled state for every step.
3. If any previous step is not completed, force later steps to unchecked and disabled.
4. Update the progress label and progress bar.
5. If the current checkbox became checked:
   - scroll to next step if not the last step
   - scroll to Other Resources if it is the last step

### Pseudocode

```text
onStepChange(stepIndex):
  wasChecked = steps[stepIndex].completed

  for each step:
    if index is 0:
      enabled = true
    else:
      enabled = previous step completed

    if not enabled:
      completed = false

  updateProgress()

  if wasChecked:
    if stepIndex is last step:
      scrollTo(otherResourcesSection)
    else:
      scrollTo(nextStep)
```

## Scroll Behavior

Use smooth scrolling if supported by the existing app.

Recommended behavior:

```text
target.scrollIntoView({
  behavior: smooth,
  block: start
})
```

Use scroll margin on resource and card sections if the app has a fixed header.

Recommended token-compatible implementation:

- Use the existing app spacing token for scroll margin.
- Do not hardcode scroll offsets unless required by the layout shell.

## Accessibility Requirements

### Semantic Structure

- Use `main` for the route page.
- Use one `h1`: `成為學員`.
- Use `h2` for major sections.
- Use `h3` for individual step and resource card titles.
- Use ordered lists where sequence matters.
- Use buttons for interactive accordion and copy actions.
- Use anchors for navigation to external URLs.

### Keyboard Support

- Checkboxes must be keyboard reachable.
- Disabled checkboxes must be visibly disabled.
- FAQ buttons must be keyboard reachable.
- Copy button must be keyboard reachable.
- Focus indicators must be visible and use an existing focus-ring token.

### ARIA

- Progress text should be in an `aria-live` region.
- FAQ buttons must update `aria-expanded`.
- FAQ answer regions should be linked to their buttons with `aria-controls` if the app component library supports it.
- Toast should use a polite live region.

## Responsive Behavior

### Desktop

- Page container max width should follow the existing site content container token.
- Step cards use three columns:
  - step index
  - content
  - checkbox
- Resource cards appear in a three-column grid.

### Tablet and Mobile

- Step cards collapse to one column.
- Checkbox appears below content and aligned to the start.
- Resource cards collapse to one column.
- Section headings stack vertically.
- Preserve readable spacing between cards.

## Implementation Notes for Framework Agents

### If Implementing in React or Next.js

Create a route-level component for `/join`.

Suggested files:

```text
app/join/page.tsx
components/join/JoinPage.tsx
components/join/JoinStepCard.tsx
components/join/JoinResourceCard.tsx
components/join/JoinFaqAccordion.tsx
```

Use client-side state for:

- Step completion
- Step locking
- Progress count
- FAQ open state
- Toast state

If the app uses server components by default, isolate interactivity in a client component.

### Suggested Data Model

```text
joinSteps = [
  {
    title: 註冊新的 Bybit 帳戶,
    description: ...,
    actions: ...,
    note: ...
  },
  {
    title: 完成 KYC 與入金,
    description: ...,
    note: ...
  },
  {
    title: 查詢您的 Bybit UID,
    description: ...,
    note: ...
  },
  {
    title: 加入 Discord 並留言 UID,
    description: ...,
    actions: ...
  }
]
```

```text
resources = [
  {
    label: Community,
    title: 笨錢社群 LINE 群,
    description: ...,
    href: <line_link>
  },
  {
    label: Course,
    title: 實體課程報名,
    description: ...,
    href: <course_link>
  },
  {
    label: Video,
    title: 線上課程影片,
    description: ...,
    href: <tut_video_link>
  }
]
```

```text
faqs = [
  {
    question: 我已經有 Bybit 帳戶，還可以加入嗎？,
    answer: ...,
    action: 觀看身分轉移教學
  },
  {
    question: 我填錯或留言錯 UID 怎麼辦？,
    answer: ...
  },
  {
    question: 沒有完成 KYC 或入金可以加入嗎？,
    answer: ...
  }
]
```

## External Link Placeholders

Keep these placeholders until real URLs are provided:

```text
<affiliate_link>
<discord_link>
<line_link>
<course_link>
<tut_video_link>
<transfer_video_link>
```

All external links should open safely according to the app’s routing and security conventions. If using standard anchors with new tabs, include the appropriate security attributes.

## Acceptance Criteria

The implementation is complete when:

- The route is available at `/join`.
- The page does not introduce a custom global site header, footer, or fake brand shell.
- The hero section is not present.
- The final CTA section is not present.
- The checklist has exactly four steps.
- Step 1 is enabled initially.
- Steps 2 through 4 are disabled initially.
- Each later step unlocks only after the previous step is checked.
- Unchecking a step disables and clears all later steps.
- Checking Steps 1 through 3 scrolls to the next step.
- Checking Step 4 scrolls to the Other Resources section.
- Progress count and percentage update correctly.
- All FAQ items are collapsed by default.
- FAQ items toggle on click.
- The invite code copy button copies `8TER`.
- No literal color values are used.
- All color styling references workspace tokens.
- The layout is responsive on mobile, tablet, and desktop.
- The page passes basic keyboard navigation and screen reader checks.
