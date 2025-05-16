import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, author, url, image }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prittam Bhattacharyya",
    jobTitle: "Software Engineer",
    telephone: "(+91) 62905-98661",
    email: "prittam.work@gmail.com",
    url: "https://prittam.netlify.app",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Regent Education & Research Foundation, Kolkata",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Swami Vivekananda Institute of Modern Studies, Kolkata",
      },
    ],
    knowsAbout: [
      "Dynamics 365",
      "SharePoint",
      "Dataverse",
      "Power Apps",
      "Power Automate",
      "AI Builder",
      "React Js",
      "Node Js",
      "React Native",
      "MySQL",
      "Supabase",
      "MongoDB",
    ],
    sameAs: ["mailto:prittam.work@gmail.com", "https://prittam.netlify.app"],
  };

  return (
    <Helmet>
      {/* General Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data as JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

SEO.defaultProps = {
  title: "Prittam Bhattacharyya - Freelance Software Engineer",
  description:
    "Prittam Bhattacharyya is a freelance software engineer specializing in web, app, 3D development, and Power Platform solutions.",
  keywords:
    "freelancer, software engineer, web developer, app developer, 3d developer, power apps, power platform, React, Node, Power Automate, Prittam Bhattacharyya",
  author: "Prittam Bhattacharyya",
  url: "https://prittam.netlify.app",
  image: "https://prittam.netlify.app/assets/about/aboutImage.webp", // Update with your actual OG image URL
};

export default SEO;
