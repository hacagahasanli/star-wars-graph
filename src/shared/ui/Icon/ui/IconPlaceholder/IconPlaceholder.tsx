import { ICON_DEFAULT_SIZE } from "../../Icon.consts";

const IconPlaceholder: React.FC<{ size?: number }> = ({
  size = ICON_DEFAULT_SIZE,
}) => (
  <div
    style={{ width: size, height: size }}
    className="bg-transparent rounded flex items-center justify-center"
  >
    <span className="text-gray-500 opacity-60 text-sm"></span>
  </div>
);

export default IconPlaceholder;
