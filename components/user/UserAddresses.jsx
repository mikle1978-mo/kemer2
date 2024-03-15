import Link from "next/link";
import React from "react";
import cl from "./UserAddresses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const UserAddresses = ({ addresses }) => {
    return addresses?.map((address) => (
        <Link href={`/address/${address._id}`} key={address._id}>
            <div className={cl.adresses_wrap}>
                <figure className={cl.figure}>
                    <div className={cl.icon_wrap}>
                        <span className={cl.icon}>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                    </div>
                    <figcaption className={cl.figcaption}>
                        <p>
                            {address.street} <br /> {address.city},{" "}
                            {address.state}, {address.zipCode},{" "}
                            {address.country}
                            <br />
                            Phone no: {address.phoneNo}
                        </p>
                    </figcaption>
                </figure>
            </div>
        </Link>
    ));
};

export default UserAddresses;
