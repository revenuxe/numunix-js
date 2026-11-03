// Enquiry and assessment guidance, separate from delivery or completed-job claims.
export const MOBILE_REPAIR_PAGE = {
  description: "Mobile repair in Bangalore for screen, battery, charging and camera faults. Compare assessment, parts, data risks and an estimate before approving phone repairs.",
  assessmentIntro: "A cracked display, a phone that will not charge or a handset that keeps restarting needs a clear account of what still works. Start with the exact model, symptoms and damage history. An assessment can then connect the findings to a proposed repair, explain the parts and limitations, and identify any risk to stored data before you approve work.",
  faults: [
    { title: "Screen replacement and touch problems", label: "DISPLAY & TOUCH", body: "Describe cracked glass, display lines, dark patches and unresponsive touch separately. Mention frame damage, earlier screen work and whether the phone still rings or vibrates. Confirm the proposed display specification, included functions and any model-specific limitations before agreeing to replacement." },
    { title: "Battery drain and unexpected shutdowns", label: "BATTERY & POWER", body: "Explain whether the phone loses charge quickly, switches off unexpectedly or has visible swelling. Include approximate age, earlier battery work and the conditions where the issue occurs. A displayed percentage is not a complete diagnosis. Stop charging a swollen or visibly damaged handset." },
    { title: "Charging port and connection faults", label: "CHARGING", body: "Mention the cable and charger used, whether a charging indicator appears and any connection damage or liquid exposure. A phone that will not charge does not automatically need a new battery or port. Do not insert metal tools into the connection or repeatedly test a wet phone." },
    { title: "Camera, microphone and speaker issues", label: "CAMERA & AUDIO", body: "Identify the affected camera or audio function and whether the problem occurs in one app, during calls or across several functions. Mention external damage and connected accessories. Use examples that do not expose private photos, conversations or personal information." },
    { title: "No start-up or repeated restarts", label: "START-UP & SOFTWARE", body: "Describe whether the phone shows a logo, vibrates, rings or responds to charging. Include damage and update history without assuming either establishes the cause. Explain backup status before any reset, software reinstallation or board work is proposed." },
    { title: "Liquid exposure and impact damage", label: "DAMAGE ASSESSMENT", body: "State what happened, when it happened and which functions still work. A damaged phone may have more than one affected area. Avoid opening it, applying improvised heat or repeatedly charging it. Ask about assessment feasibility and data priorities before approving work." },
  ],
  scope: [
    { title: "Match the exact phone and variant", body: "Send the full model, generation and accessible variant information. A brand name, colour or screen size may cover several handsets. For a foldable phone, identify the affected screen. For an imported handset, mention its region if known so parts and scope can be discussed accurately." },
    { title: "Compare the proposed part specification", body: "Ask what replacement is proposed, how it matches the model and what it includes. Confirm any limitations involving brightness, touch, cameras, biometric functions or part-related messages. Avoid treating a low advertised component price as the complete fitted repair cost." },
    { title: "Confirm assessment and handover", body: "Share your Bangalore locality or PIN code, preferred timing and whether the phone is usable. Agree how assessment and handover would work, whether an inspection charge applies and which tests are included. Availability and repair feasibility need confirmation for the model and fault." },
  ],
  privacy: [
    { title: "Back up what you can access", body: "Review accessible photos, contacts, documents and app data before handover. A phone that will not start may not allow a normal backup. Mention incomplete backups and important files before work is agreed; a screen or battery repair is not a guarantee of data recovery." },
    { title: "Keep accounts under your control", body: "Do not send passwords, OTPs, recovery codes or banking details in an enquiry. Discuss how any testing access can be supervised or handled through an appropriate model-supported privacy mode. Such a mode does not replace a backup or guarantee that no reset will be needed." },
    { title: "Approve data-impacting steps separately", body: "Ask whether software work, a reset or board replacement is proposed and what it could mean for stored files. If data preservation is the priority, state that before approving the repair. Recovery feasibility and phone repair should be discussed as distinct scopes." },
  ],
  costs: [
    { title: "Inspection and diagnosis", body: "Confirm assessment charges and what they cover. Ask which findings support the proposed repair and whether further checks are required. If the scope changes after inspection, agree how revised work and cost will be approved." },
    { title: "Parts, labour and exclusions", body: "Review the exact model, part specification, fitting and relevant function checks together. Ask whether any additional damage or separate fault is excluded. Keep the full estimate rather than relying on a component price without labour or limitations." },
    { title: "Handover and written terms", body: "Confirm any applicable labour or parts warranty, duration, exclusions and reporting process. Ask which reported functions were reviewed and what remains unresolved. Independent repair terms are separate from manufacturer or protection-plan cover." },
  ],
  journey: [
    ["Describe the phone", "Share the exact model, symptoms, damage and earlier repairs. Mention your backup status and data priorities."],
    ["Confirm assessment", "Agree handover arrangements, inspection charges and scope. The findings establish feasible repair options."],
    ["Review and approve", "Check parts, labour, limitations and exclusions. Discuss any reset or other data-impacting step before approval."],
    ["Check the handover", "Review the affected functions, completed-work details and any written repair terms. Check accounts privately."],
  ],
  preparation: [
    "Identify the full brand, model and variant. Mention an imported or folding handset where relevant.",
    "Record symptoms and damage without sharing private screen content, passwords, OTPs or account recovery codes.",
    "Back up accessible data. Explain an incomplete backup and any need to discuss data preservation before work.",
    "Agree testing and handover arrangements, and remove SIM or removable storage when appropriate for the agreed scope.",
    "Keep the charger or accessory details available if relevant. Do not repeatedly charge a swollen, wet or damaged phone.",
  ],
  faqs: [
    ["How much does mobile repair in Bangalore cost?", "The model, findings, part specification and labour determine the estimate. Confirm inspection charges, fitting, exclusions and any functionality limitations before approval. No fixed screen, battery or board-repair price is quoted on this page."],
    ["Which mobile brands can I enquire about?", "The brand cards link to dedicated pages for all 18 listed brands, including Apple, Samsung, Xiaomi, vivo, OPPO, realme, OnePlus, Motorola, Google and Ai+. For another handset, use the enquiry form. Model compatibility and parts availability must be confirmed; a brand listing does not promise support for every device."],
    ["Will my photos and other data stay on the phone?", "Data retention cannot be guaranteed. Back up accessible files and discuss incomplete backups before handover. Ask which proposed steps could affect stored data. A phone repair and data recovery are different scopes; agree your priority before a reset, software reinstallation or board work."],
    ["Do I need to share a password or OTP?", "Do not put passwords, OTPs, banking details or recovery codes in the enquiry form or WhatsApp message. Discuss testing access and how it can be supervised or handled through a model-supported privacy feature. Keep authentication under your control."],
    ["Can you replace a screen or battery on my model?", "Send the full model and describe the damage and affected functions. Ask how the proposed part is matched, its specification and any relevant feature limitations. The diagnosis and availability of suitable parts need confirmation before work is arranged."],
    ["Can I request help for a phone that will not turn on?", "Describe any response to power or charging, recent damage and backup status. Do not factory-reset the phone solely to demonstrate a fault. Assessment should establish feasible work and distinguish restoring phone operation from any data-recovery request."],
    ["Are you an authorized manufacturer service center?", "No. Numunix provides independent repair assessment. For manufacturer warranty work or official support, contact your phone brand and check existing cover before authorizing independent repair."],
    ["How long will mobile repair take?", "Timing depends on assessment, compatible parts and the checks required. Confirm the expected schedule after diagnosis. An enquiry or callback request does not establish a repair completion time."],
    ["Will the repaired phone still be water resistant?", "Do not assume its original resistance to water remains unchanged. Ask what sealing and testing, if any, are included and what limitations apply to the specific work. Follow the relevant model guidance and avoid liquid exposure."],
    ["What should I check when collecting the phone?", "Review the reported fault and relevant display, touch, charging, camera, audio or connectivity checks. Confirm any unresolved functions, part-related messages and written repair terms. Check your backup and accounts privately, and retain the receipt and work details."],
  ],
};
