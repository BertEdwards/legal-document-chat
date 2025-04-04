import Link from "next/link"
import Button from "./button"
import styles from "./footer.module.css"

export default function Footer() {
  const handleFormSubmit: (f: FormData) => void = (formData) => {
    console.log("name " + formData.get("name"))
    console.log("email " + formData.get("email"))
  }

  const mailForm = (
    <form className={styles.mailing_form} action={handleFormSubmit}>
      <input name="name" placeholder="Name" type="text" className={styles.email_input} required={true} />
      <input name="email" placeholder="Email Address" type="email" className={styles.email_input} required={true} />
      <button type="submit">Submit</button>
    </form>
  )

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content_wrapper}>
        <div className={styles.mailing_list_wrapper}>
          <div className={styles.form_wrapper}>
            <p className={styles.join_mailing}>Join our mailing list</p>
            {mailForm}
          </div>
          <div>
            <p>
              Get In Touch
            </p>
            <p>
              contact@fayrox.com
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
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}