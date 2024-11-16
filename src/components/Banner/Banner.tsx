import Image from "next/image";
import styles from "@/components/Banner/Banner.module.css";
import Link from "next/link";

export default function Banner() {
    return (
        <Link className={`${styles.banner}`} href={"/"}>
            <Image
                src={"/images/msit.png"}
                alt="MSIT Image"
                title="MSIT"
                width={100}
                height={100}
            />
            <div>
                <h1 className={`text-[3vmax] font-bold`} title="Maharaja Surajmal Institute of Technology">
                    Maharaja Surajmal Institute of Technology
                </h1>
                <h5 className={`text-[1.2vmax] font-semibold`}>
                    Affiliated to GGSIPU | NAAC Accredited &apos;A&apos; Grade | ISO 9001:2015 Certified | Approved by AICTE
                </h5>
            </div>
        </Link>
    );
};