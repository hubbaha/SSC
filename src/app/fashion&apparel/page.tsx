import Layout from "@/components/layout/Layout";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Banner from "@/components/sections/home3/Banner";
const FashionSlides = [
  {
    subTitle: "Elegance Woven with Spiritual Essence",
    title: " Timeless Sufi-Inspired<br/> Fashion & Apparel",
    text: " Discover handcrafted clothing inspired by Kashmiri Sufi traditions, blending heritage,<br/> artistry, and spirituality into every stitch.",
    buttonText: "Read More",
    buttonLink: "/Home",
  },
  {
    subTitle: "Wear the Spirit of Tradition",
    title: " Sufi-Inspired Attire<br/> for Every Occasion",
    text: "Explore exquisite garments infused with cultural symbolism and crafted with<br/> devotion, reflecting the grace of Kashmiri Sufi heritage.",
    buttonText: "Explore Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Artistry, Culture, Spirituality in Fashion",
    title: " Handcrafted Apparel Rooted<br/> in Kashmiri Tradition",
    text: "  Adorn yourself with beautifully designed garments that embody the <br/>elegance, wisdom, and cultural depth of Kashmiri Sufi traditions.",
    buttonText: "Join Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Fashion That Reflects Inner Harmony",
    title: "Experience the Beauty<br/> of Sufi Elegance",
    text: "From flowing robes to intricate patterns, embrace a fashion line that<br/> fuses spirituality, tradition, and contemporary style.",
    buttonText: "Explore Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Graceful Attire, Inspired by Spirituality",
    title: "Traditional Textiles with<br/> a Sacred Touch",
    text: "Adorn yourself with beautifully designed garments that embody the elegance, <br/>wisdom, and cultural depth of Kashmiri Sufi traditions.",
    buttonText: "Join Now",
    buttonLink: "/Join",
  },
];

export default function Home() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Banner slides={FashionSlides}/>
      {/* Page Title */}
      <section className="team-top text-left-mobile">
        <div className="container mx-auto px-4">
          <div className="text-center sm:text-left relative block mt-[-6px] mb-[10px] z-[1]">
            {/* Section Tagline */}
            <span className="relative inline-block text-[18px] leading-[16px] text-fixnix-lightpurple font-semibold uppercase z-[1]">
              FASHION & APPAREL
              <span className="absolute top-[6px] left-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
              <span className="absolute top-[6px] right-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
            </span>

            {/* Section Title */}

            {/* Section Text */}
            <p className="pt-[20px] text-center text-gray-600 text-sm sm:text-base md:text-md lg:text-lg leading-[1.8] sm:leading-[2] md:leading-[1.5]">
              Kashmiri woolen robes, handwoven with local wool, offer
              traditional spiritual wear, while Pashmina shawls provide divine
              softness and warmth. Embroidered tunics and elegant jackets
              showcase intricate Kashmiri embroidery, blending tradition with
              artistry. For meditation, Sufi whirling skirts are handmade for
              dervishes, reflecting Kashmir’s craftsmanship and spiritual
              essence in every stitch.
            </p>
          </div>
        </div>
      </section>
      {/* Product Start */}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <div className="p-4 border rounded-lg  bg-fixnix-lightpurple shadow-sm relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-2 pr-10  border rounded-lg bg-fixnix-lightpurple "
                />
                <i className="fa fa-search absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-100"></i>
              </div>

              <div className="p-4 border rounded-lg bg-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">Price</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-16 p-1 border rounded-lg text-center"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    className="w-16 p-1 border rounded-lg text-center"
                  />
                  <button className="px-3 py-1 bg-fixnix-lightpurple text-white rounded-lg">
                    Go
                  </button>
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-gray-100 shadow-sm">
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/jewelry&accessories"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      Jewelry & Accessories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wall&artdecor"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      Art & Wall Decor
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/home&decor"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      {" "}
                      Home & Living
                    </Link>
                  </li>
                  <li className="font-bold">
                    <Link
                      href="/fashion&apparel"
                      className=" hover:text-fixnix-darkpurple"
                    >
                      Fashion & Apparel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/medication&wellness"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      Wellness & Meditation
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </div>
            {/* Products */}
            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                <p>Showing 1–9 of 12 results</p>
                <select className="p-2 border bg-gray-100 rounded-lg">
                  <option className="hover:bg-fixnix-lightpurple">
                    Sort by popular
                  </option>
                  <option>Sort by Price</option>
                  <option>Sort by Ratings</option>
                </select>
              </div>
              <div className="grid grid-cols-1  shadow-sm sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Card */}
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="border shadow-light-purple  rounded-lg   p-4"
                    style={{ boxShadow: "fixnix-lightpurple" }} // Light purple shadow
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={`/assets/images/shop/produc${i + 1}.jpg`}
                        alt="Product"
                        className="w-full h-48 object-cover hover:scale-125"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-yellow-500">
                        {[...Array(5)].map((_, j) => (
                          <i key={j} className="fa fa-star"></i>
                        ))}
                      </div>
                      <h4 className="mt-2 font-semibold ">
                        <Link
                          href="product-details"
                          className="text-fixnix-darkpurple"
                        >
                          Product {i + 1}
                        </Link>
                      </h4>
                      <p className="text-lg font-bold text-gray-600">
                        ${(i + 1) * 10 + 20}.00
                      </p>
                      <div className="mt-3">
                        <Link
                          href="/productdetails"
                          className="bg-fixnix-lightpurple hover:bg-fixnix-darkpurple text-white px-4 py-2 rounded-lg"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product End */}
    </Layout>
  );
}
