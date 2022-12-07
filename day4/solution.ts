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

function transformInput(input: string) {
  const elfGroups = input.split("\n");

  return elfGroups
    .map((elfs) => elfs.split(","))
    .map(([elfOne, elfTwo]) => ({
      elfOne: elfOne.split("-").map((value) => parseInt(value)),
      elfTwo: elfTwo.split("-").map((value) => parseInt(value)),
    }));
}

function getContainedElfCount(elfs: ReturnType<typeof transformInput>) {
  return elfs.reduce((prev, { elfOne, elfTwo }) => {
    if (
      (elfOne[0] <= elfTwo[0] && elfOne[1] >= elfTwo[1]) ||
      (elfTwo[0] <= elfOne[0] && elfTwo[1] >= elfOne[1])
    ) {
      return prev + 1;
    }
    return prev;
  }, 0);
}

function getOverlappingElfCount(elfs: ReturnType<typeof transformInput>) {
  return elfs.reduce((prev, { elfOne, elfTwo }, index) => {
    const overlap =
      Math.min(elfOne[1], elfTwo[1]) - Math.max(elfOne[0], elfTwo[0]) + 1 > 0;

    if (overlap) return prev + 1;
    return prev;
  }, 0);
}

(async () => {
  const input = await getFile();

  console.log(getContainedElfCount(transformInput(input)));
  console.log(getOverlappingElfCount(transformInput(input)));
})();
