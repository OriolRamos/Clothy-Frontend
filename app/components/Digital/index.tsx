"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Digital = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleLogin = () => {
        // Redirigeix a la pàgina de login
        router.push("/login");
    };

    return (
        <div className="mx-2">
            <div className="mx-auto max-w-7xl px-4 my-40 pb-20 lg:pb-40 lg:px-8 bg-digital rounded-3xl bg-faqblue relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 my-16">
                    {/* COLUMN-1 */}
                    <div className="pt-24 lg:pl-24">
                        <h3 className="text-lg font-normal text-white mb-5 tracking-widest text-center lg:text-start">
                            {t("digital.subtitle")}
                        </h3>
                        <h4 className="text-3xl sm:text-5xl font-bold text-white mb-8 leading-snug text-center lg:text-start">
                            {t("digital.title")}
                        </h4>
                        <div className="text-center lg:text-start">
                            <button
                                className="text-xl font-semibold text-white bg-btnblue py-4 px-12 hover:bg-hoblue rounded-full"
                                onClick={handleLogin}
                            >
                                {t("digital.button")}
                            </button>
                        </div>
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <div className="lg:absolute girldoodle">
                            <Image
                                src="/images/digital/girldoodle.svg"
                                alt={t("digital.imageAlt")}
                                width={815}
                                height={691}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Digital;
