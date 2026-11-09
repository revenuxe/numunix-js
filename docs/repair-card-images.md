# Repair category product images

These are AI-generated illustrative device cutouts for category navigation. They are not manufacturer endorsements, exact supported-model promises or photographs of completed customer jobs.

Final files live in `public/images/repair-categories/`. `src/content/repair-card-images.ts` resolves the service slug to its image; cards still link to the shared repair catalogue's canonical detail page.

Assets were created with the built-in Image Generation tool, requesting actual transparent alpha. `scripts/prepare-repair-card-images.mjs` trims transparent outer padding, bounds each asset to 512px, and encodes WebP at quality 84 with alpha quality 100. It checks alpha-channel transparency on every output. Input PNGs are retained in the image-generation Library and are not needed at runtime.

## Prompt set

Shared brief: photorealistic premium studio catalogue cutout, complete unbranded product centered in a square frame with generous transparent margin, soft upper-left lighting, realistic white/silver/charcoal materials, crisp edges and a truly transparent alpha background. No room, floor, platform, text, logos, watermark, particles or decorative graphics. No objects beyond the explicitly named product or set. Recognizable at website-card size.

| File stem | Product-specific brief |
| --- | --- |
| mobile-repair-v2 | Two overlapping views of the same silver smartphone: rear on the left with two simple camera lenses, front on the right with a luminous pale-blue to navy gradient screen. Upright, subtle opposing angles, complete devices, bright studio lighting, no interface or text. Fuller silhouette for clarity at 80px tall. Generated with the built-in Image Generation tool, preserving transparent alpha. |
| laptop-repair | Open silver laptop, three-quarter front view, plain deep-navy screen. |
| cctv-service | White outdoor bullet security camera, dark glass lens and short wall mount. |
| tv-audio-repair | Thin dark television on feet with compact matching soundbar, blank navy screen. |
| tablet-repair | Upright silver tablet, slightly angled, plain navy screen and proportions distinct from a phone. |
| data-recovery | Computer hard drive with top cover removed, silver platter and read arm visible, three-quarter top/front view. |
| console-repair | Charcoal game console with a matching controller in front, no logos. |
| desktop-repair | Compact dark tower, slim monitor and keyboard, blank navy screen. |
| washing-machine-repair | White front-loading washer, large round dark glass door and realistic unlabeled controls. |
| ac-repair | White split-AC indoor unit, isolated without a wall, lower airflow louver slightly open. |
| refrigerator-repair | Brushed-silver domestic refrigerator with closed doors and lower freezer drawer. |
| microwave-repair | Brushed-silver countertop microwave, closed dark-glass door and simple controls at right. |
| water-purifier-service | White/deep-blue domestic RO purifier with dispensing tap and compact clear lower reservoir. |
| inverter-ups-repair | Dark-gray domestic inverter head above one enclosed battery, vents and blank status display. |
| fan-light-repair | Three-blade ceiling fan with central integrated light, complete blades visible, isolated without ceiling. |
| electrical-service | White domestic distribution enclosure, open front cover showing a neat breaker row, no exposed live wires. |

The washing-machine brief additionally specifies a slightly right-facing three-quarter view and an approximately 80% frame fill. The other briefs use approximately 78% frame fill. All use transparent output and the same no-brand/no-backdrop constraints.
