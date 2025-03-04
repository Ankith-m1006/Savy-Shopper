// import { FC } from "react";
// import { FaGithub, FaLinkedin } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";

// interface SocialLink {
//   icon: React.ElementType; // Ensure it's a valid React component
//   href: string;
//   label: string;
// }

// const Footer: FC = () => {
//   const socialLinks: SocialLink[] = [
//     {
//       icon: FaGithub,
//       href: "https://github.com/ankith",
//       label: "GitHub Profile",
//     },
//     {
//       icon: FaLinkedin,
//       href: "https://www.linkedin.com/in/ankith",
//       label: "LinkedIn Profile",
//     },
//   ];

//   return (
//     <footer className="border-t bg-background">
//       <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
//         <Separator className="w-full md:hidden" />
//         <div className="md:ml-auto flex items-center gap-2">
//           {socialLinks.map(({ icon: Icon, href, label }) => (
//             <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
//               <Button variant="ghost" size="icon" className={cn("hover:text-primary")}>
//                 {Icon && <Icon className="w-5 h-5" aria-hidden="true" />} {/* ✅ Fix */}
//               </Button>
//             </a>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
