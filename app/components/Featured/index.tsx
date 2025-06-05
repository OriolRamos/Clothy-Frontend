"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// CSS per react-slick (important!)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DataType {
    headingKey: string;
    imgSrc: string;
}

const postData: DataType[] = [
    { headingKey: 'featured.outfitCreator', imgSrc: '/images/featured/outfit_creator.png' },
    { headingKey: 'featured.smartSearch', imgSrc: '/images/featured/smart_search2.jpg' },
    { headingKey: 'featured.trendExplorer', imgSrc: '/images/featured/personalized_trends.jpg' }
];

// Fletxa Següent Millorada
function SampleNextArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
    const { className, onClick } = props;
    return (
        <button
            className={`slick-arrow slick-next ${className || ''} 
                       !flex items-center justify-center z-10
                       w-12 h-12 md:w-14 md:h-14
                       bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600
                       rounded-full shadow-lg hover:shadow-xl
                       cursor-pointer transition-all duration-300
                       absolute top-1/2 -translate-y-1/2 
                       right-2 sm:right-4 md:-right-6
                       focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={onClick}
            aria-label="Següent diapositiva"
        >
            <ChevronRightIcon className="h-6 w-6 md:h-7 md:w-7 text-slate-800 dark:text-slate-100" />
        </button>
    );
}

// Fletxa Anterior Millorada
function SamplePrevArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
    const { className, onClick } = props;
    return (
        <button
            className={`slick-arrow slick-prev ${className || ''}
                       !flex items-center justify-center z-10
                       w-12 h-12 md:w-14 md:h-14
                       bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600
                       rounded-full shadow-lg hover:shadow-xl
                       cursor-pointer transition-all duration-300
                       absolute top-1/2 -translate-y-1/2
                       left-2 sm:left-4 md:-left-6
                       focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={onClick}
            aria-label="Diapositiva anterior"
        >
            <ChevronLeftIcon className="h-6 w-6 md:h-7 md:w-7 text-slate-800 dark:text-slate-100" />
        </button>
    );
}

const MultipleItems = () => {
    const { t } = useTranslation("common");

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 600,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    return (
        <div id="featured-section" className="bg-bgblue dark:bg-gray-900 py-16 sm:py-20 bg-featured">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center pt-20 pb-10 md:pt-28 md:pb-16">
                    {[1, 0.7, 0.4].map((opacity, index) => (
                        <h3
                            key={index}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-blue dark:text-gray-100 my-2 ${
                                opacity < 1 ? `text-opacity-${Math.round(opacity * 100)}` : ""
                            }`}
                        >
                            {t("featured.ourImplementations")}
                        </h3>
                    ))}
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i} className="px-2 sm:px-3">
                            <div className="bg-white dark:bg-slate-800 m-3 my-6 sm:my-8 md:my-10 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
                                    <Image
                                        src={items.imgSrc}
                                        alt={t(items.headingKey)}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={90}
                                    />
                                </div>
                                <div className="p-6 sm:p-8 text-center">
                                    <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-4 text-slate-900 dark:text-slate-100">
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