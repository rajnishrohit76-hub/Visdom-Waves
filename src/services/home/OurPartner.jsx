import React, { useMemo } from "react";

const PARTNERS = [
  {
    name: "Amazon",
    logo:
      "https://i.pinimg.com/736x/7a/75/b9/7a75b9d313bc0a24d09b326d382dec8a.jpg",
  },
  {
    name: "Google",
    logo:
      "https://i.pinimg.com/1200x/8c/44/cd/8c44cdb758a09ec33d865b44c60f35ad.jpg",
  },
  {
    name: "Microsoft",
    logo:
      "https://i.pinimg.com/736x/cc/4e/72/cc4e72f2e8ec933d0fb124f64b7df12b.jpg",
  },
  {
    name: "Apple",
    logo:
      "https://i.pinimg.com/1200x/99/e8/d6/99e8d6526f09705b853091106ba1151a.jpg",
  },
  {
    name: "WhatsApp",
    logo:
      "https://i.pinimg.com/736x/46/75/1d/46751da002771b66e065018ab6078307.jpg",
  },
  {
    name: "Netflix",
    logo:
      "https://i.pinimg.com/1200x/8f/b2/19/8fb219fa9a12b75ae5bf1786185b85d1.jpg",
  },
];


function OurPartner() {

  const loopedPartners = useMemo(
    () => [...PARTNERS, ...PARTNERS],
    []
  );

  const partnerNodes = useMemo(
    () =>
      loopedPartners.map((partner, index) => (
        <li
          key={`${partner.name}-${index}`}
          className="flex items-center justify-center min-w-[160px] md:min-w-[200px] px-6"
          aria-label={partner.name}
        >
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            loading="lazy"
            className="h-14 md:h-16 w-auto object-contain opacity-80 
                       transition-all duration-300 
                       hover:grayscale-0 hover:opacity-100"
          />
        </li>
      )),
    [loopedPartners]
  );

  return (
    <section
      className="relative overflow-hidden py-16 bg-gradient-to-b from-gray-900 to-gray-950"
      aria-labelledby="partners-heading"
    >
      {/* Section Heading */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2
          id="partners-heading"
          className="text-3xl md:text-4xl font-bold text-white tracking-wide"
        >
          Our Trusted Partners
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden">
        <ul
          className="flex items-center w-max animate-partners-marquee"
          role="list"
        >
          {partnerNodes}
        </ul>
      </div>
    </section>
  );
};

export default OurPartner;
