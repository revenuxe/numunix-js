import { REPAIR_SERVICES, type RepairCategory } from "./homepage-repairs";
import { REPAIR_PAGES, repairPageHref } from "./repair-services";
import { repairPageHead, repairItemList, repairServiceSchema } from "./repair-seo";

export { SITE_URL as REPAIR_SITE_URL } from "./site";
export const REPAIR_HOME_PATHS = { electronics: "/", appliances: "/appliances" } as const;

const PAGE_META = {
  electronics: {
    title: "Electronics Repair in Bangalore | Mobile, Laptop & CCTV, Numunix",
    description: "Mobile, laptop, tablet, TV and CCTV repair in Bangalore. Explore fault diagnosis, data recovery, repair estimates and device testing with Numunix.",
  },
  appliances: {
    title: "Home Appliance Repair in Bangalore | AC, Washing Machine & Fridge, Numunix",
    description: "Washing machine, AC, refrigerator, microwave and water purifier repair in Bangalore. Request a doorstep assessment and review repair options with Numunix.",
  },
};

export function repairHomepageHead(category: RepairCategory) {
  const { title, description } = PAGE_META[category];
  const services = REPAIR_PAGES.filter(service => service.category === category);
  return repairPageHead({ title, description, path: REPAIR_HOME_PATHS[category], type: "CollectionPage", about: REPAIR_SERVICES[category].map(service => ({ "@type": "Service", name: service.nav, serviceType: service.nav })), entities: [repairItemList(services.map(service => ({ name: service.name, path: repairPageHref(service) }))), ...services.map(service => repairServiceSchema(service, repairPageHref(service)))] });
}
