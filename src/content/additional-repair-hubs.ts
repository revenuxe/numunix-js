import type { HubCopy } from "./repair-hub-content";

export const ADDITIONAL_REPAIR_HUBS: Record<string, HubCopy> = {
  "tv-audio-repair": {
    description:
      "TV and audio repair in Bangalore for missing pictures, sound and operating faults. Share the model, connected equipment and symptoms to discuss assessment.",
    assessmentIntro:
      "A television with sound but no picture is a different request from one with no power or an input problem. Numunix accepts TV and audio repair enquiries with the exact model, affected input or function and fault history. Describe external equipment separately. Assessment establishes the feasible scope before a panel, board or audio component is proposed.",
    faults: [
      [
        "Sound continues without a usable picture",
        "DISPLAY",
        "State whether the TV menu, startup image or any backlight is visible. Mention impact or previous panel work without pressing the screen or removing the cabinet.",
      ],
      [
        "A picture is present but sound is missing",
        "AUDIO",
        "Identify the TV speaker, connected sound system and affected source. Explain whether the same symptom occurs on another source already used; do not assume every audio issue is the internal speaker.",
      ],
      [
        "One connected input fails",
        "INPUTS",
        "Include the connected device and cable type and describe the TV menu response. Distinguish an input-specific fault from a missing image across the set.",
      ],
      [
        "The set does not start or repeatedly stops",
        "OPERATION",
        "Describe indicators, timing and any complete message. Include earlier work and stop use for electrical damage or a burning smell instead of repeatedly cycling power.",
      ],
    ],
    scope: [
      {
        title: "The TV and connected setup",
        body: "Send the full model and screen size if known, plus connected devices relevant to the complaint. Audio-only equipment needs its own model and affected function rather than a TV model by association.",
      },
      {
        title: "Handling and assessment",
        body: "Describe wall mounting and access without unmounting a heavy set yourself. Confirm visit or handover arrangements, assessment charges and whether workshop testing is needed before equipment is moved.",
      },
      {
        title: "Repair feasibility and parts",
        body: "Panel, backlight, control and audio work have different scopes. Review the findings, model-matched specifications, total estimate and relevant picture/input/sound checks before approving work.",
      },
    ],
    faqs: [
      [
        "Does no picture always require a new panel?",
        "No. Explain power, sound, menu and input behaviour. The assessment should establish the proposed repair instead of selecting a panel from the symptom alone.",
      ],
      [
        "Should I remove a wall-mounted TV?",
        "Describe the mounting and access first and confirm the arrangement. Do not unmount or carry a heavy set solely to prepare an enquiry.",
      ],
      [
        "Can I enquire about speakers or audio equipment?",
        "Share the exact audio model, connections and failed function. Confirm the actual equipment and assessment scope before assuming it is included with TV repair.",
      ],
    ],
  },
  "tablet-repair": {
    description:
      "Tablet and iPad repair in Bangalore for display, touch, battery and charging faults. Discuss the exact model, backup status, parts and assessment arrangements.",
    assessmentIntro:
      "An iPad generation or Android tablet variant determines more than the screen size. Numunix accepts tablet enquiries for damaged displays, touch, power and charging complaints. Describe the full model and what still works, including any keyboard or other accessory involved. Keep backup and account priorities separate from the physical repair request.",
    faults: [
      [
        "Touch and the displayed image behave differently",
        "DISPLAY & TOUCH",
        "Identify the affected area, frame condition and previous screen work. A cracked cover, missing image and failed touch should be described separately before a replacement assembly is chosen.",
      ],
      [
        "Battery runtime changes or the enclosure rises",
        "POWER",
        "Explain runtime and shutdowns and mention any visible swelling. Stop charging a swollen or damaged tablet and do not press the raised area to demonstrate it.",
      ],
      [
        "Charging depends on a particular accessory",
        "CHARGING",
        "Name the tablet, cable, charger and attached keyboard or hub. Include liquid exposure or connector damage without inserting tools into the port.",
      ],
      [
        "Startup or an accessory function no longer responds",
        "STARTUP & ACCESSORIES",
        "Separate the tablet's own startup from a keyboard, stylus or connection complaint. Discuss important unbacked-up data before a reset or internal work is authorized.",
      ],
    ],
    scope: [
      {
        title: "Generation and fitted functions",
        body: "Use the complete tablet model and accessible code. Identify touch, cameras, cellular or accessory features only where fitted, and confirm the proposed part and testing limitations for that device.",
      },
      {
        title: "Accounts and stored data",
        body: "Back up accessible files and keep passwords and verification codes private. Any access for testing and any data-impacting steps require a separate scope discussion; physical repair is not guaranteed file recovery.",
      },
      {
        title: "Handover and function checks",
        body: "Confirm assessment arrangements and accessories needed. Review the estimate with display, touch, charging and other reported functions, plus any written job-specific aftercare terms.",
      },
    ],
    faqs: [
      [
        "Is screen size enough to identify a replacement?",
        "No. Share the model, generation and accessible code so the panel and fitted functions can be matched to the actual tablet.",
      ],
      [
        "Will the tablet be reset?",
        "Discuss the proposed steps before approval. A reset is not automatically part of a screen enquiry; data retention still cannot be guaranteed, so back up what is accessible.",
      ],
      [
        "Should I include a keyboard or stylus?",
        "Mention accessories involved in the symptom and confirm what is needed for assessment. An accessory fault and a tablet fault may need different scopes.",
      ],
    ],
  },
  "data-recovery": {
    description:
      "Data recovery enquiries in Bangalore for unreadable drives and inaccessible files. Discuss the media, fault history, confidentiality and assessment limitations.",
    assessmentIntro:
      "A storage device that is unreadable and a computer that will not start are different starting points. Numunix accepts data recovery enquiries describing the actual media, failure history and importance of the files. Assessment determines feasible options. Repairing a device, restoring operation and recovering inaccessible data are separate outcomes; recovery cannot be promised from an enquiry.",
    faults: [
      [
        "A drive is no longer detected",
        "MEDIA",
        "Identify the drive or device and the last successful use. Mention drops, power events or prior attempts without repeatedly reconnecting damaged media to reproduce the symptom.",
      ],
      [
        "Files are inaccessible despite a detected device",
        "FILE ACCESS",
        "Describe the complete message and any known changes. Do not format or initialize the media just because software requests it when existing files matter.",
      ],
      [
        "A computer stops before files can be opened",
        "DEVICE & STORAGE",
        "Identify the computer and storage if known. Explain whether the priority is restoring the device or attempting access to files so the scopes can be discussed separately.",
      ],
      [
        "Deletion or earlier recovery attempts changed the situation",
        "HISTORY",
        "List actions already taken and stop unnecessary new writes to the affected media. Keep recovery keys private and describe encryption without sharing credentials in the enquiry.",
      ],
    ],
    scope: [
      {
        title: "Confirm the actual media and capability",
        body: "State the storage type, model if accessible and whether it is part of another device. Ask which assessment and recovery options are available for that media; specialist capability and successful recovery are not assumed.",
      },
      {
        title: "Confidentiality and priorities",
        body: "Describe the type and importance of the files without sending their contents. Discuss ownership, authorized access, encryption and the intended recovered-data destination before work.",
      },
      {
        title: "Approval and limitations",
        body: "Confirm assessment charges, proposed steps, risks and any exclusions. A recovered-file verification process and the agreed scope should be clear before the completed work is accepted.",
      },
    ],
    faqs: [
      [
        "Can every failed drive be recovered?",
        "No guarantee is made. Media condition, previous actions, encryption and available assessment options affect feasibility. Describe the actual situation before approving work.",
      ],
      [
        "Should I format a drive that asks to be initialized?",
        "Do not do so to make it usable when existing data matters. Include the message in the enquiry and discuss the preservation priority first.",
      ],
      [
        "Does a laptop repair include recovery?",
        "Not automatically. State whether restoring the laptop or accessing files is the priority, and agree separate scope and any data-impacting work.",
      ],
    ],
  },
  "console-repair": {
    description:
      "Gaming console repair enquiries in Bangalore for power, image, overheating and connection faults. Share the exact model, accessories and symptoms for assessment.",
    assessmentIntro:
      "A console with no image may still start, while a power or heat-related complaint follows a different sequence. Numunix accepts gaming-console enquiries with the model and generation, connection setup and remaining functions. Include connected accessories and earlier work. Confirm capability for the actual console before parts or software steps are proposed.",
    faults: [
      [
        "The console starts without a usable picture",
        "IMAGE",
        "Describe lights, sound and the connected display/input. Mention visible connection damage and avoid forcing cables or assuming the port is the only affected part.",
      ],
      [
        "Power stops or startup repeats",
        "STARTUP",
        "Record the console model, indicators and any message. Include power events and earlier repair history without repeated resets that could affect stored data.",
      ],
      [
        "Noise or heat interrupts play",
        "COOLING",
        "Explain the game or task and the time to shutdown. Do not continue load testing a damaged unit or open covers to locate a sound.",
      ],
      [
        "A controller or accessory will not connect",
        "CONNECTIONS",
        "Identify the controller/accessory separately from the console and state what still works. Confirm whether the enquiry concerns the accessory, console or both.",
      ],
    ],
    scope: [
      {
        title: "Generation and exact hardware",
        body: "Share the complete console model and version. Similar names and appearance do not establish component compatibility or availability for every generation.",
      },
      {
        title: "Accounts and saved content",
        body: "Keep account credentials private and state important saved-data concerns before software, storage or board work. Console repair should not be presented as guaranteed account or data recovery.",
      },
      {
        title: "The agreed test setup",
        body: "Confirm which power leads and accessories are needed at handover. Review the reported power, image, cooling or connection functions and job-specific terms with the estimate.",
      },
    ],
    faqs: [
      [
        "Do you support every console generation?",
        "Send the exact model first. Assessment feasibility and compatible parts need confirmation for the actual hardware and complaint.",
      ],
      [
        "Should I factory-reset the console?",
        "Do not reset it just to demonstrate the issue. Discuss saved data and the proposed diagnostic steps before authorizing software changes.",
      ],
      [
        "Can a controller be included?",
        "Name its model and symptoms separately and confirm accessory scope. It should not be assumed to be included in every console repair.",
      ],
    ],
  },
  "doorstep-repair": {
    description:
      "Doorstep electronics assessment enquiries in Bangalore. Share the device, locality and access details to confirm visit scope and any workshop requirements.",
    assessmentIntro:
      "A doorstep enquiry begins with the device, fault and Bangalore locality. Numunix records the requested service and contact details so assessment arrangements can be discussed. A visit request does not confirm availability or mean every repair can be completed at home. Portable-device, installed-system and workshop requirements are agreed for the actual job.",
    faults: [
      [
        "Installed equipment needs an assessment",
        "SITE",
        "Identify the device, mounting and safe access. A TV, camera system and portable computer can need different equipment and permissions, so state the complete setup.",
      ],
      [
        "A portable device may need workshop checks",
        "HANDOVER",
        "Describe what works and the suspected scope without selecting parts. Confirm collection or handover responsibilities and records before any equipment leaves your premises.",
      ],
      [
        "Several devices are affected",
        "EQUIPMENT LIST",
        "Provide models and separate symptoms and identify any shared connection or power event. A multi-item visit requires an explicit scope rather than an assumed single-device arrangement.",
      ],
      [
        "Entry or timing constraints affect the visit",
        "ACCESS",
        "Include building permissions, parking or entry instructions where relevant and preferred windows. Keep sensitive account details out of access notes.",
      ],
    ],
    scope: [
      {
        title: "Locality and availability",
        body: "Send the locality or PIN code with preferred timing. Coverage, assessment charges and availability are confirmed before a visit is agreed; this page does not promise attendance across every Bangalore area.",
      },
      {
        title: "On-site checks and workshop work",
        body: "The confirmed proposal should distinguish the checks possible at the premises from work needing workshop equipment or specialist assessment. Describe data priorities before portable devices are handed over.",
      },
      {
        title: "Equipment and approval records",
        body: "Agree the estimate approver, accessories and any transport arrangement. Retain an equipment record and confirm the function checks and written terms applicable to the approved work.",
      },
    ],
    faqs: [
      [
        "Does booking guarantee an at-home repair?",
        "No. The enquiry starts a scope and availability discussion. Some work may require a workshop; confirm arrangements before equipment is moved or a visit is agreed.",
      ],
      [
        "Which Bangalore areas are covered?",
        "Share your locality or PIN code to confirm current coverage and arrangements. A city-wide page does not establish availability for every address.",
      ],
      [
        "Is the visit free?",
        "No free-visit claim is made. Confirm any assessment, visit, transport, labour or parts charges before approving the arrangement.",
      ],
    ],
  },
  "microwave-repair": {
    description:
      "Microwave and chimney repair enquiries in Bangalore. Describe heating, control, turntable or suction faults and confirm the appliance-specific assessment scope.",
    assessmentIntro:
      "Microwave heating and a kitchen chimney's suction are distinct appliance requests. Numunix accepts enquiries for both through this service, with separate model and fault details. Explain which appliance is affected and whether earlier work changed it. Internal electrical checks and installed-equipment access belong to the agreed assessment, not a DIY preparation task.",
    faults: [
      [
        "The microwave runs without expected heating",
        "MICROWAVE HEATING",
        "Describe controls, operating mode and the observed result. Do not open the cabinet or attempt internal electrical tests; the symptom does not specify a replacement component.",
      ],
      [
        "A turntable or control function stops",
        "MICROWAVE OPERATION",
        "Name the affected microwave function and full model, with any message. Keep door and interlock mechanisms untouched and do not bypass a safety function.",
      ],
      [
        "Chimney suction or fan response changes",
        "CHIMNEY AIRFLOW",
        "Identify the chimney model, controls and whether the issue is weak extraction, no operation or a new sound. Mention cleaning history without dismantling installed equipment.",
      ],
      [
        "An installed chimney makes a new sound",
        "CHIMNEY INSTALLATION",
        "Describe the sound and operating setting and include safe access details. Confirm cleaning, duct or motor assessment scope separately rather than assuming all are included.",
      ],
    ],
    scope: [
      {
        title: "Microwave assessment",
        body: "Use the microwave's own label and describe heating, controls and any door complaint separately. Internal work requires appropriate professional assessment; do not remove covers, bypass interlocks or follow improvised internal test instructions.",
      },
      {
        title: "Chimney assessment",
        body: "Identify the fitted chimney and extraction arrangement where known, plus mounting and access. Cleaning, duct access and fault repair are different scopes that need explicit agreement for the installation.",
      },
      {
        title: "Separate equipment and estimates",
        body: "If both appliances need attention, list each model and complaint. Review the proposed parts, labour, access work, relevant checks and exclusions rather than assuming one generic kitchen-appliance service covers everything.",
      },
    ],
    faqs: [
      [
        "Should I open a microwave that does not heat?",
        "No. Leave internal electrical work and safety mechanisms to professional assessment. Include the model and safe observations in the enquiry.",
      ],
      [
        "Does chimney repair include cleaning and duct work?",
        "Only the agreed scope applies. State the actual request and access details so cleaning, installation and fault repair can be identified separately.",
      ],
      [
        "Can I enquire about both appliances?",
        "Yes. Include both models and separate symptoms. Assessment arrangements and any parts or labour are confirmed for the equipment listed.",
      ],
    ],
  },
  "inverter-ups-repair": {
    description:
      "Inverter and UPS repair enquiries in Bangalore for charging, backup, alarm and operating faults. Discuss the equipment, battery setup and assessment scope.",
    assessmentIntro:
      "An inverter that will not charge, a UPS alarm and shorter backup need distinct descriptions. Numunix accepts enquiries identifying the actual equipment, connected load and battery setup where documented. Domestic, office and specialist systems can require different capabilities. Confirm the precise scope and access before any battery or electrical work is proposed.",
    faults: [
      [
        "Backup time changes under the usual load",
        "BACKUP",
        "State the equipment, approximate runtime and connected load. Include battery age if known without assuming reduced backup means only the battery is faulty.",
      ],
      [
        "Charging indicators do not match normal operation",
        "CHARGING",
        "Photograph the complete display and identify the inverter or UPS itself. Keep battery and supply connections untouched while describing the change.",
      ],
      [
        "An alarm or shutdown recurs",
        "WARNINGS",
        "Record the full message, operating stage and any supply event. Do not bypass protection or repeatedly restart equipment showing the same fault.",
      ],
      [
        "A connection or battery area looks unsafe",
        "SAFETY",
        "Describe visible damage from a safe distance and stop unnecessary use. Do not handle exposed terminals, leaking batteries or live wiring to collect booking details.",
      ],
    ],
    scope: [
      {
        title: "The actual installation",
        body: "Identify inverter or UPS type, model and documented battery arrangement. State whether it serves domestic or office equipment and confirm specialist-system capability explicitly.",
      },
      {
        title: "A load and symptom history",
        body: "Describe which equipment is connected and what changed in charging or backup. An observed alarm, runtime and supply event help scope assessment without selecting a component first.",
      },
      {
        title: "Safe work and the estimate",
        body: "Agree access, assessment charges, battery handling and proposed specifications before work. Review relevant charging and backup checks under the confirmed scope and retain job-specific terms.",
      },
    ],
    faqs: [
      [
        "Does shorter backup always need a battery replacement?",
        "The runtime complaint needs equipment and load context. Assessment should establish the proposed remedy and compatible specification rather than assuming the battery alone is responsible.",
      ],
      [
        "Can any capacity or specialist UPS be assessed?",
        "No universal capability is stated. Share the model and installation first so the exact scope and available assessment options can be confirmed.",
      ],
      [
        "Should I disconnect the battery for the enquiry?",
        "Do not disturb terminals or wiring to prepare a booking. Describe the documented setup and visible symptoms from a safe position.",
      ],
    ],
  },
  "fan-light-repair": {
    description:
      "Fan and lighting repair enquiries in Bangalore for operation, control and fitting faults. Describe affected equipment, mounting and safe access before a visit.",
    assessmentIntro:
      "A fan control complaint and a failed light fitting can need different work. Numunix accepts fan and lighting enquiries with the affected model or fitting and what changed. Describe mounting, access and any electrical warning safely. The proposed visit should identify fault assessment, replacement or installation separately.",
    faults: [
      [
        "A fan no longer starts or responds normally",
        "FAN OPERATION",
        "Describe controls and any sound already observed, plus earlier fitting work. Keep clear of blades and electrical connections rather than testing internal components.",
      ],
      [
        "Speed control becomes intermittent",
        "CONTROLS",
        "Identify the fan and installed controller where known. Explain whether one fan or several are affected and do not assume different control types are interchangeable.",
      ],
      [
        "One light or a group stops working",
        "LIGHTING",
        "List the affected fittings and whether other lights or circuits remain available. Mention recent replacement work without removing covers or touching exposed wiring.",
      ],
      [
        "A fitting becomes noisy, loose or visibly damaged",
        "FITTINGS",
        "Describe the location from a safe position and keep clear of unstable equipment. Access and mounting work should be explicitly included before a visit is agreed.",
      ],
    ],
    scope: [
      {
        title: "Individual fans and lighting points",
        body: "Name the affected fitting, control and symptom. State whether the request is diagnosis, fitting replacement or new installation so the visit can be scoped to those tasks.",
      },
      {
        title: "Mounting and safe access",
        body: "Describe height, building restrictions and any unsafe visible condition. Do not climb, dismantle a mounted fan or handle wiring simply to identify it for the booking.",
      },
      {
        title: "Parts and wider electrical work",
        body: "Confirm compatible parts, who supplies them, assessment or visit charges and the completed function checks. Wider socket, wiring or protective-device complaints belong in a separately agreed electrical-service scope.",
      },
    ],
    faqs: [
      [
        "Is a new fitting included in every repair?",
        "No. The estimate should identify any required replacement, compatibility, supply and labour. A fault enquiry does not authorize fitting new equipment.",
      ],
      [
        "Can I include several fans or lights?",
        "List each affected item and access details. Multi-item scope, parts and any minimum or visit charges need confirmation before work.",
      ],
      [
        "What if other electrical points are also affected?",
        "Describe the wider pattern and use the electrical-service enquiry for socket, wiring or protective-device concerns. Do not inspect exposed connections yourself.",
      ],
    ],
  },
  "electrical-service": {
    description:
      "Electrical service enquiries in Bangalore for fittings, sockets and recurring operating faults. Describe the affected points and confirm safe assessment scope.",
    assessmentIntro:
      "An electrical complaint should identify the affected points and the observed sequence without asking a customer to inspect live wiring. Numunix accepts enquiries about everyday electrical fittings and operating faults. Describe trips, failed points or visible damage from a safe position. Installation type, safe access and actual capability are confirmed before work is arranged.",
    faults: [
      [
        "A socket or fitting stops working",
        "AFFECTED POINTS",
        "Identify the location and whether other points still work. Include recent installation or equipment changes without removing plates or testing exposed conductors.",
      ],
      [
        "A protective device trips repeatedly",
        "TRIPS",
        "Describe when the trip occurs and which equipment was in use. Do not bypass protection or repeatedly reset it to keep an affected circuit operating.",
      ],
      [
        "Visible damage or heat affects a connection",
        "SAFE ACCESS",
        "Keep clear of damaged equipment and describe what is visible safely. Do not handle burnt, loose or wet wiring to photograph it for the enquiry.",
      ],
      [
        "Several points are affected after earlier work",
        "FAULT HISTORY",
        "List locations, timing and the documented change. A wider pattern can need a different assessment from a single fitting replacement; agree the actual scope first.",
      ],
    ],
    scope: [
      {
        title: "An explicit electrical task",
        body: "Specify the socket, fitting, connection or observed fault. Do not assume specialist industrial, high-voltage or other equipment capability from a general electrical enquiry.",
      },
      {
        title: "Access and responsibility",
        body: "Coordinate through the person authorized to approve work and provide building or installation restrictions. Keep inspection of live or exposed components outside customer preparation.",
      },
      {
        title: "Assessment, approval and checks",
        body: "Confirm assessment and visit charges, proposed work, parts and exclusions before approval. The completed scope should identify relevant function and safety checks and any remaining limitations. Only verified qualifications or cover should be relied on.",
      },
    ],
    faqs: [
      [
        "Should I keep resetting a recurring trip?",
        "Do not bypass protection or repeatedly reset a fault to keep equipment running. Describe the sequence and arrange appropriate assessment of the actual installation.",
      ],
      [
        "Is every electrical installation covered?",
        "No universal scope is stated. Identify the installation and task so available capability and access requirements can be confirmed before work.",
      ],
      [
        "How does this differ from fan and lighting repair?",
        "The fan/lighting page focuses on individual equipment and fittings. Wider socket, connection, wiring or protective-device concerns need a clearly agreed electrical assessment.",
      ],
    ],
  },
};
