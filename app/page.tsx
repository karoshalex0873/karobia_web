import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Karobia",
  alternateName: "Karobia Dev",
  url: "https://karobia.dev",
  jobTitle: "Software Engineer",
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "React",
    "Next.js",
    "Artificial Intelligence",
    "Machine Learning",
  ],
};

const page = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Karobia Dev Portfolio
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-6xl">
          Alex Karobia, software engineer and AI/ML enthusiast.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-700">
          I build modern web applications, intelligent tools, and practical
          technology projects using software engineering, React, Next.js,
          artificial intelligence, and machine learning.
        </p>
      </section>
    </main>
  );
};

export default page;
