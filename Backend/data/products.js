// Master product catalog — consolidated from every original frontend listing page.
// Multiple skinConcern tags allowed per product (matches multi-page presence in the original UI).

const products = [
  // ───────────────────────── SERUMS ─────────────────────────
  {
    name: "Acne Serum",
    price: 1870.00,
    oldPrice: 2200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/16_4baada09-1de9-4a47-afe0-e1f671b3dd43.jpg?v=1738904197",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/16_4baada09-1de9-4a47-afe0-e1f671b3dd43.jpg?v=1738904197",
      "https://shopblissfulbeauty.com/cdn/shop/files/15_f164d236-3564-4118-b717-5e58441a86d6.png?v=1738904197",
      "https://shopblissfulbeauty.com/cdn/shop/files/13_0e064ecf-16cf-4115-b582-5f2d078d1289.png?v=1738904197",
    ],
    description:
      "Tackle stubborn acne, clear blackheads, and refine your pores with our powerful Acne Serum. Acne Serum is created from a carefully balanced blend of 1.5% Salicylic Acid, Glycolic Acid, and Niacinamide. This potent combination works to dissolve pore-clogging impurities, reduce inflammation, and promote the healing of acne marks for a clearer, healthier-looking complexion.",
    inStock: true,
    size: "30ml",
    category: "serum",
    skinConcern: ["acne", "dark-spots"],
  },
  {
    name: "Brightening Serum",
    price: 1870.00,
    oldPrice: 2200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/24_bf5459f5-d450-4ed1-8eaa-c2562452826c.jpg?v=1738904114",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/24_bf5459f5-d450-4ed1-8eaa-c2562452826c.jpg?v=1738904114",
      "https://shopblissfulbeauty.com/cdn/shop/files/25_712de78f-0567-4b57-a28e-00e7c38e6fc7.jpg?v=1738904114",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04567-2_copy_c2010dc4-7f53-464d-8ce5-2c30de1a9d25.jpg?v=1738904114",
    ],
    description:
      "Get rid of dark spots and uneven skin tone with our 15% Vitamin C Brightening Serum. This powerful serum fights free radicals, reduces inflammation, and evens out your complexion.  This formula contains a stable formulation of ascorbic acid, ferulic acid, vitamin E, and sorbitol. Its silky, non-sticky, and fast-absorbing texture makes...",
    inStock: true,
    category: "serum",
    skinConcern: ["dark-spots"],
  },
  {
    name: "Multi Peptide Serum",
    price: 2082.00,
    oldPrice: 2450.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/8_09622dbd-e353-46a3-8adc-11e0676b8d11.jpg?v=1738904131",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/7_97e56dea-8024-4d9b-bb83-6809a3c588e3.jpg?v=1738904131",
      "https://shopblissfulbeauty.com/cdn/shop/files/8_09622dbd-e353-46a3-8adc-11e0676b8d11.jpg?v=1738904131",
      "https://shopblissfulbeauty.com/cdn/shop/files/7_97e56dea-8024-4d9b-bb83-6809a3c588e3.jpg?v=1738904131",
    ],
    description:
      "Transform your skin with our Multi-Peptide Serum, a lightweight, fast-absorbing formula infused with Centella Asiatica extract to target aging, soothe irritation, and reduce inflammation. Powered by Tri-Peptides, this serum deeply hydrates and restores elasticity while addressing fine lines and wrinkles. This magical serum also contains green tea and liquorice root extract...",
    inStock: true,
    category: "serum",
    skinConcern: ["aging", "dryness", "dark-spots", "acne"],
  },
  {
    name: "Hyaluronic Acid",
    price: 1870.00,
    oldPrice: 2200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/30_15049672-d38e-40e2-85b7-909bedda7fea.jpg?v=1738904121",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/30_15049672-d38e-40e2-85b7-909bedda7fea.jpg?v=1738904121",
      "https://shopblissfulbeauty.com/cdn/shop/files/31_b7e2e3a7-f9d1-48b8-b581-54500dbe3f26.jpg?v=1738904121",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04697_f34c7420-1150-4813-a0ce-2f019c29f5de.jpg?v=1738904121",
    ],
    description:
      "Our lightweight oil-free hyaluronic acid contains a blend of hyaluronic acid, ceramides, vitamin E, and aloe vera extract which deeply hydrates dry dehydrated skin and reduces the appearance of fine lines and wrinkles giving you healthy, radiant, bouncy skin. Ideal for skin prep before makeup. Benefits Deeply hydrates dry dehydrated skinReduces the...",
    inStock: true,
    category: "serum",
    skinConcern: ["hydration", "dryness", "aging"],
  },
  // ───────────────────────── CLEANSERS ─────────────────────────
  {
    name: "Hydrating Cleanser",
    price: 1317.00,
    oldPrice: 1550.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/11_1e20a413-604b-4947-82ab-b2505096eed9.jpg?v=1738904100",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/11_1e20a413-604b-4947-82ab-b2505096eed9.jpg?v=1738904100",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04507_54834572-2cff-4a80-9233-4ffffe08551c.jpg?v=1738904100",
      "https://shopblissfulbeauty.com/cdn/shop/files/9_fbd2c9ef-9025-4a0f-bfea-33879af25bb8.jpg?v=1738904100",
    ],
    description:
      "Our Hydrating Cleanser effectively removes makeup, dirt, and debris while preserving your skin's natural oils and protective barrier. Enriched with hyaluronic acid, ceramides, aloe vera extract, and vitamin E, this formula locks in moisture for soft, smooth, and hydrated skin.  Benefits Gently removes makeup, dirt, and debris Protects and maintains the skin's moisture...",
    inStock: true,
    category: "cleanser",
    skinConcern: ["hydration"],
  },
  {
    name: "Barrier Repair Cleanser",
    price: 1487.00,
    oldPrice: 1750.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/17_4b34f309-ec5c-4872-9c5a-cfec44253df0.jpg?v=1738904166",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/17_4b34f309-ec5c-4872-9c5a-cfec44253df0.jpg?v=1738904166",
      "https://shopblissfulbeauty.com/cdn/shop/files/16_46be6441-c634-4835-8e39-b647141203b3.jpg?v=1738904166",
      "https://shopblissfulbeauty.com/cdn/shop/files/18_4051b47e-b1e1-4213-bd63-b964861f9e2f.jpg?v=1738904166",
    ],
    description:
      "Introducing our new Barrier Repair Cleanser, infused with a barrier-boosting blend of Centella Asciatica extract, Niacinamide, Ceramides, Hyaluronic Acid, Vitamin E, and Aloe extract. Crafted to cleanse and hydrate your skin while protecting and strengthening your skin's protective barrier. Perfect for dry, extremely dry, sensitive, and acne-prone skin. This fragrance-free formula...",
    inStock: true,
    category: "cleanser",
    skinConcern: ["dryness", "acne"],
  },

  // ───────────────────────── MOISTURIZERS ─────────────────────────
  {
    name: "Barrier Repair Moisturizer",
    price: 1020.00,
    oldPrice: 1200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/22_54443bb2-261d-441a-9cde-6f0d2bf64ad5.jpg?v=1738904108",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/22_54443bb2-261d-441a-9cde-6f0d2bf64ad5.jpg?v=1738904108",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04727_copy_6bfdbf99-085d-4c30-95c6-2e5a92b0e772.jpg?v=1738904108",
      "https://shopblissfulbeauty.com/cdn/shop/files/23_762ecc4a-8cdc-4d21-8206-f7713cb3365c.jpg?v=1738904108",
    ],
    description:
      "Nourish and protect your skin with our Barrier Repair Moisturizer, this lightweight formula is created by the powerful blend of ceramides, hyaluronic acid, vitamin E, and aloe vera extract. Benefits Restores your skin's natural barrier Deliver deep hydration, locks in moistureMakes your skin soft, smooth, and radiant.",
    inStock: true,
    category: "moisturizer",
    skinConcern: ["dryness"],
  },
  {
    name: "Water Cream",
    price: 1082.00,
    oldPrice: 1450.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/1_8c0aca4d-6d91-457f-990a-6755f3f9fc17.jpg?v=1738904190",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/1_8c0aca4d-6d91-457f-990a-6755f3f9fc17.jpg?v=1738904190",
      "https://shopblissfulbeauty.com/cdn/shop/files/1_8c0aca4d-6d91-457f-990a-6755f3f9fc17.jpg?v=1738904190",
      "https://shopblissfulbeauty.com/cdn/shop/files/1_8c0aca4d-6d91-457f-990a-6755f3f9fc17.jpg?v=1738904190",
    ],
    description:
      "Our Water Cream is an innovative gel moisturizer designed to provide deep and long-lasting hydration. Formulated with a unique blend of ingredients like Olive Squalane, Ceramide-III, and Sodium Hyaluronate, this water-based formula is perfect for sensitive and oily skin types, it leaves your skin feeling refreshed and revitalized. Benefits Provides long-lasting hydration Controls excess...",
    inStock: true,
    category: "moisturizer",
    skinConcern: ["hydration"],
  },
  {
    name: "Spring Water Spray",
    price: 1870.00,
    oldPrice: 2200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/DSC04942_3a73af53-27ee-4329-980e-d377c9719fd7.jpg?v=1738904184",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04943_99b13499-ba54-4577-8e58-267c0abd8895.jpg?v=1738904184",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04942_3a73af53-27ee-4329-980e-d377c9719fd7.jpg?v=1738904184",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04943_99b13499-ba54-4577-8e58-267c0abd8895.jpg?v=1738904184",
    ],
    description:
      "Deeply hydrate your skin with the smooth spritz of Thermal Spring Water Spray. This ultimate product tones your skin and keeps it refreshed throughout the day. This thermal spray is naturally rich in minerals that provide softening properties to your skin. This fragrance-free product is suitable for all skin types. Benefits Gently...",
    inStock: true,
    category: "moisturizer",
    skinConcern: ["hydration"],
  },

  // ───────────────────────── SUNSCREEN ─────────────────────────
  {
    name: "Tinted Sunscreen",
    price: 1530.00,
    oldPrice: 1800.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/DSC04802_3aa831e0-77a6-4f10-9d59-0861fa4f4c83.jpg?v=1738904160",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04802_3aa831e0-77a6-4f10-9d59-0861fa4f4c83.jpg?v=1738904160",
      "https://shopblissfulbeauty.com/cdn/shop/files/12_063b00dc-76c6-44f8-9fe5-757aaf062bf8.jpg?v=1738904160",
      "https://shopblissfulbeauty.com/cdn/shop/files/DSC04793_29e033e3-7bb8-47e8-bd16-6bf2a3840806.jpg?v=1738904160",
    ],
    description:
      "Protect your skin while achieving a healthy, radiant glow without the white cast. Our tinted sunscreen is non-greasy, perfect for sensitive skin, and seamlessly blends into all skin tones, leaving you with smooth, protected skin. Benefits Protection against harmful UV rays. Lightweight, non-greasy formula. No white cast; suitable for all skin types and tones.",
    inStock: true,
    category: "sunscreen",
    skinConcern: ["general"],
  },

  // ───────────────────────── BUNDLES ─────────────────────────
  {
    name: "Anti Aging Bundle",
    price: 1512.00,
    oldPrice: 1890.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/AntiAgingBundle_36720b19-8331-4638-a180-b052a638548c.png?v=1738904149",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/AntiAgingBundle_36720b19-8331-4638-a180-b052a638548c.png?v=1738904149",
      "https://shopblissfulbeauty.com/cdn/shop/files/AntiAgingBundle_36720b19-8331-4638-a180-b052a638548c.png?v=1738904149",
      "https://shopblissfulbeauty.com/cdn/shop/files/AntiAgingBundle_36720b19-8331-4638-a180-b052a638548c.png?v=1738904149",
    ],
    description:
      "Unveil a youthful and revitalized complexion with our Anti-Aging Bundle, meticulously designed to combat the signs of aging. This powerful combination of skincare essentials works synergistically to reduce wrinkles, enhance firmness, and protect your skin from environmental damage. Tailored for those seeking to maintain a radiant, age-defying appearance, this bundle...",
    inStock: true,
    category: "bundle",
    skinConcern: ["aging"],
  },
  {
    name: "Teenage Skincare",
    price: 1512.00,
    oldPrice: 1890.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/TeenageSkincareBundle_d423fd86-fc68-4829-ae67-7e90a22441d2.png?v=1738904140",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/TeenageSkincareBundle_d423fd86-fc68-4829-ae67-7e90a22441d2.png?v=1738904140",
      "https://shopblissfulbeauty.com/cdn/shop/files/TeenageSkincareBundle_d423fd86-fc68-4829-ae67-7e90a22441d2.png?v=1738904140",
      "https://shopblissfulbeauty.com/cdn/shop/files/TeenageSkincareBundle_d423fd86-fc68-4829-ae67-7e90a22441d2.png?v=1738904140",
    ],
    description:
      "Introducing our Teenage Skincare Bundle, specially designed to meet the unique skincare needs of teenagers. This simple yet effective trio of products focuses on gentle cleansing, essential hydration, and daily sun protection, providing a solid foundation for a healthy skincare routine. Whether dealing with hormonal changes, stress, or environmental factors,...",
    inStock: true,
    category: "bundle",
    skinConcern: ["general"],
  },
  {
    name: "Barrier Repair Bundle",
    price: 6162.00,
    oldPrice: 7250.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/barrier_916b7f93-3a24-4a0c-9084-bc58e8e70dc5.png?v=1738904187",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/barrier_916b7f93-3a24-4a0c-9084-bc58e8e70dc5.png?v=1738904187",
      "https://shopblissfulbeauty.com/cdn/shop/files/barrier_916b7f93-3a24-4a0c-9084-bc58e8e70dc5.png?v=1738904187",
      "https://shopblissfulbeauty.com/cdn/shop/files/barrier_916b7f93-3a24-4a0c-9084-bc58e8e70dc5.png?v=1738904187",
    ],
    description:
      "Experience the ultimate skin revival with our Barrier Repair Bundle. Designed to strengthen, hydrate, and restore your skin's natural defenses, this expertly curated set addresses the needs of sensitive and compromised skin barriers. Each product in this bundle works synergistically to enhance your skin's resilience against environmental stressors, promoting a...",
    inStock: true,
    category: "bundle",
    skinConcern: ["dryness"],
  },
  {
    name: "Super Serum Bundle",
    price: 8487.00,
    oldPrice: 9750.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/AllSerumBundle_1_0009e064-395b-4cbb-bb17-e833d69be0b5.png?v=1738904143",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/AllSerumBundle_1_0009e064-395b-4cbb-bb17-e833d69be0b5.png?v=1738904143",
      "https://shopblissfulbeauty.com/cdn/shop/files/AllSerumBundle_1_0009e064-395b-4cbb-bb17-e833d69be0b5.png?v=1738904143",
      "https://shopblissfulbeauty.com/cdn/shop/files/AllSerumBundle_1_0009e064-395b-4cbb-bb17-e833d69be0b5.png?v=1738904143",
    ],
    description:
      "Elevate your skincare routine with our Super Serum Bundle, a powerful collection of high-performance serums each designed to target specific skin concerns. This bundle combines the brightening, hydrating, rejuvenating, and healing properties of our top serums, making it an essential toolkit for anyone looking to enhance their skin's overall health...",
    inStock: true,
    category: "bundle",
    skinConcern: ["general"],
  },
  {
    name: "Bright and Glowing Skin",
    price: 3400.00,
    oldPrice: 4000.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/Bright_GlowingSkinBundle_23678226-5747-413a-a24c-36ceefcdcec5.png?v=1738904154",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/Bright_GlowingSkinBundle_23678226-5747-413a-a24c-36ceefcdcec5.png?v=1738904154",
      "https://shopblissfulbeauty.com/cdn/shop/files/Bright_GlowingSkinBundle_23678226-5747-413a-a24c-36ceefcdcec5.png?v=1738904154",
      "https://shopblissfulbeauty.com/cdn/shop/files/Bright_GlowingSkinBundle_23678226-5747-413a-a24c-36ceefcdcec5.png?v=1738904154",
    ],
    description:
      "Illuminate your skin with our Bright and Glowing Skin Bundle, expertly crafted to enhance your skin's natural radiance while providing essential protection. This streamlined duo includes our high-performance Vitamin C Serum and a protective Sunscreen, making it perfect for anyone looking to achieve a luminous, even-toned complexion with minimal effort....",
    inStock: true,
    category: "bundle",
    skinConcern: ["dark-spots"],
  },
  {
    name: "AM Skincare Bundle (Oily)",
    price: 7350.00,
    oldPrice: 9000.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/AMskincare_Oilyskin_2_c0484b7c-0bc4-420d-a2b8-e22d1f93e44f.png?v=1738904134",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincare_Oilyskin_2_c0484b7c-0bc4-420d-a2b8-e22d1f93e44f.png?v=1738904134",
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincare_Oilyskin_2_c0484b7c-0bc4-420d-a2b8-e22d1f93e44f.png?v=1738904134",
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincare_Oilyskin_2_c0484b7c-0bc4-420d-a2b8-e22d1f93e44f.png?v=1738904134",
    ],
    description:
      "Created especially for oily and combination skin, this bundle is perfect for your morning skincare routine. Start your day by providing essential care to your skin. Cleanse, hydrate, and protect your skin from harmful pollutants through our ultimate AM Skincare Bundle. This bundle contains five premium products that keep your...",
    inStock: true,
    category: "bundle",
    skinConcern: ["acne"],
  },
  {
    name: "AM Skincare Bundle (Dry)",
    price: 7350.00,
    oldPrice: 9000.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/AMskincaredrysensitiveskin_9dd5e3dc-38a1-4a96-8fb5-7ae945e3a65a.jpg?v=1738904170",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincaredrysensitiveskin_9dd5e3dc-38a1-4a96-8fb5-7ae945e3a65a.jpg?v=1738904170",
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincaredrysensitiveskin_9dd5e3dc-38a1-4a96-8fb5-7ae945e3a65a.jpg?v=1738904170",
      "https://shopblissfulbeauty.com/cdn/shop/files/AMskincaredrysensitiveskin_9dd5e3dc-38a1-4a96-8fb5-7ae945e3a65a.jpg?v=1738904170",
    ],
    description:
      "Kickstart your morning with our AM Skincare Bundle, specifically tailored for those with dry, sensitive, and acne-prone skin. This comprehensive set provides everything you need for a nourishing start to the day, helping to soothe, hydrate, and protect your skin while addressing acne concerns gently. With a focus on barrier...",
    inStock: true,
    category: "bundle",
    skinConcern: ["dryness", "acne"],
  },
  {
    name: "Hydrated and Plump Skin",
    price: 6460.00,
    oldPrice: 7600.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/Hydrated_and_Plump_Skin_Bundle_9a140e0a-39ac-428a-bc24-c66bc2d2fb63.jpg?v=1738904151",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/Hydrated_and_Plump_Skin_Bundle_9a140e0a-39ac-428a-bc24-c66bc2d2fb63.jpg?v=1738904151",
      "https://shopblissfulbeauty.com/cdn/shop/files/Hydrated_and_Plump_Skin_Bundle_9a140e0a-39ac-428a-bc24-c66bc2d2fb63.jpg?v=1738904151",
      "https://shopblissfulbeauty.com/cdn/shop/files/Hydrated_and_Plump_Skin_Bundle_9a140e0a-39ac-428a-bc24-c66bc2d2fb63.jpg?v=1738904151",
    ],
    description:
      "Drench your skin in deep hydration and achieve a plumper, smoother complexion with our Hydrated and Plump Skin Bundle. Specially formulated for those who desire a moisturized, bouncy texture, this bundle combines the most effective hydrating and rejuvenating products. Each product works in harmony to enhance skin elasticity, reduce fine...",
    inStock: true,
    category: "bundle",
    skinConcern: ["hydration"],
  },
  {
    name: "Mega Bundle (Oily)",
    price: 7800.00,
    oldPrice: 9300.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Oily_and_Combination_Skin_e1d9b493-d956-4c13-86fe-9be218b407b7.jpg?v=1738904146",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Oily_and_Combination_Skin_e1d9b493-d956-4c13-86fe-9be218b407b7.jpg?v=1738904146",
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Oily_and_Combination_Skin_e1d9b493-d956-4c13-86fe-9be218b407b7.jpg?v=1738904146",
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Oily_and_Combination_Skin_e1d9b493-d956-4c13-86fe-9be218b407b7.jpg?v=1738904146",
    ],
    description:
      "With the power of seven powerful bundles, this Mega Bundle is perfectly crafted to meet the needs of oily and combination skin types. This bundle has the power to hydrate, cleanse, brighten, and protect your skin. Say goodbye to dullness, excess oil, and uneven skin tone, and say hello to...",
    inStock: true,
    category: "bundle",
    skinConcern: ["acne"],
  },
  {
    name: "PM Skincare Bundle (Oily)",
    price: 7020.00,
    oldPrice: 8200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/PMskincarebundle_2f191d81-ef79-4ca4-8b9d-3f880327c642.png?v=1738904137",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/PMskincarebundle_2f191d81-ef79-4ca4-8b9d-3f880327c642.png?v=1738904137",
      "https://shopblissfulbeauty.com/cdn/shop/files/PMskincarebundle_2f191d81-ef79-4ca4-8b9d-3f880327c642.png?v=1738904137",
      "https://shopblissfulbeauty.com/cdn/shop/files/PMskincarebundle_2f191d81-ef79-4ca4-8b9d-3f880327c642.png?v=1738904137",
    ],
    description:
      "Tailored for oily and combination skin, this PM Skincare Bundle is designed to cleanse, treat, and nourish your skin overnight. With products that balance oil production, reduce breakouts, and enhance skin barrier health, this bundle ensures you wake up to a clearer, more balanced complexion.",
    inStock: true,
    category: "bundle",
    skinConcern: ["acne"],
  },
  {
    name: "Mega Bundle (Dry)",
    price: 7800.00,
    oldPrice: 9300.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_431e5ce7-4420-4d2e-9b87-35a16334a9b3.jpg?v=1738904174",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_431e5ce7-4420-4d2e-9b87-35a16334a9b3.jpg?v=1738904174",
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_431e5ce7-4420-4d2e-9b87-35a16334a9b3.jpg?v=1738904174",
      "https://shopblissfulbeauty.com/cdn/shop/files/Mega_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_431e5ce7-4420-4d2e-9b87-35a16334a9b3.jpg?v=1738904174",
    ],
    description:
      "The Mega Bundle is an all-encompassing skincare solution specifically designed for those with dry, sensitive, and acne-prone skin. This extensive collection of products is tailored to hydrate, soothe, protect, and rejuvenate your skin, addressing multiple concerns simultaneously. From deep hydration and barrier repair to brightening and anti-aging, this bundle offers...",
    inStock: true,
    category: "bundle",
    skinConcern: ["dryness", "acne"],
  },
  {
    name: "PM Skincare Bundle (Dry)",
    price: 7020.00,
    oldPrice: 8200.00,
    discount: "15%",
    mainImage: "https://shopblissfulbeauty.com/cdn/shop/files/PM_Skincare_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_d2bb4464-7e32-4ea7-8f5e-5a563583e7f5.png?v=1738904180",
    images: [
      "https://shopblissfulbeauty.com/cdn/shop/files/PM_Skincare_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_d2bb4464-7e32-4ea7-8f5e-5a563583e7f5.png?v=1738904180",
      "https://shopblissfulbeauty.com/cdn/shop/files/PM_Skincare_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_d2bb4464-7e32-4ea7-8f5e-5a563583e7f5.png?v=1738904180",
      "https://shopblissfulbeauty.com/cdn/shop/files/PM_Skincare_Bundle_Dry_Sensitive_and_Acne_Prone_Skin_d2bb4464-7e32-4ea7-8f5e-5a563583e7f5.png?v=1738904180",
    ],
    description:
      "This PM Skincare Bundle is curated for those with dry, sensitive, and acne-prone skin, focusing on gentle cleansing, intensive moisturization, and targeted acne treatment. It nurtures the skin while addressing sensitivity and hydration needs, allowing you to achieve a calmer, more radiant complexion by morning.",
    inStock: true,
    category: "bundle",
    skinConcern: ["dryness", "acne"],
  },
];

module.exports = products;
