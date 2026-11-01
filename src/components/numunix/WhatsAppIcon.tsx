import whatsappAsset from "@/assets/whatsapp.svg.asset.json";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return <img src={whatsappAsset.url} alt="" aria-hidden="true" className={`${className} shrink-0 brightness-0 invert`} />;
}

export default WhatsAppIcon;