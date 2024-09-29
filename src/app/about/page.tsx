import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

const content = `# About Me

![Kasim Saifi](https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/clvlugru90000o4g8ahxp069s/db7abbe3-aa5c-433e-a16d-cbf137d1c9e5.png/public)

Hello! I'm Kasim Saifi, a passionate developer and entrepreneur on a journey of building meaningful projects and solving real-world problems. From a young age, I have always been intrigued by the power of technology and its ability to create impactful solutions. Over the years, I've honed my skills in various technologies such as Next.js, React.js, Node.js, and Django, among others, while also diving into entrepreneurial ventures.

After working on several startup projects, including *FinalStop*, *Cariur*, and *Hypermove*, I've come to realize that the process of creation is what drives me the most. Through these experiences, I’ve learned valuable lessons about innovation, collaboration, and the importance of staying adaptive in a fast-paced digital world.

![Kasim Saifi](https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/clvlugru90000o4g8ahxp069s/6b080e65-2329-4a36-ad5c-0a6af8d9aeb1.png/public)

This site serves as a platform for me to share my journey, experiences, and stories with the hope of inspiring others. From coding and product development to my thoughts on startup culture and the future of technology, I'll be documenting the lessons I've learned along the way.

This story isn't just about my professional growth; it's also about the personal evolution that comes with pursuing a passion-driven career. I'll share the challenges, the triumphs, and the insights gained from the people I've met and the projects I've worked on.

Join me as I continue to explore new ideas, develop innovative solutions, and work towards building a community where creativity and technology meet.

Let's build something amazing together!

Best regards,

Kasim Saifi`;

export async function generateMetadata() {
  return {
    title: "About Kasim Saifi",
    description:
      "Discover the journey and story of Kasim Saifi, a passionate developer and entrepreneur.",
    openGraph: {
      title: "About Kasim Saifi",
      description:
        "Learn more about Kasim Saifi and his journey in technology and entrepreneurship.",
      images: [
        signOgImageUrl({
          title: "Kasim Saifi",
          label: "About Me",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
