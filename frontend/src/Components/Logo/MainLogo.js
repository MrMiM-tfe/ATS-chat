import { Image } from "react-bootstrap"

const MainLogo = ({fit}) => {

    let ClassName = "w-100"

    if (fit === "h") {
        ClassName = "h-100"
    }

    return (
        <div className="main-logo">
            <Image src="/assets/imgs/logo.png" className={ClassName}></Image>
        </div>
    );
}
 
export default MainLogo;