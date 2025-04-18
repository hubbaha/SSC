import Layout from "@/components/layout/Layout";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Banner from "@/components/sections/home3/Banner";

const MusicSlides = [
  {
    subTitle: "Melodies That Elevate the Soul",
    title: " Experience the Rhythm <br/>of Sufi Devotion",
    text: " Immerse yourself in the mystical sounds of Sufi music, where divine melodies and<br/> sacred rhythms inspire peace and enlightenment.",
    buttonText: "Read More",
    buttonLink: "/Home",
  },
  {
    subTitle: "Sacred Sounds, Spiritual Awakening, Harmony",
    title: " Timeless Sufi Music<br/> for Inner Peace",
    text: "Explore a curated collection of Sufi chants, devotional songs, and healing soundscapes<br/> designed to deepen your spiritual journey.",
    buttonText: "Explore Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Echoes of Devotion and Love",
    title: "Mystical Sufi Soundscapes <br/>for the Soul",
    text: " Let the hypnotic rhythms of Kashmiri Sufi music transport you <br/>into a realm of divine connection and meditative bliss.",
    buttonText: "Join Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Music That Awakens the Heart",
    title: "Discover the Spiritual<br/> Power of Sound",
    text: "From traditional Qawwali to meditative instrumental pieces, our Sufi music collection <br/>fosters serenity, devotion, and mindful reflection.",
    buttonText: "Explore Now",
    buttonLink: "/Home",
  },
  {
    subTitle: "Let the Spirit Dance Freely",
    title: "Sacred Chants and<br/> Divine Harmonies",
    text: "Feel the transcendence of Sufi music—soulful melodies, rhythmic poetry,<br/> and sacred sounds designed to uplift and inspire.",
    buttonText: "Join Now",
    buttonLink: "/Join",
  },
];

export default function Home() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Banner slides={MusicSlides}/>
      {/* Page Title */}
      <section className="team-top text-left-mobile">
        <div className="container mx-auto px-4">
          <div className="text-center sm:text-left relative block mt-[-6px] mb-[10px] z-[1]">
            {/* Section Tagline */}
            <span className="relative inline-block text-[18px] leading-[16px] text-fixnix-lightpurple font-semibold uppercase z-[1]">
              AUDIO SPECTRUM
              <span className="absolute top-[6px] left-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
              <span className="absolute top-[6px] right-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
            </span>

            {/* Section Title */}

            {/* Section Text */}
            <p className="pt-[20px] text-center text-gray-600 text-sm sm:text-base md:text-md lg:text-lg leading-[1.8] sm:leading-[2] md:leading-[1.5]">
              The Kashmiri Rubab, a traditional stringed instrument, is
              handcrafted by skilled artisans, while the Kashmiri Tabla
              accompanies Sufi qawwali performances and spiritual gatherings.
              The harmonium enriches Sufi melodies and sacred hymns, creating
              soulful tunes. Complementing these are Sufi musical recordings,
              featuring traditional qawwali and instrumental music, capturing
              Kashmir’s spiritual essence.
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
                      href="/scholarlyinsights"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      Scholarly Insights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/visualresources"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      Visual Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/digitalbooks"
                      className="text-fixnix-lightpurple font-semibold hover:underline hover:text-fixnix-darkpurple"
                    >
                      {" "}
                      Digital Books
                    </Link>
                  </li>

                

                  
                  <li className="font-bold">
                    <Link
                      href="/audiospectrums"
                      className=" hover:text-fixnix-darkpurple"
                    >
                      Audio Spectrum
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
              <div className="grid grid-cols-1 shadow-sm sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Product Card */}
  {[...Array(9)].map((_, i) => (
    <div
      key={i}
      className="border shadow-light-purple rounded-lg p-4"
      style={{ boxShadow: "fixnix-lightpurple" }} // Light purple shadow
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={`/assets/images/shop/music1.png`}
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
        <h4 className="mt-2 font-bold text-lg">
          <Link href="product-details" className="text-fixnix-darkpurple">
            Product {i + 1}
          </Link>
        </h4>
        
        <p className="text-md font-bold text-fixnix-darkpurple text-left">Format:<span className="text-gray-600 font-normal"> Digital MP3 / WAV</span></p>
        <p className="text-md font-bold text-fixnix-darkpurple text-left"> Duration:<span className="text-gray-600 font-normal">Approx. 60 min</span> </p>
        
        <p className="text-xl font-bold text-fixnix-darkpurple">${(i + 1) * 10 + 20}.00</p>
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
