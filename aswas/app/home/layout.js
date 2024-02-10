
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Row} from 'react-bootstrap';
import styles from './home.module.css';



export default function homelayout({children}){
      return(
            <>
            <div className={styles.container}>

               
                {/* Mobile Screen Header */}
                <Row className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerOffcanvaBtn}>
                        <img src="/images/top_menu_drawer.png" alt='logo1'></img>
                        </div>

                        <div className={styles.logo}>
                            <img src='/images/west_bengal_biswa_bangla_logo.png' alt='logo1'></img>
                            <div className={styles.logoText}><p className='m-0'>VCM</p></div>
                        </div>

                    </div>
                </Row>
                


                    <Row className={styles.body}>
                    {children}
                </Row>

            </div>

        </>
      )
}