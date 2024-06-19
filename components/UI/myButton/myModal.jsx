import "./myModal.css";

export default function MyModal({ isOpen, toggleOpen, children }) {
    return (
        <div className={`overlay ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
            <div className='modal'>{children}</div>
        </div>
    );
}
