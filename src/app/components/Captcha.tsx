import { useEffect, useState } from "react";
import CaptchaPartition from "./CaptchaPartition";
import styles from "./styles.module.css";

interface CaptchaProps {
  password: string;
  imagePath: string;
  identificationObject: string;
  nextCaptcha: () => void;
  numPartitions?: number;
}

export default function Captcha(props: CaptchaProps) {
  const numPartitions1d = props.numPartitions || 4;

  const [selectedPartitions, setSelectedPartitions] = useState(
    [] as number[][]
  );

  const partitionsEqual = (i: number, j: number, coordinates: number[]) =>
    coordinates[0] === i && coordinates[1] === j;

  const getSelectPartitionFn = (
    i: number,
    j: number,
    isPartitionSelected: boolean
  ) =>
    isPartitionSelected
      ? () =>
          setSelectedPartitions(
            selectedPartitions.filter(
              (partition) => !partitionsEqual(i, j, partition)
            )
          )
      : () => setSelectedPartitions([...selectedPartitions, [i, j]]);

  const isSelected = (i: number, j: number) =>
    selectedPartitions.find((partition) => partitionsEqual(i, j, partition));

  const partitions = [] as JSX.Element[];
  for (let i = 1; i <= numPartitions1d; i++) {
    for (let j = 1; j <= numPartitions1d; j++) {
      const isPartitionSelected = Boolean(isSelected(i, j));
      partitions.push(
        <CaptchaPartition
          imagePath={`/images/${props.imagePath}/partition-${i}-${j}.png`}
          selected={isPartitionSelected}
          key={`${i}-${j}`}
          select={getSelectPartitionFn(i, j, isPartitionSelected)}
        />
      );
    }
  }

  useEffect(() => {
    setSelectedPartitions([]);
  }, [props.identificationObject]);

  const rowsAndColumns = [...Array(numPartitions1d).keys()]
    .map(() => "1fr")
    .join(" ");
  const gridStyle = {
    gridTemplateColumns: rowsAndColumns,
    gridTemplateRows: rowsAndColumns,
  };

  return (
    <div className={styles.captchaOuterContainer}>
      <div className={styles.captchaInnerContainer}>
        <div className={styles.promptContainer}>
          <div className={styles.promptTopText}>Select all squares with</div>
          <div className={styles.promptBottomText}>
            {props.identificationObject}
          </div>
        </div>
        <div className={styles.captchaGrid} style={gridStyle}>
          {...partitions}
        </div>
        <div className={styles.verifyButtonContainer}>
          <button className={styles.verifyButton} onClick={props.nextCaptcha}>
            VERIFY
          </button>
        </div>
      </div>
    </div>
  );
}
