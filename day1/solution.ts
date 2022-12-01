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

function transformInput(input: string): number[][] {
  return input
    .split("\n\n")
    .map((elf) => elf.split("\n").map((number) => parseInt(number)));
}

function getSums(elfs: number[][]) {
  return elfs.map((elf) =>
    elf.reduce((prev, curr) => {
      return (prev += curr);
    }, 0)
  );
}

(async () => {
  const elfs = transformInput(await getFile());
  const sums = getSums(elfs);

  // log answer for part 1
  console.log("part 1", Math.max(...sums));

  // log answer for part 2
  console.log(
    "part 2",
    getSums(elfs)
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((prev, curr) => (prev += curr), 0)
  );
})();
