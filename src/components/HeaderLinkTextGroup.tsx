import HeaderLinkText, { HeaderLinkTextProps } from "./HeaderLinkText"

// interface ExtendedHeaderLinkTextProps extends HeaderLinkTextProps {
//   matching: string;
// }

const LINKS: HeaderLinkTextProps[] = [
  {
    text: "Browse Degrees",
    href: "degrees",
  },
  {
    text: "Reviews",
    href: "reviews",
  },
  {
    text: "Categories",
    href: "reviews",
  },
]

const HeaderLinkTextGroup = () => {
  return (
    <div className="header-link-text-grp">
      {LINKS.map(({ text, href }, idx) => (
        <HeaderLinkText key={`${href}-${idx}`} text={text} href={href} classname="truncate" />
      ))}
    </div>
  )
}
export default HeaderLinkTextGroup