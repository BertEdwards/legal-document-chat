import Button from "./button"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mailing_list_wrapper}>
        <div>
          <p>Join our mailing list</p>
          <form>
            <input placeholder="Email Address" type="email" className={styles.email_input}/>
            <Button text="Submit"/>
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
      <p>© 2025 Nixon Industries Ltd (NO. XXXXX) | Privacy Policy | Terms and Conditions</p>
    </footer>
  )
}