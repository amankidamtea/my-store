import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const hanldeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setLoading(false);
      push("/auth/login");
    } else {
      setLoading(false);
      setError("Email have an ready");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={hanldeSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="passwoord"
              name="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account ? Sign in <Link href={"/auth/login"}>here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
