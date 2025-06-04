import { useContext } from "react";
import { ConfigContext } from "@/utils/configContext";
import Spill from "@/public/svg/spill";
import IPhoneFrame from "@/components/IPhoneFrame";
import { motion } from "@/lib/motion";
import clsx from "clsx";
import Link from "next/link";

function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } = useContext(ConfigContext);

  if (!appBanner) return null;
  return (
    <motion.section
      id={appBanner.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative max-w-screen-lg mx-auto px-4 -mb-6 z-10 md:-mb-10 lg:-mb-14"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          mass: 0.4,
          type: "tween",
          duration: 0.2,
        }}
      >
        <div className="p-4 bg-(--primary-light) text-(--dark) rounded-lg flex flex-col items-center md:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center min-h-full">
            <motion.h2
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-0 mb-4 text-4xl md:text-6xl font-roboto"
            >
              {appBanner.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-(--dark)/70 whitespace-pre-wrap text-left m-0 mt-1 md:text-lg w-[90%]"
            >
              {appBanner.subtitle}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="list-none flex gap-4 my-6 p-0 w-full"
            >
              {googlePlayLink && (
                <li className="m-0 p-0">
                  <Link href={"/users"}>
                    <img className="h-14" alt="google play logo" src="/stores/google-play.svg" />
                  </Link>
                </li>
              )}
              {appStoreLink && (
                <li className="m-0 p-0">
                  <Link href={"/users"}>
                    <img className="h-14" alt="app store logo" src="/stores/app-store.svg" />
                  </Link>
                </li>
              )}
              <li className="m-0 p-0">
                <p>We Will Notify You As We Launch</p>
              </li>
            </motion.ul>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative flex-1 flex justify-center"
          >
            {appBanner.screenshots.map((src, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    scale: index > 0 ? 0.9 : 1,
                    opacity: 0,
                    rotate: 0,
                  },
                  visible: {
                    scale: index > 0 ? 0.9 : 1,
                    opacity: 1,
                    rotate: index === 0 ? 0 : index === 1 ? "-30deg" : "30deg",
                  },
                }}
                transition={{
                  stiffness: 150,
                  mass: 0.5,
                  type: "tween",
                  delay: index > 0 ? 0.8 : 0.5,
                }}
                className={clsx(
                  "h-[30rem]",
                  index === 0 && "relative z-20 block",
                  index === 1 && "absolute origin-bottom-left hidden xl:block",
                  index === 2 && "absolute origin-bottom-right hidden xl:block"
                )}
              >
                <IPhoneFrame src={src} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default AppBanner;
