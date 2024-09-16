import Link from "next/link";
import React from "react";
import cl from "./UserAddresses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getDeliveryPrice } from "@/helpers/helpers";
import { mark } from "@/lib/const/const";

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
                            {address.state},{/* {address.zipCode}, */}
                            {/* {address.country} */}
                            <br />
                            Тел: {address.phoneNo}
                        </p>
                    </figcaption>
                    <div className={cl.delivery}>
                        Доставка: {mark}
                        {getDeliveryPrice(address.state)}
                    </div>
                </figure>
            </div>
        </Link>
    ));
};

export default UserAddresses;
