import { readFile } from "fs/promises";
import path from "path";

async function getFile() {
  try {
    const filePath = path.join(__dirname, "input.txt");
    const input = await readFile(filePath);

    return input.toString();
  } catch (err) {
    console.log(err);
    return "";
  }
}

async function transformInput(input: string): Promise<string[][]> {
  return input.split("\n").map((turn) => turn.split(" "));
}

const scores: { [key: string]: number } = {
  AX: 4,
  AY: 8,
  AZ: 3,
  BX: 1,
  BY: 5,
  BZ: 9,
  CX: 7,
  CY: 2,
  CZ: 6,
};

const losingMoves: { [key: string]: string } = {
  A: "Z",
  B: "X",
  C: "Y",
};

const tyingMoves: { [key: string]: string } = {
  A: "X",
  B: "Y",
  C: "Z",
};

const winningMoves: { [key: string]: string } = {
  A: "Y",
  B: "Z",
  C: "X",
};

function calculateScore(moves: string[][]) {
  return {
    part1: moves.reduce((prev, curr) => {
      const [opponent, player] = curr;

      return prev + scores[`${opponent}${player}`];
    }, 0),
    part2: moves.reduce((prev, curr) => {
      const [opponent, player] = curr;

      if (player === "X") {
        return prev + scores[`${opponent}${losingMoves[opponent]}`];
      }
      if (player === "Y") {
        return prev + scores[`${opponent}${tyingMoves[opponent]}`];
      }
      if (player === "Z") {
        return prev + scores[`${opponent}${winningMoves[opponent]}`];
      }

      return prev;
    }, 0),
  };
}

(async () => {
  console.log(calculateScore(await transformInput(await getFile())));
})();
