import Banner from "@/components/sections/home3/Banner";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
const ResearchSlides=[
  {
    subTitle: "Preserving Wisdom, Advancing Knowledge Forward",
    title: "Exploring Sufi Thought<br/>Through Research",
    text: "  Dive into in-depth research and scholarly publications that uncover the<br/> historical, and scientific dimensions of Kashmiri Sufism.",
    buttonText: "Read More",
    buttonLink: "/Home",
  },
  {
    subTitle: "Unveiling Sufi Insights Through Scholarship",
    title: "A Gateway to Spiritual<br/> Research & Learning",
    text: "Access a wealth of publications exploring the intersection of Sufism, ,<br/>philosophy, science, and spiritual traditions in a modern context.",
    buttonText: "Explore",
    buttonLink: "/Home",
  },
  {
    subTitle: "Sacred Knowledge Meets Academic Inquiry",
    title: "Deepening Understanding <br/>Through Sufi Studies",
    text: "Our research and publications offer profound insights into Kashmiri Sufi teachings,<br/> bridging tradition with contemporary academic exploration.",
    buttonText: "Join Now",
    buttonLink: "/Home",
  },
  {
    subTitle: " Expanding Minds, Illuminating Sufi Wisdom",
    title: " Documenting the Legacy <br/>of Sufi Thought",
    text: " Explore meticulously curated research on the history, ethics, and spiritual<br/> practices that define Kashmiri Sufi traditions and teachings.",
    buttonText: "Explore",
    buttonLink: "/Home",
  },
  {
    subTitle: "Bridging Tradition with Modern Inquiry",
    title: " Scholarly Exploration <br/>of Sufi Sciences",
    text: " Our publications serve as a foundation for learning, offering critical perspectives <br/>on Sufi philosophy, consciousness, and ethical living.",
    buttonText: "Join Now",
    buttonLink: "/Join",
  },
];
export default function Home() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Banner slides={ResearchSlides}/>
      <div className="py-16 bg-gray-100 text-left-mobile">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="relative text-left-mobile inline-block text-[16px] leading-[16px] text-fixnix-lightpurple font-semibold uppercase z-[1]">
              Scholarly Insights
              <span className="absolute top-[6px] left-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
              <span className="absolute top-[6px] right-[-56px] w-[40px] h-[2px] bg-fixnix-lightpurple"></span>
            </span>
            <h2 className="text-4xl font-bold text-fixnix-darkpurple mt-3 text-left-mobile">
              Our Research Focus
            </h2>
            <p className="text-gray-600 my-2 text-left-mobile">
              At the heart of our research lies the exploration of Sufi Science,
              which encompasses not only the metaphysical realms of existence
              but also the tangible manifestations of the sacred in the natural
              world. Through our studies, we engage with the eternal questions
              of life, consciousness, and the cosmos—investigating how Sufi
              teachings about the unity of existence, sacred geometry and energy
              can be harmonized with modern fields like quantum physics.
            </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={`assets/images/blog/blog-1-${id}.jpg`}
                    alt="Blog Image"
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <Link
                      href={`/ResearchDetails/${id}`}
                      className="text-white text-2xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="flex space-x-4 text-gray-500 text-sm mb-2">
                    <li>
                      <Link
                        href={`/ResearchDetails/${id}`}
                        className="flex items-center text-fixnix-lightpurple hover:text-fixnix-darkpurple font-bold"
                      >
                        <i className="fa fa-calendar-alt mr-2"></i> 5 AUG 2023
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/ResearchDetails/${id}`}
                        className="flex items-center text-fixnix-lightpurple hover:text-fixnix-darkpurple font-bold"
                      >
                        <i className="far fa-comments mr-2"></i> 02 COMMENTS
                      </Link>
                    </li>
                  </ul>
                  <h3 className="text-lg font-semibold text-fixnix-darkpurple mb-3">
                    <Link
                      href={`/ResearchDetails/${id}`}
                      className="text-fixnix-darkpurple hover:text-fixnix-lightpurple"
                    >
                      Blog Post Title {id}
                    </Link>
                  </h3>
                  <div>
                    <Link
                      href={`/ResearchDetails/${id}`}
                      className="inline-block bg-fixnix-lightpurple text-white hover:bg-fixnix-darkpurple px-4 py-2 rounded-md"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <ul className="flex space-x-4 text-gray-600 text-lg">
              <li className="border px-3 py-2 rounded-md cursor-pointer  bg-fixnix-lightpurple hover:bg-fixnix-darkpurple hover:text-white">
                <Link href="#" className="text-white">
                  1
                </Link>
              </li>
              <li className="border px-3 py-2 rounded-md cursor-pointer  bg-fixnix-lightpurple hover:bg-fixnix-darkpurple hover:text-white">
                <Link href="#" className="text-white">
                  2
                </Link>
              </li>
              <li className="border px-3 py-2 rounded-md cursor-pointer  bg-fixnix-lightpurple hover:bg-fixnix-darkpurple hover:text-white">
                <Link href="#" className="text-white">
                  3
                </Link>
              </li>
              <li className="border px-3 py-2 rounded-md cursor-pointer bg-fixnix-lightpurple hover:bg-fixnix-darkpurple hover:text-white">
                <Link href="#" className="text-white" aria-label="Next">
                  <i className="fa fa-angle-double-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}