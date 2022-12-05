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
  return input.split("\n").map((bag) => {
    const firstHalf = bag.slice(0, bag.length / 2);
    const secondHalf = bag.slice(bag.length / 2);

    for (const char of secondHalf) {
      if (firstHalf.indexOf(char) !== -1) {
        return char;
      }
    }
    return "";
  });
}

function transformInputPart2(input: string) {
  const groups: string[][] = [];
  const inputs = input.split("\n");

  inputs.forEach((_group, index) => {
    if ((index + 1) % 3 === 0) {
      groups.push([inputs[index - 2], inputs[index - 1], inputs[index]]);
    }
  });

  const badge = groups.map((group) => {
    for (const char of group[0]) {
      if (group[1].includes(char) && group[2].includes(char)) {
        return char;
      }
    }
    return "";
  });

  return badge;
}

function getFinalScore(
  commonItemTypes: string[],
  scoreDictionary: { [key: string]: number }
) {
  return Array.from(commonItemTypes).reduce(
    (prev, curr) => prev + scoreDictionary[curr],
    0
  );
}

function generateScoreDictionary() {
  const upperCaseLetters: { [key: string]: number } = {};
  const lowerCaseLetters: { [key: string]: number } = {};
  for (let i = 0; i < 26; i++) {
    lowerCaseLetters[String.fromCharCode(i + 97)] = i + 1;
    upperCaseLetters[String.fromCharCode(i + 65)] = i + 1 + 26;
  }

  return { ...lowerCaseLetters, ...upperCaseLetters };
}

(async () => {
  const input = await getFile();

  console.log(getFinalScore(transformInput(input), generateScoreDictionary()));
  console.log(
    getFinalScore(transformInputPart2(input), generateScoreDictionary())
  );
})();
