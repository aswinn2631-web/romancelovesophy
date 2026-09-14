import Image from "next/image";
import { Reveal } from "./reveal";
import type { Quote } from "@/lib/types";

// Displays the author photo cleanly on the landing page
export function FeaturedQuote({
  portraitUrl,
}: {
  quote?: Quote | null;
  portraitUrl: string | null;
}) {
  if (!portraitUrl) return null;

  return (
    <section className="border-y border-line">
      <div className="container-x flex flex-col items-center py-16 text-center sm:py-20">
        <Reveal>
          <div className="relative h-56 w-44 overflow-hidden rounded-2xl border border-line shadow-lg sm:h-72 sm:w-56">
            <Image
              src={portraitUrl}
              alt="Portrait"
              fill
              sizes="(min-width: 640px) 224px, 176px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
