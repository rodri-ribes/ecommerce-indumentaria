import style from "./Footer.module.scss"
import { GrInstagram } from "react-icons/gr";
import { NAME_OF_THE_PAGE } from '../../constants/constants'

function Footer() {
    return (
        <footer className={style.container}>
            <div className={style.container__copy}>
                <p>&copy; {new Date().getFullYear()} {NAME_OF_THE_PAGE} All rights reserved | This page is made with ♥ by <a href="https://rodrigoribes.netlify.app" target="_blank" rel="noreferrer">Ribes</a></p>
            </div>
        </footer>
    );
}

export default Footer;