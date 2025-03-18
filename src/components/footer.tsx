import Button from "./button"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content_wrapper}>
        <div className={styles.mailing_list_wrapper}>
          <div className={styles.form_wrapper}>
            <p className={styles.join_mailing}>Join our mailing list</p>
            <form className={styles.mailing_form}>
              <input placeholder="Email Address" type="email" className={styles.email_input} />
              <Button text="Submit" mouseover_styles={{ "color": "var(--foreground-primary)" }} />
            </form>
          </div>
          <div>
            <p>
              Get In Touch
            </p>
            <p>
              email@example.com
            </p>
          </div>
        </div>
        <h1>
          Fayrox
        </h1>
        <br />
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <p>© 2025 Nixon Industries Ltd (NO. 15784627)</p>
          <div style={{
            height: "20px",
            borderLeft: "1px solid var(--foreground-tertiary)",
            marginInline: "10px",
            width: "1px"
          }}></div>
          <a>Privacy Policy</a>
          <div style={{
            height: "20px",
            borderLeft: "1px solid var(--foreground-tertiary)",
            marginInline: "10px",
            width: "1px"
          }}></div>
          <a>Terms and Conditions</a>
        </div>
      </div>
    </footer>
  )
}