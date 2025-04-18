import Link from "next/link";

export default function Blog() {
  return (
    <section className="py-20 relative z-10 bg-white">
      {/* Background shape */}
      <div
        className="absolute inset-y-20 left-0 right-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url(assets/images/shapes/blog-one-shape-1.png)",
        }}
      ></div>

      <div className="container relative z-10">
        {/* Section Title */}
        <div className="sm:text-left lg:text-center  mb-10">
          <span className="relative inline-block text-[18px] leading-[16px] text-fixnix-lightpurple font-semibold uppercase z-[1]">
          DIGITAL ACADEMY
            <span className="absolute top-[6px] left-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
            <span className="absolute top-[6px] right-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
          </span>
          <h2 className="text-3xl md:text-4xl  font-bold mt-2">
          The Library of Light
          </h2>
          <p className="mt-2 text-gray-600 text-base md:text-lg">
          Access the echoes of divine knowledge curated, digitized, and decoded for the New Generation Sufi mind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Blog Item 1 */}
          <div className="bg-fixnix-lightpurple shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative group">
              <img src="assets/images/blog/blog-1-1.jpg" alt="" className="w-full h-64 object-cover rounded-t-xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-700 bg-fixnix-lightpurple">
                <Link href="/scholarlyinsights">
                  <i className="fa fa-plus text-white text-2xl"></i>
                </Link>
              </div>
            </div>
            <div className="px-4 py-3 ">
             
              <h3 className="text-xl font-semibold mt-2 text-fixnix-darkpurple">
                <Link href="/scholarlyinsights" className="text-white">Scholarly Insights</Link>
              </h3>
              <p className="text-sm text-gray-100 mt-2">
                Dive into timeless commentaries, Sufi manuscripts, and contemporary reflections merging  wisdom with modern inquiry.
              </p>
            </div>
          </div>

          {/* Blog Item 2 */}
          <div className="bg-fixnix-lightpurple shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative group">
              <img src="assets/images/blog/blog-1-2.jpg" alt="" className="w-full h-64 object-cover rounded-t-xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-700 bg-fixnix-lightpurple">
                <Link href="/visualresources">
                  <i className="fa fa-plus text-white text-2xl"></i>
                </Link>
              </div>
            </div>
            <div className="px-4 py-3 ">
              
              <h3 className="text-xl font-semibold mt-2 text-gray-800">
                <Link href="/visualresources" className="text-white" >Visual Resources</Link>
              </h3>
              <p className="text-sm text-gray-100 mt-2">
                Explore sacred diagrams, cosmic maps, and interactive infographics that visualize mystical concepts in scientifically resonant design.
              </p>
            </div>
          </div>

          {/* Blog Item 3 */}
          <div className="bg-fixnix-lightpurple shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative group">
              <img src="assets/images/blog/blog-1-3.jpg" alt="" className="w-full h-64 object-cover rounded-t-xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-700 bg-fixnix-lightpurple">
                <Link href="/digitalbooks">
                  <i className="fa fa-plus text-white text-2xl"></i>
                </Link>
              </div>
            </div>
            <div className="px-4 py-3 ">
              
              <h3 className="text-xl font-semibold mt-2 text-gray-800">
                <Link href="/digitalbooks"className="text-white"> Digital Books</Link>
              </h3>
              <p className="text-sm text-gray-100 mt-2">
                A digital sanctum of classical texts, treatises, and modern explorations, bridging the written word with the ineffable Real.
              </p>
            </div>
          </div>

          {/* Blog Item 4 */}
          <div className="bg-fixnix-lightpurple  shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative group">
              <img src="assets/images/blog/blog-1-4.jpg" alt="" className="w-full h-64 object-cover rounded-t-xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-700 bg-fixnix-lightpurple">
                <Link href="/audiospectrum">
                  <i className="fa fa-plus text-white text-2xl"></i>
                </Link>
              </div>
            </div>
            <div className="px-4 py-3 ">
              
              <h3 className="text-xl font-semibold mt-2 text-gray-800">
                <Link href="/audiospectrum" className="text-white">Audio Spectrum</Link>
              </h3>
              <p className="text-sm text-gray-100 mt-2">
                Enter auditory immersion dhikr, lectures, Sufi poetry, and harmonic meditations to attune the soul to divine rhythm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
