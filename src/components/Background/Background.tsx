"use client";

import React, { useState } from 'react';
import styles from "@/components/Background/Background.module.css"

const imagesPath = "/images/";
const pageBgImgArr = ["building-photo.png", "students-in-front-of-building.jpg", "building-photo-2.png"];

export default function Background({
    children,
}: {
    children: React.ReactNode,
}) {
    const [imgIndex, setImgIndex] = useState(0);

    setInterval(() => {
        setImgIndex((imgIndex + 1) % pageBgImgArr.length);
    }, 4000);

    return (
        <div className={`${styles.background}`}>
            <div
                style={{
                    backgroundImage: `url(${imagesPath}${pageBgImgArr[imgIndex]})`,
                    transition: "all linear 2s",
                    zIndex: "1",
                }}
            ></div>
            {children}
        </div>
    );
};