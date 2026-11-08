export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedAt: string; // ISO date string
  updatedAt?: string;
  cta?: { afterSection: number; title: string; body: string; label: string };
  readTime: string;
  category: string;
  tags: string[];
  highlights?: { value: string; label: string }[];
  content: ArticleSection[];
};

export type ArticleSection = {
  heading: string;
  body: string; // supports basic HTML
};

export const ARTICLES: Article[] = [
  {
    "slug": "mobile-repair-before-you-book",
    "title": "Mobile repair: before you book",
    "metaTitle": "Mobile repair: before you book | Numunix",
    "metaDescription": "A cracked screen, weak battery or charging fault needs more than a quick parts quote. Prepare your phone, describe the symptoms and know what to ask before approving work.",
    "excerpt": "A cracked screen, weak battery or charging fault needs more than a quick parts quote. Prepare your phone, describe the symptoms and know what to ask before approving work.",
    "author": "Numunix Repair Team",
    "publishedAt": "2026-11-01",
    "readTime": "6 min read",
    "category": "Electronics",
    "tags": [
      "Electronics",
      "Repair assessment",
      "Aftercare"
    ],
    "cta": {
      "afterSection": 2,
      "title": "Need a repair assessment?",
      "body": "Share the model, symptoms and location. Review the options and estimate before approving work.",
      "label": "REQUEST ASSESSMENT"
    },
    "content": [
      {
        "heading": "Start with the symptom, not a replacement part",
        "body": "<p>A phone that will not charge could have a cable, adapter, port, battery or board fault. A cracked display may still have working touch, while an intact screen can fail after impact. Tell the technician what still works, when the problem started and whether there was liquid exposure. This gives the assessment a useful starting point without assuming a particular part is responsible.</p>"
      },
      {
        "heading": "Protect your files and accounts",
        "body": "<p>Back up accessible photos, contacts and documents before handover. Remove SIM and memory cards when they are not required for testing. Do not send account passwords, bank details or one-time codes in an enquiry. Ask whether testing can happen with supervised access or a temporary account. A screen repair does not automatically include data recovery, and a device that will not start may not allow a normal backup.</p>"
      },
      {
        "heading": "Describe charging and battery behaviour",
        "body": "<p>Explain whether the phone charges only at an angle, becomes unusually hot, shuts down at a displayed charge level or loses charge while idle. Use only undamaged compatible chargers and do not continue testing a swollen battery. If there is swelling, smoke or a burning smell, stop using the device and arrange professional assessment rather than trying to open it.</p>"
      },
      {
        "heading": "Read the estimate carefully",
        "body": "<p>Ask which part is proposed, whether it is compatible with the exact model, what labour includes and whether inspection charges apply. Confirm any limitations involving display brightness, touch, camera functions or water resistance after opening. The lowest headline quote is not necessarily the lowest total cost if it excludes fitting or follow-up checks.</p>"
      },
      {
        "heading": "Check the functions at handover",
        "body": "<p>Review the repaired function alongside touch response, charging, camera, microphone and speakers where relevant. Bring the normal charger if requested. Inspect the device and confirm any accessories returned. Keep the estimate and service record so recurring symptoms can be explained accurately.</p>"
      },
      {
        "heading": "Conclusion: make a repair decision with context",
        "body": "<p>A useful repair conversation includes the exact model, damage history, data-access expectations and a written estimate. Ask for the cause to be assessed before approving parts. If repair is not practical, request an explanation rather than repeatedly trying speculative replacements.</p>"
      }
    ]
  },
  {
    "slug": "laptop-faults-repair-or-replace",
    "title": "Laptop faults: repair or replace?",
    "metaTitle": "Laptop faults: repair or replace? | Numunix",
    "metaDescription": "No power, overheating and slow storage have different causes. Use the fault, device condition and repair scope to decide what is worth doing.",
    "excerpt": "No power, overheating and slow storage have different causes. Use the fault, device condition and repair scope to decide what is worth doing.",
    "author": "Numunix Repair Team",
    "publishedAt": "2026-11-01",
    "readTime": "6 min read",
    "category": "Electronics",
    "tags": [
      "Electronics",
      "Repair assessment",
      "Aftercare"
    ],
    "cta": {
      "afterSection": 2,
      "title": "Need a repair assessment?",
      "body": "Share the model, symptoms and location. Review the options and estimate before approving work.",
      "label": "REQUEST ASSESSMENT"
    },
    "content": [
      {
        "heading": "Separate a fault from an upgrade request",
        "body": "<p>A laptop that starts slowly is different from one that shuts down under load. Note startup behaviour, fan noise, heat, battery performance and any screen or keyboard issues. Share the model and recent impact or liquid exposure. Avoid treating every slow device as a storage upgrade until existing hardware condition has been reviewed.</p>"
      },
      {
        "heading": "When power and display need assessment",
        "body": "<p>No visible picture does not always mean a broken screen. The adapter, battery, power path, display connection or board may be involved. Describe whether lights or fans start and whether an external display has already been used. Do not dismantle a damaged charger or repeatedly power on a laptop after liquid exposure.</p>"
      },
      {
        "heading": "Think about files before hardware work",
        "body": "<p>Back up important files when the laptop can still run. If storage is unreadable, stop unnecessary use and discuss recovery separately. Explain which files matter, but do not send passwords in a form. Confirm whether a repair might require storage removal, operating-system work or further access for testing.</p>"
      },
      {
        "heading": "Compare the whole repair with replacement",
        "body": "<p>Consider the assessed fault, compatible parts, overall condition, battery and screen health, and the tasks you need the laptop to perform. A practical repair can preserve a useful device, while a large repair on several failing parts may be less sensible. Ask for alternatives and an estimate that separates required repairs from optional upgrades.</p>"
      },
      {
        "heading": "Test the everyday work you rely on",
        "body": "<p>At handover, review power, charging, keyboard, display, cooling and storage recognition as relevant to the work. Ask whether intermittent faults were reproduced and under what conditions the device was tested. Record remaining limitations instead of assuming one successful startup proves every fault has gone.</p>"
      },
      {
        "heading": "Conclusion: let condition guide the decision",
        "body": "<p>Repair-versus-replacement decisions are model-specific. Bring the charger, explain the symptoms and discuss the cost before approving work. Keep optional performance upgrades separate from essential fault repair so your decision remains clear.</p>"
      }
    ]
  },
  {
    "slug": "appliance-repair-visit-checklist",
    "title": "Your appliance repair visit checklist",
    "metaTitle": "Your appliance repair visit checklist | Numunix",
    "metaDescription": "A little preparation makes washing machine, AC, refrigerator and purifier visits more useful. Gather the model, symptoms and access details before booking.",
    "excerpt": "A little preparation makes washing machine, AC, refrigerator and purifier visits more useful. Gather the model, symptoms and access details before booking.",
    "author": "Numunix Repair Team",
    "publishedAt": "2026-11-01",
    "readTime": "6 min read",
    "category": "Appliances",
    "tags": [
      "Appliances",
      "Repair assessment",
      "Aftercare"
    ],
    "cta": {
      "afterSection": 2,
      "title": "Need a repair assessment?",
      "body": "Share the model, symptoms and location. Review the options and estimate before approving work.",
      "label": "REQUEST ASSESSMENT"
    },
    "content": [
      {
        "heading": "Record the model and fault pattern",
        "body": "<p>Photograph the model label and any displayed error code if it is safe to do so. For a washer, note whether the problem occurs during filling, washing, spinning or draining. For cooling equipment, describe whether the temperature changed suddenly or gradually. A model number and a clear symptom are more useful than assuming a motor or compressor needs replacing.</p>"
      },
      {
        "heading": "Stop unsafe use",
        "body": "<p>Do not run repeated cycles with a leak or keep operating an item with a burning smell, damaged plug or exposed wiring. Avoid reaching behind a wet or visibly damaged appliance. Do not open microwave casings or handle electrical terminals. If isolation cannot be performed safely, keep people away and seek professional assistance.</p>"
      },
      {
        "heading": "Prepare access, not the internal parts",
        "body": "<p>Keep the appliance and normal service area accessible. Confirm access to indoor and outdoor AC units and describe height or location constraints before a visit. Do not move heavy equipment alone or remove covers to save inspection time. Share parking, building-entry or community access information when relevant.</p>"
      },
      {
        "heading": "Confirm visit charges and repair scope",
        "body": "<p>Ask whether the visit includes inspection only, routine service or a specific repair. Confirm labour, parts, any additional checks and whether workshop work might be needed. Domestic appliance repair does not imply service for industrial, laboratory or medical equipment. State the model and intended use before booking.</p>"
      },
      {
        "heading": "Agree on the function checks",
        "body": "<p>A washer may need drainage and cycle checks, an AC may need airflow and cooling review, and a refrigerator may need temperature observation over time. Ask which checks were performed and what follow-up behaviour to watch. Do not assume every appliance can be fully evaluated in the same amount of time.</p>"
      },
      {
        "heading": "Conclusion: keep a useful service record",
        "body": "<p>Save the fault description, agreed estimate, completed work and any applicable aftercare terms. If the symptom returns, explain whether it is identical or new. Clear records help avoid repeating the same assumptions at a later visit.</p>"
      }
    ]
  },
  {
    "slug": "choosing-a-repair-service-in-bangalore",
    "title": "Choosing a repair service in Bangalore",
    "metaTitle": "Choosing a repair service in Bangalore | Numunix",
    "metaDescription": "Choose a service around the device, assessment process and clear terms, not a headline promise. A practical guide for households and shared workspaces.",
    "excerpt": "Choose a service around the device, assessment process and clear terms, not a headline promise. A practical guide for households and shared workspaces.",
    "author": "Numunix Repair Team",
    "publishedAt": "2026-11-01",
    "readTime": "6 min read",
    "category": "Repair guidance",
    "tags": [
      "Repair guidance",
      "Repair assessment",
      "Aftercare"
    ],
    "cta": {
      "afterSection": 2,
      "title": "Need a repair assessment?",
      "body": "Share the model, symptoms and location. Review the options and estimate before approving work.",
      "label": "REQUEST ASSESSMENT"
    },
    "content": [
      {
        "heading": "Match the service to the equipment",
        "body": "<p>Phone displays, laptop boards, CCTV recorders and appliance cooling systems need different skills and checks. Ask whether the provider handles your exact device type and model. For clinics and workplaces, distinguish everyday electronics and domestic appliances from specialist medical or industrial equipment.</p>"
      },
      {
        "heading": "Ask how the fault will be assessed",
        "body": "<p>A credible assessment explains the checks needed and the limits of a symptom-only quote. Describe the model, age, damage history and what still works. For installed CCTV, share the camera count, recorder model and whether the issue affects the live picture, recording or remote view.</p>"
      },
      {
        "heading": "Understand where the work happens",
        "body": "<p>Some faults can be assessed where equipment is installed, while board repair or specialist testing may require a workshop. Ask about pickup, accessories, handover records and how any additional work is approved. Confirm service availability for your location rather than assuming every Bangalore address is covered.</p>"
      },
      {
        "heading": "Compare estimates on the same scope",
        "body": "<p>Compare inspection charges, labour, proposed parts, exclusions and testing. Ask what happens if repair is not feasible or further faults are found. Avoid comparing a parts-only figure with a full repair estimate. Parts availability and the condition of the device influence cost and timing.</p>"
      },
      {
        "heading": "Review aftercare terms before choosing",
        "body": "<p>Ask which repair or part is covered, for how long and with what exclusions. Do not assume every service carries the same warranty or free revisit. Keep the service record and contact details. A clear explanation of limitations is more useful than an unsupported guarantee.</p>"
      },
      {
        "heading": "Conclusion: choose clarity over a promise",
        "body": "<p>The best fit is a service that can assess your equipment, explain the proposed work and let you approve the scope. Share your symptoms with Numunix to discuss an appropriate assessment, without committing to a repair before the options are understood.</p>"
      }
    ]
  },
  {
    "slug": "understanding-repair-estimates",
    "title": "Understanding your repair estimate",
    "metaTitle": "Understanding your repair estimate | Numunix",
    "metaDescription": "Know what an estimate includes, why the model and fault affect cost, and which questions to ask before agreeing to repair work.",
    "excerpt": "Know what an estimate includes, why the model and fault affect cost, and which questions to ask before agreeing to repair work.",
    "author": "Numunix Repair Team",
    "publishedAt": "2026-11-01",
    "readTime": "6 min read",
    "category": "Repair guidance",
    "tags": [
      "Repair guidance",
      "Repair assessment",
      "Aftercare"
    ],
    "cta": {
      "afterSection": 2,
      "title": "Need a repair assessment?",
      "body": "Share the model, symptoms and location. Review the options and estimate before approving work.",
      "label": "REQUEST ASSESSMENT"
    },
    "content": [
      {
        "heading": "Why a symptom is not a fixed price",
        "body": "<p>A dead phone, a leaking washer or weak AC cooling can have several causes. The exact model, condition and previous repairs affect the assessment. A preliminary conversation can outline likely checks, but the final scope needs diagnosis. Do not treat an initial indication as a guaranteed total before the fault is understood.</p>"
      },
      {
        "heading": "Separate the main cost items",
        "body": "<p>Ask about inspection or visit charges, labour, compatible parts and any testing or transport charges. Confirm whether taxes are included where applicable. A clear estimate distinguishes essential work from optional maintenance or upgrades. No universal price list can cover every fault and model accurately.</p>"
      },
      {
        "heading": "Understand parts and compatibility",
        "body": "<p>Ask which part is proposed and how compatibility with the exact model is checked. For screens, batteries, pumps and control boards, different versions may affect fit or function. Discuss availability and alternatives before authorising replacement. Do not assume every spare offers identical performance or terms.</p>"
      },
      {
        "heading": "Keep additional work under your control",
        "body": "<p>If diagnosis identifies further damage, ask for the effect on cost, timing and repair feasibility. Agree the revised scope before extra work begins. An assessment should not be treated as permission for every possible replacement. Make sure the record captures what was approved.</p>"
      },
      {
        "heading": "Confirm testing and follow-up",
        "body": "<p>Ask which functions will be checked, any remaining limitations and the aftercare terms for the actual work. Some intermittent faults or temperature behaviour require observation. Record what was tested rather than relying solely on a broad statement that the item works.</p>"
      },
      {
        "heading": "Conclusion: approve a scope you understand",
        "body": "<p>A useful estimate answers what needs doing, which parts are involved, what you pay and what is excluded. If the repair is not practical, discuss alternatives. Clear questions help you decide without inventing a fixed price for an unknown fault.</p>"
      }
    ]
  }
];

export function articleBySlug(slug: string): Article | undefined { return ARTICLES.find(article => article.slug === slug); }
