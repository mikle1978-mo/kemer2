import cl from "./LandingsContact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faTelegram,
    faWhatsapp,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function LandingsContact() {
    return (
        <>
            <div className={cl.footer__content}>
                <div className={cl.footer__icons}>
                    <a
                        href='tel:+905356062642'
                        target='_blank'
                        className={cl.footer__link}
                    >
                        <FontAwesomeIcon className={cl.icons} icon={faPhone} />
                    </a>
                    <a
                        href='mailto:azimuth-m@yandex.ru?subject=Important-mail:&body=Hello.'
                        type='email'
                        className={cl.footer__link}
                        target='_blank'
                    >
                        <FontAwesomeIcon
                            className={cl.icons}
                            icon={faEnvelope}
                        />
                    </a>
                    <a
                        href='https://t.me/MikleGromov'
                        target='_blank'
                        className={cl.footer__link}
                    >
                        <FontAwesomeIcon
                            className={cl.icons}
                            icon={faTelegram}
                        />
                    </a>
                    <a
                        href='https://wa.me/79162119006'
                        target='_blank'
                        className={cl.footer__link}
                    >
                        <FontAwesomeIcon
                            className={cl.icons}
                            icon={faWhatsapp}
                        />
                    </a>
                    <a
                        href='https://instagram.com/azimuth.off?igshid=OGQ5ZDc2ODk2ZA=='
                        target='_blank'
                        className={cl.footer__link}
                    >
                        <FontAwesomeIcon
                            className={cl.icons}
                            icon={faInstagram}
                        />
                    </a>
                    <a
                        href='https://twitter.com/gromovmu'
                        target='_blank'
                        className={cl.footer__link}
                    >
                        <FontAwesomeIcon
                            className={cl.icons}
                            icon={faTwitter}
                        />
                    </a>
                </div>

                <p className={cl.footer__link}>Анталия, Турция</p>
            </div>
            <footer className={cl.copyright}>
                Copyright © 2020-2023 Kemer.app
            </footer>
        </>
    );
}
