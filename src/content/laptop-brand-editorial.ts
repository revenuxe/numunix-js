// Model-identification and enquiry examples, not repair outcomes or availability claims.
export const LAPTOP_EDITORIAL: Record<
  string,
  { model: string; focus: string; example: string; support: string }
> = {
  hp: {
    model:
      "Include the HP product number and full model, not just the family name. Note whether it is a conventional notebook, convertible or gaming laptop, and identify the adapter used when the issue occurs.",
    focus:
      "For an HP laptop that will not start, describe power lights, fan activity and any repeated blink or beep pattern. Distinguish a blank display from a device that shows no response. The pattern needs the exact model context before a diagnosis is proposed.",
    example:
      "My HP laptop shows a power light and the fan starts, but the built-in display stays blank. I can share the product number and the observed light pattern. My files are not fully backed up.",
    support: "https://support.hp.com/in-en",
  },
  dell: {
    model:
      "Share the Dell model and Service Tag privately during assessment arrangements. Include the adapter specification and whether the fault occurs on battery power, adapter power or both. Avoid posting the equipment label publicly.",
    focus:
      "Describe any adapter warning, charging indication or diagnostic-light sequence separately from Windows startup. If a dock is involved, say whether the symptom also occurs without it. A charging complaint alone does not establish that the battery has failed.",
    example:
      "My Dell laptop runs on its adapter but the battery percentage does not increase. The issue began before I added a dock. I can provide the model and adapter details for assessment.",
    support: "https://www.dell.com/support/home/en-in",
  },
  lenovo: {
    model:
      "Include the complete Lenovo machine type and model. Mention whether the device is a ThinkPad, IdeaPad, Yoga, Legion or another range, plus any dock or external monitor used with it. The range alone does not identify compatible parts.",
    focus:
      "For a keyboard, hinge or display complaint, distinguish physical damage from an intermittent response. On a convertible, describe the position in which the fault happens without repeatedly bending a damaged hinge. Include charging and startup behaviour if those changed too.",
    example:
      "My Lenovo laptop starts normally, but several keys do not respond. There was a small spill before the problem began. I stopped using it and would like the keyboard and internal condition assessed.",
    support: "https://support.lenovo.com/in/en",
  },
  apple: {
    model:
      "Share the MacBook model, approximate year and model identifier if accessible. Mention the processor type if known and the charger or hub involved. Do not include an Apple Account password, recovery key or verification code in the enquiry.",
    focus:
      "For a MacBook that starts but has a blank display, describe any startup sound, keyboard response and external-display behaviour already observed. Discuss backup status before software reinstallation or board work. Repair feasibility and data access depend on the exact hardware and findings.",
    example:
      "My MacBook turns on, but the internal screen has lines after a drop. My external display still works. I need the screen and enclosure assessed and want to discuss my backup before handover.",
    support: "https://support.apple.com/en-in/mac",
  },
  asus: {
    model:
      "Provide the full ASUS model code and whether the device is a standard notebook, convertible or gaming model. Include charger details and any recent screen, storage or cooling work. Similar-looking devices can use different internal assemblies.",
    focus:
      "Describe overheating in terms of the task running, fan noise and whether the laptop slows down or shuts off. Separate a high-load gaming complaint from a fault at idle. Do not keep running a device with a burning smell or visible battery swelling to reproduce the issue.",
    example:
      "My ASUS laptop becomes noisy and shuts down during a game, but ordinary browsing works. I can share the full model and the approximate time before shutdown. No part replacement has been approved.",
    support: "https://www.asus.com/in/support/",
  },
  acer: {
    model:
      "Share the Acer model and product identifier from an accessible label. Include whether it is a standard, gaming or convertible notebook, and describe any earlier hinge, screen or power repair. Keep personal identifiers out of public photos.",
    focus:
      "If the lid or hinge is damaged, explain whether the screen image and keyboard still work without forcing the lid through its range. A hinge complaint can involve the enclosure as well as the hinge itself, so the scope needs physical inspection.",
    example:
      "The corner of my Acer laptop lifts when the lid moves. The screen still displays normally. I have stopped moving the lid and want the hinge and casing assessed together.",
    support: "https://www.acer.com/in-en/support",
  },
  msi: {
    model:
      "Include the complete MSI model code and adapter rating, with the operating conditions that trigger the fault. Mention external displays, gaming peripherals and prior cooling or internal work. A gaming-series name alone is not a parts specification.",
    focus:
      "For shutdowns under load, note whether the laptop restarts, switches off or remains powered with a frozen image. Describe fan behaviour and the workload without running repeated stress tests. Cooling, power and software symptoms need to be separated during assessment.",
    example:
      "My MSI laptop freezes during a game and needs a restart, while lighter tasks work. I can share the model, adapter details and when the issue first appeared. I need diagnosis before deciding on a repair.",
    support: "https://www.msi.com/support",
  },
  samsung: {
    model:
      "Send the full Samsung laptop model code and region variant if known. Mention touch, convertible or pen features where fitted, and describe the charger and any connected hub. Confirm support and parts options for the particular device rather than the brand alone.",
    focus:
      "For a screen complaint, distinguish a cracked panel, missing image and failed touch input. Note whether charging or startup also changed. Ask which display features and functions the proposed replacement would support before agreeing to the specification.",
    example:
      "My Samsung laptop has a visible screen crack. It starts and the keyboard works, but touch is unreliable. I can share the model code and would like the display specification explained before approval.",
    support: "https://www.samsung.com/in/support/",
  },
  microsoft: {
    model:
      "Identify the exact Microsoft Surface model and generation, including whether it is a Surface Laptop or another Surface device. Describe the power connector, keyboard arrangement and accessories involved. A Microsoft Windows installation on another brand does not make it Microsoft hardware.",
    focus:
      "Separate a Surface device that will not charge from one that powers on but cannot start Windows. Include any charger indication and whether keyboard, touch or external-display functions respond. Internal access and repair options need confirmation for the exact model.",
    example:
      "My Surface Laptop powers on but repeatedly returns to the startup screen. I have not reset it because my files are not fully backed up. I can provide the model and the last change before the fault.",
    support: "https://support.microsoft.com/en-us/surface/",
  },
  lg: {
    model:
      "Provide the full LG laptop model code and region variant, especially for an imported device. Mention the charger used, approximate age and any previous screen or battery work. Confirm compatible parts and assessment options for that model before arranging work.",
    focus:
      "For battery or charging trouble, distinguish a short runtime from failure to charge or unexpected shutdowns. Describe casing deformation or a raised trackpad without pressing it. Stop using a device with a swollen battery and discuss safe handover arrangements.",
    example:
      "My LG laptop runs for much less time than before, but works while plugged in. I can share its model and charging behaviour. I want the battery condition and estimate checked before deciding on replacement.",
    support: "https://www.lg.com/in/support/",
  },
  xiaomi: {
    model:
      "Share the complete Xiaomi, Mi Notebook or RedmiBook model and region variant as shown on the device. Include the charger specification and whether the issue involves a USB-C connection or another power connector. Model availability and compatible parts need individual confirmation.",
    focus:
      "For intermittent power or a failed port, explain which connection is affected and whether it is used for charging, data or an external display. Avoid assuming every USB-C port supports the same functions. Mention hubs and any physical damage without inserting tools into a port.",
    example:
      "My Xiaomi laptop charges intermittently through one connection. I can share the exact notebook model and adapter details. I want the port and power path assessed before approving any board work.",
    support: "https://www.mi.com/global/support/",
  },
  honor: {
    model:
      "Include the full HONOR laptop model, region variant and charger details. For a MagicBook, the family name alone may cover different configurations. State whether the equipment is imported and ask about parts compatibility before arranging assessment.",
    focus:
      "For a startup or charging complaint, describe the power indicator, screen response and any message already visible. Mention recent software changes, liquid exposure and earlier repairs separately. Keep account credentials private and agree data priorities before any reset is proposed.",
    example:
      "My HONOR laptop shows a charging light but does not reach the login screen. I can send the model and a photo of the displayed message without personal details. I need to preserve files that are not backed up.",
    support: "https://www.honor.com/global/support/",
  },
};
