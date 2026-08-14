import type { StaticImageData } from "next/image";

import svcLaptop from "@/assets/service-laptop.webp";
import svcDesktop from "@/assets/service-desktop.webp";
import svcCctv from "@/assets/service-cctv.webp";
import svcBusiness from "@/assets/service-business.webp";

export type Service = {
  name: string;
  seoTitle: string;
  seoDescription: string;
  hero: string;
  // Optional substring of `hero` to render in brand color, e.g. "laptop repair".
  // Must match `hero` exactly (case + spacing) or it's ignored.
  heroAccent?: string;
  image: StaticImageData;
  intro: string;
  keywords: string[];
  subServices: string[];
  subServiceLinks?: Record<string, string>;
  problems: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export const SERVICES: Record<string, Service> = {
  "laptop-repair": {
    name: "Laptop Repair",
    seoTitle: "Laptop Repair Service | Certified Laptop Technicians | Numunix",
    seoDescription:
      "Professional laptop repair service for slow, damaged, overheating and non-booting laptops. Get certified diagnostics, genuine parts and fast turnaround from Numunix.",
    hero: "Laptop repair that gets you back to work, fast.",
    heroAccent: "Laptop repair",
    image: svcLaptop,
    intro:
      "Certified technicians diagnose the issue clearly and repair it with genuine, warrantied parts.",
    keywords: [
      "Laptop diagnostics",
      "Screen replacement",
      "Battery replacement",
      "Motherboard repair",
    ],
    subServices: [
      "Laptop screen and hinge repair",
      "Keyboard, trackpad and port replacement",
      "Battery, charging and power issues",
      "SSD upgrades, data recovery and speed optimisation",
      "Overheating, fan cleaning and thermal service",
      "Windows installation and software troubleshooting",
    ],
    problems: [
      "Laptop not turning on",
      "Slow laptop performance",
      "Broken laptop screen",
      "Laptop overheating or shutting down",
    ],
    benefits: [
      "Clear diagnosis before repair",
      "Genuine parts with service warranty",
      "Fast turnaround for common faults",
      "Support for personal and business laptops",
    ],
    faqs: [
      {
        question: "How long does a laptop repair take?",
        answer:
          "Many laptop repairs are completed the same day after diagnosis. Complex motherboard and part-replacement work is confirmed with a clear turnaround estimate.",
      },
      {
        question: "Do you repair all laptop brands?",
        answer:
          "Yes. Our technicians support major consumer and business laptop brands, including common Windows laptops and Apple hardware.",
      },
    ],
  },
  "desktop-repair": {
    name: "Desktop Repair",
    seoTitle: "Desktop Repair Service | PC Repair & Upgrade Experts | Numunix",
    seoDescription:
      "Fast desktop repair, PC diagnostics, upgrades and maintenance for homes and offices. Numunix certified technicians restore desktop performance and reliability.",
    hero: "Desktop repair and upgrades built for dependable performance.",
    image: svcDesktop,
    intro:
      "Our desktop repair service fixes performance, boot, hardware and operating-system problems for home PCs and business workstations. We also plan practical upgrades that make an existing desktop faster and more reliable.",
    keywords: [
      "PC diagnostics",
      "Desktop upgrades",
      "Power supply repair",
      "Windows troubleshooting",
    ],
    subServices: [
      "Desktop diagnostics and no-boot repair",
      "RAM, SSD and graphics upgrades",
      "Power supply, motherboard and cooling repair",
      "Virus removal and Windows installation",
      "Custom PC maintenance and cleanup",
      "Business workstation support",
    ],
    problems: [
      "Desktop not powering on",
      "Blue screen or repeated restart",
      "Slow PC and storage issues",
      "No display or graphics problems",
    ],
    benefits: [
      "Honest upgrade recommendations",
      "Quality compatible components",
      "Clean cable and cooling service",
      "Business-ready workstation support",
    ],
    faqs: [
      {
        question: "Should I repair or upgrade my desktop?",
        answer:
          "We assess the age, fault and intended use of the PC first, then recommend the most cost-effective repair or upgrade.",
      },
      {
        question: "Can you make an old desktop faster?",
        answer:
          "Often yes. An SSD, RAM upgrade and proper cleanup can significantly improve startup and daily performance.",
      },
    ],
  },
  "cctv-installation": {
    name: "CCTV Installation",
    seoTitle: "CCTV Installation & Repair Service | Home and Business Security | Numunix",
    seoDescription:
      "Professional CCTV installation, camera repair, DVR/NVR setup and remote mobile viewing for homes and businesses by Numunix certified engineers.",
    hero: "CCTV security that keeps your property in view.",
    heroAccent: "CCTV security",
    image: svcCctv,
    intro:
      "Clear coverage, reliable recording and easy mobile access — installed by certified engineers.",
    keywords: [
      "CCTV camera installation",
      "DVR and NVR setup",
      "Remote CCTV viewing",
      "Security camera repair",
    ],
    subServices: [
      "Home and office CCTV installation",
      "DVR, NVR and hard-drive replacement",
      "Remote mobile viewing configuration",
      "Camera repositioning and cabling",
      "CCTV troubleshooting and maintenance",
      "Security coverage planning",
    ],
    problems: [
      "Camera not recording",
      "CCTV feed is offline",
      "Blurry night footage",
      "Remote view is not working",
    ],
    benefits: [
      "Coverage planned around your space",
      "Neat, reliable cabling",
      "Remote access setup included",
      "Ongoing support and maintenance",
    ],
    faqs: [
      {
        question: "Can I view my CCTV cameras on my phone?",
        answer:
          "Yes. We configure secure remote viewing and guide you through accessing the system on your phone.",
      },
      {
        question: "Do you repair existing CCTV systems?",
        answer:
          "Yes. We diagnose cameras, cables, DVR/NVR recorders, hard drives and remote-access issues.",
      },
    ],
  },
  networking: {
    name: "Networking",
    seoTitle: "Network Setup & Wi-Fi Troubleshooting | Business Networking Service | Numunix",
    seoDescription:
      "Professional Wi-Fi, LAN, router, firewall and office networking setup. Numunix resolves slow and unreliable network connections for homes and businesses.",
    hero: "Stable, secure networking for every connected workspace.",
    image: svcBusiness,
    intro:
      "From unreliable Wi-Fi to a growing office network, Numunix provides practical networking support that improves speed, coverage and security. Our engineers design and troubleshoot wired and wireless networks around how you work.",
    keywords: [
      "Wi-Fi troubleshooting",
      "Office network setup",
      "Router configuration",
      "LAN cabling",
    ],
    subServices: [
      "Wi-Fi coverage and speed optimisation",
      "Router, switch and firewall configuration",
      "LAN cabling and structured networking",
      "VPN and secure remote access",
      "Network fault diagnosis",
      "Office network expansion",
    ],
    problems: [
      "Wi-Fi keeps disconnecting",
      "Slow internet across office devices",
      "Dead zones and weak signal",
      "Network printer or shared folder issues",
    ],
    benefits: [
      "Reliable coverage and performance",
      "Secure configuration practices",
      "Clear network documentation",
      "Scalable setup for growing teams",
    ],
    faqs: [
      {
        question: "Why is my Wi-Fi slow in only some rooms?",
        answer:
          "Signal placement, interference and building materials affect coverage. We test the space and recommend the right access-point or mesh solution.",
      },
      {
        question: "Do you support office networks?",
        answer:
          "Yes. We handle workstation, Wi-Fi, router, switch, firewall and cabling requirements for small and growing businesses.",
      },
    ],
  },
  "appliances-repair": {
    name: "Appliances Repair",
    seoTitle: "Home Appliances Repair Service | AC, Refrigerator & Washing Machine | Numunix",
    seoDescription:
      "Reliable home appliance repair for washing machines, refrigerators, air conditioners and more. Numunix provides clear diagnostics, genuine parts and dependable repairs.",
    hero: "Appliance repair that keeps your home running smoothly.",
    image: svcDesktop,
    intro:
      "Numunix repairs essential home appliances, including washing machines, refrigerators and air conditioners. We find the real fault, explain the repair clearly and use quality replacement parts for a dependable result.",
    keywords: [
      "Home appliance repair",
      "Washing machine repair",
      "Refrigerator repair",
      "AC repair",
    ],
    subServices: [
      "Washing Machine Repair",
      "Refrigerator Repair",
      "AC Repair",
      "Microwave Oven Repair",
      "Dishwasher Repair",
      "Water Purifier Repair",
    ],
    subServiceLinks: {
      "Washing Machine Repair": "/services/washing-machine-repair",
    },
    problems: [
      "Washing machine is not spinning or draining",
      "Refrigerator is not cooling properly",
      "AC is leaking, noisy or not cooling",
      "Appliance will not switch on",
    ],
    benefits: [
      "Repair support for essential home appliances",
      "Clear repair recommendations",
      "Quality parts and dependable workmanship",
      "Preventive maintenance advice for longer appliance life",
    ],
    faqs: [
      {
        question: "Which appliances do you repair?",
        answer:
          "We repair common household appliances including washing machines, refrigerators, air conditioners, microwave ovens, dishwashers and water purifiers.",
      },
      {
        question: "Do you use genuine replacement parts?",
        answer:
          "We recommend suitable quality replacement parts after diagnosis and explain the repair before work begins.",
      },
    ],
  },
  "washing-machine-repair": {
    name: "Washing Machine Repair",
    seoTitle: "Washing Machine Repair Service | Front Load & Top Load Repair | Numunix",
    seoDescription:
      "Professional washing machine repair for front-load, top-load and semi-automatic machines. Numunix fixes drainage, spin, noise, vibration and power faults across leading brands.",
    hero: "Reliable washing machine repair, right when you need it.",
    heroAccent: "washing machine repair",
    image: svcDesktop,
    intro:
      "From a machine that will not start to poor draining, excessive vibration or a failed spin cycle, our technicians diagnose the fault clearly and provide a dependable washing machine repair solution for your home.",
    keywords: [
      "Washing machine repair",
      "Front load washing machine repair",
      "Top load washing machine repair",
      "Washing machine service near me",
    ],
    subServices: [
      "Front Load Washing Machine Repair",
      "Top Load Washing Machine Repair",
      "Semi-Automatic Washing Machine Repair",
      "Drainage and Spin Cycle Repair",
      "Motor, Belt and Drum Repair",
      "Washing Machine Installation and Service",
    ],
    problems: [
      "Washing machine is not starting",
      "Machine is not draining water",
      "Drum is noisy, shaking or not spinning",
      "Water is leaking from the machine",
    ],
    benefits: [
      "Support for front-load, top-load and semi-automatic machines",
      "Clear fault diagnosis before repair work begins",
      "Quality replacement parts when required",
      "Practical maintenance guidance after every visit",
    ],
    faqs: [
      {
        question: "Do you repair both front-load and top-load washing machines?",
        answer:
          "Yes. Our washing machine repair service covers front-load, top-load and semi-automatic models across leading home-appliance brands.",
      },
      {
        question: "Why is my washing machine not draining or spinning?",
        answer:
          "Drainage and spin problems can be caused by a blocked filter, pump fault, belt issue, motor problem or control-board fault. We inspect the machine and recommend the right repair.",
      },
      {
        question: "Can you repair a leaking washing machine?",
        answer:
          "Yes. We check hoses, inlet valves, door seals, the drain system and internal connections to identify the source of the leak before repairing it.",
      },
    ],
  },
  "business-amc": {
    name: "Business AMC",
    seoTitle: "Business IT AMC Service | Annual Maintenance Contract | Numunix",
    seoDescription:
      "Business IT annual maintenance contracts for proactive computer, network, CCTV and onsite support. Keep your technology reliable with Numunix AMC plans.",
    hero: "Proactive IT maintenance for businesses that cannot stop.",
    image: svcBusiness,
    intro:
      "Numunix Business AMC plans give organisations one dependable team for routine maintenance, fast issue resolution and technology planning. We keep systems, networks and workstations healthy so your team can stay productive.",
    keywords: [
      "IT annual maintenance contract",
      "Business IT support",
      "Office computer maintenance",
      "Onsite IT support",
    ],
    subServices: [
      "Scheduled preventive maintenance",
      "Priority onsite and remote support",
      "Workstation and network health checks",
      "Asset and warranty tracking",
      "CCTV and printer maintenance",
      "Monthly support reporting",
    ],
    problems: [
      "Repeated IT downtime",
      "No dedicated IT support",
      "Unplanned repair costs",
      "Growing office technology needs",
    ],
    benefits: [
      "Predictable support costs",
      "Priority response from certified engineers",
      "Proactive issue prevention",
      "One partner across your IT environment",
    ],
    faqs: [
      {
        question: "What does a business AMC cover?",
        answer:
          "Coverage is tailored to your devices and support needs, including maintenance, troubleshooting and agreed onsite or remote response.",
      },
      {
        question: "Can AMC support include networking and CCTV?",
        answer:
          "Yes. We can include workstations, networking, printers, CCTV and other agreed business IT assets.",
      },
    ],
  },
  "data-recovery": {
    name: "Data Recovery",
    seoTitle: "Data Recovery Service | Laptop, Desktop & Drive Recovery | Numunix",
    seoDescription:
      "Professional data recovery assistance for laptops, desktops, SSDs and hard drives. Numunix helps recover important files after drive, system or accidental deletion issues.",
    hero: "Careful data recovery when your important files matter most.",
    image: svcLaptop,
    intro:
      "When a device fails, the data on it can be more valuable than the hardware. Numunix assesses laptop, desktop, SSD and hard-drive issues carefully, then recommends the safest recovery path for your important files.",
    keywords: [
      "Data recovery service",
      "Hard drive recovery",
      "SSD data recovery",
      "Deleted file recovery",
    ],
    subServices: [
      "Hard-drive and SSD assessment",
      "Operating-system recovery",
      "Accidental deletion recovery",
      "External drive file recovery",
      "Laptop data transfer",
      "Backup setup after recovery",
    ],
    problems: [
      "Hard drive is not detected",
      "Files were deleted",
      "Laptop will not boot",
      "External drive is unreadable",
    ],
    benefits: [
      "Careful, recovery-first assessment",
      "Transparent likelihood and next steps",
      "Secure handling of your data",
      "Backup planning after recovery",
    ],
    faqs: [
      {
        question: "Should I keep using a failing drive?",
        answer:
          "No. Continued use can worsen a failing drive. Stop using it and seek an assessment as soon as possible.",
      },
      {
        question: "Can deleted files be recovered?",
        answer:
          "It depends on the drive and what has happened since deletion. We assess the situation before recommending a recovery attempt.",
      },
    ],
  },
  "hardware-upgrades": {
    name: "Hardware Upgrades",
    seoTitle: "Laptop & PC Hardware Upgrades | SSD, RAM & Performance Upgrade | Numunix",
    seoDescription:
      "Upgrade your laptop or desktop with SSD, RAM, storage and performance improvements. Numunix recommends and installs compatible hardware for faster everyday computing.",
    hero: "Smart hardware upgrades with a noticeable performance difference.",
    image: svcDesktop,
    intro:
      "A well-chosen hardware upgrade can extend the useful life of your laptop or desktop. Numunix assesses compatibility and your daily workload, then installs reliable upgrades that deliver a clear improvement.",
    keywords: [
      "SSD upgrade",
      "RAM upgrade",
      "Laptop performance upgrade",
      "PC hardware installation",
    ],
    subServices: [
      "SSD storage upgrades",
      "RAM memory upgrades",
      "Laptop and desktop performance tuning",
      "Graphics and power upgrades",
      "Drive cloning and data migration",
      "Cooling and reliability upgrades",
    ],
    problems: [
      "Computer takes too long to start",
      "Not enough storage",
      "Too many applications slow the PC",
      "System struggles with new software",
    ],
    benefits: [
      "Compatibility checked before purchase",
      "Data migration handled carefully",
      "Reliable branded components",
      "Better value than unnecessary replacement",
    ],
    faqs: [
      {
        question: "Will an SSD make my computer faster?",
        answer:
          "For many systems, an SSD significantly improves startup, application loading and everyday responsiveness.",
      },
      {
        question: "Can you transfer my old files to a new SSD?",
        answer:
          "Yes. We can clone or migrate your data where the source drive condition allows it.",
      },
    ],
  },
};

export function getService(slug: string): Service | undefined {
  return SERVICES[slug];
}

export function getServiceSlugs(): string[] {
  return Object.keys(SERVICES);
}
