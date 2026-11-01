export type CompanyPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  stats: [string, string][];
  sections: {
    label: string;
    title: string;
    accent?: string;
    body?: string;
    tone?: "light" | "dark";
    bg?: string;
    items: [string, string][];
  }[];
  ctaTitle?: string;
  ctaAccent?: string;
  ctaBody?: string;
};

export type LegalPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const APPROACH: CompanyPageData = {
  "slug": "approach",
  "label": "OUR APPROACH",
  "title": "Repair starts here. Understand the fault.",
  "accent": "Understand the fault.",
  "intro": "A useful repair begins with the model, symptoms and history. Review diagnosis, repair feasibility and the estimate before deciding how to proceed.",
  "metaTitle": "Our Approach | Numunix Repairs",
  "metaDescription": "A useful repair begins with the model, symptoms and history. Review diagnosis, repair feasibility and the estimate before deciding how to proceed.",
  "stats": [
    [
      "FIRST",
      "Symptoms"
    ],
    [
      "THEN",
      "Assessment"
    ],
    [
      "BEFORE WORK",
      "Approval"
    ],
    [
      "HANDOVER",
      "Checks"
    ]
  ],
  "sections": [
    {
      "label": "HOW WE WORK",
      "title": "Care without guesswork.",
      "items": [
        [
          "Model-specific assessment",
          "A phone charging fault, a warm fridge and a leaking washer need different checks. Share the exact model and when the symptom appears."
        ],
        [
          "Your decision matters",
          "Ask what the estimate includes, which parts are proposed and whether further testing is needed before committing."
        ],
        [
          "Practical repair options",
          "Discuss repair versus replacement, parts compatibility and whether work belongs on site or in the workshop."
        ],
        [
          "Clear handover",
          "Review the functions tested, any remaining limitations and the aftercare terms for the agreed work."
        ]
      ]
    }
  ],
  "ctaTitle": "Something not working? Let\u2019s take a look.",
  "ctaAccent": "Let\u2019s take a look.",
  "ctaBody": "Tell us the model, symptoms and location. Confirm the assessment and estimate before approving repairs."
};

export const PROCESS: CompanyPageData = {
  "slug": "process",
  "label": "REPAIR PROCESS",
  "title": "From fault to finish. One clear journey.",
  "accent": "One clear journey.",
  "intro": "Describe the problem, arrange assessment, review the estimate and approve the work. Testing and handover complete the repair conversation.",
  "metaTitle": "Repair Process | Numunix Repairs",
  "metaDescription": "Describe the problem, arrange assessment, review the estimate and approve the work. Testing and handover complete the repair conversation.",
  "stats": [
    [
      "INTAKE",
      "Model & fault"
    ],
    [
      "DIAGNOSIS",
      "Cause & scope"
    ],
    [
      "WORK",
      "Approved repairs"
    ],
    [
      "FINISH",
      "Test & handover"
    ]
  ],
  "sections": [
    {
      "label": "REPAIR STAGES",
      "title": "Every step has a purpose.",
      "items": [
        [
          "01 Describe",
          "Share the model, symptoms, fault history and location. Avoid repeated use if there is leakage, overheating or exposed wiring."
        ],
        [
          "02 Assess",
          "Inspect the relevant power, mechanical, display, cooling or connection paths. A symptom alone is not a final diagnosis."
        ],
        [
          "03 Estimate",
          "Confirm inspection charges, labour, parts, exclusions and expected timing."
        ],
        [
          "04 Approve",
          "Give permission for the agreed scope. Additional faults or parts should be discussed before extending the work."
        ],
        [
          "05 Repair",
          "The agreed repair or service is completed using compatible parts where needed."
        ],
        [
          "06 Test",
          "Review the affected functions, such as charging, recording, cooling, drainage or display output."
        ],
        [
          "07 Handover",
          "Confirm accessories, completed work, limitations and any applicable repair terms."
        ],
        [
          "08 Aftercare",
          "Keep the service record and report recurring symptoms with the original reference."
        ]
      ]
    }
  ],
  "ctaTitle": "Something not working? Let\u2019s take a look.",
  "ctaAccent": "Let\u2019s take a look.",
  "ctaBody": "Tell us the model, symptoms and location. Confirm the assessment and estimate before approving repairs."
};

export const TECHNOLOGY: CompanyPageData = {
  "slug": "technology",
  "label": "DIAGNOSTICS & TOOLS",
  "title": "The right checks. Not trial and error.",
  "accent": "Not trial and error.",
  "intro": "Different devices need different assessment methods. Our service guidance explains the power, signal, mechanical and functional checks to discuss with your technician.",
  "metaTitle": "Diagnostics & Tools | Numunix Repairs",
  "metaDescription": "Different devices need different assessment methods. Our service guidance explains the power, signal, mechanical and functional checks to discuss with your technician.",
  "stats": [
    [
      "ELECTRONICS",
      "Power & signal"
    ],
    [
      "APPLIANCES",
      "Cycle & cooling"
    ],
    [
      "PARTS",
      "Compatibility"
    ],
    [
      "FINISH",
      "Function checks"
    ]
  ],
  "sections": [
    {
      "label": "ASSESSMENT AREAS",
      "title": "Look beyond the symptom.",
      "items": [
        [
          "Power and charging",
          "Phone ports, laptop adapters, backup batteries and appliance controls need model-specific power checks."
        ],
        [
          "Display and audio",
          "Screen, backlight, touch, input and speaker checks help distinguish a panel fault from a connection or board issue."
        ],
        [
          "Cooling and airflow",
          "AC and refrigerator assessments consider airflow, temperature behaviour, seals and the cooling system."
        ],
        [
          "Water and movement",
          "Washer and purifier assessments consider supply, hoses, drainage, pumps and moving parts."
        ],
        [
          "CCTV signal and recording",
          "Camera power, cables, storage and recorder settings all affect the picture and saved footage."
        ],
        [
          "Final function checks",
          "Confirm what was tested and under which conditions before taking the device back into daily use."
        ]
      ]
    }
  ],
  "ctaTitle": "Something not working? Let\u2019s take a look.",
  "ctaAccent": "Let\u2019s take a look.",
  "ctaBody": "Tell us the model, symptoms and location. Confirm the assessment and estimate before approving repairs."
};

export const SECURITY: CompanyPageData = {
  "slug": "security",
  "label": "DEVICE & DATA CARE",
  "title": "Care for your device. Respect for your data.",
  "accent": "Respect for your data.",
  "intro": "Before repair, discuss data access, backup, safe handling and the checks the device needs. Access should be limited to what is necessary for the agreed assessment.",
  "metaTitle": "Device & Data Care | Numunix Repairs",
  "metaDescription": "Before repair, discuss data access, backup, safe handling and the checks the device needs. Access should be limited to what is necessary for the agreed assessment.",
  "stats": [
    [
      "DATA",
      "Backup first"
    ],
    [
      "ACCESS",
      "Discuss scope"
    ],
    [
      "SAFETY",
      "Stop unsafe use"
    ],
    [
      "RECORDS",
      "Keep details"
    ]
  ],
  "sections": [
    {
      "label": "BEFORE HANDOVER",
      "title": "Protect what matters.",
      "items": [
        [
          "Back up accessible files",
          "Save important photos and documents before handing over a device that still works. Data recovery is a separate assessment, not a guaranteed outcome."
        ],
        [
          "Limit account access",
          "Do not send passwords, payment details or one-time codes in an enquiry. Discuss a temporary test account or supervised access where appropriate."
        ],
        [
          "Remove personal accessories",
          "Remove SIM and memory cards if they are not needed for diagnosis. Record any accessories handed over."
        ],
        [
          "Recognise unsafe symptoms",
          "Stop using items with smoke, burning smells, battery swelling, exposed wiring or water near electrical connections. Do not open the casing yourself."
        ]
      ]
    }
  ],
  "ctaTitle": "Something not working? Let\u2019s take a look.",
  "ctaAccent": "Let\u2019s take a look.",
  "ctaBody": "Tell us the model, symptoms and location. Confirm the assessment and estimate before approving repairs."
};

export const SUPPORT: CompanyPageData = {
  "slug": "support",
  "label": "REPAIR SUPPORT",
  "title": "After the repair. Keep care close.",
  "accent": "Keep care close.",
  "intro": "Questions about completed work, recurring symptoms or routine maintenance? Share the service details, current fault and device model so the next step can be reviewed.",
  "metaTitle": "Repair Support | Numunix Repairs",
  "metaDescription": "Questions about completed work, recurring symptoms or routine maintenance? Share the service details, current fault and device model so the next step can be reviewed.",
  "stats": [
    [
      "CONTACT",
      "Service reference"
    ],
    [
      "DETAILS",
      "Model & symptoms"
    ],
    [
      "TERMS",
      "Confirm coverage"
    ],
    [
      "NEXT STEP",
      "Review scope"
    ]
  ],
  "sections": [
    {
      "label": "GETTING HELP",
      "title": "Useful details, better follow-up.",
      "items": [
        [
          "Completed repair questions",
          "Explain which function is affected and whether the symptom matches the original issue. Include the service reference if available."
        ],
        [
          "Repair terms",
          "Warranty or follow-up coverage depends on the agreed work and parts. Confirm duration, exclusions and any inspection charges in your service record."
        ],
        [
          "New or recurring faults",
          "A new symptom may need a fresh assessment. Avoid repeatedly operating a device with leaks, overheating or electrical damage."
        ],
        [
          "Maintenance planning",
          "List the devices, usage and location. Discuss suitable preventive checks and what any maintenance arrangement includes."
        ]
      ]
    }
  ],
  "ctaTitle": "Something not working? Let\u2019s take a look.",
  "ctaAccent": "Let\u2019s take a look.",
  "ctaBody": "Tell us the model, symptoms and location. Confirm the assessment and estimate before approving repairs."
};

export const COMPANY_PAGES = [APPROACH, PROCESS, TECHNOLOGY, SECURITY, SUPPORT] as const;

export const PRIVACY: LegalPageData = {
  "slug": "privacy",
  "label": "PRIVACY",
  "title": "Your information. Handled with care.",
  "accent": "Handled with care.",
  "intro": "How we use repair enquiries, service details and contact information shared through Numunix.",
  "metaTitle": "Privacy | Numunix Repairs",
  "metaDescription": "How we use repair enquiries, service details and contact information shared through Numunix.",
  "updated": "1 November 2026",
  "sections": [
    {
      "heading": "Who we are",
      "paragraphs": [
        "Numunix provides electronics and appliance repair services. This policy covers enquiries and service-related information shared through our website and contact channels."
      ]
    },
    {
      "heading": "Information you share",
      "paragraphs": [
        "Enquiries may include your name, contact details, location, device model, symptoms and service history. Do not submit passwords, payment credentials or one-time codes through the enquiry form."
      ]
    },
    {
      "heading": "Why we use it",
      "paragraphs": [
        "We use these details to respond, assess service scope, arrange visits and keep relevant service records. Standard technical information may help operate and protect the website."
      ]
    },
    {
      "heading": "Device data",
      "paragraphs": [
        "A repair enquiry does not grant unrestricted access to device data. Discuss any access needed for diagnosis separately, and back up accessible files before handover."
      ]
    },
    {
      "heading": "Sharing and retention",
      "paragraphs": [
        "Service providers may process information needed to operate contact channels or deliver the requested service. Records are kept as needed for service, legal obligations and dispute resolution. We do not sell personal information."
      ]
    },
    {
      "heading": "Your choices",
      "paragraphs": [
        "Contact hello@numunix.com to ask about access, correction or deletion, subject to applicable record-keeping obligations."
      ]
    }
  ]
};

export const TERMS: LegalPageData = {
  "slug": "terms",
  "label": "TERMS",
  "title": "Clear terms. Informed repairs.",
  "accent": "Informed repairs.",
  "intro": "General website information does not replace the assessment, estimate and service terms agreed for your repair.",
  "metaTitle": "Terms | Numunix Repairs",
  "metaDescription": "General website information does not replace the assessment, estimate and service terms agreed for your repair.",
  "updated": "1 November 2026",
  "sections": [
    {
      "heading": "Website information",
      "paragraphs": [
        "Service descriptions explain common assessment areas. They are not a guarantee that every model or fault can be repaired. Availability and scope are confirmed before booking."
      ]
    },
    {
      "heading": "Estimates and approval",
      "paragraphs": [
        "Confirm any visit or inspection charge, labour, parts, exclusions and expected timing. Work and additional scope require your approval. An enquiry alone does not confirm a booking."
      ]
    },
    {
      "heading": "Repair and replacement",
      "paragraphs": [
        "Parts availability and fault condition affect feasibility. Ask about compatible parts and alternatives when repair may not be practical."
      ]
    },
    {
      "heading": "Data and access",
      "paragraphs": [
        "Back up accessible data and disclose relevant device damage. Discuss access needed for testing rather than sending credentials through the enquiry form. Recovery outcomes cannot be guaranteed."
      ]
    },
    {
      "heading": "Testing and aftercare",
      "paragraphs": [
        "Confirm the functions tested and any remaining limitations at handover. Warranty, follow-up coverage, exclusions and charges depend on the terms agreed for the specific work."
      ]
    },
    {
      "heading": "Website use",
      "paragraphs": [
        "Do not misuse or disrupt this website. Site text and visual assets belong to Numunix or their licensors. General guidance is not a substitute for professional electrical inspection."
      ]
    },
    {
      "heading": "Contact",
      "paragraphs": [
        "Questions about service terms can be sent to hello@numunix.com."
      ]
    }
  ]
};

