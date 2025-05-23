"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface DataType {
    headingKey: string;
    imgSrc: string;
}

const postData: DataType[] = [
    { headingKey: 'featured.outfitCreator', imgSrc: '/images/featured/outfit_creator.png' },
    { headingKey: 'featured.smartSearch', imgSrc: '/images/featured/smartSearch2.jpg' },
    { headingKey: 'featured.trendExplorer', imgSrc: '/images/featured/personalized_trends.jpg' }
];

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.3)",
                padding: "28px",
                borderRadius: "20px"
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.3)",
                padding: "28px",
                borderRadius: "20px"
            }}
            onClick={onClick}
        />
    );
}

const MultipleItems = () => {
    const { t } = useTranslation("common");

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        speed: 500,
        nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
        prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <div id="featured-section" className="bg-bgblue dark:bg-gray-900 py-20 marginFeature bg-featured">
            <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
                <div className="text-center pt-48 pb-10 md:pt-96">
                    {[1, 0.5, 0.25].map((opacity, index) => (
                        <h3
                            key={index}
                            className={`text-4xl sm:text-6xl font-bold text-white dark:text-gray-100 my-2 ${
                                opacity < 1 ? `text-opacity-${Math.round(opacity * 100)}` : ""
                            }`}
                        >
                            {t("featured.ourImplementations")}
                        </h3>
                    ))}
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i}>
                            <div className="bg-transparent dark:bg-transparent m-3 pb-12 my-10 rounded-3xl">
                                <div className="relative w-full h-[400px] overflow-hidden">
                                    <Image
                                        src={items.imgSrc}
                                        alt={t(items.headingKey)}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                        className="rounded-2xl"
                                    />
                                </div>
                                <div className="w-345">
                                    <h4 className="sm:text-5xl font-bold sm:pt-6 text-center sm:text-start mt-10 text-white dark:text-gray-100">
                                        {t(items.headingKey)}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MultipleItems;
