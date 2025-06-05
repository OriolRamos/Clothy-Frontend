"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Beliefs = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleLogin = () => {
        router.push("/login");
    };
    const handleJoinUs = () => {
        router.push("/#joinus-section");
    };

    return (
        <div id="beliefs-section" className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5">
                {/* COLUMN-1 */}
                <div className="bg-darkblue dark:bg-gray-800 bg-beliefs pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-white dark:text-gray-100 tracking-widest mb-5 text-center sm:text-start">
                        {t("beliefs.section1.title")}
                    </h2>
                    <h3 className="text-4xl sm:text-65xl font-bold text-white dark:text-gray-100 leading-snug mb-5 text-center sm:text-start">
                        {t("beliefs.section1.subtitle")}
                        <span className="text-grey dark:text-gray-300"> {t("beliefs.section1.highlight")}</span>
                    </h3>
                    <h5 className="text-offwhite dark:text-gray-300 pt-2 mb-5 text-center sm:text-start">
                        {t("beliefs.section1.description")}
                    </h5>
                    <div className="text-center sm:text-start">
                        <button
                            className="text-xl py-5 px-14 mt-5 font-semibold text-white bg-faqblue dark:bg-faqblue border border-blue dark:border-blue hover:bg-hoblue dark:hover:bg-blue-600 rounded-full"
                            onClick={handleLogin}
                        >
                            {t("beliefs.section1.button")}
                        </button>
                    </div>
                </div>

                {/* COLUMN-2 */}
                <div className="bg-build dark:bg-gray-700 pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl">
                    <h2 className="text-lg font-normal text-blue dark:text-blue-300 tracking-widest mb-5 text-center sm:text-start">
                        {t("beliefs.section2.title")}
                    </h2>
                    <h3 className="text-4xl sm:text-65xl font-bold text-black dark:text-white leading-snug mb-5 text-center sm:text-start">
                        <span className="text-blue dark:text-blue-300">{t("beliefs.section2.highlight")}</span> {t("beliefs.section2.subtitle")}
                    </h3>
                    <h5 className="bluish dark:text-gray-300 pt-2 mb-5 text-center sm:text-start">
                        {t("beliefs.section2.description")}
                    </h5>
                    <div className="text-center sm:text-start">
                        <button
                            className="text-xl py-5 px-14 mt-5 font-semibold text-white bg-faqblue dark:bg-faqblue border border-blue dark:border-blue hover:bg-hoblue dark:hover:bg-blue-600 rounded-full"
                            onClick={handleJoinUs}
                        >
                            {t("beliefs.section2.button")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Beliefs;