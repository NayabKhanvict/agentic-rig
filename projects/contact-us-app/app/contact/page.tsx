import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | TopTechHouse",
  description: "Send us a message and we'll get back to you shortly.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
