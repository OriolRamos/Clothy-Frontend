"use client"
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useTranslation } from "react-i18next";

const Aboutus = () => {
    const { t } = useTranslation('common');

    return (
        <div id="aboutus-section" className="bg-lightgrey dark:bg-gray-900">
            <div className='mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey dark:bg-gray-800 rounded-3xl relative'>
                <Image src="/images/aboutus/dots.svg" width={100} height={100} alt="dots-image" className="absolute bottom-1 -left-20" />
                <h3 className='text-center text-blue dark:text-blue-300 text-lg tracking-widest'>{t("aboutus.section_title")}</h3>
                <h4 className='text-center text-4xl lg:text-5xl font-bold my-6 text-black dark:text-white'>{t("aboutus.section_subtitle")}</h4>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                    <div className='hover:bg-navyblue bg-white dark:bg-gray-700 rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group max-w-md sm:max-w-xl lg:max-w-2xl'>
                        <h4 className='text-3xl lg:text-4xl font-semibold text-black dark:text-white mb-5 group-hover:text-white'>{t("aboutus.about_title")}</h4>
                        <Image src="/images/aboutus/imgOne.svg" alt="about-image" width={100} height={100} className="mb-5" />
                        <p className='text-lg font-normal text-black dark:text-gray-300 group-hover:text-offwhite mb-5'>{t("aboutus.about_paragraph")}</p>
                        <Link href="#dedicated-section" className='text-lg font-semibold group-hover:text-white text-blue dark:text-blue-300 hover-underline'>
                            {t("aboutus.about_link")}
                            <ChevronRightIcon width={20} height={20} />
                        </Link>
                    </div>

                    <div className='hover:bg-navyblue bg-white dark:bg-gray-700 rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group max-w-md sm:max-w-xl lg:max-w-2xl'>
                        <h4 className='text-3xl lg:text-4xl font-semibold text-black dark:text-white mb-5 group-hover:text-white'>{t("aboutus.history_title")}</h4>
                        <Image src="/images/aboutus/imgTwo.svg" alt="history-image" width={100} height={100} className="mb-5" />
                        <p className='text-lg font-normal text-black dark:text-gray-300 group-hover:text-offwhite mb-5'>{t("aboutus.history_paragraph")}</p>
                        <Link href="#featured-section" className='text-lg font-semibold group-hover:text-white text-blue dark:text-blue-300 hover-underline'>
                            {t("aboutus.history_link")}
                            <ChevronRightIcon width={20} height={20} />
                        </Link>
                    </div>

                    <div className='hover:bg-navyblue bg-white dark:bg-gray-700 rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group max-w-md sm:max-w-xl lg:max-w-2xl'>
                        <h4 className='text-3xl lg:text-4xl font-semibold text-black dark:text-white mb-5 group-hover:text-white'>{t("aboutus.vision_title")}</h4>
                        <Image src="/images/aboutus/imgThree.svg" alt="vision-image" width={100} height={100} className="mb-5" />
                        <p className='text-lg font-normal text-black dark:text-gray-300 group-hover:text-offwhite mb-5'>{t("aboutus.vision_paragraph")}</p>
                        <Link href="#beliefs-section" className='text-lg font-semibold group-hover:text-white text-blue dark:text-blue-300 hover-underline'>
                            {t("aboutus.vision_link")}
                            <ChevronRightIcon width={20} height={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;