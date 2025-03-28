import { MONO_FONT } from "../fonts";
import { combineClasses } from "../util";
import styles from "./styles.module.css";

interface SliderProps {
  value: number | null;
  setValue: (n: number) => void;
  format: (n: number | null) => string;
  min?: number;
  max?: number;
}

export default function Slider(props: SliderProps) {
  return (
    <div className={styles.sliderContainer}>
      <div
        className={combineClasses(
          styles.sliderValueContainer,
          MONO_FONT.className
        )}
      >
        {props.format(props.value)}
      </div>
      <input
        type="range"
        min={props.min || 1}
        max={props.max || 10}
        value={props.value || 5}
        onChange={(e) => props.setValue(parseInt(e.target.value))}
        className={styles.slider}
      />
    </div>
  );
}
