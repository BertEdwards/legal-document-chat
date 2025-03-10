import Button, { ButtonProps } from "@/componenets/button"
import { ReactElement } from "react"

import { FileEarmarkText, Pen, People, PlusSquare } from "react-bootstrap-icons"

const getStartedButtonProps: ButtonProps = {
  text: "Get started"
}

const bookACallButtonProps: ButtonProps = {
  text: "Book a call"
}

export const getStartedButton = <Button {...getStartedButtonProps} />
export const bookACallButton = <Button {...bookACallButtonProps} />

export interface SectionImageProps {
  path: string,
  alt: string,
  width: number,
  height: number
}

export interface HomePageSection {
  header: string,
  content: string,
  image: SectionImageProps,
  bullets: string[],
  button: ReactElement
}

export const homePageSections: HomePageSection[] = [
  {
    header: "Drafted by AI, Reviewed by Lawyers",
    content: "Fayrox enables you to unlock the powerful benefits of AI without any of the risks. Avoid overpaying for lawyers and confidently conduct routine legal work yourself. If you want to check the AI's response we have a team of lawyers on hand to ensure all responses are legally accurate.",
    image: {
      path: "/mainPageImage1.png",
      alt: "Graphic depicting a laptop",
      width: 381,
      height: 292
    },
    bullets: [
      "Use AI for legal work without worrying about hallucinations.",
      "Reduce legal costs by bringing more in-house.",
      "Option to meet with a lawyer when you need."
    ],
    button: getStartedButton
  },
  {
    header: "Expert Legal AI",
    content: "Fayrox Legal's AI assistant is your business' own expert in-house legal counsel; tailoring its advice to the specifics of your company. It knows which questions to ask and when, guiding you through the relevant legal processes. Legal GPT enables your business to conduct its routine legal work independently.",
    image: {
      path: "/mainPageImage2.png",
      alt: "Graphic depicting a graph",
      width: 381,
      height: 323
    },
    bullets: [
      "Get answers in seconds, not hours.",
      "Highly personalised legal advice.",
      "All responses verified by a human lawyer."
    ],
    button: getStartedButton
  },
  {
    header: "Counsel Beyond AI",
    content: "We understand that AI has its limits. When you need a more comprehensive set of legal services that go beyond AI, we have an expert team of corporate commercial lawyers to help you and your business.",
    image: {
      path: "/mainPageImage3.png",
      alt: "Graphic depicting a group meeting",
      width: 381,
      height: 216
    },
    bullets: [
      "Quick access to traditional legal services.",
      "150+ years of combined legal experience.",
      "Legal services tailored to you."
    ],
    button: bookACallButton
  }
]

export interface PageCardPrimary {
  icon: ReactElement
  header: string
  content: string[]
}

// FileEarmarkText, Pen, People, PlusSquare

export const pageCardPrimaryElements: PageCardPrimary[] = [
  {
    icon: <PlusSquare />,
    header: "Do more for less",
    content: [
      "LegalGPT enables your business to ", "reduce legal costs", " by arming you with the tools and knowledge need to conduct legal work independently. All while offering you the opportunity to check with experts where necessary."
    ]
  },
  {
    icon: <FileEarmarkText />,
    header: "Draft legal documents",
    content: [
      "With LegalGPT, draft legal documents tailored to your specific business needs. From NDAs to supplier contracts, LegalGPT enables you to ", "get to a first draft, quicker."
    ]
  },
  {
    icon: <Pen />,
    header: "Easily review & edit",
    content: [
      "Got a critical contract that you need to review? LegalGPT can tell you wether the contract matches standard terms and ", "spot potential red flags."," Ask questions about the document as a whole or focus on specific clauses."
    ]
  },
  {
    icon: <People />,
    header: "Verified by human lawyers",
    content: [
      "In legal work mistakes can be costly which is why every AI response is reviewed and ", "verified by a human lawyer", ", ensuring responses are legally accurate."
    ]
  }
]