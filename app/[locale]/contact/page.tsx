import PageBackground from "@/components/decor/PageBackground";
import ContactForm from "../../../components/contact/ContactForm";
import MapSection from "../../../components/contact/MapSection";
import CompanyInfoQR from "../../../components/contact/CompanyInfoQR";

export default function ContactPage() {
  return (
    <PageBackground variant="contact">
      <CompanyInfoQR />
      <div aria-hidden className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-2 h-px w-full rounded-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <ContactForm />
      <div aria-hidden className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-2 h-px w-full rounded-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
      <MapSection lat={13.792385860426464} lng={100.50482447511854} placeLabel="Origen Travel (HQ)" />
    </PageBackground>
  );
}
