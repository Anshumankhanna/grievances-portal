import Image from "next/image";
import styles from "@/components/Banner/Banner.module.css";
import Link from "next/link";

export default function Banner() {
    return (
        <div className="px-6 bg-custom-gradient">
            <Link className={styles.banner} href={"https://msit.in/"}>
                <div className=" max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <Image
                        src={"/images/msit.png"}
                        alt="MSIT Image"
                        title="MSIT"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <div className="md:px-8 px-2">
                    <h1
                        className={`md:text-3xl text-xl font-bold `}
                        title="Maharaja Surajmal Institute of Technology"
                    >
                        Maharaja Surajmal Institute of Technology
                    </h1>
                    <h5 className={`text-xs md:text-base font-semibold`}>
                        Affiliated to GGSIPU | NAAC Accredited &apos;A&apos;
                        Grade | ISO 9001:2015 Certified | Approved by AICTE
                    </h5>
                </div>
            </Link>
        </div>
    );
}
