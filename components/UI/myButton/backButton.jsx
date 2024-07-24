import { useRouter } from "next/navigation";
import "./backButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            type='button'
            onClick={() => router.back()}
            className='backButton'
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
};

export default BackButton;
