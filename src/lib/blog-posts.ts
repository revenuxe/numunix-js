import type { StaticImageData } from "next/image";

import resSlow from "@/assets/res-slow-laptop.webp";
import resBsod from "@/assets/res-bsod.webp";
import resCctv from "@/assets/res-cctv.webp";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "callout"; tone?: "tip" | "warning"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: StaticImageData;
  keywords: string[];
  intro: string;
  blocks: BlogBlock[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
  relatedSlugs: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "laptop-running-slow",
    title: "Why Is Your Laptop Running Slow? 15 Real Fixes That Actually Work",
    seoTitle: "Laptop Running Slow? 15 Proven Fixes (2026 Guide) | Numunix",
    seoDescription:
      "Laptop suddenly slow? Learn the 15 real causes — from startup bloat to a dying battery — and the exact steps to fix each one, plus when it's time to call a technician.",
    excerpt:
      "From startup bloat to a failing hard drive — here are the 15 real reasons your laptop has slowed down, and exactly how to fix each one.",
    category: "Laptop Care",
    readTime: "9 min read",
    publishedAt: "2026-01-12",
    updatedAt: "2026-07-15",
    coverImage: resSlow,
    keywords: [
      "laptop running slow",
      "why is my laptop slow",
      "speed up laptop windows",
      "laptop slow fix",
      "laptop maintenance tips",
    ],
    intro:
      "One day your laptop opens Chrome in two seconds. A year later, the same click takes twenty, and even opening a folder feels like waiting for a kettle to boil. If that sounds familiar, you're not imagining it — and in almost every case, you don't need a new laptop to fix it. In our workshop, roughly eight out of ten \"my laptop is slow\" complaints turn out to be one of the fifteen causes below, and most of them are fixable in an afternoon, several without spending a single rupee.",
    blocks: [
      { type: "heading", text: "Start Here: A 2-Minute Diagnosis", level: 2 },
      {
        type: "paragraph",
        text: "Before you try any fix, spend two minutes finding out what's actually slowing you down. Press Ctrl+Shift+Esc to open Task Manager, click the Performance tab, and let your laptop sit idle for 30 seconds.",
      },
      {
        type: "list",
        items: [
          "CPU usage staying above 50% while idle — a background process or malware is the likely cause.",
          "Disk usage pinned at 100% — this is the single most common cause of a laptop that feels frozen, and almost always means you're still on a hard disk drive (HDD).",
          "Memory (RAM) usage above 80–90% at idle — you have too many programs starting automatically, or not enough RAM for how you use the laptop.",
          "Everything looks normal (low CPU, low disk, moderate RAM) but it's still slow — this usually points to thermal throttling or an aging battery, both covered below.",
        ],
      },
      { type: "heading", text: "Software Causes — Fix These First, They're Free", level: 2 },
      {
        type: "paragraph",
        text: "Most slowdowns build up gradually through normal use. None of the fixes below need any tools or spending, and together they recover the majority of lost speed for most people.",
      },
      {
        type: "steps",
        items: [
          {
            title: "1. Too many startup programs",
            text: "Every app you've ever installed quietly asks to launch when Windows starts. Go to Settings → Apps → Startup and disable anything you don't use daily (Skype, Spotify, printer software, game launchers). This alone can cut boot time in half.",
          },
          {
            title: "2. Browser tabs and bloated extensions",
            text: "Each open tab can use 100–300MB of RAM, and heavy extensions (ad blockers, VPNs, shopping assistants) run constantly in the background. Keep under 10 tabs open and remove extensions you haven't used this month from chrome://extensions or edge://extensions.",
          },
          {
            title: "3. Pending Windows and driver updates",
            text: "An outdated system runs its own background compatibility checks and misses performance patches. Go to Settings → Windows Update, install everything pending, and restart — don't just pause it again.",
          },
          {
            title: '4. Malware, adware and "optimiser" tools',
            text: 'Free "PC cleaner" and "driver booster" tools are one of the most common causes of a suddenly slow laptop — many run constant background scans or inject ads. Uninstall any you don\'t remember installing on purpose, then run Windows Security → Virus & threat protection → Quick scan.',
          },
          {
            title: "5. Disk almost full",
            text: "Windows needs free space to manage memory and temporary files. If your main drive is above 90% full, performance drops sharply. Delete large unused files, uninstall unused apps from Settings → Apps, and empty the Recycle Bin.",
          },
          {
            title: "6. Leftover temporary and cache files",
            text: 'Years of app caches and update leftovers pile up unseen. Press Win+R, type %temp%, select all, and delete what isn\'t in use. Then run Disk Cleanup (search for it in the Start menu) and select "Clean up system files".',
          },
          {
            title: "7. Cloud sync apps competing for resources",
            text: "OneDrive, Google Drive and Dropbox re-index and upload in the background, especially right after you add a lot of files. If a laptop is slow only after a big file transfer, this is very likely the cause — it settles down once syncing finishes.",
          },
          {
            title: "8. Visual effects and animations",
            text: 'On an older or lower-RAM laptop, Windows\' transparency and animation effects cost real performance. Search "Adjust the appearance and performance of Windows" in the Start menu and choose "Adjust for best performance".',
          },
        ],
      },
      { type: "heading", text: "Hardware Causes — Where a Technician Helps", level: 2 },
      {
        type: "paragraph",
        text: "If you've worked through the software list and the laptop is still slow, the cause is very likely physical. These are the ones we see most often on the bench, roughly in order of how common they are.",
      },
      {
        type: "steps",
        items: [
          {
            title: "9. Still running a traditional hard disk drive (HDD)",
            text: "This is, by far, the single biggest speed factor we see. An HDD reads data mechanically and simply cannot keep up with modern Windows and apps — even a brand-new HDD-based laptop feels sluggish. Replacing it with an SSD (solid-state drive) is usually the single most noticeable upgrade you can make, often cutting boot time from 2 minutes to under 20 seconds.",
          },
          {
            title: "10. Not enough RAM for your workload",
            text: "4GB is no longer enough for comfortable everyday use with a browser, office apps and background processes running together; 8GB is a realistic minimum in 2026, and 16GB is worth it if you multitask heavily. When RAM runs out, Windows swaps to disk, which is far slower.",
          },
          {
            title: "11. Dust-clogged fans and thermal throttling",
            text: "Dust builds up inside the cooling system over 1–2 years of use, trapping heat. To protect itself, the processor then deliberately slows down — this is called thermal throttling, and it feels exactly like a generally slow laptop, often worse when the laptop is warm to the touch or the fan runs loudly and continuously. A professional clean and thermal paste replacement usually fixes it completely.",
          },
          {
            title: "12. An aging battery forcing power-saving mode",
            text: "A degraded battery can cause Windows to silently apply aggressive power-saving limits, even while plugged in, to protect the failing cell. If performance improves noticeably on battery-saver-off but the laptop still lags near a certain charge percentage, battery health is worth checking.",
          },
          {
            title: "13. A drive that is starting to fail",
            text: 'Occasional freezes, apps that stop responding at random, or Windows repeatedly running "repairing disk errors" on startup can indicate a drive with early failure signs — not just a slow drive, but a dying one. This is the one case where you should back up your data immediately, rather than waiting to "see if it gets better".',
          },
        ],
      },
      { type: "heading", text: "Usage Habits That Quietly Slow You Down", level: 2 },
      {
        type: "steps",
        items: [
          {
            title: "14. Never fully restarting",
            text: "Closing the lid puts the laptop to sleep, not off — memory leaks and half-finished background tasks accumulate over weeks. Fully restart (not just sleep) at least once every few days.",
          },
          {
            title: '15. Dozens of tabs and apps left open "for later"',
            text: "It's tempting to leave 40 tabs open as a to-do list, but each one keeps using memory and, often, background network requests. Bookmark what you need and close the rest — your laptop (and battery) will thank you.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "When to stop troubleshooting and call a technician",
        text: "If Task Manager shows 100% disk usage constantly, if the laptop is more than 4–5 years old and still on an HDD, if it's hot and loud even doing light tasks, or if you've noticed repeated \"disk error\" repair screens — these point to hardware, not settings. Continuing to use a drive that's failing risks losing your files entirely, so it's worth a same-day diagnostic rather than more DIY attempts.",
      },
      { type: "heading", text: "A Quick Monthly Maintenance Checklist", level: 2 },
      {
        type: "list",
        items: [
          "Restart fully at least twice a week, not just sleep.",
          "Review Settings → Apps → Startup once a month and disable new additions.",
          "Keep at least 15–20% of your main drive free.",
          "Run Windows Update and restart when prompted, rather than deferring for weeks.",
          "Get fans cleaned professionally once a year for laptops used daily.",
          "Check battery health (Settings → System → Power & battery → Battery usage) if performance dips only on certain days.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will a factory reset make my laptop faster?",
        answer:
          "Often yes, if the slowdown is caused by accumulated software bloat, but it's a last resort — back up your files first, and try the free fixes above before wiping everything, since a reset won't help at all if the real cause is hardware.",
      },
      {
        question: "Is it normal for a laptop to slow down after 2–3 years?",
        answer:
          'Some slowdown is normal as software gets heavier, but a laptop that has become dramatically slower usually has an identifiable cause — dust buildup, a full disk, or an aging drive — rather than simply "getting old". Most of these are fixable without replacing the laptop.',
      },
      {
        question: "Does closing background apps in Task Manager help permanently?",
        answer:
          "It gives temporary relief, but the same startup programs will launch again on the next boot. Disabling them from Settings → Apps → Startup (or uninstalling ones you don't need) is the permanent fix.",
      },
      {
        question: "How much does an SSD upgrade cost and is it worth it?",
        answer:
          "For most laptops still running an HDD, an SSD upgrade is the highest-impact repair we perform — it's a one-time, moderate cost that typically makes a 5-year-old laptop feel faster than it did when new. We can assess compatibility and quote it during a free diagnostic.",
      },
      {
        question: "My laptop is slow only when the fan is running loudly. What does that mean?",
        answer:
          "That's a strong sign of thermal throttling from dust-clogged fans or dried-out thermal paste — the processor is deliberately slowing itself down to avoid overheating. A professional cleaning and thermal paste service usually resolves it fully.",
      },
      {
        question: "Can too many browser tabs really slow down the whole laptop?",
        answer:
          "Yes — each tab is effectively a small running program, and modern websites (video, chat widgets, ads) can use significant memory and CPU even sitting in the background. Keeping tab count reasonable measurably improves overall responsiveness, especially on 4–8GB RAM laptops.",
      },
    ],
    ctaHeading: "Still slow after trying these fixes?",
    ctaText:
      "Our engineers run a full diagnostic — drive health, RAM, thermal performance and battery — and give you a clear, honest recommendation the same day, with free doorstep pickup across Bengaluru.",
    ctaHref: "/services/laptop-repair",
    ctaLabel: "Book a laptop diagnostic",
    relatedSlugs: ["blue-screen-fixes"],
  },
  {
    slug: "blue-screen-fixes",
    title: "Blue Screen of Death (BSOD): How to Diagnose and Fix It Safely at Home",
    seoTitle: "Blue Screen of Death (BSOD) Fix Guide — Causes & Solutions | Numunix",
    seoDescription:
      "A clear, step-by-step guide to reading your Windows blue screen error code and fixing the most common BSOD causes — plus how to tell when it's a hardware failure.",
    excerpt:
      "A calm, step-by-step guide to reading your BSOD's stop code and fixing the eight most common Windows blue-screen errors.",
    category: "Troubleshooting",
    readTime: "10 min read",
    publishedAt: "2026-02-03",
    updatedAt: "2026-07-15",
    coverImage: resBsod,
    keywords: [
      "blue screen of death",
      "bsod fix",
      "windows stop code",
      "laptop blue screen error",
      "windows crash fix",
    ],
    intro:
      "A sudden blue screen with a sad-face emoticon can feel alarming, especially mid-work with an unsaved document open. The good news: a Blue Screen of Death (BSOD) is actually Windows protecting itself — it's an emergency stop triggered the moment the system detects an error it cannot safely recover from while running. It is rarely permanent damage on its own, and in most cases it points clearly to one identifiable cause. This guide shows you how to read what your laptop is telling you, and the exact steps to fix the most common causes.",
    blocks: [
      { type: "heading", text: "First, Read the Stop Code — Don't Skip This", level: 2 },
      {
        type: "paragraph",
        text: 'Every BSOD shows a short all-caps error name, usually below the sad face or a QR code, such as MEMORY_MANAGEMENT or IRQL_NOT_LESS_OR_EQUAL. This single line tells you far more than "it crashed" — it\'s the difference between a two-minute fix and a drive that needs replacing. If the screen disappears too fast to read, open Event Viewer (search for it in the Start menu) → Windows Logs → System, and look for a red "Error" entry around the time of the crash — the stop code will be listed there too.',
      },
      { type: "heading", text: "General Fixes That Resolve Most BSODs", level: 2 },
      {
        type: "paragraph",
        text: "Try these in order. Most crash loops are resolved by the first three steps alone.",
      },
      {
        type: "steps",
        items: [
          {
            title: "1. Undo whatever changed recently",
            text: 'BSODs very often start right after installing a new app, a Windows update, or a driver. If you can recall what changed in the last few days, uninstall it, or use System Restore (search "Create a restore point" → System Restore) to roll back to before the crashes began.',
          },
          {
            title: "2. Update — or roll back — your graphics driver",
            text: "Graphics drivers cause a large share of BSODs, especially VIDEO_TDR_FAILURE. Go to Settings → Windows Update → Advanced options → Optional updates to get the latest driver. If crashes started right after a driver update, instead go to Device Manager → Display adapters → right-click your GPU → Properties → Driver → Roll Back Driver.",
          },
          {
            title: "3. Boot into Safe Mode to confirm the cause",
            text: "Hold Shift while clicking Restart, then choose Troubleshoot → Advanced options → Startup Settings → Restart, and press 4 for Safe Mode. If the laptop runs fine in Safe Mode, the cause is almost certainly a driver or a startup app, not a hardware fault.",
          },
          {
            title: "4. Run Windows Memory Diagnostic",
            text: 'Search "Windows Memory Diagnostic" in the Start menu and choose "Restart now and check for problems." This tests your RAM directly and will flag MEMORY_MANAGEMENT-type faults caused by failing memory.',
          },
          {
            title: "5. Check the disk for errors",
            text: "Open Command Prompt as Administrator and run chkdsk /f /r, then restart when prompted (it runs before Windows loads). This catches disk-related crashes, including PAGE_FAULT_IN_NONPAGED_AREA.",
          },
          {
            title: "6. Make sure Windows itself is fully updated",
            text: "Go to Settings → Windows Update and install everything pending, including optional updates — Microsoft regularly patches known BSOD-causing bugs.",
          },
          {
            title: "7. Remove recently added hardware",
            text: "A new external SSD, RAM stick, docking station or even a USB device can trigger a BSOD if it's faulty or incompatible. Disconnect anything added recently and see if the crashes stop.",
          },
        ],
      },
      { type: "heading", text: "Common Stop Codes — What They Usually Mean", level: 2 },
      {
        type: "table",
        headers: ["Stop code", "Usually points to", "First thing to try"],
        rows: [
          [
            "IRQL_NOT_LESS_OR_EQUAL",
            "A driver (often network or graphics) accessing memory incorrectly",
            "Update or roll back the most recently changed driver",
          ],
          [
            "MEMORY_MANAGEMENT",
            "Faulty RAM or a driver mismanaging memory",
            "Run Windows Memory Diagnostic",
          ],
          [
            "KERNEL_SECURITY_CHECK_FAILURE",
            "Corrupted system files or a bad driver update",
            "Run sfc /scannow in an Administrator Command Prompt",
          ],
          [
            "CRITICAL_PROCESS_DIED",
            "A core Windows process was stopped, often by a failed update",
            "Boot into Safe Mode and uninstall the latest Windows update",
          ],
          [
            "PAGE_FAULT_IN_NONPAGED_AREA",
            "A failing or corrupted section of the drive",
            "Run chkdsk /f /r, then back up your data as a precaution",
          ],
          [
            "DPC_WATCHDOG_VIOLATION",
            "An outdated storage or chipset driver",
            "Update storage/AHCI and chipset drivers from the manufacturer's site",
          ],
          [
            "VIDEO_TDR_FAILURE",
            "The graphics driver stopped responding and was reset",
            "Reinstall the graphics driver using a clean installation option",
          ],
          [
            "WHEA_UNCORRECTABLE_ERROR",
            "A hardware fault — often CPU, RAM or motherboard-level",
            "Stop overclocking if applied; if it persists, this needs a hardware diagnostic",
          ],
        ],
      },
      { type: "heading", text: "When a BSOD Means Hardware, Not Software", level: 2 },
      {
        type: "paragraph",
        text: "A single BSOD after a bad update is usually nothing to worry about once fixed. But some patterns are a clear signal of a physical fault rather than something you can permanently fix with software:",
      },
      {
        type: "list",
        items: [
          "The exact same stop code repeats even after driver updates and a clean Safe Mode boot.",
          "Crashes happen only under load — gaming, video editing, or many browser tabs — which often points to RAM, power delivery or overheating.",
          "You see WHEA_UNCORRECTABLE_ERROR, or increasing crash frequency over a few weeks.",
          'chkdsk repeatedly reports and "fixes" errors that come back on the next scan — a sign the drive itself is physically failing.',
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Back up your data before further troubleshooting",
        text: "If BSODs are frequent, or if you suspect a failing drive, copy your important files to an external drive or cloud storage now, before attempting more fixes. Repeated crashes from a failing drive can progress to a laptop that won't boot at all, and diagnosing that stage without data loss is far harder.",
      },
    ],
    faqs: [
      {
        question: "Can a blue screen damage my laptop permanently?",
        answer:
          "The crash itself is Windows stopping safely to prevent damage, so a single BSOD rarely causes lasting harm. The risk is in the underlying cause — a failing drive or overheating component — continuing to be used unaddressed, which can cause further damage over time.",
      },
      {
        question: "Why does my laptop show a blue screen only when gaming or under heavy use?",
        answer:
          "This pattern usually points to overheating, insufficient power delivery, or memory that fails only under sustained load. A thermal check and stress test can usually confirm which it is.",
      },
      {
        question: "I don't understand the stop code — what should I do?",
        answer:
          "Note down the exact all-caps code (or take a photo before it disappears) and bring it to a technician — it lets us skip straight to targeted diagnostics instead of testing every component from scratch.",
      },
      {
        question: "Will reinstalling Windows fix a BSOD for good?",
        answer:
          "It fixes BSODs caused by corrupted system files or bad software, but not ones caused by failing RAM, drives or overheating — those will simply return after a reinstall since the underlying hardware fault is still there.",
      },
      {
        question: "How urgent is it if I keep seeing the same blue screen?",
        answer:
          "A repeating, identical stop code is worth acting on soon rather than waiting — especially disk-related codes — since it often means a component is progressively failing rather than a one-off glitch.",
      },
    ],
    ctaHeading: "Getting the same blue screen again and again?",
    ctaText:
      "Bring us the stop code (or the laptop) and we'll run a full diagnostic — RAM, drive health and thermal testing — to find the real cause, with free doorstep pickup across Bengaluru.",
    ctaHref: "/services/laptop-repair",
    ctaLabel: "Book a BSOD diagnostic",
    relatedSlugs: ["laptop-running-slow"],
  },
  {
    slug: "best-cctv-guide",
    title: "The Complete CCTV Buying Guide for Homes & Offices",
    seoTitle: "CCTV Buying Guide 2026: Cameras, Storage & Setup Explained | Numunix",
    seoDescription:
      "Everything to know before buying CCTV — resolution, camera types, wired vs wireless, storage options and how many cameras you actually need, explained simply.",
    excerpt:
      "Resolution, camera types, storage, and how many cameras you actually need — everything explained in plain language before you buy.",
    category: "Security & CCTV",
    readTime: "11 min read",
    publishedAt: "2026-03-10",
    updatedAt: "2026-07-15",
    coverImage: resCctv,
    keywords: [
      "cctv buying guide",
      "best cctv camera for home",
      "cctv installation guide",
      "how many cctv cameras do i need",
      "cctv storage nvr dvr",
    ],
    intro:
      "The most common CCTV regret we see isn't a bad camera brand — it's a system that was never planned properly. Too few cameras to cover the actual entry points, a DVR with only 7 days of storage when the footage was needed on day 10, or wireless cameras that drop out right when the Wi-Fi gets busy. This guide walks through every decision in plain language, in the order you should actually make them, so your first CCTV system is the right one.",
    blocks: [
      { type: "heading", text: "Step 1: Plan Your Coverage Before Choosing Any Camera", level: 2 },
      {
        type: "paragraph",
        text: 'Start by walking your property and listing every point someone could enter, or every area you actually need to review later — not just "more cameras is better". A camera pointed at an empty wall is a wasted channel.',
      },
      {
        type: "list",
        items: [
          "Main gate and entrance — almost always the highest priority.",
          "Parking area or two-wheeler stand.",
          "Cash counter or reception (for shops and offices).",
          "Backyard, terrace access, or any secondary entry.",
          "Warehouse aisles or stock rooms, if applicable.",
        ],
      },
      {
        type: "table",
        headers: ["Property type", "Typical camera count", "Priority zones"],
        rows: [
          ["1–2 BHK apartment", "2–4 cameras", "Main door, balcony/entry, living area"],
          ["Independent house", "4–6 cameras", "Gate, parking, front door, backyard"],
          ["Small shop or showroom", "4–6 cameras", "Entrance, cash counter, aisles, back exit"],
          [
            "Office (small-medium)",
            "6–10 cameras",
            "Entrance, reception, floor coverage, server/cash room",
          ],
          [
            "Warehouse or large business",
            "10–16+ cameras",
            "Gate, loading bay, aisles, perimeter, office block",
          ],
        ],
      },
      { type: "heading", text: "Step 2: Choose the Right Resolution", level: 2 },
      {
        type: "paragraph",
        text: "Resolution decides how much detail you'll actually see when you zoom into footage later — this matters far more for identifying a face or number plate than most people expect.",
      },
      {
        type: "list",
        items: [
          "2MP (1080p) — a reasonable minimum today; fine for general area coverage and short distances.",
          "4MP — the best value point for most homes and shops in 2026; noticeably clearer faces and plates, modest storage cost increase.",
          "8MP (4K) — worth it for wide areas viewed from a single camera, like a large gate, parking lot or warehouse floor, where you need to zoom into a small section after the fact.",
        ],
      },
      { type: "heading", text: "Step 3: Pick the Camera Type for Each Location", level: 2 },
      {
        type: "table",
        headers: ["Camera type", "Best for", "Trade-off"],
        rows: [
          [
            "Dome camera",
            "Indoor areas, reception, shop floors",
            "Discreet and vandal-resistant, but a fixed, narrower view",
          ],
          [
            "Bullet camera",
            "Entrances, gates, long-distance outdoor views",
            "Very visible (a deterrent), better range, needs weatherproofing",
          ],
          [
            "PTZ (pan-tilt-zoom)",
            "Large open areas — parking lots, warehouses",
            "Covers a wide area with one unit, but higher cost, one spot at a time unless on auto-patrol",
          ],
          [
            "Wi-Fi / smart camera",
            "Quick indoor setup, rented spaces, single rooms",
            "Easiest to install, but depends on Wi-Fi reliability and usually cloud storage fees",
          ],
        ],
      },
      { type: "heading", text: "Step 4: Wired or Wireless?", level: 2 },
      {
        type: "paragraph",
        text: "For anything beyond one or two indoor cameras, wired is the more dependable choice — no battery to recharge, no dropped connection when the router restarts, and no interference from other 2.4GHz devices. Wireless cameras are genuinely useful for renters, a single extra room, or a spot where cabling isn't possible, but they shouldn't be your only coverage for a main entrance or cash area.",
      },
      { type: "heading", text: "Step 5: Night Vision That Actually Works", level: 2 },
      {
        type: "paragraph",
        text: 'Almost all cameras claim "night vision", but range and quality vary widely. Look for a stated infrared range of at least 20–30 metres for outdoor gate/parking cameras, and consider color night vision cameras for entrances, where identifying clothing or a vehicle color matters more than for a general area camera.',
      },
      { type: "heading", text: "Step 6: Understand Your Storage Options", level: 2 },
      {
        type: "paragraph",
        text: "This is the step most first-time buyers skip, and the one that causes the most regret later — footage you need is often only discovered missing after the fact.",
      },
      {
        type: "list",
        items: [
          "DVR (with analog/HD-CVI cameras) vs NVR (with IP cameras) — NVR systems generally give sharper footage and easier remote access; DVR setups are often more budget-friendly for basic coverage.",
          "Local hard drive storage — a one-time cost, footage stays on-site, but is vulnerable if the recorder itself is stolen or damaged.",
          "Cloud storage — footage stays safe even if the recorder is tampered with, usually at a recurring subscription cost.",
          "Retention period — as a rule of thumb, more cameras and higher resolution both reduce how many days a given hard drive size will hold; ask your installer to size the drive to at least 15–30 days of footage, not just what's cheapest today.",
        ],
      },
      { type: "heading", text: "Step 7: Power — PoE Makes Installation Cleaner", level: 2 },
      {
        type: "paragraph",
        text: "Power over Ethernet (PoE) cameras carry both power and data over a single cable, which means fewer wires, fewer points of failure, and an easier installation — worth asking for specifically when you're wiring a new location from scratch.",
      },
      { type: "heading", text: "Step 8: Remote Viewing on Your Phone", level: 2 },
      {
        type: "paragraph",
        text: "Nearly every modern DVR/NVR supports a mobile app for live viewing and playback from anywhere, but the setup quality varies — a properly configured system should notify you of motion in real time and let you scrub back through footage smoothly, not just show a frozen preview.",
      },
      { type: "heading", text: "A Note on Brands", level: 2 },
      {
        type: "paragraph",
        text: "CP Plus, Hikvision and Dahua are the three brands we install most often across Bangalore homes and businesses, each with slightly different strengths in budget, image quality and app experience — read our dedicated brand pages for CP Plus CCTV installation, Hikvision CCTV installation and Dahua CCTV installation for a closer look at each, or let us recommend one based on your specific coverage plan.",
      },
      { type: "heading", text: "Budget Tiers at a Glance", level: 2 },
      {
        type: "table",
        headers: ["Tier", "Setup", "Good for"],
        rows: [
          [
            "Essential",
            "4 x 2MP dome/bullet cameras, DVR, 15-day local storage",
            "Small apartments and homes on a budget",
          ],
          [
            "Recommended",
            "6–8 x 4MP cameras (mixed dome/bullet), NVR, 30-day storage, mobile app",
            "Most homes, shops and small offices",
          ],
          [
            "Business",
            "8–16+ cameras with PTZ where needed, NVR with RAID or cloud backup",
            "Warehouses, larger offices, multi-floor businesses",
          ],
        ],
      },
      { type: "heading", text: "Installation and Maintenance Tips", level: 2 },
      {
        type: "list",
        items: [
          'Mount outdoor cameras under an eave or sunshade — direct rain exposure shortens their lifespan even on "weatherproof" models.',
          "Keep cabling inside conduit where possible; exposed cables are the most common cause of camera downtime after 1–2 monsoons.",
          "Clean camera lenses every few months — dust and cobwebs quietly ruin night footage long before they're visible in daylight.",
          "Test playback (not just the live view) every few weeks — a system can silently stop recording while the live feed still looks fine.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "A quick legal note for India",
        text: "Keep camera angles focused on your own property — avoid pointing cameras directly into a neighbour's windows or private space, and inform employees where workplace cameras are installed. This avoids privacy disputes and keeps your installation on solid legal footing.",
      },
    ],
    faqs: [
      {
        question: "How many CCTV cameras do I need for a 2BHK apartment?",
        answer:
          "Most 2BHK apartments are well covered with 2–4 cameras — the main door, the balcony or secondary entry, and the living area — rather than a camera in every room.",
      },
      {
        question: "Is wireless CCTV reliable enough for a main entrance?",
        answer:
          "Wireless is convenient for a single extra room or a rented space, but for a main gate, entrance or cash counter, wired cameras are more dependable since they aren't affected by Wi-Fi congestion or battery levels.",
      },
      {
        question: "How many days of footage should my CCTV storage hold?",
        answer:
          "We recommend sizing storage for at least 15–30 days of continuous recording, since incidents are often only noticed and reported after the fact, well past a 7-day retention window.",
      },
      {
        question: "What's the real difference between a DVR and an NVR system?",
        answer:
          "A DVR works with older analog/HD-CVI cameras and is usually more budget-friendly, while an NVR works with IP cameras and typically delivers sharper footage and smoother remote viewing — we'll recommend the right one based on your budget and coverage needs.",
      },
      {
        question: "Can I view my CCTV cameras when I'm away from home?",
        answer:
          "Yes — nearly all modern systems support a mobile app for live viewing and playback from anywhere with an internet connection; we set this up and walk you through it as part of every installation.",
      },
      {
        question: "Do I need 4K cameras, or is 2MP/4MP enough?",
        answer:
          "For most homes and shops, 4MP is the best balance of clarity and cost. 4K (8MP) is worth the extra cost mainly for wide areas — like a large gate or parking lot — where you need to zoom into a small section of a big frame after the fact.",
      },
    ],
    ctaHeading: "Ready to plan your CCTV setup?",
    ctaText:
      "Tell us about your property and we'll recommend the right cameras, storage and coverage plan — with professional installation and mobile viewing setup across Bengaluru.",
    ctaHref: "/services/cctv-installation",
    ctaLabel: "Book a CCTV consultation",
    relatedSlugs: [],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPost => Boolean(p));
}
