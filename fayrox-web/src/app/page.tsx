import Button, { ButtonProps } from "@/componenets/button";
import * as props from "./page.props"

import Image from "next/image";

import { CheckCircle } from "react-bootstrap-icons";

import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.page_wrapper}>
      <div className={styles.page_title_wrapper}>
        <h1 className={styles.page_title}>
          Now you can use AI for legal tasks and know its right
        </h1>
        <h3 className={styles.page_secondary_title}>
          Fayrox is your expert legal AI where every response is verified by a human lawyer.
        </h3>
        {props.getStartedButton}
      </div>
      {props.homePageSections.map((section, index) => {
        const isOnLeft = index % 2 == 0;

        return (
          <section className={`${styles.section}  ${isOnLeft ? "" : styles.section_reverse}`} key={section.header}>
            <div className={styles.text_section}>
              <h2 className={styles.section_header}>{section.header}</h2>
              <p className={styles.section_body}>{section.content}</p>
              <div className={styles.section_bullet_wrapper}>
                {section.bullets.map(bullet => (
                  <div key={bullet} className={styles.section_bullet}>
                    <div className={styles.bullet_check_wrapper}>
                      <CheckCircle className={styles.bullet_check} />
                    </div>
                    <p>{bullet}</p>
                  </div>
                ))}
              </div>
              {section.button}
            </div>
            <Image
              src={section.image.path}
              alt={section.image.alt}
              className={styles.section_image}
              priority={true}
              style={{
                marginLeft: isOnLeft ? 'auto' : '',
                marginRight: isOnLeft ? '' : 'auto',
              }}
              width={section.image.width}
              height={section.image.height}
            />
          </section>
        )
      })}
      <div className={styles.primary_card_wrapper}>
        {props.pageCardPrimaryElements.map((card, ind) => (
          <div className={`${styles.primary_card} ${ind == 1 || ind == 2 ? '' : styles.primary_card_big}`} key={card.header}>
            <div className={styles.primary_card_icon}>{card.icon}</div>
            <div className={styles.primary_card_header}>{card.header}</div>
            <div className={styles.primary_card_body}>{card.content.map((elem, boldIndex) => {
              const shouldBold = boldIndex % 2 == 1;
              return shouldBold ?
                <span key={boldIndex} style={{ fontWeight: 'bold' }}>{elem}</span> :
                <span key={boldIndex}>{elem}</span>
            })}</div>
          </div>
        ))}
      </div>
      <div className={styles.accent_card}>
        <div className={styles.accent_card_text}>
          <h2 className={styles.accent_card_header}>
            Get answers to all your legal questions
          </h2>
          <div className={styles.accent_card_bullet_wrapper}>
            <div className={styles.accent_card_bullet}>
              <div className={styles.bullet_check_wrapper}>
                <CheckCircle className={styles.bullet_check} />
              </div>
              <p>14-day free trial</p>
            </div>
            <div className={styles.accent_card_bullet}>
              <div className={styles.bullet_check_wrapper}>
                <CheckCircle className={styles.bullet_check} />
              </div>
              <p>Accurate and up to date</p>
            </div>
            <div className={styles.accent_card_bullet}>
              <div className={styles.bullet_check_wrapper}>
                <CheckCircle className={styles.bullet_check} />
              </div>
              <p>Seamless integration</p>
            </div>
          </div>
        </div>
        <div className={styles.accent_card_button}>
          {props.getStartedButton}
        </div>
      </div>
    </main>
  );
}