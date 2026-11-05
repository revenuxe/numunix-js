import type { BrandSymptomCopy } from "./types";

export const LAPTOP_SYMPTOMS: BrandSymptomCopy = {
  hp: [
    [
      "Power lights appear but the screen stays blank",
      "Include the HP product number, fan activity and any repeated blink pattern. Separate no image from no power before discussing a display or board replacement.",
    ],
    [
      "Charging changes with the adapter connected",
      "For your HP, identify the adapter specification and whether it starts on battery alone. Keep any full charging warning with the product number.",
    ],
    [
      "Some keys or the trackpad stop responding",
      "Name the HP input functions affected and mention a spill or earlier keyboard work. For a convertible, include its position without repeatedly flexing a damaged hinge.",
    ],
    [
      "Fan noise precedes an unexpected shutdown",
      "Describe the task running on the HP and the time before it stops. Distinguish an idle shutdown from one under load without repeating stress tests.",
    ],
    [
      "A blink sequence occurs before startup",
      "Record the complete HP light or beep sequence and whether a startup screen appears. Its meaning needs the exact model context, not a shortened code from memory.",
    ],
    [
      "A hinge problem changes the display image",
      "Explain the HP hinge condition and any image change already observed. Avoid opening and closing a damaged assembly; include the product number and backup priority.",
    ],
  ],
  dell: [
    [
      "The built-in display fails while a dock is used",
      "For your Dell, distinguish the laptop screen from the dock or external monitor. Include behaviour already observed without accessories and share the Service Tag privately.",
    ],
    [
      "The laptop runs but the battery does not charge",
      "Keep the Dell adapter details, charging indication and complete warning together. Adapter operation does not establish that the battery is the only possible source of the complaint.",
    ],
    [
      "A connection fails only through the dock",
      "Identify the Dell port, accessory and connection path. Explain whether the same function works directly on the laptop before internal port repair is proposed.",
    ],
    [
      "Cooling behaviour changes with a particular workload",
      "Describe the Dell application, fan sound and any slowdown or shutdown. Include recent internal work and avoid repeated load tests on a device showing unsafe symptoms.",
    ],
    [
      "A diagnostic indication appears before Windows",
      "Send the Dell model and full light pattern or warning, separating it from an operating-system error. Discuss unbacked-up data before software or storage changes.",
    ],
    [
      "A case or hinge fault follows a drop",
      "Describe visible Dell enclosure damage and which functions remain usable. The Service Tag helps identify compatible assemblies; do not post it publicly in example photos.",
    ],
  ],
  lenovo: [
    [
      "An image changes with the lid position",
      "Identify the Lenovo machine type and model, including whether it is convertible. Describe the known position-related symptom without repeatedly bending a damaged hinge.",
    ],
    [
      "Charging differs with and without a dock",
      "Include the Lenovo charger and dock details and the charging behaviour already observed. The ThinkPad, Yoga or other family name alone does not identify compatible power parts.",
    ],
    [
      "Several keys fail after a spill",
      "Name the Lenovo keys or input area affected and when the spill occurred. Stop using a liquid-damaged device and include its full machine type before keyboard work is scoped.",
    ],
    [
      "Fan noise rises before performance drops",
      "Explain the Lenovo task, operating duration and whether it slows or shuts down. Distinguish a gaming workload from ordinary use and include prior cooling work.",
    ],
    [
      "Startup stops before the usual login screen",
      "Describe the Lenovo logo, message and remaining responses. Identify data priorities before approving a reset or storage change on the exact model.",
    ],
    [
      "A hinge or enclosure fault affects normal use",
      "For your Lenovo, describe physical movement separately from keyboard and display response. Confirm the relevant assembly and repair scope instead of ordering parts from the range name.",
    ],
  ],
  apple: [
    [
      "The MacBook display has lines after a fall",
      "Share the MacBook model, approximate year and external-display behaviour already known. Describe enclosure damage separately so a screen-only scope is not assumed.",
    ],
    [
      "Charging changes when a hub is connected",
      "Identify the MacBook charger, cable and hub involved, plus whether battery operation continues. Keep the model identifier with any charging message before parts are considered.",
    ],
    [
      "Keyboard or trackpad response changes",
      "Describe the MacBook input symptom, earlier repairs and any liquid exposure. Do not share an Apple Account password or recovery key when arranging assessment.",
    ],
    [
      "Heat or a shutdown interrupts a familiar task",
      "Include the MacBook model and processor type if known, along with the task and warning. Cooling and power requirements depend on the actual hardware.",
    ],
    [
      "The Mac starts without reaching normal operation",
      "Explain the MacBook startup sound, display and input responses. Discuss backups before software reinstallation or board work; startup repair is separate from guaranteed data access.",
    ],
    [
      "Enclosure damage affects opening or closing",
      "Show the MacBook exterior without exposing private screen content. Avoid forcing a distorted lid and ask how the proposed assembly matches the model and generation.",
    ],
  ],
  asus: [
    [
      "The image fails during one type of use",
      "For your ASUS laptop, identify the full model code and whether the fault also affects an external display already used. Separate visible panel damage from a startup or workload complaint.",
    ],
    [
      "Power changes when accessories are connected",
      "Share ASUS charger details and the accessories present when charging fails. Describe battery-only operation separately before internal power components are selected.",
    ],
    [
      "An input fault affects gaming or everyday work",
      "Name the ASUS keys, trackpad or port involved and whether the problem occurs outside the game or application. Include spills and previous keyboard work.",
    ],
    [
      "Shutdown occurs under load but browsing works",
      "Record the ASUS task, time to shutdown and fan behaviour. High-load and idle complaints need distinct descriptions; do not continue testing a device with unsafe heat or battery symptoms.",
    ],
    [
      "Startup changed after storage or cooling work",
      "Keep the ASUS earlier job details with the current screen or warning. Explain the original fault and new behaviour before approving another internal intervention.",
    ],
    [
      "A convertible hinge or case is damaged",
      "If your ASUS is convertible, describe its known position-related symptoms without forcing the hinge. Match the assembly to the complete model rather than cabinet appearance.",
    ],
  ],
  acer: [
    [
      "The screen image differs from startup behaviour",
      "Identify the complete Acer model and whether lights, fan or login sounds continue. A missing image should be described separately from a laptop with no response.",
    ],
    [
      "Battery use ends earlier than expected",
      "Describe the Acer workload, charging history and whether it still runs on its adapter. Include the charger rating before assuming a replacement battery resolves the complaint.",
    ],
    [
      "A damaged port affects one accessory",
      "Name the Acer connection and accessory involved, along with visible damage. Do not insert tools into the port; confirm the actual model and repairable assembly first.",
    ],
    [
      "Noise or temperature changes after earlier cleaning",
      "Share the Acer service date, task and current fan behaviour. Explain what improved or remained unresolved so the new inspection considers the previous work.",
    ],
    [
      "The laptop repeatedly returns to its startup screen",
      "Record the Acer sequence and last successful startup. Mention recent software or storage work and discuss important files before a reset or drive replacement is proposed.",
    ],
    [
      "A hinge crack spreads into the case",
      "For your Acer, describe the damaged corner and screen response without opening the lid repeatedly. Include the full model and ask whether the scope covers mounting damage as well.",
    ],
  ],
  msi: [
    [
      "The display fault appears during a game",
      "Share the MSI model and whether the image issue also occurs in ordinary use. Include external-display observations already available without assuming a graphics component has failed.",
    ],
    [
      "Power behaviour changes under load",
      "Keep the MSI adapter specification with the task and charging observations. Explain whether the laptop loses charge, shuts down or simply shows a warning.",
    ],
    [
      "Specific controls stop responding during use",
      "Identify the MSI keys or ports involved and whether the issue persists outside the affected application. Mention spills and accessories before selecting an input assembly.",
    ],
    [
      "Fans become loud before throttling or shutdown",
      "Describe the MSI workload, approximate interval and prior cooling service. Avoid repeating demanding tests when the device is shutting down or shows unsafe symptoms.",
    ],
    [
      "Startup fails after an upgrade or repair",
      "Include the MSI model and the documented storage or other work performed. Discuss backup status and the exact startup message before software changes are approved.",
    ],
    [
      "Physical damage affects the lid or chassis",
      "Explain the MSI impact location and which functions still respond. A hinge or mounting repair needs the actual chassis identity, not only the gaming-family name.",
    ],
  ],
  samsung: [
    [
      "A laptop display fault is hard to identify",
      "Use the Samsung laptop model code, keeping phone or tablet details separate. Describe touch and image response independently if touch is fitted on the actual unit.",
    ],
    [
      "Charging behaves differently with one accessory",
      "Identify the Samsung notebook charger and connected accessory. Explain battery operation and warnings without assuming a shared connector means every charger is suitable.",
    ],
    [
      "Keyboard or touchpad behaviour becomes intermittent",
      "For your Samsung laptop, name the affected input and note any preceding spill or repair. A product-family name alone may not identify the internal assembly.",
    ],
    [
      "The notebook slows as its temperature changes",
      "Describe the Samsung workload and whether a fan sound, freeze or shutdown accompanies the slowdown. Mention prior internal work rather than treating every performance complaint as overheating.",
    ],
    [
      "The laptop starts but cannot reach the desktop",
      "Record the Samsung startup message and any recent storage or software change. Confirm data priorities before approving reinstallation or replacement of the installed drive.",
    ],
    [
      "A folding or hinge area shows damage",
      "Identify the exact Samsung notebook form factor and visible damage. Avoid flexing a damaged lid and confirm the assembly and features included in the estimate.",
    ],
  ],
  microsoft: [
    [
      "Touch and image behave differently",
      "For your Microsoft device, identify the exact Surface model if applicable and separate touch failure from a missing image. Mention cracks and earlier display work.",
    ],
    [
      "The device runs only on external power",
      "Share the Microsoft model, charger type and battery indication. Confirm the fitted power connection and assessment options rather than assuming all Surface generations use identical parts.",
    ],
    [
      "A detachable keyboard or connection stops working",
      "If your Microsoft device uses a detachable keyboard, describe it separately from the tablet section. Identify the accessory and any connector damage without forcing it into position.",
    ],
    [
      "Heat changes during tablet or laptop use",
      "Describe the Microsoft device's usage mode, task and shutdown behaviour. Confirm the actual design and repair scope without assuming every model has the same cooling arrangement.",
    ],
    [
      "Startup hangs before the normal sign-in",
      "Include the Microsoft model and complete startup screen. Keep encryption recovery keys private and discuss backups before software or storage work is authorized.",
    ],
    [
      "A stand, hinge or enclosure is damaged",
      "Name the Microsoft device part and explain how it affects use. Assessment should confirm access and repair feasibility for the particular construction before an assembly is promised.",
    ],
  ],
  lg: [
    [
      "An older notebook has an intermittent image",
      "Use the LG laptop model, approximate age and any display repair record. Describe image and backlight behaviour separately before matching a replacement panel.",
    ],
    [
      "Battery endurance changes on the existing setup",
      "For your LG notebook, record adapter details and whether the issue appeared gradually. Confirm suitable parts and the complete estimate before committing to a battery repair.",
    ],
    [
      "Keys or ports fail after earlier work",
      "Identify the LG notebook connection or input and the previous repair. Keep appliance or phone documentation from the same brand separate from this laptop enquiry.",
    ],
    [
      "A new sound accompanies reduced performance",
      "Describe the LG task, fan behaviour if present and whether the laptop freezes or stops. Exact hardware and inspection findings determine the appropriate work.",
    ],
    [
      "The notebook no longer completes startup",
      "Share the LG full model and any startup message, plus stored-data priorities. For an older unit, discuss repair practicality and compatible parts before a reset or replacement.",
    ],
    [
      "Lightweight casing shows damage near a hinge",
      "Explain the LG case damage and known lid movement without forcing it. Keep earlier repair details available so assessment includes mounting condition and panel behaviour.",
    ],
  ],
  xiaomi: [
    [
      "The laptop screen fails on a Mi-labelled unit",
      "Share the Xiaomi or Mi notebook's full model rather than its phone-family name. Include image, backlight and known external-display behaviour to identify the complaint.",
    ],
    [
      "A shared charger no longer powers the notebook",
      "Specify the Xiaomi laptop charger rating and connector, along with its own model. A charger that works with a phone does not establish the notebook's power condition.",
    ],
    [
      "A keyboard or port fault affects daily work",
      "Name the Xiaomi notebook input or connection and any accessories used. Confirm the exact laptop variant before choosing a similar-looking keyboard or port assembly.",
    ],
    [
      "Performance changes after a period of use",
      "Describe the Xiaomi notebook's task, sound and time to slowdown or shutdown. Mention previous cleaning or internal repairs without repeating unsafe stress tests.",
    ],
    [
      "Startup stops after a software or drive change",
      "Keep the Xiaomi laptop model and work history with the current message. Discuss unbacked-up files before approving further software steps or storage replacement.",
    ],
    [
      "A lid impact affects more than the panel",
      "Describe Xiaomi notebook frame and hinge damage separately from the image. Ask how the complete assembly and remaining functions will be assessed before a screen-only repair is agreed.",
    ],
  ],
  honor: [
    [
      "The notebook powers on without a usable image",
      "Send the full HONOR laptop model and region variant if known. Describe lights, sounds and any external-display response without relying on the brand name to identify the panel.",
    ],
    [
      "Charging differs from the original setup",
      "For your HONOR notebook, include adapter specifications, replacement-charger history and battery behaviour. Confirm compatible parts and power requirements for the actual variant.",
    ],
    [
      "One input or connection no longer responds",
      "Identify the HONOR laptop keyboard, touchpad or port involved. Mention any spill or impact and keep phone-accessory concerns separate from the notebook fault.",
    ],
    [
      "A shutdown interrupts a particular task",
      "Describe the HONOR workload, operating time and warning if present. Separate heat observations from an assumed cooling-component failure and mention earlier internal work.",
    ],
    [
      "An imported unit stops during startup",
      "Include the HONOR model, purchase region if known and complete message. Discuss data preservation, assessment feasibility and parts before a reset or replacement is considered.",
    ],
    [
      "The case or hinge changes after a drop",
      "Show the HONOR exterior damage without exposing private content. Confirm model-specific assemblies and what inspection can establish before promising a particular repair.",
    ],
  ],
};
