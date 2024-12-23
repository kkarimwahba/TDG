import React from "react";

const PartnersSection = () => {
  const partners = [
    {
      name: "Art House",
      logo: "Assets/PartnersLogos/ArtHouseLogo.png",
      link: "https://arthouse.com",
    },
    {
      name: "Innovo",
      logo: "Assets/PartnersLogos/InnovoLogo.png",
      link: "https://innovo.com",
    },
    {
      name: "Burotime",
      logo: "Assets/PartnersLogos/BurotimeLogo.png",
      link: "https://burotime.com",
    },
    {
      name: "Bloom Paris",
      logo: "Assets/PartnersLogos/BloonLogo.png",
      link: "https://bloom-paris.com",
    },
    {
      name: "Istikbal",
      logo: "Assets/PartnersLogos/istikbal.png",
      link: "https://istikbal.com",
    },
    {
      name: "Qabani",
      logo: "Assets/PartnersLogos/kabani.png",
      link: "https://qabani.com",
    },
  ];

  return (
    <section className="partners-section">
      <div className="partners-content">
        <h1 className="partners-heading" style={{ textAlign: "left" }}>
          All Brands
        </h1>

        <p className="partners-description">
          Explore the heart of TheDesignGrit—our brands. They are the foundation
          of our mission, each bringing unique artistry and unmatched quality to
          the platform. By showcasing these creators, we’re building a
          collective that empowers local talent and delivers authentic Egyptian
          craftsmanship to your home.
        </p>

        <button className="partners-button">Shop all</button>
      </div>

      <div className="partners-logo-grid">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.link}
            className="partner-logo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="partner-logo"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
