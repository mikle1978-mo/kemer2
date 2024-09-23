import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import cl from "./BreadCrumbs.module.css";

const BreadCrumbs = ({ breadCrumbs }) => {
    return (
        <section className={cl.breadCrumbs}>
            <ol className={cl.ol_wrap}>
                {breadCrumbs?.map((breadCrumb, index) => (
                    <li key={index} className={cl.li_wrap}>
                        <Link href={breadCrumb.url} className={cl.link}>
                            {breadCrumb.name}
                        </Link>
                        {breadCrumbs?.length - 1 !== index && (
                            <FontAwesomeIcon
                                className={cl.chevron}
                                icon={faChevronRight}
                            />
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default BreadCrumbs;
