export type ComputerSubservice = {
  parent: string;
  slug: string;
  title: string;
  description: string;
  overview: string[];
  symptoms: string[];
  assessment: string[];
  faqs: [string, string][];
};

const laptop = (
  slug: string,
  title: string,
  description: string,
  overview: string[],
  symptoms: string[],
  assessment: string[],
  faqs: [string, string][],
): ComputerSubservice => ({
  parent: "laptop-repair",
  slug,
  title,
  description,
  overview,
  symptoms,
  assessment,
  faqs,
});
const desktop = (
  slug: string,
  title: string,
  description: string,
  overview: string[],
  symptoms: string[],
  assessment: string[],
  faqs: [string, string][],
): ComputerSubservice => ({
  parent: "desktop-repair",
  slug,
  title,
  description,
  overview,
  symptoms,
  assessment,
  faqs,
});
const cctv = (
  slug: string,
  title: string,
  description: string,
  overview: string[],
  symptoms: string[],
  assessment: string[],
  faqs: [string, string][],
): ComputerSubservice => ({
  parent: "cctv-installation",
  slug,
  title,
  description,
  overview,
  symptoms,
  assessment,
  faqs,
});
const appliance = (
  slug: string,
  title: string,
  description: string,
  overview: string[],
  symptoms: string[],
  assessment: string[],
  faqs: [string, string][],
): ComputerSubservice => ({
  parent: "appliances-repair",
  slug,
  title,
  description,
  overview,
  symptoms,
  assessment,
  faqs,
});

export const COMPUTER_SUBSERVICES: ComputerSubservice[] = [
  laptop(
    "screen-hinge-repair",
    "Laptop Screen & Hinge Repair in Bangalore",
    "Laptop screen, display and hinge repair in Bangalore for cracked panels, flicker, lines, loose hinges and damaged lids.",
    [
      "A cracked screen is obvious; a flickering display, coloured lines or a lid that will not stay in position can be less clear. These problems may involve the panel, display cable, hinge assembly, lid, webcam bezel or the internal mounting points.",
      "Numunix assesses laptop screen and hinge damage before recommending the repair. We look at the display output, lid movement and surrounding housing so the solution addresses the cause rather than only the visible damage.",
    ],
    [
      "Cracked, black, flickering or lined display",
      "Loose, stiff or clicking hinge",
      "Image changes when the lid moves",
      "Lid casing separates near a hinge",
    ],
    [
      "Check whether an external display works normally",
      "Inspect the panel, cable path, hinges and lid mounting",
      "Confirm compatible replacement options and finish the repair with a display and lid-movement test",
    ],
    [
      [
        "Can a broken laptop hinge damage the screen?",
        "Yes. A stiff or damaged hinge can pull on the lid and display cable, so it is best to inspect it before repeated opening and closing causes more damage.",
      ],
      [
        "Do I need a screen replacement for every display fault?",
        "Not always. The panel, display cable, graphics output and lid assembly are checked to identify the practical repair.",
      ],
    ],
  ),
  laptop(
    "keyboard-trackpad-ports",
    "Laptop Keyboard, Trackpad & Port Repair",
    "Laptop keyboard, trackpad, USB, HDMI and charging-port repair in Bangalore with diagnosis for input and connectivity faults.",
    [
      "A key that sticks, a trackpad that jumps or a USB port that disconnects can make a laptop difficult to use even when the rest of the system works. The issue may be physical wear, liquid exposure, cable damage, driver settings or a board-level connection.",
      "We check the affected input or port alongside the surrounding hardware and software. That gives you a clear picture of whether cleaning, replacement, configuration or deeper repair is appropriate.",
    ],
    [
      "Missing, repeated or unresponsive keys",
      "Trackpad clicks or cursor movement is unreliable",
      "USB, HDMI or audio port disconnects",
      "Port feels loose or only works at one angle",
    ],
    [
      "Test inputs and ports with known-good devices",
      "Check software settings and relevant internal connections",
      "Explain compatible replacement or repair options before work starts",
    ],
    [
      [
        "Can liquid damage affect only a few keys?",
        "Yes. Even a small spill can affect part of a keyboard or its connector. Stop using the laptop if there is moisture and arrange an inspection.",
      ],
      [
        "Why does my USB port work only sometimes?",
        "Wear, debris, a damaged port, cable issue or software setting can cause intermittent connection. Testing helps isolate the cause.",
      ],
    ],
  ),
  laptop(
    "battery-charging-power",
    "Laptop Battery, Charging & Power Repair",
    "Laptop battery, charging and power repair in Bangalore for fast drain, no charging, loose ports and laptops that will not power on.",
    [
      "Battery and charging problems can look similar: a laptop may show a charging symbol but lose power quickly, refuse to charge, or switch off as soon as the adapter is removed. The battery, adapter, charging port and charging circuit all need to be considered.",
      "We assess the power path safely and explain the likely fault before replacing parts. This helps avoid buying a battery when the underlying issue is the adapter, port or board.",
    ],
    [
      "Battery drains unusually quickly",
      "Laptop does not detect its charger",
      "Charging port is loose or warm",
      "Laptop shuts down or will not turn on",
    ],
    [
      "Check adapter output and charging behaviour",
      "Assess battery health and port condition",
      "Test the power path and discuss safe repair options",
    ],
    [
      [
        "Should I keep using a swollen battery?",
        "No. Stop using and charging the laptop, keep it away from heat and arrange a prompt assessment.",
      ],
      [
        "Can a charging port be repaired?",
        "Often yes, depending on the design and damage. The port and related charging circuit need to be checked first.",
      ],
    ],
  ),
  laptop(
    "ssd-data-speed",
    "Laptop SSD Upgrade, Data Recovery & Speed Optimisation",
    "Laptop SSD upgrades, data transfer and performance optimisation in Bangalore for slow booting, storage problems and everyday speed.",
    [
      "A slow laptop may improve dramatically with healthy storage, enough memory and a clean software setup. An SSD upgrade is often valuable, but the source drive condition, available space and the laptop's compatibility should be checked first.",
      "We review the real bottleneck and protect important files where possible. The goal is a practical performance improvement, not an upgrade that does not match the way you use the laptop.",
    ],
    [
      "Long startup or application-loading times",
      "Storage is full or frequently errors",
      "Laptop freezes while opening files",
      "You want to move data to a new SSD",
    ],
    [
      "Assess drive health, storage space and system compatibility",
      "Discuss upgrade capacity and migration approach",
      "Transfer or clone data where the original drive condition allows",
    ],
    [
      [
        "Will an SSD make my laptop faster?",
        "For many laptops, an SSD noticeably improves startup, app loading and everyday responsiveness.",
      ],
      [
        "Can files be transferred from an old drive?",
        "Usually, if the source drive is readable. A failing drive should be handled carefully to avoid making data loss worse.",
      ],
    ],
  ),
  laptop(
    "overheating-fan-thermal",
    "Laptop Overheating, Fan & Thermal Service",
    "Laptop overheating and fan service in Bangalore for loud fans, hot laptops, shutdowns and thermal performance problems.",
    [
      "Heat is normal during demanding work, but a laptop that becomes too hot, noisy or unstable needs attention. Dust buildup, ageing thermal material, blocked vents, fan wear, background load or a deeper hardware issue can all contribute.",
      "We assess temperatures, cooling response and the condition of the fan system before recommending cleaning, thermal service or additional repair.",
    ],
    [
      "Fan runs loudly most of the time",
      "Laptop becomes hot near the keyboard or vents",
      "System slows down or shuts down under load",
      "Fan makes grinding or rattling noise",
    ],
    [
      "Check airflow, fan operation and thermal symptoms",
      "Review software load and physical cooling condition",
      "Clean and service appropriate components, then test stability",
    ],
    [
      [
        "Is laptop overheating harmful?",
        "Persistent overheating can reduce performance and may shorten component life. Avoid blocking vents and arrange an inspection if shutdowns occur.",
      ],
      [
        "Can I use a cooling pad instead of repairing the fan?",
        "A cooling pad may help airflow but does not fix a worn fan, dust buildup or thermal fault.",
      ],
    ],
  ),
  laptop(
    "windows-software",
    "Laptop Windows Installation & Software Troubleshooting",
    "Windows installation, software troubleshooting and laptop performance support in Bangalore for crashes, errors, viruses and boot issues.",
    [
      "Software issues can feel just as disruptive as physical damage. Repeated crashes, a failed update, unwanted programs or a laptop that will not reach Windows may be caused by corrupted files, driver conflicts, storage trouble or malware.",
      "We start by identifying whether the problem is software-only or a sign of hardware instability. Important data is considered before any reinstall or major change is recommended.",
    ],
    [
      "Windows fails to start or loops on repair",
      "Frequent blue screens or error messages",
      "Programs crash or laptop is unusually slow",
      "Pop-ups, unwanted software or suspected malware",
    ],
    [
      "Review startup behaviour and error details",
      "Check storage and hardware stability before reinstalling",
      "Repair, reinstall or optimise Windows with data protection in mind",
    ],
    [
      [
        "Will reinstalling Windows delete my files?",
        "It can. We discuss backup and data options before a reinstall whenever the laptop is accessible.",
      ],
      [
        "Can a blue screen be only a software issue?",
        "It can be, but drivers, memory, storage and overheating may also be involved. Diagnosis matters.",
      ],
    ],
  ),
  desktop(
    "diagnostics-no-boot",
    "Desktop Diagnostics & No-Boot Repair",
    "Desktop diagnostics and no-boot repair in Bangalore for PCs with no power, no display, restart loops and startup failure.",
    [
      "A desktop that will not start may have a simple cable or power issue, or a problem in the power supply, memory, storage, motherboard or graphics hardware. The lights and sounds you notice can be useful clues, but testing is the reliable way to identify the fault.",
      "We assess the desktop methodically and explain the repair choices in terms of condition, compatibility and value.",
    ],
    [
      "PC does not power on",
      "Fans run but there is no display",
      "Repeated restart or beep sequence",
      "Windows does not load",
    ],
    [
      "Check external power and internal startup behaviour",
      "Test likely components in a sensible order",
      "Confirm the fault and discuss repair versus upgrade",
    ],
    [
      [
        "Why does my desktop turn on but show no display?",
        "The display cable, monitor, graphics output, memory or motherboard can be involved. Testing helps isolate which one.",
      ],
      [
        "Should I replace a no-boot desktop?",
        "Not automatically. Many no-boot issues are repairable; the age, fault and intended use should guide the decision.",
      ],
    ],
  ),
  desktop(
    "ram-ssd-graphics-upgrades",
    "Desktop RAM, SSD & Graphics Upgrades",
    "Desktop RAM, SSD and graphics upgrades in Bangalore for faster PCs, storage expansion, gaming and creative workloads.",
    [
      "Desktop upgrades are flexible, but not every part suits every motherboard, power supply or case. The best upgrade starts with what is limiting you now: slow loading, too little storage, low memory, weak graphics performance or a combination.",
      "We check compatibility and balance the upgrade around your actual work, study, creative or gaming needs.",
    ],
    [
      "PC is slow with multiple applications",
      "Storage is nearly full or old hard drive is slow",
      "Games or creative apps struggle",
      "You need more capacity for files or backups",
    ],
    [
      "Review current hardware, slots and power capacity",
      "Recommend compatible parts with a practical performance benefit",
      "Install, configure and test the upgraded system",
    ],
    [
      [
        "Is RAM or SSD the better first upgrade?",
        "An SSD often improves overall responsiveness; extra RAM helps when the system runs out of memory. Usage and current specifications decide.",
      ],
      [
        "Can any graphics card fit my desktop?",
        "No. Case space, power supply capacity, connectors and motherboard support must be checked first.",
      ],
    ],
  ),
  desktop(
    "power-motherboard-cooling",
    "Desktop Power Supply, Motherboard & Cooling Repair",
    "Desktop power supply, motherboard and cooling repair in Bangalore for shutdowns, no power, overheating and unstable PCs.",
    [
      "Power and cooling faults can cause a desktop to restart, shut down, make unusual noise or fail to start. Because these symptoms can overlap, replacing a component without diagnosis is often wasteful.",
      "We inspect the relevant power, board and cooling behaviour, then explain what is safe and worthwhile to repair.",
    ],
    [
      "PC switches off under load",
      "Burning smell, unusual noise or sudden restarts",
      "Fans do not spin correctly",
      "System powers on inconsistently",
    ],
    [
      "Check power delivery and startup stability",
      "Assess cooling components and visible board condition",
      "Recommend repair or replacement based on safe, compatible options",
    ],
    [
      [
        "Can a failing power supply damage a PC?",
        "A faulty unit can cause instability and should be assessed promptly rather than repeatedly powering the system on.",
      ],
      [
        "Why is my desktop noisy?",
        "Fans, hard drives, airflow restriction or power components may be responsible. The sound and when it occurs help diagnosis.",
      ],
    ],
  ),
  desktop(
    "virus-windows",
    "Desktop Virus Removal & Windows Installation",
    "Desktop virus removal, Windows installation and PC troubleshooting in Bangalore for malware, crashes, errors and slow computers.",
    [
      "A desktop that becomes slow, shows pop-ups or fails after an update may need more than a quick cleanup. The priority is to understand whether the issue is malware, damaged Windows files, driver conflict or hardware instability.",
      "We approach software repair with your data in mind and explain when a cleanup, repair install or fresh Windows installation is the best option.",
    ],
    [
      "Unexpected ads, pop-ups or browser changes",
      "Windows crashes or will not update",
      "Programs open slowly or fail",
      "You suspect a virus or ransomware",
    ],
    [
      "Assess symptoms and preserve accessible data",
      "Check drive health before major software work",
      "Remove threats or reinstall Windows, then test normal use",
    ],
    [
      [
        "Will virus removal save my files?",
        "Often, but the situation differs by threat and drive condition. Backups are discussed before significant changes.",
      ],
      [
        "Do I need a fresh Windows installation?",
        "Not always. It is considered when repair is less reliable or the system has extensive corruption or unwanted software.",
      ],
    ],
  ),
  desktop(
    "maintenance-cleanup",
    "Desktop Maintenance & Cleanup Service",
    "Desktop maintenance and cleanup in Bangalore for dust removal, slow performance, fan noise and reliable everyday PC use.",
    [
      "Regular desktop maintenance can reduce heat, noise and avoidable performance problems. Dust buildup, full storage, old software and neglected updates gradually affect a PC even when nothing appears obviously broken.",
      "We review the physical and software condition of the desktop, then suggest practical maintenance that suits its age and use.",
    ],
    [
      "Desktop is getting slower over time",
      "Fans are noisy or vents are dusty",
      "Storage is nearly full",
      "You want a health check before an important period of work",
    ],
    [
      "Check physical cleanliness, airflow and storage health",
      "Review startup programs, updates and basic performance",
      "Carry out agreed cleanup and share simple ongoing care advice",
    ],
    [
      [
        "How often should a desktop be cleaned?",
        "It depends on the environment and usage, but a periodic check is useful where dust, heat or heavy daily use is common.",
      ],
      [
        "Can maintenance improve performance?",
        "Yes. Reducing unnecessary startup load, freeing storage and addressing heat can improve day-to-day responsiveness.",
      ],
    ],
  ),
  desktop(
    "business-workstations",
    "Business Workstation Support in Bangalore",
    "Business desktop and workstation support in Bangalore for reliable office PCs, upgrades, repairs, setup and maintenance.",
    [
      "An office workstation is a tool for getting work done, so downtime should be handled with the user's job and business continuity in mind. A practical repair may include performance, network access, software, peripherals and data considerations—not only the part that failed.",
      "Numunix supports business desktops and workstations with clear diagnosis, compatible upgrades and sensible maintenance planning for small and growing teams.",
    ],
    [
      "A key employee workstation is unreliable",
      "Office PCs are slow or ageing",
      "New desks need setup or upgrades",
      "You need repeatable support for several systems",
    ],
    [
      "Understand the workstation role and urgency",
      "Assess hardware, software and connected peripherals",
      "Plan repair, upgrade or maintenance with minimal disruption",
    ],
    [
      [
        "Can you support several office desktops?",
        "Yes. We can assess individual workstations and discuss ongoing support or AMC needs for the wider setup.",
      ],
      [
        "Should a business PC be repaired or replaced?",
        "The decision depends on the fault, age, software requirements and cost of downtime. We explain the practical options.",
      ],
    ],
  ),
  cctv(
    "home-office-installation",
    "Home & Office CCTV Installation in Bangalore",
    "CCTV installation in Bangalore for homes, offices and shops, including placement, cabling, recording and mobile viewing.",
    [
      "A useful CCTV installation starts with the parts of a property that matter most: entrances, gates, parking, work areas and shared access points. Camera count comes after the coverage discussion, not before.",
      "Numunix plans home and office CCTV systems around sight lines, lighting, cable routes, recording needs and practical daily use, so the system is easy to understand and rely on.",
    ],
    [
      "You are moving into a new property",
      "Existing coverage has blind spots",
      "You need recording and phone access",
      "You want to replace an old CCTV system",
    ],
    [
      "Review priority areas and practical views",
      "Plan cameras, recorder, storage and cable paths",
      "Install, test recording and set up secure mobile viewing",
    ],
    [
      [
        "How many CCTV cameras do I need?",
        "It depends on layout, entry points, desired detail and blind spots. A coverage discussion gives a reliable answer.",
      ],
      [
        "Can CCTV be installed in an operating office?",
        "Yes. Installation can be planned around access and working hours.",
      ],
    ],
  ),
  cctv(
    "dvr-nvr-hard-drive",
    "DVR, NVR & CCTV Hard Drive Replacement",
    "DVR, NVR and CCTV hard-drive replacement in Bangalore for missing playback, recording failure and storage errors.",
    [
      "A system may show live video while the recorder is not saving footage. Missing playback, error messages and recorder beeps call for a check of the DVR/NVR, storage, settings and connected cameras.",
      "We assess the recording path before recommending a replacement, separating storage faults from camera, network, power or configuration issues.",
    ],
    [
      "Live cameras but no recorded footage",
      "Hard-drive error or recorder beeping",
      "Playback stops or is incomplete",
      "Storage fills faster than expected",
    ],
    [
      "Check recorder status, recording settings and feeds",
      "Assess storage health and retention needs",
      "Replace compatible storage if needed and confirm playback",
    ],
    [
      [
        "Can you replace only the CCTV hard drive?",
        "Usually, yes. Recorder model and drive compatibility are checked first.",
      ],
      [
        "Why is CCTV footage available for only a few days?",
        "Resolution, camera count, recording mode and storage capacity all affect retention.",
      ],
    ],
  ),
  cctv(
    "remote-mobile-viewing",
    "CCTV Remote Mobile Viewing Setup",
    "CCTV mobile viewing setup in Bangalore for secure camera access on phone, tablet and computer.",
    [
      "Remote viewing should be simple and secure. When cameras work on a monitor but not on a phone, the cause may be internet connectivity, app setup, recorder settings, credentials or network configuration.",
      "We configure supported remote access and make sure the owner can view live cameras and playback where available before the visit is complete.",
    ],
    [
      "Cameras work locally but not on a phone",
      "You changed Wi-Fi, router or phone",
      "The CCTV app shows device offline",
      "A new owner or manager needs access",
    ],
    [
      "Confirm the local CCTV system and internet connection",
      "Check recorder/camera and app configuration",
      "Set up supported access and test it with the user",
    ],
    [
      [
        "Can more than one person use the CCTV app?",
        "Many systems support multiple users or shared access; the method depends on the platform.",
      ],
      [
        "Should I share my CCTV password?",
        "Use individual access where supported and avoid sharing the main administrator password unnecessarily.",
      ],
    ],
  ),
  cctv(
    "camera-cabling-repositioning",
    "CCTV Camera Repositioning & Cabling",
    "CCTV camera repositioning and cabling in Bangalore to improve coverage, night view and installation reliability.",
    [
      "A camera blocked by a sign, aimed too high for useful detail or affected by glare may not capture what you need. Repositioning can be more valuable than adding another camera.",
      "We assess view, lighting, mounting and cable route before moving equipment, aiming for useful coverage and tidy, protected cabling.",
    ],
    [
      "Important areas are outside view",
      "Night footage is washed out or dark",
      "Cables are exposed or damaged",
      "The property layout has changed",
    ],
    [
      "Review current footage and the desired view",
      "Check mounting, lighting and cable route",
      "Reposition or re-cable and verify the final image",
    ],
    [
      [
        "Can an existing CCTV camera be moved?",
        "Often yes. Mounting, cable length, power and recorder setup are considered first.",
      ],
      [
        "Why is night footage poor?",
        "Angle, reflected light, lens condition and camera capability can all affect night images.",
      ],
    ],
  ),
  cctv(
    "troubleshooting-maintenance",
    "CCTV Troubleshooting & Maintenance",
    "CCTV troubleshooting and maintenance in Bangalore for offline cameras, missing recording, poor images and DVR/NVR issues.",
    [
      "CCTV systems usually show early warning signs: a camera goes offline, playback becomes unreliable, an app disconnects or night images change. Fixing those signs early helps avoid a larger gap in coverage.",
      "Our service checks the parts that keep a system working together—cameras, power, cabling, recording, storage and remote access.",
    ],
    [
      "One or more cameras are offline",
      "Footage is blurry, flickering or missing",
      "Recorder reports errors",
      "Remote view stopped after an internet change",
    ],
    [
      "Identify whether the fault is camera, power, cable, recorder or network",
      "Test the affected path and settings",
      "Explain the repair recommendation and verify the result",
    ],
    [
      [
        "Do CCTV cameras need maintenance?",
        "Yes. Periodic lens, recording, storage and remote-access checks can prevent surprises.",
      ],
      [
        "Can you repair a system another installer fitted?",
        "Yes. We assess many existing systems and explain practical repair or upgrade options.",
      ],
    ],
  ),
  cctv(
    "security-coverage-planning",
    "CCTV Security Coverage Planning",
    "CCTV security coverage planning in Bangalore before choosing cameras, storage or installation for homes, offices and shops.",
    [
      "Coverage planning helps you invest in the areas that matter instead of simply adding cameras. It considers entries, movement routes, lighting, privacy and the level of detail required.",
      "We turn those practical needs into a camera plan that can be installed, maintained and used with confidence.",
    ],
    [
      "You are unsure where cameras should go",
      "You want to avoid blind spots",
      "You are planning a new property or renovation",
      "You need help choosing camera types or brands",
    ],
    [
      "Identify priority areas and desired views",
      "Review lighting, mounting, cabling and storage",
      "Recommend a practical coverage plan before installation",
    ],
    [
      [
        "Should a CCTV camera face the street?",
        "Placement should focus on your property and respect privacy; we can discuss an appropriate view.",
      ],
      [
        "Do I need a site visit before installation?",
        "It is helpful for multi-camera, office, shop and complex properties where coverage and cabling need planning.",
      ],
    ],
  ),
  appliance(
    "washing-machine",
    "Washing Machine Repair in Bangalore",
    "Washing machine repair in Bangalore for drainage, spin, noise, leakage and power faults.",
    [
      "A washing-machine fault can interrupt the whole household. Drainage, spinning, noise and leakage can come from several components, so the point at which the cycle fails is important.",
      "We inspect the machine before recommending work and explain the likely fault, required parts and simple care steps in clear language.",
    ],
    [
      "Machine will not start or complete a cycle",
      "Water does not drain or fill",
      "Drum is noisy or not spinning",
      "Machine leaks or shows an error",
    ],
    [
      "Identify when the cycle fails",
      "Check drainage, inlet, drum and power systems",
      "Explain and test the agreed repair",
    ],
    [
      [
        "Why is my washing machine not spinning?",
        "Drainage, balance, belt, motor, door lock or control faults can affect spinning.",
      ],
      [
        "Should I use a leaking machine?",
        "No. Turn off the water inlet if safe and arrange an inspection.",
      ],
    ],
  ),
  appliance(
    "refrigerator",
    "Refrigerator Repair in Bangalore",
    "Refrigerator repair in Bangalore for cooling failure, noise, leakage, ice buildup and power problems.",
    [
      "A refrigerator that is not cooling properly can affect food safety and may become more costly to repair if ignored. Cooling, airflow, doors and electrical controls must be considered together.",
      "We assess the reported symptom and appliance condition before explaining the practical repair path.",
    ],
    [
      "Fridge or freezer is not cooling",
      "Unusual noise or constant running",
      "Water pooling or excess ice",
      "Door does not seal or unit will not start",
    ],
    [
      "Check cooling, airflow and electrical symptoms",
      "Assess likely components and seals",
      "Explain suitable repair and care options",
    ],
    [
      [
        "Why is my refrigerator running but not cooling?",
        "Airflow, frost, controls, sealing or cooling components may be involved.",
      ],
      [
        "Can I keep food inside?",
        "Move perishable food to safe cold storage if temperature cannot be maintained.",
      ],
    ],
  ),
  appliance(
    "ac",
    "AC Repair & Service in Bangalore",
    "AC repair and service in Bangalore for poor cooling, water leakage, noise, power faults and maintenance.",
    [
      "Poor cooling, leaking water and unusual sounds need more than a temperature adjustment. Airflow, drainage, electrical controls and cooling components can all affect comfort.",
      "We assess the system condition and symptoms before recommending service or repair.",
    ],
    [
      "AC is not cooling",
      "Indoor unit leaks water",
      "Unit is noisy or trips power",
      "Airflow is weak or unit will not start",
    ],
    [
      "Review cooling, drainage and power symptoms",
      "Inspect accessible service points",
      "Explain recommended service or repair",
    ],
    [
      [
        "Why is my AC leaking indoors?",
        "Drainage, airflow or an installation concern may be involved.",
      ],
      [
        "How often should AC be serviced?",
        "Use, dust levels and model matter; periodic servicing helps maintain performance.",
      ],
    ],
  ),
  appliance(
    "microwave",
    "Microwave Oven Repair in Bangalore",
    "Microwave repair in Bangalore for heating failure, sparking, display, turntable, door and power faults.",
    [
      "A microwave that sparks, fails to heat or has a damaged door should be assessed professionally. It contains high-voltage components and should not be opened at home.",
      "We check the symptom and appliance condition before advising on repair.",
    ],
    [
      "Food does not heat",
      "Sparking or burning smell",
      "Turntable or display fault",
      "Door does not close or appliance will not start",
    ],
    [
      "Confirm the symptom and exterior condition",
      "Assess relevant systems safely",
      "Explain repair and safe-use advice",
    ],
    [
      [
        "Why is my microwave sparking?",
        "Metal, damaged coating, debris or an internal fault can cause sparking. Stop using it.",
      ],
      [
        "Can a non-heating microwave be repaired?",
        "Often, depending on the fault and overall appliance condition.",
      ],
    ],
  ),
  appliance(
    "dishwasher",
    "Dishwasher Repair in Bangalore",
    "Dishwasher repair in Bangalore for drainage, cleaning, leakage, door, spray-arm and power problems.",
    [
      "A dishwasher that leaks, leaves dishes dirty or stops mid-cycle may have a water-flow, drainage, filter, spray-arm, heating or control issue. Knowing when the cycle fails helps diagnosis.",
      "We inspect the machine before recommending repair and explain what the symptom indicates.",
    ],
    [
      "Water remains after a cycle",
      "Dishes are not cleaning",
      "Machine leaks or will not start",
      "Cycle stops or shows an error",
    ],
    [
      "Review where in the cycle the fault occurs",
      "Check water flow, filters and drainage",
      "Recommend and test agreed repair",
    ],
    [
      [
        "Why is my dishwasher not draining?",
        "A filter blockage, hose concern or pump fault may be involved.",
      ],
      [
        "Why are dishes still dirty?",
        "Loading, spray arms, filters, water temperature and machine faults can contribute.",
      ],
    ],
  ),
  appliance(
    "water-purifier",
    "Water Purifier Repair & Service in Bangalore",
    "Water purifier repair and service in Bangalore for low flow, leakage, filter, taste and power issues.",
    [
      "A water purifier needs regular attention because flow, filtration performance and hygiene affect everyday drinking water. Low output, leaks and warning indicators should be checked promptly.",
      "We assess the model, service needs and reported symptom, then explain suitable service or repair options.",
    ],
    [
      "Low water flow or no output",
      "Leakage around the unit",
      "Unusual taste or warning light",
      "Unit does not power on",
    ],
    [
      "Review service history and symptoms",
      "Inspect filters, flow, connections and power",
      "Explain service or repair before proceeding",
    ],
    [
      [
        "How often do filters need changing?",
        "Timing depends on water quality, model and usage; follow manufacturer guidance.",
      ],
      [
        "Why is my purifier leaking?",
        "Connections, filters or housing may be involved. Turn off the inlet if safe.",
      ],
    ],
  ),
];

export function getComputerSubservice(parent: string, slug: string) {
  return COMPUTER_SUBSERVICES.find((item) => item.parent === parent && item.slug === slug);
}
export function getComputerSubserviceParams() {
  return COMPUTER_SUBSERVICES.map(({ parent, slug }) => ({
    serviceSlug: parent,
    subService: slug,
  }));
}
export function getSubserviceHref(parent: string, title: string) {
  const item = COMPUTER_SUBSERVICES.find(
    (entry) =>
      entry.parent === parent &&
      entry.title.toLowerCase().startsWith(title.split(" ").slice(0, 2).join(" ").toLowerCase()),
  );
  return item ? `/services/${parent}/${item.slug}` : undefined;
}
