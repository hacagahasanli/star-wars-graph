import { type FC } from "react";

import classnames from "~/shared/lib/helpers/classnames";

import { FALLBACK_TYPE } from "~/resources/constants/Common";

import Spin from "../Spin/Spin";
import Show from "../Show/Show";

interface IFallbackProps {
  type?: FALLBACK_TYPE;
}

const Fallback: FC<IFallbackProps> = ({ type = FALLBACK_TYPE.PAGE }) => {
  const isPageFallback = type === FALLBACK_TYPE.PAGE;
  const isContentFallback = type === FALLBACK_TYPE.CONTENT;

  return (
    <div
      className={classnames(
        "flex items-center justify-center transition ease-in-out",
        isPageFallback ? "h-[90dvh]" : "h-[65dvh]"
      )}
    >
      <Show when={isPageFallback}>
        <div className="relative h-44 flex items-center justify-start">
          {/* <div className="absolute animate-overflowBox 1.6s ease-in-out infinite w-72 h-32 bg-slate-600/70 opacity-90" /> */}
          <span className="text-8xl font-bold text-black-50">Starwars</span>
        </div>
      </Show>

      <Show when={isContentFallback}>
        <Spin size="large" />
      </Show>
    </div>
  );
};

export default Fallback;
