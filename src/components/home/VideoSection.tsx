import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";

// Cuando exista el video institucional real, colocar aquí la URL (mp4 o similar)
const VIDEO_URL = "";

export function VideoSection({
  eyebrow,
  title,
  description,
  comingSoon,
  poster = "/images/video-poster.png",
}: {
  eyebrow: string;
  title: string;
  description: string;
  comingSoon: string;
  poster?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="relative mt-10 overflow-hidden rounded-[var(--radius-lg)] shadow-md">
          {VIDEO_URL ? (
            <video
              controls
              preload="none"
              poster={poster}
              className="aspect-video w-full bg-ink object-cover"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <div className="relative aspect-video w-full">
              <Image
                src={poster}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 72rem"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/35">
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white/80">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <p className="rounded-full bg-ink/60 px-4 py-1.5 text-sm font-medium text-white/90">
                  {comingSoon}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
