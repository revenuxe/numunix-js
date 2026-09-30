export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedAt: string; // ISO date string
  readTime: string;
  category: string;
  tags: string[];
  content: ArticleSection[];
};

export type ArticleSection = {
  heading: string;
  body: string; // supports basic HTML
};

export const ARTICLES: Article[] = [
  {
    slug: "modern-ui-ux-design-principles-website-development",
    title: "The Complete Guide to Modern UI/UX Design Principles in Website Development",
    metaTitle: "Modern UI/UX Design Principles for Website Development | Numunix",
    metaDescription:
      "Master the core principles of UI/UX design for websites. Learn visual hierarchy, color theory, mobile-first UX, accessibility, and actionable design audit workflows.",
    excerpt:
      "Great design is invisible. Bad design is everywhere. Learn the principles that separate high-converting websites from digital dead-ends.",
    author: "Numunix Team",
    publishedAt: "2026-10-01",
    readTime: "12 min read",
    category: "Design",
    tags: ["UI/UX", "Web Design", "Accessibility", "Conversion", "Mobile-First"],
    content: [
      {
        heading: "Introduction: Why Design Is a Business Decision",
        body: `<p>Every pixel on your website is either earning trust or eroding it. That's not a design opinion — it's a business fact. Studies consistently show that <strong>88% of users are less likely to return</strong> to a website after a poor experience, and it takes only <strong>50 milliseconds</strong> for a visitor to form a first impression.</p>
<p>Yet many teams still treat design as decoration — something you sprinkle on after the "real work" of development is done. The result? Websites that technically function but silently haemorrhage conversions.</p>
<p>To fix that, you need to understand two distinct but deeply connected disciplines:</p>
<ul>
<li><strong>UI (User Interface)</strong> — What it looks like. The typography, colour palette, spacing, icons, and visual hierarchy that shape the first impression.</li>
<li><strong>UX (User Experience)</strong> — How it works and feels. The user flows, information architecture, loading states, and micro-interactions that determine whether someone completes a goal or abandons your site.</li>
</ul>
<p>A beautiful interface with confusing navigation fails. A logical flow wrapped in ugly visuals fails too. Great digital products nail both — and that's exactly what this guide will help you do.</p>`
      },
      {
        heading: "Core Principles of Great UI",
        body: `<h3>Visual Hierarchy: Guiding the Eye</h3>
<p>Visual hierarchy is the art of making sure users see the <em>right things</em> in the <em>right order</em>. Without it, every element on the page screams for attention at the same volume — and your visitor hears nothing.</p>
<ul>
<li><strong>Size and scale</strong> — Larger elements draw the eye first. Your primary heading should be unmistakably the most prominent piece of text on the page.</li>
<li><strong>Contrast and colour</strong> — A blue CTA button on a neutral background pulls focus. A muted label recedes. Use contrast deliberately to create emphasis.</li>
<li><strong>Whitespace</strong> — The space <em>around</em> an element is just as important as the element itself. Generous padding signals importance and prevents cognitive overload.</li>
<li><strong>Position</strong> — Users follow predictable scan patterns (F-pattern for text-heavy pages, Z-pattern for landing pages). Place your most critical content where the eye naturally lands first.</li>
</ul>

<h3>Consistent Spacing: The Invisible Grid</h3>
<p>Amateur design reveals itself in spacing before anything else. When margins, padding, and gaps feel inconsistent, the interface looks "off" — even if users can't articulate why.</p>
<ul>
<li>Adopt a <strong>4px or 8px base unit</strong> and derive all spacing from it (8, 16, 24, 32, 48, 64…).</li>
<li>Use consistent <strong>vertical rhythm</strong> — the spacing between sections, headings, and paragraphs should follow a predictable cadence.</li>
<li>Apply the <strong>law of proximity</strong>: related items should be closer together, unrelated items farther apart. A label should be visually bound to its field, not floating equidistant between two.</li>
</ul>

<h3>Colour Theory: More Than Aesthetics</h3>
<p>Colour evokes emotion, communicates hierarchy, and drives action. A deliberately chosen palette does all three simultaneously.</p>
<ul>
<li><strong>Primary colour</strong> — Your brand signature. Use it sparingly for CTAs, active states, and key highlights.</li>
<li><strong>Neutral palette</strong> — Greys, near-blacks, and off-whites that carry 80% of your interface. These need enough contrast tiers (at least 5–6 shades) to handle backgrounds, borders, body text, and muted labels.</li>
<li><strong>Semantic colours</strong> — Green for success, amber for warnings, red for errors. Never rely on colour alone to communicate state — pair it with icons or text for accessibility.</li>
<li><strong>Contrast ratios</strong> — Body text must meet a minimum contrast ratio of 4.5:1 against its background (WCAG AA). Large text can use 3:1. Check every pairing.</li>
</ul>

<h3>Typography: The Voice of Your Interface</h3>
<p>Typography carries the majority of your content, so it's arguably the single most impactful design decision you make.</p>
<ul>
<li>Choose a <strong>clean, modern typeface</strong> with multiple weights — Inter, Outfit, DM Sans, and Geist are strong choices for digital interfaces.</li>
<li>Establish a <strong>type scale</strong> (e.g., 14 / 16 / 20 / 28 / 40 / 56px) and stick to it. Ad-hoc font sizes create visual noise.</li>
<li>Set <strong>line height</strong> between 1.4 and 1.7 for body text. Tight leading kills readability; overly loose leading breaks coherence.</li>
<li>Limit line length to <strong>55–75 characters</strong> per line. Anything wider and the eye struggles to track back to the next line.</li>
</ul>`
      },
      {
        heading: "Pillars of Seamless UX",
        body: `<h3>Intuitive User Flows</h3>
<p>An intuitive flow is one the user never notices. They arrive, they act, they leave satisfied — without ever wondering "where do I go next?"</p>
<ul>
<li><strong>Map every critical path</strong> before opening a design tool. How does a visitor go from landing page → pricing → sign-up → first value? Identify friction points in the journey, not just individual screens.</li>
<li><strong>Reduce steps</strong> — Every additional click or field is a potential drop-off. Merge screens where possible. Pre-fill data when you already have it.</li>
<li><strong>Use progressive disclosure</strong> — Show only what's needed at each stage. Don't overwhelm a first-time visitor with the complexity meant for power users.</li>
</ul>

<h3>Reducing Cognitive Load</h3>
<p>Cognitive load is the mental effort required to use your product. Lower it, and everything feels faster, easier, and more trustworthy.</p>
<ul>
<li><strong>Chunk information</strong> — Break long forms into multi-step wizards. Break long pages into clearly labelled sections.</li>
<li><strong>Use familiar patterns</strong> — A magnifying glass means search. Three horizontal lines mean menu. Don't reinvent conventions for the sake of being "creative."</li>
<li><strong>Provide clear feedback</strong> — When a user clicks a button, something should happen immediately: a loading spinner, a success message, a state change. Silence is the enemy of confidence.</li>
<li><strong>Limit choices</strong> — Hick's Law tells us that the time to make a decision increases logarithmically with the number of options. Three pricing tiers outperform seven.</li>
</ul>

<h3>Mobile-First Design</h3>
<p>Over 60% of global web traffic comes from mobile devices. Designing for desktop first and then "making it responsive" is designing backwards.</p>
<ul>
<li><strong>Start with the smallest viewport</strong> — Force yourself to prioritise content and actions when space is constrained. What truly matters when you only have 375px of width?</li>
<li><strong>Touch-friendly targets</strong> — Interactive elements should be at least 44×44px. Spacing between tappable items matters as much as their size.</li>
<li><strong>Adapt, don't just shrink</strong> — A mobile experience might need a different layout, different navigation, or even different content priority. Responsive design is about restructuring, not just reflowing.</li>
<li><strong>Performance is UX</strong> — Compress images, lazy-load below-the-fold content, and minimise blocking scripts. A beautiful page that takes 6 seconds to load is a page most mobile users will never see.</li>
</ul>

<h3>Micro-Interactions: Design That Feels Alive</h3>
<p>Micro-interactions are the subtle animations and responses that make a digital product feel polished and responsive — a button that depresses on click, a toggle that slides smoothly, a card that lifts on hover.</p>
<ul>
<li><strong>Provide immediate feedback</strong> — A form field that highlights when focused. A cart icon that briefly bounces when an item is added.</li>
<li><strong>Guide attention</strong> — A soft fade-in as content enters the viewport. A progress bar that shows how far through a process the user is.</li>
<li><strong>Keep it subtle</strong> — Micro-interactions should <em>support</em> the experience, not distract from it. If a user notices the animation more than the content, it's too much.</li>
<li><strong>Use consistent easing</strong> — CSS ease-out for entrances, ease-in for exits, and ease-in-out for transitions between states. Avoid linear timing — it feels mechanical and unnatural.</li>
</ul>`
      },
      {
        heading: "The Role of Accessibility (WCAG)",
        body: `<p>Accessibility is not a feature — it's a baseline. When you design accessibly, you don't just serve the 15% of the world's population with a disability. You build a better product for <em>everyone</em>.</p>
<ul>
<li><strong>Keyboard navigation</strong> — Every interactive element must be reachable and operable via keyboard alone. Test your entire flow using only Tab, Enter, and Escape.</li>
<li><strong>Screen reader support</strong> — Use semantic HTML (<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;button&gt;</code>), meaningful alt text on images, and ARIA labels only when native semantics fall short.</li>
<li><strong>Colour and contrast</strong> — Never use colour as the <em>sole</em> indicator of state. A red error border is invisible to users with red-green colour blindness unless paired with an icon or text message.</li>
<li><strong>Focus management</strong> — When a modal opens, focus should move inside it. When it closes, focus should return to the trigger element. Broken focus traps are one of the most common accessibility failures.</li>
<li><strong>Text resizing</strong> — Your layout should remain usable when users zoom to 200%. Avoid fixed heights on text containers and use relative units (rem, em) for font sizes.</li>
<li><strong>Motion sensitivity</strong> — Respect the <code>prefers-reduced-motion</code> media query. Some users experience vertigo or nausea from parallax effects and auto-playing animations.</li>
</ul>
<p>Meeting <strong>WCAG 2.1 AA</strong> is the standard every production website should target. It's also increasingly a <strong>legal requirement</strong> in many jurisdictions — making accessibility both the right thing to do and the safe thing to do.</p>`
      },
      {
        heading: "Actionable Best Practices: A Design Audit Workflow",
        body: `<p>Whether you're building from scratch or improving an existing website, this workflow gives you a repeatable, structured process.</p>

<h3>Step 1: Define User Goals</h3>
<p>Before touching any design tool, answer: <strong>What are the top 3 things a visitor should be able to do on this site?</strong> Everything else is secondary. Write these down and keep them visible throughout the project.</p>

<h3>Step 2: Audit the Current State</h3>
<p>If you have an existing site, run a structured audit:</p>
<ul>
<li><strong>Performance</strong> — Lighthouse score, Core Web Vitals (LCP, CLS, INP).</li>
<li><strong>Accessibility</strong> — axe DevTools scan + a manual keyboard walkthrough.</li>
<li><strong>Analytics</strong> — Where do users drop off? Which pages have the highest bounce rate?</li>
<li><strong>Heuristic review</strong> — Walk through the site as a first-time visitor. Note every moment of confusion, delay, or visual friction.</li>
</ul>

<h3>Step 3: Establish the Design System</h3>
<p>Lock in your foundational tokens before designing any pages:</p>
<ul>
<li>Colour palette (primary, neutral, semantic)</li>
<li>Type scale and line heights</li>
<li>Spacing scale (base unit multipliers)</li>
<li>Border radii, shadow tiers, transition timings</li>
<li>Component library (buttons, cards, inputs, modals)</li>
</ul>

<h3>Step 4: Wireframe, Then Refine</h3>
<p>Start with low-fidelity wireframes — boxes, lines, and placeholder text. Focus on layout, content priority, and user flow. Once the structure is validated, layer in visual design: real copy, real images, your brand palette and typography.</p>

<h3>Step 5: Prototype and Test</h3>
<p>Build an interactive prototype and put it in front of real users — even just 5 people will surface the most critical usability issues. Watch where they hesitate, where they misclick, and where they express confusion.</p>

<h3>Step 6: Implement with Fidelity</h3>
<p>The gap between design and development is where quality often dies. Ensure your developers have access to the design system tokens, use component-based architecture, and treat pixel-level fidelity as a requirement — not a nice-to-have.</p>

<h3>Step 7: Measure and Iterate</h3>
<p>Launch is the beginning, not the end. Set up analytics to track your defined user goals. Run A/B tests on CTAs, headlines, and layouts. Schedule quarterly design reviews to catch drift and stagnation.</p>`
      },
      {
        heading: "Conclusion: Design Is How It Works",
        body: `<p>Steve Jobs famously said, "Design is not just what it looks like and feels like. Design is how it works." That idea remains the single best compass for anyone building digital products.</p>
<p>The principles in this guide aren't abstract theory — they're the difference between a website that converts and one that simply exists. Visual hierarchy directs attention. Consistent spacing builds trust. Intuitive flows reduce friction. Accessibility expands your audience. And a structured design workflow keeps all of it from falling apart under real-world deadlines.</p>
<p><strong>The bottom line:</strong> Every design decision is a business decision. Make it with the same rigour you'd apply to your code, your pricing, or your product roadmap. The teams that treat design as a first-class discipline don't just build better-looking products — they build products that win.</p>`
      }
    ]
  }
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
