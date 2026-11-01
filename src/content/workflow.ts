export type WorkflowStage = {
  slug: string;
  phase: string;
  name: string;
  category: string;
  title: string;
  accent: string;
  intro: string;
  outcome: string;
  deliverables: [string, string][];
  steps: [string, string][];
  faq: [string, string][];
};

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    "slug": "fault-intake",
    "phase": "INTAKE",
    "name": "Describe",
    "category": "REPAIR CARE",
    "title": "Your fault. A clear starting point.",
    "accent": "A clear starting point.",
    "intro": "Share the model, symptoms and service location. Describe what still works and when the fault appears.",
    "outcome": "A useful symptom record helps identify the assessment needed.",
    "deliverables": [
      [
        "Equipment and symptoms",
        "Record the model, affected functions and fault history."
      ],
      [
        "Visit details",
        "Confirm location, access and contact details for assessment."
      ],
      [
        "Initial next step",
        "Discuss the checks needed and any known assessment charges."
      ]
    ],
    "steps": [
      [
        "Describe the fault",
        "Explain when it happens and what still works."
      ],
      [
        "Share the model",
        "Include the exact equipment and relevant damage history."
      ],
      [
        "Arrange assessment",
        "Discuss location, access and inspection charges."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "fault-diagnosis",
    "phase": "ASSESS",
    "name": "Assess",
    "category": "REPAIR CARE",
    "title": "Look closer. Find the cause.",
    "accent": "Find the cause.",
    "intro": "Arrange model-specific checks rather than selecting a replacement part from a symptom alone.",
    "outcome": "The likely cause, further checks and repair feasibility are explained.",
    "deliverables": [
      [
        "Assessment findings",
        "Record observed symptoms and the checks performed."
      ],
      [
        "Likely cause",
        "Explain uncertainties and any further checks needed."
      ],
      [
        "Repair feasibility",
        "Discuss condition, repair options and parts availability."
      ]
    ],
    "steps": [
      [
        "Inspect the equipment",
        "Use model-specific power, signal, cooling or mechanical checks."
      ],
      [
        "Review the findings",
        "Explain the likely cause rather than guessing a replacement part."
      ],
      [
        "Discuss options",
        "Consider repair feasibility before preparing an estimate."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-estimate",
    "phase": "ESTIMATE",
    "name": "Estimate",
    "category": "REPAIR CARE",
    "title": "Clear costs. Informed choices.",
    "accent": "Informed choices.",
    "intro": "Review inspection charges, labour, parts and exclusions before agreeing to repairs.",
    "outcome": "An estimate separates essential work from optional service.",
    "deliverables": [
      [
        "Itemised estimate",
        "Separate inspection, labour and parts charges where available."
      ],
      [
        "Included work",
        "Describe proposed repairs and exclusions."
      ],
      [
        "Timing notes",
        "Discuss current availability and expected timing."
      ]
    ],
    "steps": [
      [
        "Set out the repair",
        "Link proposed work to the assessed fault."
      ],
      [
        "Review the costs",
        "Explain parts, labour, inspection charges and exclusions."
      ],
      [
        "Answer questions",
        "Discuss optional work and repair versus replacement."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-approval",
    "phase": "APPROVE",
    "name": "Approve",
    "category": "REPAIR CARE",
    "title": "Your device. Your decision.",
    "accent": "Your decision.",
    "intro": "Agree the repair scope before work begins. Further faults or changes need a separate conversation.",
    "outcome": "The approved work and any limitations are understood.",
    "deliverables": [
      [
        "Your decision",
        "Record whether the proposed repair is approved or declined."
      ],
      [
        "Approved work",
        "Keep the agreed repair and estimate together."
      ],
      [
        "Limitations",
        "Note exclusions and uncertainties before work begins."
      ]
    ],
    "steps": [
      [
        "Review the estimate",
        "Confirm the proposed work and charges are understood."
      ],
      [
        "Give approval",
        "Approve the agreed repair before work begins."
      ],
      [
        "Agree changes separately",
        "Discuss new findings or costs before expanding the work."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-work",
    "phase": "REPAIR",
    "name": "Repair",
    "category": "REPAIR CARE",
    "title": "The agreed work. Carefully scoped.",
    "accent": "Carefully scoped.",
    "intro": "Repair or service focuses on the assessed fault, compatible parts and the work you approved.",
    "outcome": "The agreed repair is completed or revised options are discussed.",
    "deliverables": [
      [
        "Repair record",
        "Summarise work performed against the approved repair."
      ],
      [
        "Parts information",
        "Note compatible parts used where relevant."
      ],
      [
        "Changed findings",
        "Record revised options when the original repair cannot proceed."
      ]
    ],
    "steps": [
      [
        "Follow approved work",
        "Repair the assessed fault with suitable parts where needed."
      ],
      [
        "Discuss unexpected faults",
        "Review options before completing additional work."
      ],
      [
        "Record the result",
        "Explain completed work and anything that remains unresolved."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "function-testing",
    "phase": "TEST",
    "name": "Test",
    "category": "REPAIR CARE",
    "title": "Check the function. Review the result.",
    "accent": "Review the result.",
    "intro": "Review charging, display, recording, cooling, drainage or other relevant functions after work.",
    "outcome": "Completed checks and any remaining limitations are recorded.",
    "deliverables": [
      [
        "Functions checked",
        "List post-repair checks relevant to the fault."
      ],
      [
        "Observed results",
        "Record charging, cooling, drainage, display or other test results."
      ],
      [
        "Remaining limitations",
        "Explain unresolved symptoms and functions not verified."
      ]
    ],
    "steps": [
      [
        "Choose relevant checks",
        "Match testing to the reported fault and repair."
      ],
      [
        "Test and record",
        "Check the affected functions and note the result."
      ],
      [
        "Explain limitations",
        "Identify anything that could not be verified."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-handover",
    "phase": "HANDOVER",
    "name": "Handover",
    "category": "REPAIR CARE",
    "title": "Ready to return. Clear on care.",
    "accent": "Clear on care.",
    "intro": "Review completed work, returned accessories and applicable repair terms before daily use.",
    "outcome": "You have the service details needed for future questions.",
    "deliverables": [
      [
        "Work summary",
        "Review repairs and the function checks performed."
      ],
      [
        "Returned accessories",
        "Confirm equipment and accessories being returned."
      ],
      [
        "Repair terms",
        "Keep the service reference and applicable aftercare terms."
      ]
    ],
    "steps": [
      [
        "Review completed work",
        "Explain the repair and its test results."
      ],
      [
        "Confirm returned items",
        "Check equipment and accessories against the service record."
      ],
      [
        "Discuss care",
        "Share applicable terms and maintenance advice."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-aftercare",
    "phase": "AFTERCARE",
    "name": "Aftercare",
    "category": "REPAIR CARE",
    "title": "Keep the record. Keep care close.",
    "accent": "Keep care close.",
    "intro": "Report recurring symptoms with the model and service reference. Discuss preventive care where useful.",
    "outcome": "A follow-up request starts with clear history rather than repeated guesses.",
    "deliverables": [
      [
        "Service reference",
        "Retain the repair record for future questions."
      ],
      [
        "Recurring symptoms",
        "Describe what changed and when a fault reappeared."
      ],
      [
        "Follow-up guidance",
        "Discuss the appropriate next assessment or maintenance step."
      ]
    ],
    "steps": [
      [
        "Keep the record",
        "Save your repair summary and service reference."
      ],
      [
        "Report changes",
        "Share the model and details of any recurring symptom."
      ],
      [
        "Discuss next steps",
        "Confirm follow-up assessment and applicable terms."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  }
];
export const workflowBySlug = (slug: string) => WORKFLOW_STAGES.find(stage => stage.slug === slug);
